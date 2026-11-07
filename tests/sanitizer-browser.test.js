const { readFileSync, mkdtempSync, writeFileSync, rmSync } = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const assert = require('node:assert/strict');

const source = readFileSync(path.join(__dirname, '..', 'game.js'), 'utf8');
const start = source.indexOf('  function safeRichHtml(value) {');
const end = source.indexOf('\n  /* ---------- parser real PDF', start);
assert.notEqual(start, -1, 'No se encontró el sanitizador');
assert.notEqual(end, -1, 'No se encontró el final del sanitizador');
const sanitizer = source.slice(start, end);
const chromium = ['chromium', 'chromium-browser', 'google-chrome'].find(bin => spawnSync('which', [bin], { encoding: 'utf8' }).status === 0);

test('safeRichHtml conserva formato permitido y elimina elementos y atributos activos', { skip: !chromium && 'Chromium no está instalado' }, () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'verde-sanitizer-'));
  try {
    const html = `<!doctype html><meta charset="utf-8"><div id="result"></div><script>
${sanitizer}
const payload = '<p class="cite extra" onclick="window.__xss=1">Hola <a href="javascript:window.__xss=2">enlace</a><img src="x" onerror="window.__xss=3"><script>window.__xss=4<\\/script><svg onload="window.__xss=5">vector</svg><span class="legal-callout random" style="background:url(javascript:alert(1))">seguro</span></p>';
const host = document.createElement('div');
host.innerHTML = safeRichHtml(payload);
const nodes = [...host.querySelectorAll('*')];
const result = {
  text: host.textContent,
  noActiveElements: !host.querySelector('script, img, svg, iframe, object'),
  noActiveAttributes: nodes.every(node => [...node.attributes].every(attr => attr.name === 'class')),
  allowedClasses: host.querySelector('p')?.className === 'cite' && host.querySelector('span')?.className === 'legal-callout',
  removedUnsafeClass: !host.innerHTML.includes('extra') && !host.innerHTML.includes('random'),
  noExecution: window.__xss === undefined
};
document.getElementById('result').textContent = Object.values(result).every(Boolean) && result.text === 'Hola enlaceseguro' ? 'PASS' : JSON.stringify(result);
</script>`;
    const file = path.join(dir, 'test.html');
    writeFileSync(file, html);
    const browser = spawnSync(chromium, ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--disable-background-networking', '--disable-extensions', '--no-first-run', `--user-data-dir=${path.join(dir, 'profile')}`, '--virtual-time-budget=1000', '--dump-dom', pathToFileURL(file).href], { encoding: 'utf8', timeout: 30000 });
    assert.equal(browser.error, undefined, browser.error?.message);
    assert.equal(browser.status, 0, browser.stderr);
    assert.match(browser.stdout, /<div id="result">PASS<\/div>/, browser.stdout.slice(-2000));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

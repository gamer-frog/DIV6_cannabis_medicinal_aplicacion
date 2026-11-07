const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const assert = require('node:assert/strict');

const source = readFileSync(path.join(__dirname, '..', 'game.js'), 'utf8');
const start = source.indexOf('  let resourceImportPending = false;');
const end = source.indexOf('  function bindLibrary()', start);
assert.notEqual(start, -1, 'No se encontró el control de importación');
assert.notEqual(end, -1, 'No se encontró el final del control de importación');

function loadImportControl() {
  const sandbox = {};
  vm.runInNewContext(`${source.slice(start, end)}\nthis.runResourceImport = runResourceImport; this.isPending = () => resourceImportPending;`, sandbox);
  return sandbox;
}

test('la importación concurrente se rechaza y el estado se libera al terminar', async () => {
  const { runResourceImport, isPending } = loadImportControl();
  let finishFirst;
  let firstTaskRuns = 0;
  let secondTaskRuns = 0;
  const firstStatus = { textContent: '' };
  const secondStatus = { textContent: '' };
  const firstButton = { disabled: false };
  const secondButton = { disabled: false };
  const first = runResourceImport(firstStatus, firstButton, () => {
    firstTaskRuns++;
    return new Promise(resolve => { finishFirst = resolve; });
  });

  assert.equal(firstButton.disabled, true);
  assert.equal(isPending(), true);
  await runResourceImport(secondStatus, secondButton, async () => { secondTaskRuns++; });
  assert.equal(secondTaskRuns, 0);
  assert.match(secondStatus.textContent, /Ya hay una importación en curso/);
  assert.equal(secondButton.disabled, false);

  finishFirst();
  await first;
  assert.equal(firstTaskRuns, 1);
  assert.equal(isPending(), false);
  assert.equal(firstButton.disabled, false);
});

test('un error de importación muestra un mensaje acotado y permite reintentar', async () => {
  const { runResourceImport, isPending } = loadImportControl();
  const status = { textContent: '' };
  const button = { disabled: false };
  await runResourceImport(status, button, async () => { throw new Error('x'.repeat(200)); });

  assert.match(status.textContent, /^No se pudo completar la importación: /);
  assert.ok(status.textContent.length <= 160);
  assert.equal(isPending(), false);
  assert.equal(button.disabled, false);

  let retried = false;
  await runResourceImport(status, button, async () => { retried = true; });
  assert.equal(retried, true);
  assert.equal(button.disabled, false);
});

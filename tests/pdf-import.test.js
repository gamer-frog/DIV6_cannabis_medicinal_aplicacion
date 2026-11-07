const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const assert = require('node:assert/strict');

const source = readFileSync(path.join(__dirname, '..', 'game.js'), 'utf8');
const start = source.indexOf('  async function pdfToMarkdown(');
const end = source.indexOf('\n  const STAGES =', start);
assert.notEqual(start, -1, 'No se encontró el parser PDF');
assert.notEqual(end, -1, 'No se encontró el final del parser PDF');

function loadParser(pdfjsLib) {
  const sandbox = { window: { pdfjsLib } };
  vm.runInNewContext(`${source.slice(start, end)}\nthis.pdfToMarkdown = pdfToMarkdown;`, sandbox);
  return sandbox.pdfToMarkdown;
}

const file = { name: 'apuntes.pdf', arrayBuffer: async () => new ArrayBuffer(0) };
const validationStart = source.indexOf('  const MAX_PDF_BYTES =');
const validationEnd = source.indexOf('\n  let pdfDbPromise;', validationStart);
assert.notEqual(validationStart, -1, 'No se encontró la validación del archivo PDF');
assert.notEqual(validationEnd, -1, 'No se encontró el final de la validación del archivo PDF');
const validationSandbox = { TextDecoder };
vm.runInNewContext(`${source.slice(validationStart, validationEnd)}\nthis.validatePdfFile = validatePdfFile; this.resourceImportStatus = resourceImportStatus;`, validationSandbox);
const { validatePdfFile, resourceImportStatus } = validationSandbox;

test('la conversión informa el total y procesa como máximo 30 páginas', async () => {
  const pdf = {
    numPages: 35,
    getPage: async pageNumber => ({
      getTextContent: async () => ({ items: [{ str: `Texto de prueba de la página ${pageNumber}, con contenido suficiente para la extracción.` }] })
    })
  };
  const convert = loadParser({ getDocument: () => ({ promise: Promise.resolve(pdf) }) });
  const progress = [];
  const result = await convert(file, 'Apuntes', (...args) => progress.push(args));

  assert.equal(result.failed, false);
  assert.equal(result.pages, 35);
  assert.equal(result.meta.pages, 35);
  assert.equal(result.meta.processed, 30);
  assert.equal(progress.length, 30);
  assert.deepEqual(progress[29], [30, 30, 35]);
  assert.match(result.md, /35 páginas \(30 procesadas\)/);
  assert.match(result.md, /## Página 30/);
  assert.doesNotMatch(result.md, /## Página 31/);
});

test('la conversión recupera fallos de lectura del PDF sin rechazar la promesa', async () => {
  const convert = loadParser({ getDocument: () => ({ promise: Promise.reject(new Error('PDF dañado')) }) });
  const result = await convert(file, 'Apuntes');

  assert.equal(result.failed, true);
  assert.match(result.reason, /PDF dañado/);
  assert.equal(result.pages, 0);
});

test('la validación acepta un PDF con firma en el límite exacto de 40 MB', async () => {
  const boundaryFile = {
    name: 'apuntes.PDF', type: 'application/pdf', size: 40 * 1024 * 1024,
    slice: () => ({ arrayBuffer: async () => new TextEncoder().encode('%PDF-').buffer })
  };
  assert.equal(await validatePdfFile(boundaryFile), '');
});

test('la validación comunica los errores de selección, tipo, tamaño, firma y lectura', async () => {
  assert.match(await validatePdfFile(null), /Elegí un archivo PDF/);
  assert.match(await validatePdfFile({ name: 'apuntes.txt', type: 'text/plain', size: 1 }), /no parece ser un PDF/);
  assert.match(await validatePdfFile({ name: 'apuntes.pdf', type: 'text/plain', size: 1 }), /no parece ser un PDF/);
  assert.match(await validatePdfFile({ name: 'apuntes.pdf', size: 40 * 1024 * 1024 + 1 }), /límite de 40 MB/);
  assert.match(await validatePdfFile({ name: 'apuntes.pdf', size: 5, slice: () => ({ arrayBuffer: async () => new TextEncoder().encode('NOTPDF').buffer }) }), /firma PDF/);
  assert.match(await validatePdfFile({ name: 'apuntes.pdf', size: 5, slice: () => ({ arrayBuffer: async () => { throw new Error('lectura fallida'); } }) }), /No se pudo leer/);
});

test('el estado de importación distingue Markdown, pendiente y almacenamiento del original', () => {
  const converted = resourceImportStatus({ failed: false, pages: 35, chars: 1000, meta: { processed: 30 } }, true);
  assert.match(converted, /Markdown generado: 30 de 35 páginas/);
  assert.match(converted, /PDF original guardado localmente/);

  const noOriginal = resourceImportStatus({ failed: false, pages: 1, chars: 100, meta: { processed: 1 } }, false);
  assert.match(noOriginal, /Markdown generado/);
  assert.match(noOriginal, /no pudo guardarse localmente/);

  const pending = resourceImportStatus({ failed: true, reason: 'sin texto extraíble' }, false);
  assert.match(pending, /Agregado como pendiente: sin texto extraíble/);
  assert.match(pending, /no pudo guardarse localmente/);
});

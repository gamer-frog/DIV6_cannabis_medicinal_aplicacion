const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const assert = require('node:assert/strict');

const source = readFileSync(path.join(__dirname, '..', 'game.js'), 'utf8');
const pdfStoreStart = source.indexOf('  let pdfDbPromise;');
const pdfStoreEnd = source.indexOf('  async function storePdfBlob', pdfStoreStart);
assert.notEqual(pdfStoreStart, -1, 'No se encontró el acceso a IndexedDB');
assert.notEqual(pdfStoreEnd, -1, 'No se encontró el final del acceso a IndexedDB');
const pdfRequests = [];
const indexedDB = { open: () => { const request = {}; pdfRequests.push(request); return request; } };
const pdfStoreSandbox = { indexedDB, window: { indexedDB } };
vm.runInNewContext(`${source.slice(pdfStoreStart, pdfStoreEnd)}\nthis.openPdfStore = openPdfStore;`, pdfStoreSandbox);
const openPdfStore = pdfStoreSandbox.openPdfStore;
const start = source.indexOf('  const isRecord =');
const end = source.indexOf('  let game, app;', start);
assert.notEqual(start, -1, 'No se encontró la normalización de datos persistidos');
assert.notEqual(end, -1, 'No se encontró el final de la normalización de datos persistidos');

const initialGame = () => ({
  day: 1, selected: 0, water: 15, nutrients: 7, energy: 88, cash: 48000,
  temp: 24, humidity: 58, light: 18, vented: false, harvested: 0,
  harvestYield: 0, spent: 0, finished: false, archived: false,
  plants: Array.from({ length: 9 }, (_, i) => ({
    id: i + 1, age: 1 + (i % 3), health: 88 + (i % 4) * 3,
    moisture: 46 + (i * 11) % 31, nutrition: 48 + (i * 7) % 28,
    alive: true, checked: false
  })),
  logs: [{ day: 1, text: '<b>Temporada iniciada.</b>', kind: 'success' }]
});
const initialBudget = () => ({ plants: 9, yield: 55, price: 4500, kwh: 95, hours: 18, days: 75, watts: 240, mode: 'indoor' });
const defaultApp = () => ({
  view: 'panel', budget: initialBudget(), tasks: {}, legal: {}, userResources: [],
  selectedResource: null, queries: 0, chat: [], chatSources: [], dupOnly: false,
  journalWeek: null, journalTasks: {}, selectedStrain: null, grows: [],
  libMode: 'digest', batch: null, roadmapStream: 'all', roadmapPending: false,
  roadmapHorizon: 'all', roadmapQuery: '', sideCollapsed: false, sim: null,
  simSeries: { growth: true, health: true, moisture: true, nutrition: true, yield: true },
  annotations: {}, readingPaths: []
});
const sandbox = { initialGame, initialBudget, defaultApp };
vm.runInNewContext(`${source.slice(start, end)}\nthis.restoreGame = restoreGame; this.restoreApp = restoreApp;`, sandbox);
const { restoreGame, restoreApp } = sandbox;
const plain = value => JSON.parse(JSON.stringify(value));

test('la restauración del juego descarta una estructura de plantas inesperada', () => {
  const invalid = restoreGame({ plants: [{ id: 1, health: 100 }] });
  assert.equal(invalid.plants.length, 9);
  assert.equal(invalid.day, 1);
});

test('la restauración acota números y limpia tipos no confiables del simulador', () => {
  const saved = initialGame();
  saved.day = 999;
  saved.cash = 'infinito';
  saved.plants[0].health = 500;
  saved.plants[0].alive = '<svg onload=alert(1)>';
  saved.logs = [{ day: -3, text: '<img src=x onerror=alert(1)>', kind: 'evil' }];
  const restored = restoreGame(saved);
  assert.equal(restored.day, 75);
  assert.equal(restored.cash, 48000);
  assert.equal(restored.plants[0].health, 100);
  assert.equal(restored.plants[0].alive, true);
  assert.deepEqual(plain(restored.logs), [{ day: 1, text: '<img src=x onerror=alert(1)>', kind: '' }]);
});

test('la restauración de la app filtra conversaciones, limita entradas y normaliza preferencias', () => {
  const restored = restoreApp({
    view: '<script>',
    budget: { plants: -50, mode: 'remote' },
    chat: [null, { role: 'admin', html: '<script>alert(1)</script>' }, { role: 'user', html: '<b>Hola</b>' }],
    chatSources: [{ id: '1', score: 90 }, { id: 2, score: 75 }],
    journalTasks: []
  });
  assert.equal(restored.view, 'panel');
  assert.equal(restored.budget.plants, 1);
  assert.equal(restored.budget.mode, 'indoor');
  assert.deepEqual(plain(restored.chat), [{ role: 'user', html: '<b>Hola</b>' }]);
  assert.deepEqual(plain(restored.chatSources), [{ id: 2, score: 75 }]);
  assert.deepEqual(plain(restored.journalTasks), {});
});

test('los logs y mensajes usan un renderizador HTML con lista permitida', () => {
  assert.match(source, /<span class="log-text">\$\{safeRichHtml\(x\.text\)\}<\/span>/);
  assert.match(source, /<div class="msg-body">\$\{safeRichHtml\(m\.html\)\}<\/div>/);
  assert.match(source, /const allowed = new Set\(\['P', 'B', 'STRONG', 'SPAN', 'BLOCKQUOTE', 'Q', 'SMALL', 'DIV', 'BR'\]\)/);
});

test('IndexedDB permite reintentar después de fallos de apertura o bloqueo', async () => {
  const firstAttempt = openPdfStore();
  pdfRequests[0].error = new Error('fallo inicial');
  pdfRequests[0].onerror();
  await assert.rejects(firstAttempt, /fallo inicial/);

  const blockedAttempt = openPdfStore();
  pdfRequests[1].onblocked();
  await assert.rejects(blockedAttempt, /bloqueada/);

  const retry = openPdfStore();
  const db = { objectStoreNames: [] };
  pdfRequests[2].result = db;
  pdfRequests[2].onsuccess();
  assert.equal(await retry, db);
  assert.equal(pdfRequests.length, 3);
});

test('la importación conserva el recurso y comunica el fallo al guardar el PDF original', async () => {
  const importStart = source.indexOf('  function resourceImportStatus(');
  const importEnd = source.indexOf('\n  let pdfDbPromise;', importStart);
  assert.notEqual(importStart, -1, 'No se encontró la finalización de la importación PDF');
  assert.notEqual(importEnd, -1, 'No se encontró el final de la finalización de la importación PDF');

  const toasts = [];
  let persistCalls = 0;
  const visibleStatus = { textContent: '' };
  const app = { userResources: [], selectedResource: null };
  const sandbox = {
    app,
    fmt: String,
    persist: () => { persistCalls++; },
    showToast: message => toasts.push(message),
    storePdfBlob: async () => { throw new Error('cuota de almacenamiento agotada'); }
  };
  vm.runInNewContext(`${source.slice(importStart, importEnd)}\nthis.finalizeResourceImport = finalizeResourceImport;`, sandbox);

  const resource = { id: 501, title: 'Apuntes', state: 'markdown', mdText: '# Apuntes' };
  const parsed = { failed: false, pages: 2, chars: 321, meta: { processed: 2 } };
  const result = await sandbox.finalizeResourceImport(resource, parsed, { name: 'apuntes.pdf' }, visibleStatus);

  assert.equal(result.originalStored, false);
  assert.equal(visibleStatus.textContent, 'Markdown generado: 2 de 2 páginas procesadas y 321 caracteres. El PDF original no pudo guardarse localmente.');
  assert.deepEqual(toasts, ['Convertido: 2 de 2 páginas procesadas · 321 caracteres → Markdown · PDF original no pudo guardarse.']);
  assert.equal(app.userResources.length, 1);
  assert.equal(app.userResources[0], resource);
  assert.equal('pdfStored' in resource, false);
  assert.equal(app.selectedResource, 501);
  assert.equal(persistCalls, 1);
});

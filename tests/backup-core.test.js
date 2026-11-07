'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createBackup, parseBackup, safeLogMarkup } = require('../backup-core.js');

const sample = () => ({
  game: {
    day: 12, selected: 0, water: 15, nutrients: 7, energy: 88, cash: 48000,
    temp: 24, humidity: 58, light: 18, vented: false, harvested: 0,
    harvestYield: 0, spent: 0, finished: false, archived: false,
    plants: [{ id: 1, age: 1, health: 90, moisture: 46, nutrition: 48, alive: true, checked: false }],
    logs: []
  },
  app: { budget: { plants: 9 }, userResources: [{
    id: 1, title: 'Notas', diploma: 'Aporte', module: 'Módulo', code: 'AP',
    path: 'md/ap/modulo/notas.md', summary: 'Nota', mdText: '# Nota',
    year: 2026, pages: 1, state: 'markdown', tags: []
  }] }
});

test('exporta y vuelve a leer un respaldo con versión explícita y sin PDFs', () => {
  const data = sample();
  const backup = createBackup(data.game, data.app, '2026-11-07T00:00:00.000Z');
  assert.equal(backup.format, 'verde-backup');
  assert.equal(backup.version, 1);
  assert.equal(backup.pdfsIncluded, false);
  const expected = sample();
  expected.app.userResources[0].pdfStored = false;
  assert.deepEqual(parseBackup(JSON.stringify(backup)), expected);
});

test('quita los PDF originales de los recursos y marca que deben volver a añadirse', () => {
  const data = sample();
  data.app.userResources[0].pdfData = 'base64-pdf';
  data.app.userResources[0].pdfStored = true;
  const backup = createBackup(data.game, data.app);
  assert.equal(backup.data.app.userResources[0].pdfData, undefined);
  assert.equal(backup.data.app.userResources[0].pdfStored, false);
  assert.equal(data.app.userResources[0].pdfStored, true, 'no muta el estado activo');
  const restored = parseBackup(JSON.stringify({ ...backup, data: {
    ...backup.data,
    app: { ...backup.data.app, userResources: [{ ...backup.data.app.userResources[0], pdfData: 'no-deberia-importarse' }] }
  } }));
  assert.equal(restored.app.userResources[0].pdfData, undefined);
  assert.equal(restored.app.userResources[0].pdfStored, false);
});

test('rechaza JSON mal formado, formatos desconocidos y estructura incompleta', () => {
  assert.throws(() => parseBackup('{'), /JSON válido/);
  assert.throws(() => parseBackup(JSON.stringify({ format: 'otro', version: 1 })), /compatible/);
  assert.throws(() => parseBackup(JSON.stringify(createBackup({}, {}))), /estructura inválida/);
});

test('escapa HTML arbitrario en logs y conserva solo el formato negrita', () => {
  assert.equal(safeLogMarkup('<b>Riego</b> <img src=x onerror=alert(1)> & listo'),
    '<b>Riego</b> &lt;img src=x onerror=alert(1)&gt; &amp; listo');
  assert.equal(safeLogMarkup('<b onclick="alert(1)">x</b>'), '&lt;b onclick=&quot;alert(1)&quot;&gt;x</b>');
});

test('rechaza claves peligrosas y colecciones fuera de los límites', () => {
  const malicious = JSON.parse(JSON.stringify(createBackup(...Object.values(sample()))));
  Object.defineProperty(malicious.data.app, '__proto__', {
    value: { polluted: true }, enumerable: true, configurable: true
  });
  assert.throws(() => parseBackup(JSON.stringify(malicious)), /campos no permitidos/);

  const tooManyPlants = sample();
  tooManyPlants.game.plants = Array(101).fill({ id: 1 });
  assert.throws(() => parseBackup(JSON.stringify(createBackup(tooManyPlants.game, tooManyPlants.app))), /estructura inválida/);
});

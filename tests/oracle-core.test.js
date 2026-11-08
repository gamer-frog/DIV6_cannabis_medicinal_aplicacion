'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { scoreKnowledge, libraryFallback } = require('../oracle-core.js');

const knowledge = [
  { key: 'riego', match: ['riego', 'regar', 'agua'], tags: ['Riego', 'Sustrato'] },
  { key: 'ph', match: ['ph', 'acidez'], tags: ['pH / EC'] },
  { key: 'legal', match: ['legal', 'reprocann'], tags: ['Legal'] }
];

const resources = [
  { id: 1, title: 'Riego en sustrato', summary: 'Drenaje y humedad', tags: ['Agua'], diploma: 'Cultivo', module: 'Riego' },
  { id: 2, title: 'Marco normativo', summary: 'Registro y legislación', tags: ['Legal'], diploma: 'Gestión', module: 'REPROCANN' }
];

test('reconoce una coincidencia pertinente aunque tenga tildes o mayúsculas', () => {
  const result = scoreKnowledge('¿Cómo afecta el RIEGO?', knowledge);
  assert.equal(result.entry.key, 'riego');
  assert.ok(result.score > 0);
});

test('usa límites de palabra y no confunde una subcadena con una coincidencia', () => {
  assert.equal(scoreKnowledge('¿Qué significa ph?', knowledge).entry.key, 'ph');
  assert.equal(scoreKnowledge('¿Qué significa fotografía?', knowledge).entry, null);
});

test('devuelve los recursos lexicalmente relacionados y omite los irrelevantes', () => {
  const result = libraryFallback('¿Dónde consulto REPROCANN?', resources);
  assert.deepEqual(result.map(item => item.id), [2]);
  assert.deepEqual(result[0].matched, ['reprocann']);
});

test('no inventa coincidencias para consultas sin términos ni recursos pertinentes', () => {
  assert.deepEqual(libraryFallback('¿Qué tal?', resources), []);
  assert.deepEqual(libraryFallback('¿Hay telescopios cuánticos?', resources), []);
});

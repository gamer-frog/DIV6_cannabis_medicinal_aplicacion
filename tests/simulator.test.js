const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const assert = require('node:assert/strict');

const source = readFileSync(path.join(__dirname, '..', 'game.js'), 'utf8');
const start = source.indexOf('  const BATCH_STRATEGIES = [');
const end = source.indexOf('  let batchCache = null;', start);
assert.notEqual(start, -1, 'No se encontró el bloque del simulador batch');
assert.notEqual(end, -1, 'No se encontró el final del bloque del simulador batch');

const window = { __VERDE_TEST__: {} };
vm.runInNewContext(`(() => {\n${source.slice(start, end)}\n})();`, { window, Math });
const { seededRandom, simulateBatch, batchStrategies } = window.__VERDE_TEST__;

const equalAcrossRealms = (actual, expected) => assert.deepEqual(JSON.parse(JSON.stringify(actual)), expected);

test('seededRandom reproduce la secuencia para la misma semilla', () => {
  const first = seededRandom(42);
  const repeat = seededRandom(42);
  const other = seededRandom(43);
  const sequence = Array.from({ length: 12 }, () => first());

  equalAcrossRealms(Array.from({ length: 12 }, () => repeat()), sequence);
  assert.notDeepEqual(Array.from({ length: 12 }, () => other()), sequence);
  assert.ok(sequence.every(value => value >= 0 && value < 1));
});

test('el acceso de prueba enumera las seis estrategias esperadas', () => {
  equalAcrossRealms(batchStrategies, ['balanced', 'rapid', 'organic', 'minimal', 'lowcost', 'intensive']);
});

for (const strategy of batchStrategies) {
  test(`simulateBatch: ${strategy} devuelve resultados válidos y reproducibles`, () => {
    const result = simulateBatch(strategy, 2026);
    const repeated = simulateBatch(strategy, 2026);
    equalAcrossRealms(result, JSON.parse(JSON.stringify(repeated)));

    assert.equal(result.id, strategy);
    assert.equal(result.days, 75);
    assert.ok(Number.isInteger(result.score) && result.score >= 0 && result.score <= 100);
    assert.ok(Number.isInteger(result.yield) && result.yield >= 0);
    assert.ok(Number.isFinite(result.spent) && result.spent >= 0);
    assert.ok(Number.isFinite(result.perGram) && result.perGram >= 0);
    assert.ok(Number.isInteger(result.alive) && result.alive >= 0 && result.alive <= 9);
    assert.ok(Number.isInteger(result.harvests) && result.harvests === result.alive);
    assert.ok(Array.isArray(result.events) && result.events.length > 0);
    assert.ok(result.events.every(event => Number.isInteger(event.day) && event.day >= 1 && event.day <= 75));
  });
}

test('una estrategia desconocida usa el fallback documentado sin romper el batch', () => {
  const fallback = simulateBatch('estrategia-inexistente', 7);
  assert.equal(fallback.id, 'balanced');
  assert.equal(fallback.days, 75);
});

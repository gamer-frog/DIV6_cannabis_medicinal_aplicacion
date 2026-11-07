'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { MAX_SCENARIOS, normalizeScenarios, saveScenario, removeScenario } = require('../scenario-core.js');

const config = { strainId: 'demo', plants: 4, days: 70, light: 18, temp: 24, strategy: 'balanced' };

test('guarda escenarios nombrados y normaliza límites de configuración', () => {
  const result = saveScenario([], '  Mi batch  ', { ...config, plants: 100, temp: 'NaN' });
  assert.equal(result.error, null);
  assert.equal(result.scenarios[0].name, 'Mi batch');
  assert.equal(result.scenarios[0].config.plants, 9);
  assert.equal(result.scenarios[0].config.temp, 24);
});

test('un nombre repetido actualiza el escenario sin ocupar otro cupo', () => {
  let result = saveScenario([], 'Verano', config);
  result = saveScenario(result.scenarios, 'verano', { ...config, plants: 2 });
  assert.equal(result.scenarios.length, 1);
  assert.equal(result.scenarios[0].config.plants, 2);
});

test('limita a seis escenarios nuevos y permite eliminar para liberar un cupo', () => {
  let scenarios = [];
  for (let i = 0; i < MAX_SCENARIOS; i++) {
    scenarios = saveScenario(scenarios, `Batch ${i + 1}`, config).scenarios;
  }
  const rejected = saveScenario(scenarios, 'Séptimo', config);
  assert.match(rejected.error, /hasta 6/);
  scenarios = removeScenario(scenarios, 'Batch 2');
  assert.equal(saveScenario(scenarios, 'Séptimo', config).scenarios.length, MAX_SCENARIOS);
});

test('normaliza datos importados malformados, nombres duplicados y cantidades excesivas', () => {
  const list = normalizeScenarios([
    { name: ' Uno ', config },
    { name: 'uno', config },
    { name: 'Dos', config: { ...config, days: -2 } },
    ...Array.from({ length: 8 }, (_, i) => ({ name: `Extra ${i}`, config }))
  ]);
  assert.equal(list.length, MAX_SCENARIOS);
  assert.equal(list[0].name, 'Uno');
  assert.equal(list[1].config.days, 55);
});

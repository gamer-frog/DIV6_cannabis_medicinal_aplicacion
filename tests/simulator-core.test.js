'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizeConfig, simulateFull } = require('../simulator-core.js');

const strains = [
  { id: 'demo-strain', name: 'Demo', yield: 90, flower: 65 }
];
const strategies = [
  { id: 'balanced', label: 'Equilibrada', waterAt: 32, feedAt: 30, premium: 0, stress: 0, stressEvery: 0, vent: true },
  { id: 'rapid', label: 'Rápida', waterAt: 40, feedAt: 38, premium: .08, stress: 0, stressEvery: 0, vent: true },
  { id: 'organic', label: 'Orgánica', waterAt: 28, feedAt: 24, premium: .02, stress: 0, stressEvery: 0, vent: true },
  { id: 'minimal', label: 'Mínima', waterAt: 20, feedAt: 14, premium: -.16, stress: 1, stressEvery: 3, vent: false },
  { id: 'lowcost', label: 'Low-cost', waterAt: 22, feedAt: 16, premium: -.12, stress: 1, stressEvery: 2, vent: false },
  { id: 'intensive', label: 'Intensiva', waterAt: 48, feedAt: 48, premium: .18, stress: 0, stressEvery: 0, vent: true }
];
const grades = [
  { id: 'horrible', label: 'Horrible', min: 0 },
  { id: 'regular', label: 'Regular', min: 35 },
  { id: 'buena', label: 'Buena', min: 55 },
  { id: 'muybuena', label: 'Muy buena', min: 72 },
  { id: 'excelente', label: 'Excelente', min: 86 }
];
const deps = { strains, strategies, grades };
const config = { strainId: 'demo-strain', plants: 5, days: 75, light: 18, temp: 24, strategy: 'balanced' };

function run(cfg = config, seedOffset = 0) {
  return simulateFull(cfg, { ...deps, seedOffset });
}

test('la misma configuración y semilla reproducen exactamente el resultado', () => {
  assert.deepEqual(run(config, 29), run(config, 29));
});

test('semillas distintas producen variaciones reproducibles y no idénticas', () => {
  const first = run(config, 11);
  const second = run(config, 29);
  assert.deepEqual(first, run(config, 11));
  assert.notDeepEqual(first.growth, second.growth);
});

test('normaliza configuración a los rangos de la interfaz y usa opciones conocidas', () => {
  assert.deepEqual(normalizeConfig({ plants: 99, days: 2, light: 30, temp: 5, strainId: 'nope', strategy: 'nope' }, strains, strategies), {
    strainId: 'demo-strain', plants: 9, days: 55, light: 24, temp: 18, strategy: 'balanced'
  });
  assert.deepEqual(normalizeConfig({ plants: 'NaN', days: null, light: undefined, temp: Infinity }, strains, strategies), {
    strainId: 'demo-strain', plants: 9, days: 55, light: 18, temp: 24, strategy: 'balanced'
  });
});

test('respeta límites y longitudes de serie para duraciones mínimas y máximas', () => {
  for (const days of [55, 75, 90]) {
    const result = run({ ...config, days });
    assert.equal(result.days, days);
    for (const series of [result.growth, result.health, result.moisture, result.nutrition, result.yield, result.yieldPct]) {
      assert.equal(series.length, days);
      assert.ok(series.every(Number.isFinite));
    }
    assert.ok(result.growth.every(value => value >= 4 && value <= 100));
    assert.ok(result.health.every(value => value >= 15 && value <= 99));
    assert.ok(result.activities.every(activity => activity.day >= 1 && activity.day <= days));
    assert.ok(result.score >= 0 && result.score <= 100);
  }
});

test('cada estrategia declarada completa el ciclo con resultados finitos', () => {
  for (const strategy of strategies) {
    const result = run({ ...config, strategy: strategy.id });
    assert.equal(result.strategy.id, strategy.id);
    assert.equal(result.cfg.strategy, strategy.id);
    assert.ok(Number.isFinite(result.yieldG));
    assert.ok(Number.isFinite(result.spent));
    assert.ok(Number.isFinite(result.perGram));
    assert.ok(result.score >= 0 && result.score <= 100);
  }
});

test('las cinco variaciones ilustrativas se pueden regenerar por offset', () => {
  const offsets = [11, 29, 47, 73, 101];
  const firstRun = offsets.map(offset => run(config, offset));
  const secondRun = offsets.map(offset => run(config, offset));
  assert.deepEqual(firstRun, secondRun);
  assert.equal(firstRun.length, 5);
  assert.ok(new Set(firstRun.map(result => result.growth.join(','))).size > 1);
});

test('falla con error claro si faltan dependencias del modelo', () => {
  assert.throws(() => simulateFull(config), /Se requieren cepas, estrategias y grados/);
});

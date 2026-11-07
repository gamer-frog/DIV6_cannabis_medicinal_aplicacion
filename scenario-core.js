(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.VerdeScenarios = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  const MAX_SCENARIOS = 6;
  const clamp = (value, min, max, fallback) => {
    const number = Number(value);
    return Number.isFinite(number) ? Math.max(min, Math.min(max, number)) : fallback;
  };

  function normalizeConfig(config = {}) {
    return {
      strainId: typeof config.strainId === 'string' ? config.strainId.slice(0, 120) : '',
      plants: Math.round(clamp(config.plants, 1, 9, 9)),
      days: Math.round(clamp(config.days, 55, 90, 75)),
      light: clamp(config.light, 12, 24, 18),
      temp: clamp(config.temp, 18, 32, 24),
      strategy: typeof config.strategy === 'string' ? config.strategy.slice(0, 60) : 'balanced'
    };
  }

  function normalizeScenarios(list) {
    if (!Array.isArray(list)) return [];
    const scenarios = [];
    const names = new Set();
    for (const item of list) {
      if (!item || typeof item.name !== 'string' || !item.config || typeof item.config !== 'object') continue;
      const name = item.name.trim().slice(0, 40);
      const key = name.toLocaleLowerCase('es');
      if (!name || names.has(key)) continue;
      scenarios.push({ name, config: normalizeConfig(item.config) });
      names.add(key);
      if (scenarios.length === MAX_SCENARIOS) break;
    }
    return scenarios;
  }

  function saveScenario(list, name, config) {
    const scenarios = normalizeScenarios(list);
    const cleanName = typeof name === 'string' ? name.trim().slice(0, 40) : '';
    if (!cleanName) return { scenarios, error: 'Ingresá un nombre para guardar el escenario.' };
    const existing = scenarios.findIndex(item => item.name.toLocaleLowerCase('es') === cleanName.toLocaleLowerCase('es'));
    if (existing < 0 && scenarios.length >= MAX_SCENARIOS) {
      return { scenarios, error: `Podés guardar hasta ${MAX_SCENARIOS} escenarios.` };
    }
    const saved = { name: cleanName, config: normalizeConfig(config) };
    if (existing < 0) scenarios.push(saved);
    else scenarios[existing] = saved;
    return { scenarios, saved, error: null };
  }

  function removeScenario(list, name) {
    const key = typeof name === 'string' ? name.toLocaleLowerCase('es') : '';
    return normalizeScenarios(list).filter(item => item.name.toLocaleLowerCase('es') !== key);
  }

  return { MAX_SCENARIOS, normalizeConfig, normalizeScenarios, saveScenario, removeScenario };
});

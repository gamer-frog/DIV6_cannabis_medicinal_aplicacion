(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.VerdeSimulator = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  const clamp = (value, min, max, fallback) => {
    const number = Number(value);
    return Number.isFinite(number) ? Math.max(min, Math.min(max, number)) : fallback;
  };

  function normalizeConfig(cfg = {}, strains = [], strategies = []) {
    const defaultStrain = strains[0];
    const strain = strains.find(item => item.id === cfg.strainId) || defaultStrain;
    const strategy = strategies.find(item => item.id === cfg.strategy) || strategies[0];
    return {
      strainId: strain?.id,
      plants: Math.round(clamp(cfg.plants, 1, 9, 9)),
      days: Math.round(clamp(cfg.days, 55, 90, 75)),
      light: clamp(cfg.light, 12, 24, 18),
      temp: clamp(cfg.temp, 18, 32, 24),
      strategy: strategy?.id
    };
  }

  function seededRandom(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function simulateFull(rawConfig, { strains, strategies, grades, seedOffset = 0 } = {}) {
    if (!Array.isArray(strains) || !strains.length || !Array.isArray(strategies) || !strategies.length || !Array.isArray(grades) || !grades.length) {
      throw new TypeError('Se requieren cepas, estrategias y grados para simular.');
    }
    const cfg = normalizeConfig(rawConfig, strains, strategies);
    const st = strains.find(item => item.id === cfg.strainId) || strains[0];
    const strat = strategies.find(item => item.id === cfg.strategy) || strategies[0];
    const days = cfg.days;
    const baseYieldPerPlant = st.yield || 85;
    const cycleFactor = Math.max(.7, Math.min(1.15, cfg.days / (st.flower + 5)));
    const lightFactor = Math.max(.78, Math.min(1.12, cfg.light / 18));
    const tempPenalty = Math.max(0, Math.abs(cfg.temp - 24) - 2) * 1.1;
    const offset = Number.isFinite(Number(seedOffset)) ? Math.trunc(Number(seedOffset)) : 0;
    const rand = seededRandom((cfg.strainId.charCodeAt(0) || 7) * 131 + days * 17 + cfg.plants * 911 + (cfg.strategy === 'balanced' ? 7 : cfg.strategy.length * 31) + offset);
    const growth = [], healthS = [], moistureS = [], nutritionS = [], yieldS = [];
    let health = 92, moisture = 58, nutrition = 55, stressDays = 0;
    for (let d = 1; d <= days; d++) {
      const logistic = 100 / (1 + Math.exp(-(d - days * 0.52) / (days * 0.16)));
      growth.push(Math.round(Math.min(100, Math.max(4, logistic + (rand() - .5) * 3))));
      moisture = Math.max(18, Math.min(88, moisture - 11 + rand() * 5 + (strat.waterAt > 30 ? 4 : 0)));
      if (moisture < strat.waterAt) moisture = Math.min(88, moisture + 34);
      nutrition = Math.max(15, Math.min(90, nutrition - 2.1 + rand() * 2 + (strat.feedAt > 30 ? 3 : 0)));
      if (nutrition < strat.feedAt) nutrition = Math.min(90, nutrition + 30);
      let stress = 0;
      if (moisture < 22 || moisture > 84) stress += 5;
      if (nutrition < 18) stress += 4;
      if (tempPenalty > 2) stress += Math.min(4, tempPenalty / 2);
      // Variación sintética para enseñar sensibilidad; no es una tasa empírica.
      if (rand() < 0.08) stress += 3 + rand() * 5;
      if (strat.stress && d % (strat.stressEvery || 3) === 0) stress += strat.stress;
      health = Math.max(15, Math.min(99, health + (stress ? -stress : 0.55)));
      if (stress) stressDays++;
      if (d % 7 === 0 && health < 55) stressDays++;
      healthS.push(Math.round(health));
      moistureS.push(Math.round(moisture));
      nutritionS.push(Math.round(nutrition));
      const frac = Math.max(0, Math.min(1, (d - 1) / Math.max(1, days - 1)));
      yieldS.push(Math.round(baseYieldPerPlant * cfg.plants * cycleFactor * lightFactor * (health / 92) * Math.pow(frac, 1.6)));
    }
    const yieldG = yieldS[yieldS.length - 1] || 0;
    const potential = Math.round(baseYieldPerPlant * cfg.plants * cycleFactor * lightFactor);
    const yieldScore = potential ? Math.min(100, Math.round(yieldG / potential * 100)) : 0;
    const avgHealth = Math.round(healthS.reduce((a, b) => a + b, 0) / healthS.length);
    const healthScore = Math.max(0, Math.min(100, Math.round(avgHealth)));
    const stability = Math.max(0, Math.min(100, 100 - stressDays * 2.2 - tempPenalty * 3));
    const spentDaily = 4500 * (cfg.light / 18) + (strat.premium > 0 ? 1600 : strat.premium < 0 ? -250 : 650);
    const spent = Math.round(spentDaily * days + cfg.plants * 1200);
    const perGram = yieldG ? Math.round(spent / yieldG) : spent;
    const costScore = Math.max(0, Math.min(100, Math.round((2200 - perGram) / 16)));
    const score = Math.max(0, Math.min(100, Math.round(yieldScore * .4 + costScore * .2 + healthScore * .25 + stability * .15)));
    const grade = [...grades].reverse().find(item => score >= item.min) || grades[0];
    const format = value => Math.round(value).toLocaleString('es-AR');
    const activities = [
      { day: 1, phase: 'Siembra', title: 'Germinación y siembra', detail: `Hidratar sustrato, ${cfg.light} h luz, ${cfg.temp} °C media.`, done: true },
      { day: 3, phase: 'Plántula', title: 'Primer riego medido', detail: 'Riego por peso de maceta; evitar encharcar.', done: strat.waterAt >= 24 },
      { day: 12, phase: 'Crecimiento', title: 'Raíces y estructura', detail: 'Media dosis NPK; revisar distancia y PPFD.', done: true },
      { day: 18, phase: 'Crecimiento', title: 'Primer LST', detail: 'Apertura suave de canopia; registrar respuesta a 48 h.', done: strat.id !== 'minimal' },
      { day: 27, phase: 'Prefloración', title: 'Cambio a fórmula floración', detail: 'Bajar humedad hacia 58%; ajustar P/K.', done: true },
      { day: 37, phase: 'Floración', title: 'Floración y ventilación', detail: 'Rutina de ventilación y prevención de botritis.', done: !!strat.vent },
      { day: 44, phase: 'Floración', title: 'Defoliación selectiva', detail: 'Solo hojas que bloquean luz.', done: strat.id === 'intensive' },
      { day: 52, phase: 'Floración', title: 'Pico de demanda hídrica', detail: 'Consumo máximo; reponer reserva a tiempo.', done: strat.waterAt >= 22 },
      { day: 57, phase: 'Maduración', title: 'Tricomas y reducción', detail: 'Bajar riego y nutrición; preparar secado.', done: true },
      { day: 63, phase: 'Maduración', title: 'Control de botritis', detail: 'Revisar cogollos internos; subir ventilación.', done: !!strat.vent },
      { day: Math.min(days, Math.round(days * 0.9)), phase: 'Cosecha', title: `Corte · ${format(yieldG)} g`, detail: `${cfg.plants} plantas · ${format(perGram)} $/g · ${grade.label} (${score} pts).`, done: true },
      { day: days, phase: 'Curado', title: 'Secado y curado', detail: 'Secado lento 7–10 días; curado con aireación diaria.', done: true }
    ].filter(activity => activity.day <= days).sort((a, b) => a.day - b.day);
    const yieldPct = yieldS.map(value => potential ? Math.round(value / potential * 100) : 0);
    return { cfg, strain: st, strategy: strat, days, growth, health: healthS, moisture: moistureS, nutrition: nutritionS, yield: yieldS, yieldPct, yieldG, potential, spent, perGram, score, grade, activities, stressDays, stability };
  }

  return { normalizeConfig, seededRandom, simulateFull };
});

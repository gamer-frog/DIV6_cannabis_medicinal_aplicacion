(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.VerdeBackup = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  const FORMAT = 'verde-backup';
  const VERSION = 1;
  const MAX_FILE_BYTES = 50 * 1024 * 1024;

  function assertSafeTree(value, depth = 0, budget = { nodes: 200000 }) {
    if (depth > 80 || --budget.nodes < 0) throw new Error('El respaldo es demasiado complejo.');
    if (!value || typeof value !== 'object') return;
    for (const key of Object.keys(value)) {
      if (key === '__proto__' || key === 'prototype' || key === 'constructor') {
        throw new Error('El respaldo contiene campos no permitidos.');
      }
      assertSafeTree(value[key], depth + 1, budget);
    }
  }

  function safeLogMarkup(value) {
    return String(value ?? '').split(/(<\/?b>)/gi).map(part => {
      if (/^<\/?b>$/i.test(part)) return part.toLowerCase();
      return part.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
    }).join('');
  }

  function isFiniteNumber(value) {
    return typeof value === 'number' && Number.isFinite(value);
  }

  function validateRestoredData(data) {
    const gameNumbers = ['day', 'selected', 'water', 'nutrients', 'energy', 'cash', 'temp', 'humidity', 'light', 'harvested', 'harvestYield', 'spent'];
    for (const key of gameNumbers) {
      if (key in data.game && !isFiniteNumber(data.game[key])) throw new Error('El respaldo contiene valores inválidos.');
    }
    if (!Number.isSafeInteger(data.game.selected) || data.game.selected < 0 || data.game.selected >= data.game.plants.length) {
      throw new Error('El respaldo contiene una planta seleccionada inválida.');
    }
    for (const key of ['finished', 'archived', 'vented']) {
      if (key in data.game && typeof data.game[key] !== 'boolean') throw new Error('El respaldo contiene valores inválidos.');
    }
    for (const plant of data.game.plants) {
      for (const key of ['id', 'age', 'health', 'moisture', 'nutrition']) {
        if (!isFiniteNumber(plant[key])) throw new Error('El respaldo contiene plantas inválidas.');
      }
      if (typeof plant.alive !== 'boolean' || typeof plant.checked !== 'boolean') throw new Error('El respaldo contiene plantas inválidas.');
    }
    const validKinds = new Set(['', 'success', 'warning']);
    for (const entry of data.game.logs) {
      if (!entry || typeof entry !== 'object' || Array.isArray(entry) || !isFiniteNumber(entry.day) ||
          typeof entry.text !== 'string' || entry.text.length > 5000 || !validKinds.has(entry.kind ?? '')) {
        throw new Error('El respaldo contiene registros inválidos.');
      }
    }
    for (const resource of data.app.userResources) {
      if (!Number.isSafeInteger(resource.id) || resource.id < 1 ||
          !['markdown', 'procesado', 'pendiente'].includes(resource.state) ||
          !['title', 'diploma', 'module', 'code', 'path', 'summary', 'mdText'].every(key => typeof resource[key] === 'string') ||
          !['year', 'pages'].every(key => isFiniteNumber(resource[key])) ||
          !Array.isArray(resource.tags) || resource.tags.some(tag => typeof tag !== 'string')) {
        throw new Error('El respaldo contiene recursos inválidos.');
      }
    }
  }

  function createBackup(game, app, exportedAt = new Date().toISOString()) {
    const safeApp = {
      ...app,
      userResources: (Array.isArray(app?.userResources) ? app.userResources : []).map(resource => {
        const { pdfData, ...metadata } = resource;
        return { ...metadata, pdfStored: false };
      })
    };
    return {
      format: FORMAT,
      version: VERSION,
      exportedAt,
      pdfsIncluded: false,
      data: { game, app: safeApp }
    };
  }

  function parseBackup(text) {
    if (typeof text !== 'string' || text.length > MAX_FILE_BYTES) {
      throw new Error('El archivo supera el tamaño máximo de 50 MB.');
    }
    let backup;
    try { backup = JSON.parse(text); }
    catch { throw new Error('El archivo no contiene un JSON válido.'); }

    assertSafeTree(backup);
    if (!backup || backup.format !== FORMAT || backup.version !== VERSION || backup.pdfsIncluded !== false) {
      throw new Error('El formato del respaldo no es compatible.');
    }
    const data = backup.data;
    if (!data || !data.game || typeof data.game !== 'object' || Array.isArray(data.game) ||
        !Array.isArray(data.game.plants) || data.game.plants.length === 0 || data.game.plants.length > 100 ||
        !Array.isArray(data.game.logs) || data.game.logs.length > 10000 ||
        !data.app || typeof data.app !== 'object' || Array.isArray(data.app) ||
        !data.app.budget || typeof data.app.budget !== 'object' || Array.isArray(data.app.budget) ||
        !Array.isArray(data.app.userResources) || data.app.userResources.length > 5000) {
      throw new Error('El respaldo está incompleto o tiene una estructura inválida.');
    }
    if (data.game.plants.some(plant => !plant || typeof plant !== 'object' || Array.isArray(plant)) ||
        data.app.userResources.some(resource => !resource || typeof resource !== 'object' || Array.isArray(resource))) {
      throw new Error('El respaldo contiene registros inválidos.');
    }
    validateRestoredData(data);
    data.app.userResources = data.app.userResources.map(resource => {
      const { pdfData, ...metadata } = resource;
      return { ...metadata, pdfStored: false };
    });
    data.app.readingPaths = (Array.isArray(data.app.readingPaths) ? data.app.readingPaths : [])
      .filter(path => path && typeof path === 'object' && !Array.isArray(path) &&
        Number.isSafeInteger(path.id) && path.id >= 0 && typeof path.tag === 'string' &&
        Array.isArray(path.ids) && typeof path.at === 'string')
      .slice(0, 12)
      .map(path => ({
        id: path.id,
        tag: path.tag.slice(0, 40),
        ids: path.ids.filter(id => Number.isSafeInteger(id) && id > 0).slice(0, 8),
        at: path.at.slice(0, 200)
      }));
    return data;
  }

  return { createBackup, parseBackup, safeLogMarkup, MAX_FILE_BYTES };
});

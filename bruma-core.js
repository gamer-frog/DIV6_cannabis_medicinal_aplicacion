(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.BrumaCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const PLANTS = [
    { name: 'Hoja', icon: '☘️' },
    { name: 'Flor', icon: '🌼' },
    { name: 'Brote', icon: '🌱' },
    { name: 'Honguito', icon: '🍄' },
    { name: 'Limón', icon: '🍋' },
    { name: 'Lavanda', icon: '🪻' },
    { name: 'Semilla', icon: '🌰' },
    { name: 'Sol', icon: '☀️' }
  ];

  function makeDeck(round, random) {
    const level = Math.max(1, Math.min(3, Math.floor(Number(round) || 1)));
    const source = random || Math.random;
    const cards = PLANTS.slice(0, level + 3).flatMap((plant, index) => [
      { id: `${level}-${index}-a`, pair: index, ...plant, revealed: false, matched: false },
      { id: `${level}-${index}-b`, pair: index, ...plant, revealed: false, matched: false }
    ]);
    for (let i = cards.length - 1; i > 0; i -= 1) {
      const j = Math.floor(source() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }

  function scoreMatch(score, isMatch) {
    return Math.max(0, score + (isMatch ? 100 : -10));
  }

  return Object.freeze({ makeDeck, scoreMatch, roundCount: 3 });
});

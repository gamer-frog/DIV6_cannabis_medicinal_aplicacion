'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { makeDeck, scoreMatch, roundCount } = require('../bruma-core.js');

test('crea barajas completas para las tres rondas', () => {
  for (let round = 1; round <= roundCount; round += 1) {
    const deck = makeDeck(round, () => 0.5);
    assert.equal(deck.length, (round + 3) * 2);
    assert.equal(new Set(deck.map((card) => card.id)).size, deck.length);
    assert.equal(new Set(deck.map((card) => card.pair)).size, round + 3);
    for (let pair = 0; pair < round + 3; pair += 1) {
      const pairCards = deck.filter((card) => card.pair === pair);
      assert.equal(pairCards.length, 2);
      for (const card of pairCards) {
        assert.equal(card.revealed, false);
        assert.equal(card.matched, false);
      }
    }
  }
});

test('limita el nivel a una ronda válida y mezcla respetando las parejas', () => {
  assert.equal(makeDeck(0).length, 8);
  assert.equal(makeDeck(99).length, 12);
  const deck = makeDeck(2, () => 0.25);
  assert.equal(deck.length, 10);
  assert.deepEqual(deck.map((card) => card.pair).sort(), [0, 0, 1, 1, 2, 2, 3, 3, 4, 4]);
});

test('suma aciertos y penaliza errores sin bajar de cero', () => {
  assert.equal(scoreMatch(0, true), 100);
  assert.equal(scoreMatch(250, true), 350);
  assert.equal(scoreMatch(100, false), 90);
  assert.equal(scoreMatch(0, false), 0);
});

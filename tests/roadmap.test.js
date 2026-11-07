const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const assert = require('node:assert/strict');

const source = readFileSync(path.join(__dirname, '..', 'roadmap.js'), 'utf8');
const window = {};
vm.runInNewContext(source, { window });
const roadmap = window.ROADMAP;
const items = roadmap.streams.flatMap(stream => stream.items);

const equalAcrossRealms = (actual, expected) => assert.deepEqual(JSON.parse(JSON.stringify(actual)), expected);

test('los conteos publicados del roadmap coinciden con los hitos reales', () => {
  const counts = Object.fromEntries(['done', 'now', 'next', 'later'].map(status => [
    status,
    items.filter(item => item.status === status).length
  ]));

  assert.equal(roadmap.streams.length, 14);
  assert.equal(items.length, 221);
  equalAcrossRealms(counts, { done: 63, now: 27, next: 65, later: 66 });
});

test('cada hito tiene estado y horizonte válidos', () => {
  const statuses = new Set(['done', 'now', 'next', 'later']);
  const horizons = new Set(roadmap.horizons.map(horizon => horizon.id));

  for (const item of items) {
    assert.ok(statuses.has(item.status), `Estado inválido en: ${item.t}`);
    assert.ok(horizons.has(item.horizon), `Horizonte inválido en: ${item.t}`);
    assert.ok(item.t && item.note, `Hito sin título o nota: ${JSON.stringify(item)}`);
  }
});

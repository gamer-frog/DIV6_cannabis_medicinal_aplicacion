'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const stylesheets = ['verde-v3.css', 'bruma-botanica.css'];
const requiredDeclarations = [
  'scroll-behavior:auto!important',
  'animation-duration:.01ms!important',
  'animation-iteration-count:1!important',
  'transition-duration:.01ms!important'
];

test('Verde y Bruma respetan la preferencia de movimiento reducido', () => {
  for (const stylesheet of stylesheets) {
    const source = fs.readFileSync(path.join(__dirname, '..', stylesheet), 'utf8');
    const compact = source.replace(/\s+/g, '').toLowerCase();
    const mediaQuery = '@media(prefers-reduced-motion:reduce)';
    const queryIndex = compact.indexOf(mediaQuery);

    assert.notEqual(queryIndex, -1, `${stylesheet} debe declarar la media query`);

    const blockStart = compact.indexOf('{', queryIndex + mediaQuery.length);
    const blockEnd = compact.indexOf('}', blockStart + 1);
    const declarations = compact.slice(blockStart + 1, blockEnd);

    for (const declaration of requiredDeclarations) {
      assert.ok(declarations.includes(declaration), `${stylesheet} debe incluir ${declaration}`);
    }
  }
});

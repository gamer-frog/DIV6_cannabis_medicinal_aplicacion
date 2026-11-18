'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('la app expone búsqueda y navegación móvil accesibles', () => {
  const html = read('index.html');
  const game = read('game.js');

  assert.match(html, /viewport-fit=cover/, 'el viewport debe cubrir el área segura');
  assert.match(html, /id="mobileSearchBtn"/, 'debe existir un buscador en la barra móvil');
  assert.match(html, /id="sheetSearchBtn"/, 'la hoja Más debe ofrecer búsqueda');
  assert.match(html, />Biblioteca<\/button>/, 'la navegación inferior debe nombrar Biblioteca completa');
  assert.match(html, /id="sheetBackdrop"/, 'la hoja Más debe poder cerrarse tocando fuera');
  assert.match(game, /mobileSearchBtn/, 'el buscador móvil debe estar conectado');
  assert.match(game, /function openMoreSheet/, 'la hoja Más debe tener apertura controlada');
  assert.match(game, /function closeMoreSheet/, 'la hoja Más debe tener cierre controlado');
  assert.match(game, /directMobileTab/, 'la pestaña Más debe reflejar las vistas secundarias');
});

test('los estilos móviles evitan desbordes y zooms de iOS', () => {
  const css = read('verde-v3.css').replace(/\s+/g, '');

  assert.ok(css.includes('@media(max-width:960px)'), 'debe existir la capa móvil');
  assert.ok(css.includes('.lib-mode{min-width:0'), 'las pestañas de biblioteca no deben desbordar');
  assert.ok(css.includes('.rd-actions{display:grid'), 'las acciones del detalle deben envolverse');
  assert.ok(css.includes('input,select,textarea{font-size:16px!important}'), 'los campos deben evitar el zoom de iOS');
  assert.ok(css.includes('min-height:50px'), 'la navegación inferior debe ser cómoda al tacto');
  assert.ok(css.includes('env(safe-area-inset-bottom)'), 'la navegación debe respetar el área segura');
  assert.ok(css.includes('.task{align-items:center;min-height:44px'), 'las tareas deben tener objetivo táctil amplio');
});

test('el service worker entrega la app actualizada al abrirla', () => {
  const sw = read('sw.js');
  const html = read('index.html');

  assert.match(sw, /request\.mode === 'navigate'/, 'la navegación debe pedir red primero');
  assert.match(sw, /caches\.match\('\.\/index\.html'\)/, 'debe quedar respaldo offline');
  assert.match(sw, /verde-v5\.1/, 'la versión de caché debe invalidar la anterior');
  assert.ok(!/\?v=45/.test(html), 'los assets no deben quedar en la versión anterior');
  assert.match(html, /\?v=46/, 'los assets deben usar la versión nueva');
});

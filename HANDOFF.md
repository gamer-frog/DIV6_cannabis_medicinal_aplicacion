# HANDOFF

## Cierre — movimiento reducido (2026-11-08)
- Hito «Preferencia de movimiento reducido» marcado como hecho en `roadmap.js`; el README refleja los conteos de estados del archivo: 63 hechos, 23 en curso, 70 próximos y 66 de visión.
- Chromium confirmó `prefers-reduced-motion: reduce` en Verde y Bruma botánica: `scroll-behavior: auto`, transiciones de `1e-05s` y, en Bruma, animación de `1e-05s` con una iteración. Ambas páginas cargaron completas sin errores de consola ni de red.
- Capturas inspeccionadas: `/tmp/opencode/reduced-motion-verde.jpg` y `/tmp/opencode/reduced-motion-bruma.jpg`. No hizo falta corregir CSS.
- `node --test` pasó 25/25; `node --check oracle-core.js`, `node --check game.js` y `git diff --check` pasaron. El cambio se aisló en un único commit sobre `origin/main`, sin los commits de metadatos/checkpoint de la rama original. En el worktree aislado, Chromium con `prefers-reduced-motion: reduce` confirmó ambas rutas completas, `scroll-behavior: auto`, transiciones/animaciones de `1e-05s`, HTTP 200 y consola/red limpias. Publicación fast-forward pendiente.

## Cierre — 2026-11-08
- Pedido [A] terminado: “Bruma botánica”, mini-juego independiente enlazado desde Inicio, con tres rondas, marcador, cronómetro, reinicio, victoria y controles de teclado accesibles. Chromium desktop y móvil (390 px) verificados; capturas JPEG inspeccionadas: `/tmp/opencode/bruma-victoria.jpg` y `/tmp/opencode/bruma-movil.jpg`.
- Hito H0 del Oráculo terminado: la búsqueda léxica usa límites de palabra, filtra recursos no relacionados y responde que no encontró recursos pertinentes cuando no hay coincidencias, sin adjuntar fuentes arbitrarias. El comportamiento no se presenta como medición de alucinaciones; una coincidencia léxica tampoco prueba que el recurso respalde la respuesta.
- La primera prueba visual agotó el timeout porque esperaba el título literal “Riego: menos es más”, que no forma parte del texto emitido. La comprobación directa confirmó que «¿Cómo afecta el riego?» sí muestra la respuesta esperada y sus tres recursos.
- Verificación final del Oráculo: `node --test` pasó 25/25; `node --check oracle-core.js`, `node --check game.js` y `git diff --check` pasaron. Chromium desktop: consultas sin coincidencias (0 fuentes), respuesta de riego (3 fuentes) y fallback léxico de «prevención» (2 fuentes), sin errores de consola/red. Capturas JPEG inspeccionadas: `/tmp/opencode/oraculo-sin-coincidencias.jpg`, `/tmp/opencode/oraculo-coincidencia.jpg` y `/tmp/opencode/oraculo-fallback-lexico.jpg`.
- Cambios H0: `oracle-core.js`, `tests/oracle-core.test.js`, `game.js`, `index.html`, `sw.js`, `roadmap.js` y README; el roadmap marca el modo «no sé» como hecho y la documentación aclara el límite de las referencias léxicas.
- Baseline de esta tarea: `HEAD` = `origin/main` = `d8c2e44`; `save-000` disponible. Rama de trabajo `opencode/42488451146`. `gh auth status` informa que no hay sesión autenticada; por eso no se pudieron comentar ni cerrar issues. El censo anterior registró 8 abiertos (7 excluyendo el issue #8); requiere autenticación para volver a evaluarlo y mantenerlos.

## Próximo
- Sin tareas de código pendientes. Reanudar con nuevos pedidos; si se solicita mantenimiento de issues, autenticar GitHub CLI y reevaluar el censo antes de actuar.

## Riesgos
- El push a `main` debe ser fast-forward; nunca forzar. La autenticación de GitHub CLI no está disponible en este entorno.
- Las referencias del fallback son coincidencias léxicas con recursos, no evidencia verificada del contenido de esos recursos.

# TODO Y BLOQUEOS
*Regla: máximo 3 intentos por ítem. Si falla 3 veces, se marca "REQUIERE HUMANO" y se salta.*

## Cola autónoma (P0 → P2)

- [x] **P0 · Experiencia móvil v5** — buscador accesible, hoja "Más" con backdrop, navegación inferior cómoda, título de sección, tipografía legible, campos de 16 px (sin zoom en iOS), safe areas, detalle de biblioteca y tareas táctiles. Verificado en 390×844, 320×640, 768×1024 y 1440×900.
- [ ] **P1 · Revisión en dispositivo real** — abrir la app instalada desde el celu, comprobar que la barra inferior no tapa contenido, que el teclado no rompe el buscador y que el caché del service worker entrega la versión nueva al abrir.
- [ ] **P1 · Modo horizontal del teléfono** — revisar 844×390 en panel, simulador y biblioteca; ajustar alto de la barra superior y del chat si algo queda cortado.
- [ ] **P2 · Instalación PWA** — comprobar "Agregar a pantalla de inicio" en iOS/Android, splash, ícono y arranque standalone.
- [ ] **P2 · Accesibilidad móvil** — revisar contraste de textos secundarios y foco visible al recorrer con teclado externo.

## Completado

- [x] Revisar `origin/opencode-checkpoints/*`, `origin/opencode-resume/*` y `origin/opencode-deployments/*` contra `HEAD`. Resultado: historial completo (`git rev-parse --is-shallow-repository` = `false`); `origin/opencode-checkpoints/2` y `/7` no tenían commits exclusivos frente a `HEAD` y se eliminaron por pedido explícito. Se preservan las demás refs con commits únicos; no se fusionó ninguna rama.
- [x] Reconciliar `origin/main` con el branch de trabajo sin descartar el código local; el workflow de plataforma queda del lado de `main` y el proyecto conserva sus documentos y defensas.

## Requiere humano
- Ninguno por ahora.

PROTOCOLO DE TRABAJO OBLIGATORIO
1. NUNCA hagas git merge a ciegas de branches anteriores.
2. SIEMPRE reconstruí los cambios leyendo y entendiendo el código.
3. SIEMPRE verificá en el navegador antes de pushear.
4. SIEMPRE usá código defensivo: obj?.prop ?? default.
5. PUSHEÁ A MAIN después de cada subtarea verificada.
6. Creá los archivos vacíos: HANDOFF.md, ROADMAP.md, TODO.md, USER_REQUESTS.md, CEMETERY.md.
7. Commiteá y pusheá: git add /00_cerebro_loop && git commit -m "chore: inicializar cerebro" && git push origin HEAD:main.

## Plantillas del cerebro
Al crear o actualizar estos archivos, conservá sus secciones y su formato; usá datos reales del proyecto en lugar de dejar ejemplos genéricos:
- `ROADMAP.md`: título `# ROADMAP DEL PROYECTO`, leyenda `[x]` completado / `[~]` en progreso / `[ ]` pendiente, y secciones `## 🚀 Funcionalidades Principales`, `## 🛠️ Deuda Técnica y Mantenimiento (Tareas [C])` y `## 🐛 Bugs Conocidos`.
- `TODO.md`: título `# TODO Y BLOQUEOS`, regla de máximo tres intentos por ítem y registro de intentos fallidos; al tercer fallo, marcar `REQUIERE HUMANO` y saltar el ítem.
- `HANDOFF.md`: título `# HANDOFF (Estado Actual)` y campos para última acción completada, estado del build/navegador, decisiones de diseño tomadas y próximo paso inmediato.
- `GAUNTLET_LOOP_INFINITO.md`: preservar el prompt reutilizable y su guía de uso. Guardarlo no inicia el loop; `AGENTS.md` prevalece si hay diferencias.

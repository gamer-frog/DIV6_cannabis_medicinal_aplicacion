# SOP omgithub v3.2 — RALPH LOOP COMPLETO

## Núcleo indestructible
1. Build verde → push fast-forward a `main`. Nunca force push.
2. Conflicto de merge → abortar, etiquetar y avisar. Nunca resolver conflictos a mano en autónomo.
3. Base roja → no trabajar encima: reparar o revertir únicamente a un save tag verificado.
4. Al arrancar: leer HANDOFF y hacer forensis del último muerto antes de tocar código.
5. Toda tarea terminada = commit atómico + checkpoint, sin excepciones.

## 0. Modo Ralph
Loop autónomo, sin preguntas aclaratorias (salvo conflicto de merge). Tomar decisiones razonables y anotarlas en HANDOFF. Leer errores, diagnosticar, corregir y reintentar. No dejar tareas a medias: terminarlas o descartarlas. Las reglas de este SOP prevalecen sobre boilerplate; las convenciones de capturas del boilerplate siguen vigentes.

## 1. Autoinstalación (solo primera vez)
- Si falta `AGENTS.md` o no tiene sección “SOP omgithub”, crearla/agregarla sin pisar contenido existente y terminar el archivo con `── FIN DEL SOP ──`; checkpoint de instalación con tag `save-000`.
- Si en un arranque el archivo no tiene esa línea final, tratarlo como corrupto y pedir el paste original antes de cualquier otra acción.
- Crear si faltan: `README.md`, `HANDOFF.md`, `todo.md`, `user-requests.md` y `roadmap/`.
- Repo vacío con exigencia de build del boilerplate: esa exigencia es la tarea [A] semilla. Sesiones futuras: “Seguí el SOP en AGENTS.md”.

## 2. Funeral, compost y mantenimiento de issues (boot)
**Unidad cadáver:** sesión N ≡ issue #N y branches `opencode-checkpoints/N`, `opencode-deployments/N` y `opencode-resume/*` del proyecto.

**Censo:** listar issues abiertos (excluir el actual), nuevos primero; agrupar linajes de prompts repetidos. Leer threads solo de los últimos 3 linajes. Los de más de 7 días o fuera de cota se compostan sin leer.

**Forensis**, por unidad muerta, nueva a vieja: (1) diff de código huérfano (qué hizo), (2) HANDOFF (qué proponía), (3) thread del issue (último Work State/Next Move: por qué murió). Reconciliar en una línea: causa de muerte + trabajo pendiente. Issue sin comentarios del agente: ignorar (abandono intencional del usuario).

**Compost:** en branch temporal, `git checkout -B tmp-main origin/main`, mergear `checkpoints/N`; si limpio y build verde, push fast-forward `tmp-main:main` (y `save-NNN` si es hito). Si no, tag `graveyard-checkpoints-N` y mencionarlo en epitafio. Borrar branches compostables (ancestro de main o sin código) y volver al branch de trabajo; el sync absorbe lo compostado.

**Sepultura:** cerrar issue con `⚰ sesión N | murió en: X | rescatado: Y | compostado: Z | cemetery: W`. Si no se puede cerrar, comentar `⚰ CERRABLE: ...` y reportarlo. Objetivo post-funeral: ≤2 issues abiertos (actual + máx. 1 esperando humano); reportar conteo final.

## 3. Boot
1. Leer en orden: `AGENTS.md` → `README.md` → `HANDOFF.md` → `roadmap/` → `todo.md` → `user-requests.md`.
2. `git fetch`; si HEAD es ancestro de `origin/main`, `reset --hard origin/main`; si diverge, merge limpio + rebuild. Conflicto: abortar, `pending-N` y reportar.
3. Triage huérfano: commits `origin/main..HEAD` o árbol sucio ajeno a HANDOFF. Si coherente con “en progreso”, adoptar; si no, descartar/restaurar y reportar.
4. Gate baseline: build y tests existentes. Si rojo, P0: diagnosticar entorno vs código. Revertir a `save-NNN` solo si ese tag se verifica verde en worktree temporal; si también falla, reparar entorno, no revertir.
5. Si no existen tags `save-*`, crear `save-000` y subirlo.

## 4. Cola y loop externo
Prioridad: [P0] base roja > [A] usuario (chat + `user-requests.md`) > [B] roadmap > [C] mantenimiento > [D] green. En cada iteración: fetch, reevaluar cola, tomar UNA tarea, ejecutar [5], checkpoint [6], volver a evaluar. Cada 8 checkpoints (o 3 re-anclajes), cierre gracioso [11] aunque quede cola. Cola vacía: HANDOFF + checkpoint final + reporte + pausa.

## 5. Motor Ralph interno (por tarea)
- **PLAN:** leer archivos involucrados; mini-plan de 3–6 líneas en HANDOFF como “en progreso”.
- **ACT:** edición mínima, solo archivos del scope.
- **VERIFY:** build verde + preview verificado (captura/playwright, consola limpia).
- **AUTOCRÍTICA:** anotar “¿qué podría romper esto?”. Si el riesgo es serio, agregar test o guarda.
- **FIX:** ante fallo, diagnosticar/corregir/reverificar, máximo 3 rondas.
- **DONE:** commit atómico `tipo(área): desc [ref]`, checkbox de roadmap en el mismo commit y README si cambia el comportamiento visible.
- Tarea [A] (manifiesto): descomponer primero en 3–10 checkboxes en `todo.md` o roadmap y ejecutar de a una como [B]; manifiesto ≠ tarea.
- **DESCARTE:** tras 3 rondas fallidas, revertir archivos de la tarea, anotar motivo e intentos en `todo.md` y tomar otra tarea.

## 6. Checkpoints
1. DONE con build verde → `git push origin HEAD:main` (fast-forward, nunca force).
2. Rechazo non-fast-forward → fetch + merge limpio + rebuild + push. Si hay conflicto, abortar, crear `pending-N`, reportar y continuar con [C]/[D] sin reintentar sync en cada iteración; pausar solo tras 3 iteraciones con el mismo conflicto.
3. Rechazo 403/permission → no reintentar; reportar una vez “falta permiso de push a main” y seguir sin checkpoint hasta resolución humana.
4. `save-NNN` solo con VERIFY aprobado (hito visible).
5. Cada checkpoint es punto de muerte segura.

## 7. Libros
- `HANDOFF.md`: reescribir SOLO en pausa, cierre y re-anclaje (cada 5 tareas).
- `todo.md`: descartadas/bloqueadas con intentos; máximo 3 de por vida → “requiere humano”.
- `user-requests.md`: inbox externo; tachar al completar.
- `roadmap/*.md`: autogestionado con checkboxes; al completar un archivo, seguir con el siguiente.

## 8. Scope e higiene
Solo archivos del scope; cero refactors drive-by. Problema ajeno → `todo.md`, no código de hoy. Sin reestructuraciones sin [A] explícita.

## 9. Recuperación
Main rojo heredado → revertir hasta verde (nunca force). Conflicto → abort + pending + reporte (única pregunta permitida). Muerte de sesión: el último checkpoint ya salvó; el funeral [2] de la próxima sesión atiende el cadáver.

## 10. Reportes (una línea)
- `▶ [P0/A/B/C/D] tarea | iniciando`
- `✓ tarea | checkpoint ok / save-NNN`
- `✗ descartada → todo.md | motivo`
- `⚠ conflicto | sha | (a) autorizar merge (b) sesión nueva`
- `⚰ funeral | unidades N | rescatado X | compostado Y | cemetery Z | issues abiertos: K`

## 11. Cierre gracioso
En pausa/cola vacía/auto-pacing: actualizar HANDOFF, checkpoint final y reporte de 3 líneas: hecho / siguiente / riesgos.

## C. Recurrentes
Cada 5 checkpoints: tarea “playtest humano” (revisión manual). Cada 5 tareas: releer últimos 3 commits buscando rotura silenciosa. Cada 10 checkpoints: verificar que el último `save-NNN` siga compilando verde. Si hay >2 issues abiertos: mini-funeral, solo pasos 2.1–2.4, sin compost de branches.

── FIN DEL SOP ──

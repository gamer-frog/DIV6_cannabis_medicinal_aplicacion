# PROTOCOLO DE TRABAJO OBLIGATORIO (RALPH LOOP)

## MODO AUTÓNOMO (AUTORIZACIÓN PERMANENTE)

El usuario autorizó explícitamente que el agente trabaje solo, complete tareas y **publique en `main` sin pedir aprobación en cada cambio**. Esta autorización es permanente para este repositorio y se aplica mientras se cumplan las reglas de verificación de este documento.

Ciclo obligatorio en cada sesión:

1. **Leer el estado**: abrí `00_cerebro_loop/HANDOFF.md` y `00_cerebro_loop/TODO.md` antes de tocar código.
2. **Elegir el siguiente ítem** de la cola de `TODO.md` (prioridad P0 → P1 → P2). Si no hay cola, proponé y agregá tareas concretas.
3. **Implementar** el cambio mínimo completo, respetando el estilo y sin romper funciones existentes.
4. **Verificar**: pruebas, sintaxis, navegador y consola. Sin errores rojos no hay push.
5. **Commit y push a `main`** cuando el cambio esté verde y el push sea fast-forward (ver reglas 5 y la sección de verificación).
6. **Actualizar el estado**: marcá el ítem en `TODO.md`, reescribí `HANDOFF.md` con la última acción, el estado del build, las decisiones y el próximo paso inmediato.
7. **Continuar** con el siguiente ítem de la cola salvo que el usuario pida detenerse o aparezca un bloqueo que requiera una decisión humana.

**No hace falta preguntar "¿puedo publicar?"**: la autorización ya está dada. Sí hay que detenerse y registrar el bloqueo si una verificación falla, si hay que elegir entre alternativas de producto, o si la operación pedida destruiría trabajo sin respaldo.


## REGLAS INQUEBRANTABLES

1. **NUNCA hagas `git merge` a ciegas de branches anteriores** (`opencode-checkpoints`, `opencode-resume`). Eso introduce errores de runtime como `TypeError: Cannot read properties of undefined`.

2. **SIEMPRE reconstruí los cambios leyendo el código** e implementándolo de forma compatible en tu branch actual. Si una branch anterior cambió un nombre de campo (ej: `type` → `characterType`), actualizá TODOS los usos.

3. **BUILD VERDE NO ES SUFICIENTE. SIEMPRE verificá en el navegador.**
   - Ejecutá: `playwright-cli open http://localhost:3002`
   - Abrí la consola del desarrollador
   - Si hay errores rojos → NO pushees

4. **Si ves en consola: `TypeError: Cannot read properties of undefined (reading 'type')`**, DETENETE. Es un error de estado.
   - Buscá en el código accesos a `.type` sin verificar y corregí la causa con una guardia apropiada.
   - No uses `git reset --hard` ni descartes cambios locales sin autorización explícita y sin verificar antes que exista un respaldo recuperable.

5. **Publicá de forma autónoma cuando el cambio esté verificado.**
   - Revisá cambios staged, unstaged, nuevos, eliminados y renombrados; incluí únicamente archivos del alcance de la tarea, nunca `git add .` a ciegas.
   - Verificá pruebas, sintaxis y navegador cuando corresponda, y que `HEAD` pueda actualizar `main` por fast-forward.
   - Commiteá y pusheá a `main` sin pedir aprobación por cambio: la autorización del usuario es permanente (ver MODO AUTÓNOMO).
   - Si el push es rechazado o `main` avanzó, integrá `origin/main` con `git merge` preservando el código local; **nunca** uses `--force` ni `reset --hard`.
   - Si una verificación falla, no publiques: preservá los cambios, registrá el bloqueo en `HANDOFF.md`/`TODO.md` y seguí con otra tarea.
   - Hitos visibles pueden etiquetarse como `save-NNN`, con la misma verificación previa.

6. **IGNORÁ POR COMPLETO `gh` (GitHub CLI).** Usá solo comandos `git`. No te detengas por errores de autenticación de `gh`.

7. **CÓDIGO DEFENSIVO OBLIGATORIO:**
   - NUNCA accedas a `obj.prop` sin verificar
   - SIEMPRE usá: `obj?.prop ?? default` o `if (!obj) return null;`
   - Si cambiás un nombre de campo, actualizá TODOS los usos en el mismo commit

## VERIFICACIÓN ANTES DE CADA PUSH

Antes de hacer `git push origin HEAD:main`:
1. Revisá el diff completo y confirmá que coincide con el alcance de la tarea (sin archivos ajenos, secretos ni artefactos).
2. Ejecutá la app en el navegador y revisá la consola para cualquier cambio de código.
3. Ejecutá las pruebas y comprobaciones pertinentes; confirmá que no hay errores rojos ni TypeErrors.
4. Para cambios de interfaz, verificá como mínimo **390×844** y **320×640** (sin desborde horizontal), además de escritorio **1440×900**.
5. Hacé `git fetch origin` y confirmá que el push será fast-forward y que no sobrescribe trabajo remoto.
6. Publicá con `git push origin HEAD:main`; si falla cualquiera de estas condiciones, detenete, preservá los cambios y registrá el bloqueo.
7. Después del push, actualizá `HANDOFF.md` y `TODO.md` con el commit publicado y el próximo paso.

## DEFINICIÓN DE TERMINADO

Una tarea está terminada solo si:
- El código quedó implementado y sin errores de sintaxis.
- Las pruebas pasan (`node --test`).
- La app abre sin errores ni warnings en consola.
- La vista afectada se probó en móvil y escritorio, sin desbordes ni controles inaccesibles.
- El cambio está en `main` y el estado quedó registrado en `HANDOFF.md`/`TODO.md`.

## GESTIÓN DE RAMAS ANTERIORES

Si existen branches `opencode-checkpoints/*` o `opencode-resume/*`:
- **NO las mergees a ciegas**
- Revisá qué cambios tienen: `git diff main..origin/opencode-checkpoints/N`
- Leé el código y entendé qué hace
- Reconstruí los cambios de forma compatible en tu branch actual
- Verificá en el navegador
- Si funciona, registrá el resultado y aplicá la regla 5 antes de cualquier publicación
- Si NO funciona → documentalo en TODO.md y saltalo
- No borres ramas remotas por antigüedad o divergencia. Preservá las que tengan commits exclusivos o cuyo contenido/abandono no esté confirmado. La eliminación requiere comprobar que no queda trabajo único sin preservar y contar con autorización explícita.

## 📋 DICCIONARIO DE EMOJIS (COMUNICACIÓN OBLIGATORIA)

**USÁ ESTOS EMOJIS EXACTOS EN TODOS TUS REPORTES. NO INVENTES OTROS.**

### Estados de Tareas
- 🚀 **Iniciando tarea** → `🚀 [P0/A/B/C/D] Tarea X | Comenzando`
- ✅ **Tarea completada exitosamente** → `✅ Tarea X | Navegador limpio | Push a main completado`
- ⚠️ **Advertencia o problema menor** → `⚠️ Tarea X | Problema menor | Continuando`
- ❌ **Tarea falló** → `❌ Tarea X falló (3 intentos) | Movida a TODO.md | Continuando`
- 🔄 **Reintentando** → `🔄 Tarea X | Intento N/3 | [motivo del reintento]`

### Estados del Sistema
- 🟢 **Navegador/Build verde** → `🟢 Navegador limpio | Sin errores`
- 🔴 **Navegador/Build rojo** → `🔴 Navegador con errores | [detalle del error]`
- 🛑 **Detenido por emergencia** → `🛑 DETENIDO | [motivo] | Requiere intervención`

### Estados de Git
- 📤 **Push exitoso** → `📤 Push a main completado | Commit: [hash]`
- 🏷️ **Tag creado** → `🏷️ Tag save-NNN creado | Commit: [hash]`
- 🔀 **Merge/Reconstrucción** → `🔀 Reconstruyendo cambios de branch X | Estado: [progreso]`
- 🗑️ **Branch eliminada** → `🗑️ Branch X eliminada del remoto`

### Estados del Cerebro
- 🧠 **Cerebro actualizado** → `🧠 HANDOFF.md actualizado | Próximo paso: [descripción]`
- 📝 **Archivo creado/modificado** → `📝 [archivo] creado/modificado | Contenido: [resumen]`

### Estados de Nacimiento
- 🏗️ **Infraestructura creada** → `🏗️ [componente] creado | Estado: [OK/Error]`
- 🎯 **Fundación completada** → `🎯 FUNDACIÓN COMPLETADA | Cerebro listo | Main actualizado`

### Estados de Rescate
- 🔍 **Analizando branch** → `🔍 Analizando branch X | Cambios: [descripción]`
- 🛠️ **Reconstruyendo código** → `🛠️ Reconstruyendo cambios de X | Progreso: [N/M archivos]`
- 💾 **Código rescatado** → `💾 Código de branch X rescatado | Push a main: [OK/Error]`

### Estados de Error
- 🐛 **Bug detectado** → `🐛 Bug detectado: [descripción] | Archivo: [ruta]`
- 💥 **TypeError** → `💥 TypeError: [detalle] | Acción: [revertir/arreglar]`
- 🚨 **Error crítico** → `🚨 ERROR CRÍTICO: [descripción] | Deteniendo loop`

### Formato de Reporte Completo
🚀 [C] Revisar optional chaining | Comenzando
🔍 Analizando archivos: game.js, dist/game.js
🛠️ Agregando ?. en 15 accesos
🟢 Navegador limpio | Sin errores
📤 Push a main completado | Commit: abc1234
🧠 HANDOFF.md actualizado | Próximo paso: Siguiente tarea del roadmap
✅ [C] Revisar optional chaining | Completado | 15 fixes aplicados

**REGLA: Usá SIEMPRE el mismo emoji para el mismo estado. No mezcles emojis. No inventes nuevos.**

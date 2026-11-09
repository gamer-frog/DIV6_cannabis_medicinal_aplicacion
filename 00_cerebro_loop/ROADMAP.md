# ROADMAP DEL PROYECTO
*Marcar con [x] lo completado, [~] en progreso, [ ] pendiente.*

## 🚀 Funcionalidades Principales
- [x] Boot del cerebro y recuperación del protocolo: `00_cerebro_loop/PROTOCOL.md` creado y los cinco archivos del cerebro preservados.
- [x] Verificación de la app en navegador antes del push: carga local limpia en Chromium con `<main>` presente y sin errores de consola.
- [x] Cobertura de movimiento reducido para Verde y Bruma: `node --test` pasa 26/26 y la verificación de ambas rutas en navegador está registrada.
- [x] Corrección del warning de Chromium: meta `mobile-web-app-capable` aplicada y verificaciones Node/HTML confirmadas.
- [x] Guardar el prompt reutilizable «GAUNTLET LOOP INFINITO v1.0», su guía de uso y el propósito del loop en `00_cerebro_loop/GAUNTLET_LOOP_INFINITO.md`, sin iniciar cambios de producto.
- [x] Contrastar las plantillas solicitadas del Cerebro con los archivos existentes y documentar su formato en `PROTOCOL.md`, preservando el contenido real del proyecto.

## 🛠️ Deuda Técnica y Mantenimiento (Tareas [C])
- [x] Sincronizar la rama de trabajo con `origin/main` por fast-forward y mantener el historial limpio de publicación.
- [x] Revisar accesos sensibles y no destructivos a archivos/estado; no se hicieron fusiones a ciegas.
- [x] Eliminar ruido de verificación local y mantener la consola de navegador sin warnings de página.
- [x] Revaluar la limpieza de ramas remotas: las checkpoint/2 y /7 son ancestros de `origin/main`; las demás examinadas conservan commits exclusivos. No hay evidencia verificable para fusionar o borrar las divergentes, que se preservan.

## 🐛 Bugs Conocidos
- [ ] Ramas divergentes remotas: `checkpoints`/`resume` contienen commits exclusivos y no se confirmó su abandono; se mantienen preservadas por seguridad.

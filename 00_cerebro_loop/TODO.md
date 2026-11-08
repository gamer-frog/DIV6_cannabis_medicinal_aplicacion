# TODO / bloqueos

- Resolver la divergencia desde `5c78f74` frente a `origin/main` (`607f219`) en un contexto autorizado: al intentar el merge había 22 commits exclusivos locales y 9 remotos; el merge se abortó por conflictos en seis archivos de memoria. Hay además un commit documental de cierre sin publicar. No resolver automáticamente ni publicar desde este checkout.
- No borrar ramas remotas: hay 16 referencias checkpoint/resume preservadas y varias tienen commits exclusivos; las etiquetas `graveyard-*` locales respaldan los tips ya censados.
- Revisar si corresponde actualizar el metadato obsoleto `apple-mobile-web-app-capable`; Chromium lo reporta como advertencia, sin errores de consola.

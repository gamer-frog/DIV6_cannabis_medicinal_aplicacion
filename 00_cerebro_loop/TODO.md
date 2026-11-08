# TODO / bloqueos

- Resolver la divergencia entre HEAD (`585a0a7`) y `origin/main` (`607f219`) en un contexto autorizado y separado antes de mezclar o publicar; el checkout local y `origin/main` tienen 15 y 9 commits exclusivos, respectivamente.
- No borrar ramas remotas: 14 de 16 tienen commits exclusivos y las dos ramas ancestras no están confirmadas como huérfanas.
- Revisar si corresponde actualizar el metadato obsoleto `apple-mobile-web-app-capable`; Chromium lo reporta como advertencia, sin errores de consola.

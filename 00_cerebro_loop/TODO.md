# TODO / bloqueos

- Resolver la divergencia desde `c58f11d` frente a `origin/main` en un contexto autorizado: el reintento posterior a integrar el tip actualizado de checkpoint/11 se abortó por conflictos en seis archivos de memoria. `pending-boot-v6-main-20261108` preserva el estado. No resolver automáticamente ni publicar desde este checkout.
- No borrar ramas remotas: hay 16 referencias checkpoint/resume preservadas y varias tienen commits exclusivos; las etiquetas `graveyard-*` locales respaldan los tips ya censados.
- Revisar si corresponde actualizar el metadato obsoleto `apple-mobile-web-app-capable`; Chromium lo reporta como advertencia, sin errores de consola.

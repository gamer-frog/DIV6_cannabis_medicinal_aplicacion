# CEMETERY

- 2026-11-08: BOOT v7: se absorbió `origin/opencode-checkpoints/11` (`cc5dc50`) sin conflictos. El merge de `origin/main` se abortó por conflictos en los cinco archivos de memoria y `HANDOFF.md` raíz. `pending-boot-v7-main-20261108` preserva el estado; no se borraron ramas remotas.

- 2026-11-08: Reintento BOOT v6: se integró el tip actualizado de `origin/opencode-checkpoints/11` (`1061d2c`) en `c58f11d`. El merge de `origin/main` volvió a abortarse por conflictos solo de memoria; `pending-boot-v6-main-20261108` preserva el HEAD. No se resolvieron conflictos ni se borraron ramas remotas.

- 2026-11-08: BOOT v6: se integró `origin/opencode-checkpoints/11` (`4aeb58b`) en `5c78f74`. El merge posterior de `origin/main` se abortó por conflictos exclusivamente en archivos de memoria; tag local `pending-boot-v6` conserva el HEAD previo al intento. No se borraron ramas remotas.
- 2026-11-08: Boot iniciado en checkout grafted/shallow `opencode/42519163575` (`585a0a7`). Ramas checkpoints/resume recién fetched; aún no clasificadas ni modificadas.
- 2026-11-08: BOOT v5 preservó todos los tips remotos antes de intentar limpieza: `graveyard-opencode-checkpoints-{1,2,3,4,5,6,7,8,9,11}` y `graveyard-opencode-resume-{19a816efb62774e61390,1f10060abbff4c6f6dbb,448a1904f48e1fadcbbc,59178a3e1ee217f3e8b9,70ec7990da5cd4657b60,b1a75c07c9f5385b54c5,b619d44071631b2428fe}`; cada etiqueta local fue verificada contra su SHA. Checkpoint/11 (`bf19fad`) integrado por fast-forward; el resto no fue mergeado porque el BOOT solicita integrar solo el más reciente. No se eliminan ramas remotas: el SOP en `AGENTS.md` prohíbe borrar referencias con trabajo exclusivo sin autorización/compost seguro.

# TODO Y BLOQUEOS
*Regla: Máximo 3 intentos por ítem. Si falla 3 veces, se marca "REQUIERE HUMANO" y se salta.*

- [ ] Intento 2/3: Revaluar la limpieza de `origin/opencode-checkpoints/*`, `origin/opencode-resume/*` y `origin/opencode-deployments/*`. Resultado: el repositorio es shallow (`origin/main` aparece como grafted) y `git merge-base` no encuentra una base para la mayoría de las refs; los conteos de `rev-list` no son evidencia completa de exclusividad. No se borró ni fusionó ninguna rama. Próximo paso: conseguir historial completo para comparar; cualquier limpieza sigue requiriendo autorización explícita.

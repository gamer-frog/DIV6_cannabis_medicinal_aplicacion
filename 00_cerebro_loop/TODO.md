# TODO Y BLOQUEOS
*Regla: Máximo 3 intentos por ítem. Si falla 3 veces, se marca "REQUIERE HUMANO" y se salta.*

- [x] Revisar `origin/opencode-checkpoints/*`, `origin/opencode-resume/*` y `origin/opencode-deployments/*` contra `HEAD`. Resultado: historial completo (`git rev-parse --is-shallow-repository` = `false`); `origin/opencode-checkpoints/2` y `/7` no tenían commits exclusivos frente a `HEAD` y se eliminaron por pedido explícito. Se preservan las demás refs con commits únicos; no se fusionó ninguna rama.

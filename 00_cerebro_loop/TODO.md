# TODO Y BLOQUEOS
*Regla: Máximo 3 intentos por ítem. Si falla 3 veces, se marca "REQUIERE HUMANO" y se salta.*

- [x] Revisar `origin/opencode-checkpoints/*`, `origin/opencode-resume/*` y `origin/opencode-deployments/*` contra `HEAD`. Resultado: historial completo (`git rev-parse --is-shallow-repository` = `false`); varias refs remotas contienen commits no alcanzables desde `HEAD`, por lo que se preservan todas. No se borró ni fusionó ninguna rama. Cualquier limpieza o merge requiere evidencia adicional y autorización explícita.

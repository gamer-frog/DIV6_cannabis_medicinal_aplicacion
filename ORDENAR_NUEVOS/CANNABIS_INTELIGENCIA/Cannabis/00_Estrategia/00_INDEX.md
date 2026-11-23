# 🌿 Cannabis - Índice de Navegación

> **Última actualización:** [[2026-03-25]]
> **Responsable:** Vault [[Architect]]

---

## 🔗 Navegación Rápida

### Top 10 Notas del Área

```dataview
TABLE file.link as "Nota", file.mtime as "Modificado"
FROM "02_Areas/cannabis"
WHERE !contains(file.path, "[[LOGBOOK]]") AND !contains(file.path, "[[BACKLOG]]")
SORT file.mtime DESC
LIMIT 10
```

---

## 📊 Estado Actual

### Tareas Activas

```dataview
TABLE status, priority as "Prioridad"
FROM "02_Areas/cannabis"
WHERE status = "todo" OR status = "in_progress"
LIMIT 5
```

---

## 🔗 Links Importantes

| Link | Descripción |
|-------|-------------|
| [[01_Projects/CANNABIS_INTELIGENCIA/BACKLOG.md]] | Tareas pendientes del área |
| [[HOME.md]] | Dashboard principal del sistema |
| [[GLOBAL_BACKLOG.md]] | Vista centralizada de todos los BACKLOGs |

---

## 📋 Proyectos del Área

| Proyecto | Estado | Responsable |
|----------|--------|------------|
| Backend API Routes | ⏳ Pending | Cannabis Engineer |
| Vector Embeddings Index | ⏳ Pending | Cannabis Researcher |

---

**Creado:** 2026-03-25
**Estado:** ✅ Activo

---
[[0_README|?? Volver al Portal Maestro]]

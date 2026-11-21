# IDEA — Comunidad cannabis unificada + Web App second-brain
estado: propuesta del CEO (23-oct), sin ejecutar
---
## Parte 1: Comunidad única
- Hoy: ~10 grupos de WhatsApp separados (uno por diplomatura, ~4 cursadas).
- Propuesta CEO: unirlos en UNA comunidad (menos grupos, más gente).
- Rool: viable. Camino: 1) crear grupo "comunidad" nuevo con los moderadores de cada diplomatura (WhatsApp no permite fusionar grupos existentes); 2) anuncio cruzado con el material de valor (la app, parte 2) como imán; 3) grupos viejos quedan como archivo con pin al nuevo.
- Riesgo real: la gente no migra sola. El imán tiene que ser la app + material unificado.
## Parte 2: Web App second-brain de las diplomaturas
- Ingesta: todos los PDFs de las 4 diplomaturas (guardados, nunca explotados — MI-VIDA-REAL S4).
- Features núcleo: búsqueda full-text sobre los PDFs, metadata por materia/diplomatura/módulo, links automáticos entre temas (embeddings), exploración tipo grafo.
- Uso dual: privado del CEO + compartido con la comunidad.
- Stack: Next.js (como hub) + Supabase/pgvector, RAG simple + React Flow para el grafo. Deploy Vercel.
- Primer paso con GO: censo real de los PDFs de las 4 diplomaturas (dónde viven hoy, cuántos, cuánto pesan).

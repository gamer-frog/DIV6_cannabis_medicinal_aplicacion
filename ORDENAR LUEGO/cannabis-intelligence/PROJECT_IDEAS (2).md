# 3 Ideas de Proyecto — Cannabis Inteligencia (DIV7)

> Generadas a partir del analisis del repositorio, roadmap, y las 4 diplomaturas base.
> Fecha: 2026-07-01 | Division: DIV7 Cannabis Intelligence

---

## Idea 1: Cannabase — Plataforma de Inteligencia de Variedades

**Tipo:** Web App + Database | **Skills usados:** fullstack-dev, web-search, aminer-open-academic

### Descripcion

Plataforma web que centraliza informacion de variedades de cannabis con perfiles detallados de cannabinoides (THC, CBD, CBG), terpenos dominantes, efectos reportados, y recomendaciones de uso basadas en sintomas o preferencias. Incluye un motor de recomendacion que cruza perfiles de usuario (medicinal/recreativo/exploratorio) con datos de variedades para sugerir las mejores opciones.

### Funcionalidades Principales

- **Base de datos de 100+ variedades** con perfil cannabinoide completo, linaje genetico, y datos de cultivo (tiempo de floracion, rendimiento, dificultad)
- **Motor de recomendacion** basado en efectos deseados (relajacion, creatividad, analgesia, sueño) que matchea con el perfil terpenoide y cannabinoide de cada variedad
- **Guia de cultivo por variedad** con parametros optimos de temperatura, humedad, y nutrientes para cada fase del ciclo
- **Integracion con research academico** via API aminer para mantener la base actualizada con estudios clinicos y preclinicos publicados

### Stack Tecnico

- Next.js 16 + TypeScript + Tailwind CSS (frontend)
- Prisma ORM + PostgreSQL (database)
- API routes para el motor de recomendacion
- Web scraping para mantener datos actualizados de fuentes publicas

### Viabilidad

La base de conocimientos de las diplomaturas 1 y 3 (Cultivo Indoor + Ciencia/Biotecnologia) proporciona el dominio tecnico necesario para curar y validar los datos de variedades. El MVP puede lanzarse con 50 variedades bien documentadas y escalar incrementalmente.

---

## Idea 2: GrowOS — Sistema de Monitoreo y Automatizacion Indoor

**Tipo:** IoT + Dashboard Web | **Skills usados:** fullstack-dev, finance, xlsx

### Descripcion

Sistema integral de monitoreo y automatizacion para cultivos indoor de cannabis. Conecta sensores ESP32 (temperatura, humedad, luz PAR, EC del sustrato) con un dashboard web en tiempo real que muestra metricas historicas, alertas, y controles manuales/automaticos. Incluye modulo de datalogging con exportacion a spreadsheets y analisis de tendencias.

### Funcionalidades Principales

- **Dashboard en tiempo real** con graficos de temperatura, humedad, VPD (Vapor Pressure Deficit), y consumo electrico por hora/dia/semana
- **Control automatico** de ventilacion, riego, y luces basado en umbrales configurables (ej: activar extractor cuando humedad > 70%)
- **Datalogging avanzado** con exportacion a Excel/CSV y calculo de KPIs: consumo kWh/g producido, eficiencia del riego, dias hasta cosecha estimados
- **Modulo de costos** que tracking gastos (electricidad, nutrientes, agua) y calcula ROI por ciclo en tiempo real
- **Time-lapse automatico** con ESP32-CAM integrado, con deteccion de etapas del ciclo (germinacion, vegetativo, pre-flor, floracion)

### Stack Tecnico

- ESP32 + sensores DHT22/Soil EC + Sonoff (hardware)
- Next.js dashboard con WebSocket para datos en tiempo real
- PostgreSQL para historial de sensores
- Grafana o charts embebidos para visualizacion

### Viabilidad

El ROADMAP_PROJECT ya define la FASE 4 de automatizacion avanzada. Las diplomaturas 1 y 2 (Cultivo Indoor + Automatizacion IoT) cubren todo el know-how. El MVP puede empezar con solo sensores de temp/humedad y escalar a control completo.

---

## Idea 3: Cannalytics — Analisis de Mercado y Compliance Regulatorio

**Tipo:** Research Platform + Reports | **Skills usados:** web-search, market-research-reports, pdf, xlsx, finance

### Descripcion

Plataforma de inteligencia de mercado enfocada en la industria del cannabis en Argentina y LATAM. Genera reportes semanales de precios, regulaciones, nuevas empresas, y tendencias del mercado. Incluye un tracker regulatorio que monitorea cambios legislativos en tiempo real y un modulo de compliance que ayuda a operadores a mantenerse al dia con los requisitos legales.

### Funcionalidades Principales

- **Tracker de precios** por categoria (flores, aceites, extractos, derivados) con datos de dispensaries y mercados formales
- **Radar regulatorio** que monitorea proyectos de ley, resoluciones de ANMAT/ARICCAME, y cambios en la regulacion provincial/nacional
- **Reportes automaticos** semanales/mensuales en PDF y Excel con analisis de tendencias, oportunidad de mercado, y benchmarking competitivo
- **Directorio de empresas** del ecosistema cannabis argentino (cultivadores, laboratorios, dispensaries, consultoras)
- **Calculator de viabilidad** que estima costos de puesta en marcha, timelines de aprobacion, y proyeccion de ingresos segun el segmento elegido

### Stack Tecnico

- Web scraping automatizado con agent-browser para fuentes publicas de datos
- Python para procesamiento y generacion de reportes (pdf/xlsx skills)
- Next.js para la interfaz de consulta
- CRON jobs para actualizaciones periodicas (encaja perfecto con la infraestructura Botardo OS)

### Viabilidad

La diplomatura 4 (Negocios y Regulacion) proporciona el marco conceptual. La infraestructura Botardo OS ya tiene los CRON jobs y skills necesarios (web-search, market-research, pdf, xlsx). El MVP puede ser un reporte semanal automatizado que escale a plataforma interactiva.

---

## Priorizacion Recomendada

| # | Idea | Impacto | Complejidad | Inversion Inicial | Recomendacion |
|---|------|---------|-------------|-------------------|---------------|
| 1 | Cannabase | Alto | Media | Baja | **Primer MVP** — se puede construir solo con software |
| 2 | GrowOS | Muy Alto | Alta | Media | **Segundo** — requiere hardware, pero el roadmap ya lo planifica |
| 3 | Cannalytics | Alto | Baja | Muy Baja | **Paralelo** — se puede iniciar inmediatamente con CRONs existentes |

---

*Generado por Botardo OS DIV1 — Foundation para DIV7 Cannabis Intelligence*
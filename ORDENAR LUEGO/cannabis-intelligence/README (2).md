# Cannabis Inteligencia — DIV7 Foundation

> **Division:** DIV7 Cannabis Intelligence | **Sandbox:** vistta-store (Botardo OS)
> **Source Repo:** [tech-free/5-6_cannabis-inteligencia](https://github.com/tech-free/5-6_cannabis-inteligencia)
> **Branch:** `feat/div7-cannabis-foundation`
> **Founded:** 2026-07-01

---

## Overview

Cannabis Inteligencia es un proyecto de I+D que combina cultivo indoor automatizado con inteligencia artificial. El objetivo es diseñar, construir y escalar un sistema de cultivo indoor automatizado (MVP: carpa 80x80cm, LED Samsung LM301H 240W) mientras se desarrolla una plataforma de inteligencia cannabis para análisis de variedades, predicción de cultivos y recomendaciones de productos.

El proyecto se funda sobre 4 diplomaturas especializadas que cubren desde la biología del cannabis hasta la ingeniería de automatización y el modelo de negocio regulatorio.

---

## Diplomaturas

### 1. Diplomatura en Cultivo Indoor de Cannabis
**Enfoque:** Técnicas de cultivo controlado en ambientes cerrados. Cubre iluminación LED (espectros PAR/PPF), management de temperatura y humedad, sustratos y nutrientes, fases vegetativa y floración, y técnicas avanzadas como LST (Low Stress Training) y SCROG (Screen of Green).

**Aplicación al proyecto:** Base técnica directa para el MVP indoor. Define las especificaciones de la carpa 80x80x160cm, selección de panel LED Samsung LM301H 240W, y protocolos de germinación y ciclo de vida.

### 2. Diplomatura en Automatizacion e IoT para Cultivos
**Enfoque:** Sistemas de control automático para agricultura indoor. Sensores de temperatura/humedad/suelo, microcontroladores (ESP32, Sonoff), sistemas de riego por goteo automatizado, control de ventilación, y datalogging en tiempo real.

**Aplicacion al proyecto:** Automatizacion completa del ciclo de cultivo — riego por goteo con bomba + Sonoff, monitoreo continuo de temp/humedad con datalogging a Google Sheets, time-lapse con ESP32-CAM, y control de ventilacion (turbina + filtro carbono activado).

### 3. Diplomatura en Ciencia y Biotecnologia del Cannabis
**Enfoque:** Genetica de variedades (Sativa, Indica, Híbridos), perfil cannabinoide (THC, CBD, terpenos), extracciones y procesamiento, aplicaciones medicinales, y regulación farmacéutica.

**Aplicacion al proyecto:** Base de conocimiento para la plataforma de inteligencia — análisis de variedades, base de datos cannabinoide, sistema de recomendaciones basado en perfiles de uso, y research académico integrado.

### 4. Diplomatura en Negocios y Regulacion del Cannabis
**Enfoque:** Marco regulatorio argentino e internacional, modelos de negocio (cultivo, distribución, derivados), compliance legal, financiación y ROI, y mercado emergente de cannabis medicinal/industrial.

**Aplicacion al proyecto:** Viabilidad comercial del MVP (ROI calculado en 733%), plan de escalabilidad, análisis de mercado, y estructura legal para la operación. El ROADMAP_PROJECT ya incluye análisis financiero detallado.

---

## Estado del Proyecto

| Fase | Estado | Progreso |
|------|--------|----------|
| M1 Foundation | Completo | 100% |
| M2 Active Development | En curso | 10% |
| M3 Growth | Pendiente | 0% |
| M4 Maturity | Pendiente | 0% |

### Fases del MVP Indoor

- **FASE 1: Diseno y Presupuesto** — Especificaciones tecnicas definidas (80x80, LED 240W), ROI financiero calculado (733% retorno). Pendiente: lista de compra exacta con links MercadoLibre.
- **FASE 2: Adquisicion** — Pendiente compra de carpa, iluminacion, ventilacion y automatizacion.
- **FASE 3: Montaje e Inicio** — Armado de estructura, prueba de vacio (24h estabilidad), germinacion ciclo 1, configurar datalogging.
- **FASE 4: Automatizacion Avanzada** — Riego por goteo, datalogging temp/humedad, time-lapse con ESP32-CAM.

---

## Estructura del Repositorio

```
5-6_cannabis-inteligencia/
├── Cannabis/
│   ├── 00_INDEX.md              # Indice de navegacion del area Cannabis
│   └── 00_Estrategia/
│       └── 00_INDEX.md          # Indice de estrategia y MOCs
├── _system/
│   ├── activity_log.md          # Historial de acciones del bot
│   ├── pipeline_status.md       # Estado de departamentos
│   ├── sandbox.md               # Config del bot
│   └── skills.md                # Skills disponibles (37 funcionales)
├── 00_INDEX.md                  # Indice principal del vault
├── 01_AI_INSIGHTS.md            # Insights generados por IA
├── BOARD.md                     # Tablero de tareas (7 tareas, 29% completado)
├── DASHBOARD.md                 # Dashboard del proyecto
├── GOALS.md                     # Metas y deadlines
├── PROJECT_IDEAS.md             # 3 ideas de proyecto generadas
├── README.md                    # Este archivo
├── ROADMAP.md                   # Roadmap general (M1-M4)
├── ROADMAP_PROJECT.md           # Roadmap especifico del MVP Indoor
└── STATUS.md                    # Status del proyecto
```

---

## Skills del Sistema (37 funcionales)

El proyecto dispone de 37 skills funcionales organizadas en 4 departamentos:

| Departamento | Skills | Ejemplos |
|-------------|--------|----------|
| Radar (Investigacion) | 7 | web-search, web-reader, agent-browser, aminer-open-academic |
| Cerebro (Analisis) | 13 | LLM, VLM, finance, contentanalysis, qingyan-research |
| Fabrica (Produccion) | 10 | fullstack-dev, coding-agent, blog-writer, seo-content-writer |
| Logistica (Entrega) | 7 | pdf, docx, xlsx, pptx, enviar_a_obsidian (custom v4.1) |

**Skill custom destacada:** `enviar_a_obsidian` v4.1 — puente automatico Discord-Obsidian con clasificacion en 9 subcarpetas, tags inteligentes, backlinks, frontmatter YAML, y sistema de departamentos.

---

## Integracion con Botardo OS

- **Division:** DIV7 Cannabis Intelligence
- **Sandbox ORIGEN:** vistta-store (DIV1)
- **CRON Job:** 239670 (cada 10 minutos)
- **DB:** Supabase `brswwhhgffahkahuehrh.supabase.co`
- **Comunicacion:** via `bo_reports` y `bo_directives`

---

*Foundation commit para DIV7 Cannabis Intelligence — Generado por Botardo OS DIV1*
# PROJECT IDEAS — DIV7 Cannabis Intelligence

Basado en: las 4 diplomaturas del CEO, el ROADMAP_PROJECT.md (indoor MVP con ROI 733%), y el mercado global cannabis proyectado a USD 150B+ para 2030.

---

## Idea 1: CannabisGrow Tracker — Dashboard de Cultivo Indoor con IA

### Concepto
Sistema de monitoreo y optimizacion para cultivo indoor de cannabis que integra datos de sensores (temperatura, humedad, pH, EC, luz) con modelos predictivos de rendimiento. Basado directamente en el ROADMAP_PROJECT.md del CEO que ya planifica un indoor 80x80cm con Sonoff + sensores.

### Por que funciona con las 4 diplomaturas
- **D1 (Cultivo Indoor):** El CEO conoce los parametros optimos para cada fenofase. Puede validar que el sistema sugiere rangos correctos.
- **D2 (Regulacion):** El dashboard incluye modulo de compliance — trazabilidad requerida por ANMAT, limites de plantas, registros de cosecha.
- **D3 (Ciencia):** El modelo de optimizacion puede sugerir ajustes basados en ciencia cannabinoide (ej: temperatura optima para maximizar CBD vs THC).
- **D4 (Negocios):** ROI del 733% del CEO demuestra viabilidad. El tracker se vende como SaaS a otros cultivadores.

### Que construye
1. **Hardware:** ESP32 + sensores DHT22 (T/H), sensor pH, sensor EC, rele para luz/ventilacion
2. **Backend:** API REST (Next.js) que recibe datos de sensores via MQTT/HTTP
3. **Dashboard:** Graficas en tiempo real de parametros ambientales + historial
4. **IA:** Modelo que predice rendimiento basado en parametros + recomienda ajustes
5. **Compliance:** Log de trazabilidad exportable para ANMAT

### Monetizacion
- **Freemium:** Dashboard basico gratis, IA predictiva paga (USD 15/mes)
- **Hardware kit:** Vender el ESP32 preconfigurado (USD 50-80)
- **Consulting:** Instalacion + configuracion para cultivadores (USD 200-500)
- **El CEO gana:** Portafolio tecnico demostrable + ingresos del propio cultivo

### MVP en 3 semanas
- Semana 1: ESP32 conectado a Supabase, mostrando T/H en dashboard web
- Semana 2: Agregar pH, EC, control de luz/ventilacion via web
- Semana 3: Modelo predictivo basico + modulo compliance

---

## Idea 2: Cannab合规 (CannabCompliance) — Herramienta de Compliance Regulatorio para Latam

### Concepto
Plataforma web que mapea y compara los marcos regulatorios de cannabis en paises de Latam (Argentina, Uruguay, Colombia, Mexico). Permite a empresas cannabicas verificar si su operacion cumple con la regulacion local, generar documentos de compliance, y recibir alertas de cambios legales.

### Por que funciona con las 4 diplomaturas
- **D2 (Regulacion) es la diplomatura central:** El CEO conoce la Ley 27.350 argentina, el sistema IRCCA uruguayo, y los marcos colombiano/mexicano. Esto es conocimiento experto que no se encuentra facilmente consolidado.
- **D4 (Negocios):** Las empresas cannabicas pagan USD 5,000-50,000/año en consultoria legal. Una herramienta self-service a USD 50-200/mes es un ahorro enorme.
- **D1 (Cultivo):** Las regulaciones varian segun el tipo de operacion (cultivo, procesamiento, dispensario). El CEO sabe diferenciar.
- **D3 (Ciencia):** Los limites de THC/CBD, requisitos de laboratorio, y estandares de calidad son cientificos. El CEO puede validar la precision.

### Que construye
1. **Base de datos regulatoria:** Tablas comparativas por pais (tipos de licencia, requisitos, costos, plazos)
2. **Questionnaire:** 10 preguntas sobre la operacion del usuario -> determina que licencias necesita
3. **Document generator:** Templates de solicitudes, planes de manejo, registros de trazabilidad
4. **Alertas:** CRON que rastrea cambios legales y notifica a usuarios
5. **Comparador:** Side-by-side de regulaciones entre paises

### Monetizacion
- **Freemium:** Questionario + 1 pais gratis
- **Pro:** Todos los paises + generador de documentos (USD 50/mes)
- **Enterprise:** API + white-label + consultoria del CEO (USD 200-500/mes)
- **El CEO gana:** Posicionamiento como experto regulatorio + ingresos recurrentes

### MVP en 4 semanas
- Semana 1-2: Base de datos Argentina completa + questionnaire
- Semana 3: Generador de documentos + comparador Uruguay
- Semana 4: Alertas legales (CRON con cannabis-intel pipeline)

---

## Idea 3: Cannabinoid Profiler — Portafolio de Data Science + Herramienta de Analisis

### Concepto
Un portafolio publico de proyectos de data science aplicados al cannabis: analisis de perfiles cannabinoides, clustering de geneticas, modelos de prediccion de efectos terapeuticos, y visualizaciones interactivas. Incluye una herramienta web donde el usuario ingresa un perfil de cannabinoides/terpenos y recibe predicciones de efectos, usos medicinales, y geneticas similares.

### Por que funciona con las 4 diplomaturas
- **D3 (Ciencia y Biotecnologia) es la diplomatura central:** Perfiles cannabinoides, sistema endocannabinoide, interacciones farmacologicas. El CEO puede validar que las predicciones son cientificamente correctas.
- **D1 (Cultivo):** Las geneticas tienen perfiles caracteristicos. El CEO sabe que un "Sherbet" tiende a ser indica con perfil relajante, por ejemplo.
- **D2 (Regulacion):** Los reclamos de efectos terapeuticos tienen limites legales. El CEO sabe hasta donde se puede afirmar sin violar la regulacion.
- **D4 (Negocios):** El portafolio genera oportunidades laborales directamente. Data scientists con conocimiento de dominio cannabico son extremadamente raros.

### Que construye
1. **Dataset publico:** Compilacion de perfiles cannabinoides de geneticas populares (fuentes: Leafly, Wikileaf, papers)
2. **Clustering:** K-Means / DBSCAN para agrupar geneticas por perfil quimico
3. **Predictor de efectos:** Modelo que predice efectos (relajante, creativo, energetico, sedante) basado en cannabinoides + terpenos
4. **Visualizaciones:** Scatter plots, radar charts, heatmaps de geneticas
5. **Herramienta web:** Input de perfil -> output de predicciones (Next.js + Plotly)

### Monetizacion
- **Indirecta (principal):** El portafolio genera entrevistas y freelance. Diferenciacion masiva vs otros data scientists.
- **Consulting:** Empresas que quieren analisis de sus productos (USD 500-2000 por proyecto)
- **Contenido:** Articulos en Medium/LinkedIn basados en los analisis (audience building)
- **El CEO gana:** Visibilidad profesional + portafolio demostrable + networking con la industria

### MVP en 3 semanas
- Semana 1: Dataset de 100+ geneticas con perfiles cannabinoides + limpienza
- Semana 2: Clustering + predictor de efectos (Jupyter notebooks publicos)
- Semana 3: Web app con herramienta interactiva + deploy en Vercel

---

## Comparativa

| | CannabisGrow Tracker | CannabCompliance | Cannabinoid Profiler |
|---|---|---|---|
| **Diplomatura principal** | D1 (Cultivo) | D2 (Regulacion) | D3 (Ciencia) |
| **Tipo** | IoT + SaaS | SaaS B2B | Portafolio + Tool |
| **Tiempo MVP** | 3 semanas | 4 semanas | 3 semanas |
| **Inversion** | Media (hardware) | Baja (web) | Baja (open source) |
| **Ingreso potencial** | Alto (SaaS + kit) | Alto (B2B recurrente) | Indirecto (empleo) |
| **Riesgo** | Medio (hardware) | Bajo | Muy bajo |
| **Usa ROADMAP existente** | Si, directo | No | No |
| **Portafolio para CV** | Si | Si | Si (el mejor) |
| **Escalable a SaaS** | Si | Si | Parcialmente |

## Recomendacion

**Cannabinoid Profiler (Idea 3) primero** porque:
- Inversion minima (solo tiempo, no hardware)
- Genera portafolio inmediato para buscar trabajo (objetivo principal del CEO)
- Demuestra data science skills + conocimiento de dominio cannabico (combinacion unica)
- Se puede hacer en paralelo con el cultivo indoor del ROADMAP_PROJECT

**Luego CannabisGrow Tracker (Idea 1)** cuando el CEO tenga el hardware del indoor armado, conectando los sensores reales al dashboard.

**CannabCompliance (Idea 2)** como proyecto a mediano plazo cuando se tenga mas data regulatoria actualizada.

---
*Generado por vistta-store — DIV7 Foundation v2 — 2026-07-02*
*Repo clonado: tech-free/5-6_cannabis-inteligencia (17 archivos, 760 lineas)*
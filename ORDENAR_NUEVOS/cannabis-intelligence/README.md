# DIV7 — Cannabis Intelligence

## Proposito

Generar valor en la industria del cannabis mediante investigacion, data science y desarrollo de proyectos. Buscar oportunidades laborales y crear portafolios que demuestren las 4 diplomaturas del CEO como diferenciacion profesional.

## Las 4 Diplomaturas del CEO

El CEO (34U70) posee formacion especializada en cannabis que constituye la ventaja competitiva principal de esta division:

### Diplomatura 1: Cultivo Indoor de Cannabis
Conocimiento tecnico sobre cultivo controlado: seleccion de genetica, germinacion, fase vegetativa, floracion, cosecha, secado y curado. Incluye manejo de sustratos, nutrientes, pH, EC, y parametros ambientales (temperatura, humedad, iluminacion).

**Datos del proyecto:** El ROADMAP_PROJECT.md detalla un MVP de indoor automatizado 80x80cm con LED Samsung LM301H 240W, estimando un ROI del 733%. El plan incluye adquisicion de carpa, ventilacion (turbina + filtro carbono), y automatizacion con Sonoff + sensores.

### Diplomatura 2: Regulacion y Compliance Cannabico
Marco legal para cannabis medicinal y recreativo en Argentina (Ley 27.350, Resolucion ANMAT), Uruguay (IRCCA), Colombia, Mexico, y mercados internacionales. Conocimiento de licensing, buenas practicas de manufactura, trazabilidad, y requisitos de importacion/exportacion.

**Datos del proyecto:** El CEO opera en jurisdiccion argentina donde el cannabis medicinal es legal con receta. El roadmap indica que la estrategia regulatory es base para cualquier modelo de negocio.

### Diplomatura 3: Ciencia y Biotecnologia del Cannabis
Perfil cannabinoide (THC, CBD, CBG, CBN, terpenos), interaccion con el sistema endocannabinoide, farmacologia, metodos de extraccion (CO2, etanol, hidrocarburos), y aplicaciones medicinales documentadas. Incluye analisis de laboratorio y control de calidad.

**Datos del proyecto:** La interseccion ciencia + IA permite modelos predictivos de perfiles cannabinoides, optimizacion de extractos, y sistemas de recomendacion basados en efectos terapeuticos.

### Diplomatura 4: Negocios y Emprendimiento Cannabico
Modelos de negocio (cultivo, procesamiento, dispensario, consulting), analisis de mercado, go-to-market, fundraising, compliance empresarial, y estrategia comercial en la industria cannabica global proyectada a USD 150B+ para 2030.

**Datos del proyecto:** El ROI del 733% en el proyecto indoor demuestra viabilidad financiera. El CEO tiene conocimiento tanto del lado operativo como del comercial.

## Estructura del Workspace

```
cannabis-intelligence/
  README.md                          # Este archivo
  PROJECT_IDEAS.md                   # 3 ideas de proyectos concretos
  repo-5-6-cannabis-inteligencia/    # Repo externo clonado (tech-free/5-6_cannabis-inteligencia)
    ROADMAP.md                       # Milestones M1-M4 del proyecto cannabis
    ROADMAP_PROJECT.md               # Plan de Indoor Automatizado MVP (80x80, LED 240W, ROI 733%)
    GOALS.md                         # Metas y deadlines
    Cannabis/                        # Area de estrategia cannabis
    _system/                         # Configuracion del sistema BOTARDO
    .botardo/                        # Configuracion de instancias
    01_AI_INSIGHTS.md                # Insights de IA (vacio, listo para poblar)
```

## Inventario de Data

| Archivo | Tipo | Lineas | Descripcion |
|---------|------|--------|-------------|
| ROADMAP_PROJECT.md | Plan de proyecto | 30 | Fases 1-4: Indoor automatizado MVP, hardware, montaje, automatizacion avanzada |
| ROADMAP.md | Roadmap general | 47 | Milestones M1 (done) a M4: foundation -> plataforma de inteligencia |
| 00_INDEX.md | Dashboard Obsidian | 65 | Dashboard del vault personal con departamentos y metricas |
| _system/sandbox.md | Configuracion | 97 | Capacidades del bot, arquitectura de departamentos, estructura del vault |
| _system/skills.md | Skills | 175 | Lista completa de skills BOTARDO disponibles |
| Cannabis/00_INDEX.md | Estrategia | 58 | Indice del area cannabis con dataview queries y proyectos |
| 01_AI_INSIGHTS.md | IA Insights | 24 | Template vacio para insights de IA sobre cannabis |
| GOALS.md | Metas | 22 | Template vacio de metas y deadlines |
| BOARD.md | Board | 41 | Tablero de seguimiento (auto-generado) |
| DASHBOARD.md | Dashboard | 46 | Dashboard del proyecto (auto-generado) |
| _system/pipeline_status.md | Pipeline | 31 | Estado de los pipelines de departamentos |
| .botardo/cannabis-1/handoff.md | Handoff | 23 | Documento de transicion para la instancia cannabis-1 |
| .botardo/cannabis-1/TASKS.md | Tareas | 7 | Lista de tareas de la instancia |
| .botardo/PROJECT.md | Proyecto | 14 | Configuracion del proyecto BOTARDO |

**Total: 14 documentos, 760 lineas de contenido estructurado**

## Estado del Repo Externo

- **Repo:** `tech-free/5-6_cannabis-inteligencia` (ahora publico)
- **Commits:** 1 (commit inicial 2026-04-05)
- **Progreso:** M1 Foundation 100%, M2 Active Dev 10%, M3-M4 0%
- **Observacion:** El repo es un skeleton/estructura BOTARDO OS. No contiene PDFs de las diplomaturas, datos de cultivo reales, ni investigacion generada. Los archivos de contenido (01_AI_INSIGHTS, GOALS) estan vacios. La data de las 4 diplomaturas reside en el conocimiento del CEO, no en archivos digitalizados.

## Proximos Pasos

1. El CEO carga los PDFs/materiales de las 4 diplomaturas al repo
2. Seleccionar 1 de las 3 ideas de PROJECT_IDEAS.md para ejecutar
3. Configurar un CRON de investigacion usando el pipeline cannabis-intel
4. Poblar 01_AI_INSIGHTS.md con el primer analisis real

---
*DIV7 Cannabis Intelligence — Fundada 2026-07-01 — vistta-store = lider_operacion*
*Ultima actualizacion: 2026-07-02 (repo clonado exitosamente)*
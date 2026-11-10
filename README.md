# Consumo de eventos en tiempo real con Kafka

El sistema debe publicar y consumir eventos en un tópico Kafka para mostrar el estado de las órdenes en tiempo real. Los eventos se publican desde un servicio externo y deben ser reflejados en la interfaz de usuario de manera inmediata. El tópico Kafka se denomina 'ordenes-topic'. Los eventos contienen información sobre el estado de las órdenes, incluyendo el ID de la orden, el estado (pendiente, procesada, entregada) y la fecha de actualización. El sistema debe manejar correctamente los eventos duplicados y los fallos de conexión con Kafka.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Consumo de eventos en tiempo real con Kafka |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración inicial

**Objetivo:** Configurar el entorno para consumir eventos de Kafka.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configurar el acceso al tópico 'ordenes-topic' en Kafka.
- Establecer la conexión inicial con Kafka desde la aplicación Angular.

**Entregable:** Configuración de Kafka y conexión inicial desde la aplicación Angular.

<details>
<summary>Pistas de conocimiento</summary>

- Configuración de brokers Kafka
- Uso de bibliotecas de Kafka en Angular

</details>

### Fase 2: Consumo de eventos

**Objetivo:** Implementar la lógica para consumir eventos de Kafka y mostrarlos en la interfaz.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Consumir eventos del tópico 'ordenes-topic'.
- Mostrar los eventos consumidos en la interfaz de usuario en tiempo real.

**Entregable:** Lógica para consumir y mostrar eventos de Kafka en la interfaz de usuario.

<details>
<summary>Pistas de conocimiento</summary>

- Manejo de suscripciones y desuscripciones en Kafka
- Actualización de la interfaz de usuario en tiempo real

</details>

### Fase 3: Manejo de errores y optimización

**Objetivo:** Mejorar la robustez y eficiencia del consumo de eventos.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementar mecanismos para manejar errores de conexión y reintentos.
- Optimizar el rendimiento del consumo de eventos.

**Entregable:** Mecanismos de manejo de errores y optimización del consumo de eventos.

<details>
<summary>Pistas de conocimiento</summary>

- Estrategias de reintento y recuperación
- Optimización de rendimiento en aplicaciones Angular

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es Kafka y por qué se usa en este sistema?
- **paraQueSirve**: ¿Para qué sirve consumir eventos de Kafka en este sistema?
- **comoSeUsa**: ¿Cómo se usa Kafka para mostrar el estado de las órdenes en tiempo real?
- **erroresComunes**: ¿Cuáles son los errores comunes al consumir eventos de Kafka y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica el diseño del sistema para consumir eventos de Kafka de manera eficiente y robusta?

## Criterios de Evaluacion

- Configuración correcta de Kafka y conexión inicial desde la aplicación Angular.
- Implementación de la lógica para consumir y mostrar eventos de Kafka en la interfaz de usuario.
- Manejo correcto de eventos duplicados y fallos de conexión con Kafka.
- Implementación de mecanismos de manejo de errores y reintentos.
- Optimización del rendimiento del consumo de eventos.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | Apache Kafka |
| `client` | `client/` | chapter, support | client | Angular | Angular |
| `infra-local` | (raiz) | support | infra | Compose local | Apache Kafka |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `GET /api/orders/events`
- `client` expone http (api: http://localhost:3000):
  - `GET /api/orders/events`

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*

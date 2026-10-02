# Diseño técnico de inteligencia artificial

## 1. Objetivo

Este documento define la implementación técnica del sistema de inteligencia artificial de SaaS AI Business.

La arquitectura deberá permitir:

- múltiples proveedores;
- múltiples modelos;
- múltiples agentes;
- herramientas controladas;
- contexto empresarial;
- memoria;
- aprobaciones;
- autonomía configurable;
- ejecución de acciones;
- medición de costos;
- evaluación;
- observabilidad;
- aprendizaje basado en resultados.

La IA será una capa de razonamiento y coordinación sobre el sistema empresarial.

La base de datos y las reglas del backend continuarán siendo la fuente de verdad.

---

# 2. Principios

La arquitectura de IA seguirá estos principios:

1. proveedor independiente;
2. modelo independiente;
3. contexto mínimo necesario;
4. herramientas controladas;
5. permisos explícitos;
6. separación entre propuesta y ejecución;
7. validación antes de efectos;
8. trazabilidad;
9. costos medibles;
10. memoria controlada;
11. resultados estructurados;
12. fallback;
13. evaluación continua;
14. seguridad contra prompt injection;
15. supervisión humana.

---

# 3. Componentes

El sistema estará compuesto conceptualmente por:

- AI Gateway;
- Model Router;
- AI Orchestrator;
- Context Engine;
- Agent Runtime;
- Tool Registry;
- Tool Executor;
- Memory System;
- Business Brain;
- Approval System;
- AI Execution Tracker;
- Cost Tracker;
- Evaluation System;
- Guardrails.

---

# 4. Flujo general

El flujo principal será:

Usuario
    ↓
API
    ↓
AI Orchestrator
    ↓
Intent Resolution
    ↓
Context Engine
    ↓
Agent Selection
    ↓
Model Router
    ↓
AI Gateway
    ↓
Modelo
    ↓
Resultado estructurado
    ↓
Validation
    ↓
Tool / Approval
    ↓
Execution
    ↓
Result Validation
    ↓
Audit
    ↓
Learning / Business Brain

---

# 5. AI Gateway

El AI Gateway será la única capa que deberá comunicarse directamente con proveedores de modelos.

Su responsabilidad será:

- recibir solicitudes normalizadas;
- seleccionar proveedor;
- seleccionar modelo;
- construir request del proveedor;
- ejecutar;
- normalizar respuesta;
- registrar consumo;
- registrar errores;
- aplicar timeout;
- realizar retries seguros;
- ejecutar fallback cuando corresponda.

Los agentes no conocerán las APIs específicas de los proveedores.

---

# 6. Provider Adapter

Cada proveedor tendrá un adapter.

Conceptualmente:

AI Gateway
    ├── Provider Adapter A
    ├── Provider Adapter B
    ├── Provider Adapter C
    └── Provider Adapter N

Cada adapter deberá traducir:

AI Request

a

Provider Request

y posteriormente:

Provider Response

a

AI Response.

---

# 7. AI Request

El contrato interno de una solicitud de IA deberá incluir conceptualmente:

- request_id;
- business_id;
- account_id;
- task;
- agent;
- model_policy;
- messages;
- context;
- tools;
- output_schema;
- temperature cuando corresponda;
- max_tokens;
- metadata.

El contrato interno no dependerá del formato específico de un proveedor.

---

# 8. AI Response

La respuesta normalizada podrá contener:

- request_id;
- provider;
- model;
- content;
- structured_output;
- tool_calls;
- usage;
- finish_reason;
- latency;
- cost;
- warnings.

Esto permitirá que el resto del sistema funcione independientemente del proveedor.

---

# 9. Model Router

El Model Router decidirá qué modelo utilizar.

Podrá considerar:

- tipo de tarea;
- calidad requerida;
- velocidad;
- costo;
- contexto necesario;
- capacidad multimodal;
- disponibilidad;
- herramientas;
- restricciones del negocio.

La selección no estará codificada directamente dentro de cada agente.

---

# 10. Model Policy

Cada tarea podrá utilizar una política de modelos.

Ejemplo conceptual:

task:
content_generation

policy:
- preferred_model;
- fallback_models;
- max_cost;
- max_latency;
- required_capabilities.

Esto permitirá cambiar modelos sin modificar la lógica del agente.


---

# 11. AI Orchestrator

El AI Orchestrator coordinará las ejecuciones de IA.

Responsabilidades:

1. recibir solicitud;
2. identificar usuario;
3. identificar negocio;
4. determinar intención;
5. identificar módulo;
6. obtener contexto;
7. seleccionar agente;
8. seleccionar política de modelo;
9. comprobar permisos;
10. determinar autonomía;
11. ejecutar razonamiento;
12. validar resultado;
13. solicitar aprobación cuando corresponda;
14. ejecutar Tools;
15. validar efectos;
16. registrar ejecución;
17. actualizar memoria relevante;
18. devolver resultado.

---

# 12. Intent resolution

Antes de ejecutar una acción, el sistema deberá determinar qué intenta realizar el usuario.

Ejemplos:

- obtener información;
- analizar;
- recomendar;
- crear contenido;
- preparar campaña;
- responder cliente;
- crear cita;
- registrar venta;
- generar reporte;
- ejecutar automatización.

La intención deberá convertirse en una representación estructurada.

---

# 13. Agent Registry

Los agentes disponibles estarán registrados.

Cada agente deberá declarar:

- id;
- versión;
- descripción;
- capacidades;
- módulos;
- tools permitidas;
- políticas de modelo;
- autonomía máxima;
- schemas;
- estado.

---

# 14. Agentes iniciales

La arquitectura deberá soportar agentes especializados.

Inicialmente se contemplan:

- General Business Agent;
- Marketing Agent;
- Social Agent;
- Sales Agent;
- Customer Agent;
- Agenda Agent;
- Communication Agent;
- Finance Agent;
- Inventory Agent;
- Campaign Agent;
- Analytics Agent;
- Reports Agent.

No todos deberán implementarse simultáneamente.

La arquitectura sí deberá permitir agregarlos sin modificar el núcleo.

---

# 15. General Business Agent

Será el agente capaz de coordinar tareas que atraviesen varios módulos.

Ejemplo:

"Analiza cómo estuvo el negocio este mes y dime qué debería hacer."

Podrá:

1. consultar métricas;
2. consultar ventas;
3. consultar clientes;
4. consultar campañas;
5. consultar agenda;
6. identificar patrones;
7. generar recomendaciones;
8. proponer acciones.

No deberá modificar directamente datos.

---

# 16. Specialized Agents

Los agentes especializados tendrán conocimientos y herramientas específicas.

Ejemplo:

Marketing Agent:

- contenido;
- campañas;
- promociones;
- audiencias;
- métricas.

Sales Agent:

- ventas;
- clientes;
- oportunidades;
- seguimiento.

Finance Agent:

- ingresos;
- gastos;
- flujo;
- categorías;
- reportes financieros.

La especialización reducirá contexto innecesario y facilitará evaluación.

---

# 17. Agent Runtime

El Agent Runtime será responsable de ejecutar un agente.

Deberá controlar:

- contexto;
- instrucciones;
- modelo;
- tools;
- límites;
- pasos;
- tiempo;
- costo;
- resultado;
- errores.

El runtime deberá impedir que un agente ejecute capacidades fuera de su configuración.

---

# 18. Agent loop

Un agente podrá ejecutar un ciclo:

1. recibir objetivo;
2. analizar contexto;
3. razonar;
4. decidir si necesita una Tool;
5. solicitar Tool;
6. recibir resultado;
7. continuar;
8. producir resultado final.

El número máximo de pasos deberá estar limitado.

---

# 19. Agent limits

Cada ejecución podrá tener límites:

- máximo de pasos;
- máximo de tokens;
- máximo de costo;
- máximo de tiempo;
- máximo de tool calls;
- tools permitidas.

Si se alcanza un límite, la ejecución deberá detenerse de forma controlada.

---

# 20. Agent versioning

Los agentes deberán tener versión.

Ejemplo:

marketing-agent v1

marketing-agent v2

Una ejecución deberá conservar la versión utilizada.

Esto permitirá comparar resultados entre versiones.


---

# 21. Tool System

Las Tools serán la interfaz controlada entre la IA y el sistema.

La IA no modificará directamente la base de datos.

Utilizará Tools.

---

# 22. Tool Registry

Cada Tool deberá registrar:

- id;
- nombre;
- versión;
- descripción;
- input schema;
- output schema;
- módulo;
- permisos;
- riesgo;
- autonomía requerida;
- estado.

---

# 23. Tool categories

Las Tools podrán clasificarse como:

## Read

Solo consulta información.

## Prepare

Prepara una acción sin ejecutarla.

## Write

Modifica información.

## Execute

Realiza una acción externa o crítica.

## Analyze

Procesa información.

## Communicate

Envía mensajes.

## External

Interactúa con un proveedor externo.

---

# 24. Ejemplos de Tools

Ejemplos conceptuales:

customer.search

customer.create

customer.update

appointment.find_availability

appointment.create

appointment.cancel

sale.create

sale.record_payment

inventory.check

inventory.adjust

content.create

publication.schedule

publication.publish

campaign.create

message.prepare

message.send

report.generate

analytics.query

---

# 25. Tool schema

Cada Tool tendrá un schema de entrada y salida.

Ejemplo conceptual:

Tool:

appointment.create

Input:

- business_id;
- customer_id;
- staff_id;
- service_id;
- start_at.

Output:

- appointment_id;
- status;
- confirmation.

La IA no podrá enviar parámetros arbitrarios fuera del schema.

---

# 26. Tool Executor

El Tool Executor comprobará:

1. identidad;
2. negocio;
3. agente;
4. permisos;
5. módulo;
6. autonomía;
7. parámetros;
8. límites;
9. estado del recurso;
10. necesidad de aprobación.

Solo después ejecutará la operación.

---

# 27. Tool risk

Cada Tool tendrá un nivel de riesgo.

Ejemplo conceptual:

LOW

consultar cliente.

MEDIUM

crear cliente.

HIGH

enviar comunicación.

CRITICAL

realizar operación financiera.

El riesgo podrá determinar requisitos adicionales.

---

# 28. Tool approval

Una Tool podrá requerir aprobación.

Ejemplo:

message.send

Podrá requerir:

- aprobación del usuario;
- reglas automáticas;
- límite de gasto;
- horario permitido.

---

# 29. Tool result validation

El resultado de una Tool deberá validarse antes de entregarse al agente.

Esto permitirá detectar:

- schema inválido;
- datos incompletos;
- error del módulo;
- estado inesperado.

---

# 30. Tool audit

Cada ejecución de Tool deberá poder rastrearse.

Se deberá conocer:

- agente;
- usuario;
- negocio;
- Tool;
- versión;
- parámetros relevantes;
- resultado;
- duración;
- error;
- aprobación.

Los secretos no deberán registrarse.


---

# 31. Context Engine

El Context Engine será responsable de construir el contexto necesario para cada tarea.

No enviará automáticamente todo el Business Brain al modelo.

Seleccionará información relevante.

---

# 32. Context sources

El contexto podrá provenir de:

- negocio;
- configuración;
- clientes;
- ventas;
- agenda;
- finanzas;
- inventario;
- marketing;
- campañas;
- conversaciones;
- reportes;
- Business Brain;
- memoria;
- eventos;
- resultados anteriores.

---

# 33. Context selection

La selección podrá considerar:

- tarea;
- módulo;
- usuario;
- negocio;
- período;
- conversación;
- permisos;
- relevancia;
- recencia.

---

# 34. Context permissions

El Context Engine nunca deberá incluir información que el usuario o agente no tenga permiso para consultar.

El contexto deberá respetar:

- tenant;
- rol;
- permisos;
- módulo;
- sensibilidad.

---

# 35. Context budget

Cada modelo tendrá límites de contexto.

El Context Engine deberá priorizar:

1. información necesaria;
2. información reciente;
3. información relevante;
4. decisiones importantes;
5. evidencia.

La información redundante deberá reducirse.

---

# 36. Business Brain

Business Brain será una representación dinámica del negocio.

No será simplemente un prompt.

Estará compuesto por:

- datos;
- conocimiento;
- preferencias;
- decisiones;
- objetivos;
- patrones;
- resultados;
- aprendizaje.

---

# 37. Business Brain layers

El Business Brain podrá organizarse conceptualmente en:

## Identity

Quién es el negocio.

## Operations

Cómo funciona.

## Customers

Quiénes son sus clientes.

## Strategy

Qué objetivos persigue.

## Preferences

Cómo quiere trabajar.

## Decisions

Qué decisiones fueron tomadas.

## Patterns

Qué comportamientos aparecen.

## Results

Qué ocurrió.

## Learning

Qué aprendió el sistema.

---

# 38. Facts vs inference

El Business Brain deberá distinguir entre:

- hechos registrados;
- información proporcionada por usuarios;
- información importada;
- inferencias de IA;
- hipótesis;
- recomendaciones.

No deberán tratarse las inferencias como hechos sin marcar su origen.

---

# 39. Confidence

Cuando corresponda, la información derivada podrá conservar:

- confidence;
- source;
- created_at;
- updated_at;
- validation_status.

Esto permitirá distinguir información confirmada de información provisional.

---

# 40. Context snapshots

Las ejecuciones importantes podrán conservar una referencia al contexto utilizado.

No necesariamente se almacenará todo el contenido textual.

El objetivo es poder reconstruir:

- qué fuentes se utilizaron;
- qué versión de contexto;
- qué datos relevantes;
- cuándo.

---

# 41. Context privacy

El contexto enviado a proveedores externos deberá minimizar información sensible.

Cuando sea posible:

- eliminar datos innecesarios;
- anonimizar;
- utilizar identificadores internos;
- reducir contenido;
- aplicar políticas de privacidad.


---

# 42. Memory System

La memoria de IA estará separada en diferentes niveles.

No todo lo que aparece en una conversación debe convertirse en memoria permanente.

---

# 43. Session memory

Memoria temporal de una ejecución o sesión.

Puede incluir:

- objetivo actual;
- pasos realizados;
- resultados temporales;
- tools utilizadas.

Su duración será limitada.

---

# 44. Conversation memory

Memoria relacionada con una conversación.

Puede incluir:

- temas tratados;
- decisiones tomadas durante la conversación;
- contexto inmediato;
- referencias anteriores.

---

# 45. Business memory

Información persistente sobre el negocio.

Ejemplos:

- preferencias;
- políticas;
- objetivos;
- características;
- formas de trabajo.

---

# 46. Decision memory

Conservará decisiones explícitas.

Ejemplos:

"El negocio no quiere publicar los domingos."

"Las promociones deben requerir aprobación."

"El presupuesto máximo de publicidad es X."

Estas decisiones deberán tener origen identificable.

---

# 47. Learning memory

Representará aprendizajes derivados de resultados.

Ejemplos:

- contenido que funcionó;
- promociones con determinado comportamiento;
- preferencias observadas;
- correcciones frecuentes.

El aprendizaje deberá poder revisarse y corregirse.

---

# 48. Memory write policy

La IA no podrá convertir cualquier conversación en memoria permanente automáticamente.

Las reglas determinarán:

- qué puede guardarse;
- qué necesita confirmación;
- qué nunca debe almacenarse;
- cuánto tiempo conservarlo.

---

# 49. Memory retrieval

La recuperación de memoria podrá utilizar:

- filtros estructurados;
- búsqueda textual;
- búsqueda semántica;
- recencia;
- relevancia;
- contexto.

La memoria irrelevante no deberá incorporarse al prompt.

---

# 50. Memory correction

El usuario o sistema deberá poder:

- corregir;
- eliminar;
- invalidar;
- actualizar;

memorias persistentes cuando corresponda.

La IA no deberá tratar una memoria como verdad absoluta si existe evidencia posterior contradictoria.


---

# 51. Autonomy engine

El sistema determinará qué puede hacer la IA de acuerdo con:

- nivel de autonomía;
- usuario;
- negocio;
- módulo;
- Tool;
- riesgo;
- reglas;
- límites.

---

# 52. Autonomy levels

## Level 0

Información.

La IA responde sin realizar acciones.

## Level 1

Recomendación.

La IA propone qué hacer.

## Level 2

Preparación.

La IA prepara una acción.

## Level 3

Ejecución aprobada.

La IA ejecuta después de aprobación.

## Level 4

Automatización supervisada.

La IA puede ejecutar acciones dentro de reglas previamente autorizadas.

## Level 5

Autonomía amplia.

La IA puede ejecutar conjuntos de acciones dentro de límites definidos.

---

# 53. Action policy

Cada acción podrá definir:

- minimum autonomy;
- maximum autonomy;
- requires_approval;
- spending_limit;
- allowed_hours;
- allowed_channels;
- allowed_modules.

---

# 54. Approval object

Una aprobación deberá identificar:

- propuesta;
- usuario solicitante;
- usuario aprobador;
- acción;
- parámetros;
- fecha;
- vencimiento;
- resultado.

---

# 55. Approval expiration

Las aprobaciones podrán expirar.

Una aprobación antigua no deberá ejecutarse automáticamente si:

- cambió el contexto;
- cambió el precio;
- cambió el destinatario;
- cambió el recurso;
- expiró el período.

---

# 56. Approval revalidation

Antes de ejecutar una acción aprobada se deberán volver a validar:

- permisos;
- recurso;
- estado;
- límites;
- parámetros;
- aprobación.

La aprobación no reemplaza las validaciones finales.

---

# 57. Human control

El usuario deberá poder definir:

- qué puede hacer la IA;
- qué requiere aprobación;
- qué no puede hacer;
- límites económicos;
- horarios;
- canales;
- módulos.

La configuración será específica del negocio cuando corresponda.


---

# 58. AI Cost Tracker

Cada ejecución de IA deberá permitir calcular o estimar su costo.

Se registrarán cuando estén disponibles:

- provider;
- model;
- input tokens;
- output tokens;
- cached tokens;
- duración;
- costo;
- moneda.

---

# 59. Cost attribution

Los costos podrán atribuirse a:

- business;
- account;
- module;
- agent;
- task;
- execution;
- provider;
- model.

Esto permitirá conocer cuánto cuesta operar cada parte del producto.

---

# 60. AI budgets

El sistema podrá definir límites de consumo.

Ejemplos:

- límite mensual;
- límite diario;
- límite por módulo;
- límite por usuario;
- límite por ejecución;
- límite monetario.

---

# 61. Cost controls

Antes de una ejecución costosa se podrá comprobar:

- presupuesto disponible;
- costo estimado;
- modelo solicitado;
- límites del negocio.

Si no existe presupuesto suficiente, la operación podrá:

- rechazarse;
- solicitar aprobación;
- utilizar un modelo alternativo;
- reducir el alcance.

---

# 62. AI observability

Cada ejecución deberá permitir observar:

- tiempo;
- modelo;
- proveedor;
- tokens;
- tools;
- errores;
- reintentos;
- resultado;
- costo.

---

# 63. Execution trace

Las ejecuciones complejas deberán poder representarse como una secuencia.

Ejemplo:

Execution
    ├── intent
    ├── context
    ├── model_call
    ├── tool_call
    ├── model_call
    ├── validation
    └── result

Esto facilitará diagnóstico y evaluación.

---

# 64. AI evaluation

La plataforma deberá contar con evaluación de IA.

Se evaluarán:

- exactitud;
- utilidad;
- cumplimiento;
- seguridad;
- tool selection;
- structured output;
- costo;
- latencia.

---

# 65. Evaluation datasets

Podrán existir conjuntos de casos de prueba.

Ejemplos:

- preguntas empresariales;
- generación de contenido;
- análisis de ventas;
- selección de Tool;
- aprobación;
- casos adversariales;
- prompt injection.

Cada versión de un agente podrá evaluarse contra estos casos.

---

# 66. Regression testing

Los cambios en:

- prompts;
- modelos;
- agents;
- Tools;
- schemas;
- contexto;

podrán provocar regresiones.

Las evaluaciones deberán ejecutarse antes de considerar una versión lista para producción.

---

# 67. Human feedback

El usuario podrá proporcionar feedback sobre resultados.

Ejemplos:

- útil;
- no útil;
- incorrecto;
- modificar;
- aprobar;
- rechazar.

Este feedback podrá alimentar el sistema de evaluación y aprendizaje.

---

# 68. Business outcome

Cuando sea posible, la evaluación no deberá quedarse únicamente en la calidad de la respuesta.

También deberá considerar resultados reales.

Ejemplos:

- ventas;
- reservas;
- conversiones;
- respuestas;
- publicaciones;
- reducción de tareas;
- tiempo ahorrado.

Esto permitirá evaluar la IA en relación con el negocio.


---

# 69. Prompt injection

La plataforma deberá asumir que información externa puede contener instrucciones maliciosas.

Posibles fuentes:

- mensajes;
- emails;
- documentos;
- páginas web;
- contenido de clientes;
- archivos;
- publicaciones.

Los datos externos deberán tratarse como datos, no como instrucciones confiables.

---

# 70. Instruction hierarchy

El sistema deberá separar:

1. reglas del sistema;
2. políticas de seguridad;
3. instrucciones del negocio;
4. instrucciones del usuario;
5. información externa;
6. contenido recuperado.

Una fuente externa no podrá sobrescribir reglas de seguridad.

---

# 71. Tool security

Una instrucción obtenida desde un documento, mensaje o página web no podrá otorgar permisos adicionales a una Tool.

Los permisos provendrán del sistema.

---

# 72. Sensitive data

Los modelos no recibirán información sensible innecesaria.

El Context Engine deberá minimizar:

- credenciales;
- tokens;
- secretos;
- datos personales innecesarios;
- información financiera no relevante.

---

# 73. Provider fallback

Si un proveedor falla, el AI Gateway podrá utilizar otro proveedor compatible.

El fallback dependerá de:

- tarea;
- modelo;
- costo;
- disponibilidad;
- capacidades;
- política del negocio.

---

# 74. Retry policy

Los errores transitorios podrán reintentarse.

Ejemplos:

- timeout;
- rate limit;
- error temporal del proveedor.

No deberán reintentarse indiscriminadamente:

- errores de validación;
- permisos;
- solicitudes inválidas;
- Tool failures no recuperables.

---

# 75. Timeout

Las ejecuciones tendrán límites de tiempo.

Cuando se exceda el límite:

- se detendrá la operación;
- se registrará el motivo;
- se determinará si es reintentable;
- se notificará cuando corresponda.

---

# 76. Fallback model

El Model Router podrá definir modelos alternativos.

Ejemplo conceptual:

Primary:
modelo de alta calidad.

Fallback:
modelo de menor costo.

Emergency:
modelo disponible con capacidad suficiente.

La selección dependerá de la política de la tarea.

---

# 77. AI versioning

Se deberán versionar:

- agents;
- prompts;
- tools;
- schemas;
- model policies;
- guardrails;
- context policies.

Una ejecución deberá poder identificar las versiones relevantes.

---

# 78. Prompt management

Los prompts importantes no deberán estar dispersos por el código.

Deberán poder administrarse como componentes versionados.

Cada prompt podrá tener:

- id;
- version;
- purpose;
- variables;
- status;
- created_at.

---

# 79. Structured output

Cuando una salida de IA alimente procesos internos, deberá utilizar schemas estructurados.

Ejemplos:

- recommendation;
- proposal;
- tool call;
- report;
- classification;
- analysis.

El backend validará el resultado antes de utilizarlo.


---

# 80. Separación de capas

La implementación deberá mantener separadas:

AI Gateway

de

Model Router

de

AI Orchestrator

de

Agent Runtime

de

Tool Executor

de

Business Modules.

Ningún proveedor de IA deberá convertirse accidentalmente en parte del dominio empresarial.

---

# 81. Dependencias permitidas

La dirección conceptual será:

API
    ↓
AI Orchestrator
    ↓
Context / Agents / Tools
    ↓
Domain Services
    ↓
Database / Integrations

El dominio empresarial no deberá depender directamente de un proveedor de IA.

---

# 82. AI como infraestructura

La IA será una capacidad transversal de la plataforma.

Los módulos podrán utilizarla mediante contratos.

Ejemplo:

Marketing
    ↓
AI Capability

Agenda
    ↓
AI Capability

Sales
    ↓
AI Capability

Finance
    ↓
AI Capability

Esto evitará duplicar integraciones con modelos dentro de cada módulo.

---

# 83. AI capability registry

Las capacidades de IA podrán registrarse.

Ejemplos:

- analyze_business;
- generate_content;
- summarize_conversation;
- recommend_action;
- classify_customer;
- forecast;
- generate_report;
- prepare_campaign;
- answer_customer.

Los módulos podrán declarar qué capacidades utilizan.

---

# 84. AI execution lifecycle

Una ejecución completa seguirá conceptualmente:

1. request;
2. authentication;
3. authorization;
4. intent;
5. context;
6. agent;
7. model policy;
8. model execution;
9. structured result;
10. validation;
11. approval;
12. tool execution;
13. result validation;
14. audit;
15. memory;
16. learning;
17. response.

No todos los casos necesitarán todos los pasos.

---

# 85. Synchronous execution

Las operaciones simples podrán responder directamente.

Ejemplo:

Usuario:

"¿Cuántas ventas tuve hoy?"

Flujo:

API
→ Orchestrator
→ Context
→ Tool
→ Result
→ Response

---

# 86. Asynchronous execution

Las operaciones largas utilizarán jobs.

Ejemplo:

"Analiza los últimos seis meses y prepara un plan completo."

Flujo:

API
→ Orchestrator
→ Job
→ Worker
→ Agent
→ Tools
→ Result
→ Stored Execution
→ Notification

---

# 87. First AI implementation

La primera implementación técnica deberá priorizar la infraestructura común:

- AI Gateway;
- provider adapter;
- Model Router;
- AI Orchestrator;
- Agent Registry;
- Tool Registry;
- Tool Executor;
- Context Engine;
- AI execution tracking;
- cost tracking;
- approval mechanism.

Después se implementarán agentes y capacidades concretas.

---

# 88. First operational agent

El primer agente operativo será el:

General Business Agent.

Su objetivo será demostrar el flujo completo:

Business
→ Context
→ Analysis
→ Recommendation
→ Proposal
→ Approval
→ Tool
→ Execution
→ Result
→ Audit
→ Learning.

No significa que el resto de agentes quede fuera del producto.

La infraestructura se diseñará desde el comienzo para soportarlos.

---

# 89. Fundamental AI rule

La IA no será una capa mágica que tenga acceso ilimitado al sistema.

Será una capa controlada de:

- razonamiento;
- contexto;
- recomendación;
- preparación;
- coordinación;
- ejecución autorizada;
- aprendizaje.

La IA nunca deberá saltarse:

- permisos;
- reglas;
- límites;
- seguridad;
- aprobaciones;
- integridad de datos.

---

# 90. Regla final de diseño

El sistema deberá permitir reemplazar:

- proveedor;
- modelo;
- agente;
- prompt;
- Tool;
- estrategia de contexto;

sin reconstruir los módulos empresariales.

La IA debe ser potente, pero reemplazable.

El negocio debe continuar funcionando incluso si cambia el proveedor de IA.


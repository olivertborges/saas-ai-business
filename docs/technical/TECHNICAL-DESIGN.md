# Diseño técnico del producto SaaS AI Business

## 1. Objetivo

Este documento transforma la arquitectura conceptual del producto en decisiones técnicas concretas.

Define:

- tecnologías principales;
- responsabilidades de cada componente;
- estructura del sistema;
- criterios de selección tecnológica;
- decisiones técnicas fundamentales;
- principios que deberán respetarse durante el desarrollo.

Este documento será la referencia técnica antes de comenzar la implementación.

La arquitectura deberá permitir construir un producto SaaS:

- multi-tenant;
- modular;
- escalable;
- orientado a IA;
- seguro;
- observable;
- integrable;
- preparado para automatizaciones;
- preparado para múltiples proveedores de IA;
- preparado para múltiples tipos de negocio.

---

# 2. Principios técnicos

Las decisiones técnicas seguirán estos principios:

1. simplicidad donde sea posible;
2. separación clara de responsabilidades;
3. modularidad;
4. seguridad por defecto;
5. aislamiento entre tenants;
6. API como frontera del sistema;
7. base de datos como fuente de verdad;
8. IA desacoplada de proveedores;
9. integraciones desacopladas del núcleo;
10. operaciones críticas auditables;
11. observabilidad desde el comienzo;
12. posibilidad de reemplazar componentes;
13. evitar dependencias innecesarias;
14. evitar sobreingeniería prematura;
15. mantener una ruta clara de crecimiento.

La plataforma debe poder comenzar como un sistema controlado y evolucionar hacia una arquitectura de mayor escala sin tener que reconstruirse completamente.

---

# 3. Stack tecnológico principal

La plataforma utilizará inicialmente el siguiente stack.

## Frontend

- Next.js;
- React;
- TypeScript;
- Tailwind CSS;
- componentes reutilizables;
- aplicación web responsive.

## Backend

- Node.js;
- TypeScript;
- NestJS;
- API HTTP;
- arquitectura modular.

## Base de datos

- PostgreSQL.

## ORM

- Drizzle ORM.

## Cache y trabajos asíncronos

- Redis;
- BullMQ.

## Almacenamiento de archivos

- almacenamiento compatible con S3.

## IA

- AI Gateway propio;
- APIs de proveedores externos;
- modelos intercambiables;
- arquitectura basada en agentes y herramientas.

## Autenticación

- sistema de autenticación desacoplado del frontend;
- sesiones seguras;
- autorización centralizada en backend.

## Infraestructura

- Docker;
- ambientes separados;
- CI/CD;
- servicios desplegables independientemente cuando sea necesario.

---

# 4. Lenguaje principal

TypeScript será el lenguaje principal de la plataforma.

Se utilizará tanto en frontend como en backend y en componentes compartidos cuando resulte conveniente.

Esto permitirá:

- compartir tipos;
- reducir duplicación;
- mantener contratos consistentes;
- reutilizar validaciones;
- facilitar el mantenimiento;
- reducir el cambio de contexto entre frontend y backend.

Python podrá incorporarse posteriormente para componentes especializados de IA, procesamiento de datos o machine learning cuando exista una razón técnica concreta.

Python no será obligatorio para el núcleo inicial.

---

# 5. Frontend

El frontend estará construido con Next.js y React.

Su responsabilidad será:

- presentar la interfaz;
- gestionar navegación;
- mostrar datos;
- recibir acciones del usuario;
- mostrar resultados de IA;
- gestionar estados de interfaz;
- presentar aprobaciones;
- mostrar actividad y resultados;
- comunicarse con la API.

El frontend no será responsable de aplicar las reglas de seguridad fundamentales.

Las validaciones visuales podrán existir para mejorar la experiencia, pero las reglas reales deberán ejecutarse en backend.

---

# 6. Backend

El backend estará construido con NestJS y TypeScript.

Será responsable de:

- autenticación;
- autorización;
- negocios;
- usuarios;
- módulos;
- operaciones;
- clientes;
- ventas;
- agenda;
- finanzas;
- inventario;
- marketing;
- comunicaciones;
- automatizaciones;
- eventos;
- IA;
- integraciones;
- auditoría;
- archivos;
- configuración;
- límites;
- suscripciones.

El backend será la autoridad sobre las operaciones del sistema.

---

# 7. Base de datos

PostgreSQL será la fuente principal de verdad de la plataforma.

La base de datos almacenará:

- cuentas;
- negocios;
- usuarios;
- relaciones usuario-negocio;
- roles;
- permisos;
- módulos;
- clientes;
- productos;
- servicios;
- agenda;
- ventas;
- pagos;
- finanzas;
- inventario;
- contenido;
- campañas;
- conversaciones;
- automatizaciones;
- eventos;
- ejecuciones de IA;
- memoria empresarial;
- auditoría;
- integraciones;
- configuración.

Los datos críticos no dependerán exclusivamente de cache, colas u otros servicios temporales.

---

# 8. Redis

Redis se utilizará para necesidades temporales y de alto rendimiento.

Entre sus posibles usos:

- cache;
- rate limiting;
- locks;
- sesiones cuando corresponda;
- coordinación;
- colas;
- estados temporales;
- procesamiento asíncrono.

Redis no será utilizado como fuente principal de verdad para información empresarial crítica.

---

# 9. Procesamiento asíncrono

BullMQ será utilizado para trabajos que no necesiten bloquear una solicitud HTTP.

Ejemplos:

- generación de contenido;
- procesamiento de archivos;
- envío de mensajes;
- procesamiento de webhooks;
- sincronización con integraciones;
- campañas;
- automatizaciones;
- generación de reportes;
- procesamiento de métricas;
- tareas de IA;
- tareas programadas.

Esto permitirá separar:

Solicitud del usuario

de

Procesamiento pesado.

---

# 10. Arquitectura general

La arquitectura inicial seguirá esta estructura:

Usuario
    ↓
Frontend
    ↓
API
    ↓
Backend
    ↓
Módulos de negocio
    ↓
PostgreSQL

Cuando una operación necesite procesamiento asíncrono:

Backend
    ↓
Redis / BullMQ
    ↓
Worker
    ↓
Módulo correspondiente

Cuando una operación necesite IA:

Frontend
    ↓
API
    ↓
AI Orchestrator
    ↓
Context Engine
    ↓
Agent
    ↓
AI Gateway
    ↓
Modelo
    ↓
Validación
    ↓
Tool
    ↓
Módulo de negocio
    ↓
Resultado
    ↓
Auditoría


---

# 11. Monorepo

El proyecto utilizará inicialmente un monorepo.

La estructura permitirá mantener frontend, backend, paquetes compartidos y herramientas dentro del mismo repositorio.

Estructura conceptual:

saas-ai-business/
├── apps/
│   ├── web/
│   ├── api/
│   └── worker/
│
├── packages/
│   ├── types/
│   ├── validation/
│   ├── config/
│   ├── database/
│   ├── ai/
│   └── ui/
│
├── docs/
├── database/
├── scripts/
├── infrastructure/
└── package.json

La estructura exacta podrá evolucionar durante el diseño técnico.

---

# 12. Aplicación web

`apps/web` contendrá la aplicación utilizada por los usuarios.

Responsabilidades:

- autenticación visual;
- dashboard;
- navegación;
- módulos;
- centro de IA;
- aprobaciones;
- configuraciones;
- reportes;
- notificaciones;
- experiencia responsive.

La aplicación web consumirá la API.

No deberá acceder directamente a tablas internas de PostgreSQL.

---

# 13. API

`apps/api` contendrá el backend principal.

Su estructura estará organizada por dominios y módulos.

Ejemplo conceptual:

apps/api/
├── src/
│   ├── auth/
│   ├── businesses/
│   ├── users/
│   ├── modules/
│   ├── customers/
│   ├── products/
│   ├── services/
│   ├── appointments/
│   ├── sales/
│   ├── finance/
│   ├── inventory/
│   ├── marketing/
│   ├── campaigns/
│   ├── communications/
│   ├── automations/
│   ├── events/
│   ├── analytics/
│   ├── reports/
│   ├── ai/
│   ├── integrations/
│   ├── audit/
│   └── common/
│
└── main.ts

Cada módulo deberá mantener sus responsabilidades claramente separadas.

---

# 14. Worker

`apps/worker` ejecutará trabajos asíncronos.

Ejemplos:

- AI jobs;
- automation jobs;
- notification jobs;
- integration jobs;
- report jobs;
- synchronization jobs;
- scheduled jobs.

El worker utilizará los mismos contratos y paquetes compartidos que la API cuando corresponda.

---

# 15. Paquetes compartidos

Los paquetes compartidos evitarán duplicación entre aplicaciones.

Ejemplos:

## types

Tipos compartidos entre frontend, API y workers.

## validation

Schemas y reglas de validación reutilizables.

## config

Configuración común y manejo de variables de entorno.

## database

Cliente de PostgreSQL, schema y utilidades de acceso a datos.

## ai

Contratos comunes para modelos, agentes, tools, contexto y ejecuciones.

## ui

Componentes visuales reutilizables cuando corresponda.

Los paquetes compartidos no deberán convertirse en un depósito indiscriminado de lógica.

---

# 16. Separación de responsabilidades

Cada capa tendrá una responsabilidad clara.

Frontend:

presentación y experiencia.

API:

entrada y coordinación de operaciones.

Módulos:

reglas del negocio.

Database:

persistencia y restricciones de datos.

Workers:

procesamiento asíncrono.

AI Orchestrator:

coordinación de inteligencia artificial.

Integrations:

comunicación con servicios externos.

Audit:

trazabilidad.

Observability:

estado técnico del sistema.

Ninguna capa deberá asumir permanentemente las responsabilidades de otra.

---

# 17. Regla sobre acceso a datos

El frontend no accederá directamente a PostgreSQL.

Los agentes de IA tampoco accederán directamente a PostgreSQL.

Los agentes utilizarán Tools.

Las Tools utilizarán servicios autorizados del backend.

El flujo será:

Frontend
    ↓
API
    ↓
Service
    ↓
Database

o:

AI Agent
    ↓
Tool
    ↓
Authorized Service
    ↓
Database

Esto permitirá centralizar permisos, validaciones y auditoría.

---

# 18. Regla sobre módulos

Cada módulo deberá poder evolucionar independientemente.

Un módulo deberá definir:

- entidades;
- servicios;
- reglas;
- API;
- eventos;
- permisos;
- herramientas de IA;
- automatizaciones;
- métricas;
- auditoría.

Los módulos podrán comunicarse mediante contratos definidos y eventos.

No se permitirá que un módulo dependa innecesariamente de detalles internos de otro módulo.

---

# 19. Decisión sobre microservicios

El sistema no comenzará dividido en microservicios independientes.

Inicialmente se utilizará una arquitectura modular dentro de un backend principal.

Esto permitirá:

- menor complejidad;
- desarrollo más rápido;
- despliegue más sencillo;
- transacciones más fáciles;
- debugging más sencillo;
- menor costo operacional.

Si posteriormente un componente necesita independencia por:

- escala;
- aislamiento;
- consumo;
- disponibilidad;
- seguridad;
- procesamiento especializado;

podrá extraerse como servicio independiente.

La modularidad será obligatoria desde el comienzo.

Los microservicios no serán obligatorios desde el comienzo.

---

# 20. Regla fundamental de la estructura

La plataforma deberá poder crecer de:

un backend modular

hacia

varios servicios especializados

sin tener que reconstruir el dominio del negocio.

La modularidad precede a la distribución.


---

# 21. Validación

Las entradas del sistema serán validadas antes de llegar a la lógica de negocio.

La validación deberá existir en los límites del sistema.

Se utilizarán schemas tipados para:

- requests;
- responses;
- comandos;
- eventos;
- herramientas de IA;
- configuraciones;
- webhooks;
- integraciones.

La validación del frontend no sustituirá la validación del backend.

---

# 22. Contratos tipados

Los contratos importantes deberán mantenerse tipados.

Esto incluye:

- API;
- eventos;
- jobs;
- Tools;
- agentes;
- integraciones;
- configuraciones.

Cuando resulte conveniente se generarán tipos automáticamente a partir de contratos centrales.

El objetivo es reducir inconsistencias entre frontend, backend y workers.

---

# 23. Configuración

La configuración se manejará mediante variables de entorno y configuración estructurada.

Nunca deberán almacenarse en el repositorio:

- contraseñas;
- API keys;
- tokens;
- secretos OAuth;
- claves privadas;
- credenciales de proveedores.

Los ambientes tendrán configuraciones independientes.

Ejemplos:

- desarrollo;
- testing;
- staging;
- producción.

---

# 24. Archivos

Los archivos de usuarios y negocios no se almacenarán permanentemente dentro del filesystem de la aplicación.

Se utilizará almacenamiento de objetos compatible con S3.

Los registros empresariales conservarán referencias a los archivos.

El sistema deberá contemplar:

- tipo;
- tamaño;
- propietario;
- negocio;
- permisos;
- ubicación;
- fecha;
- estado.

El acceso deberá utilizar URLs controladas o mecanismos equivalentes.

---

# 25. Notificaciones

Las notificaciones se diseñarán como un subsistema independiente.

Podrán originarse desde:

- eventos;
- automatizaciones;
- acciones de usuarios;
- IA;
- integraciones;
- sistema.

Los canales podrán incluir:

- interfaz;
- email;
- WhatsApp;
- otros canales posteriormente.

La generación de una notificación no deberá bloquear innecesariamente la operación principal.

---

# 26. Jobs programados

Las tareas programadas deberán utilizar un mecanismo centralizado.

Ejemplos:

- publicaciones programadas;
- recordatorios;
- reportes;
- sincronizaciones;
- campañas;
- limpieza;
- renovación de tokens;
- análisis periódicos;
- automatizaciones.

Los jobs deberán ser:

- identificables;
- reintentables;
- observables;
- auditables cuando corresponda;
- idempotentes cuando corresponda.

---

# 27. Idempotencia

Las operaciones sensibles deberán poder detectar duplicaciones.

Especialmente:

- pagos;
- publicaciones;
- mensajes;
- webhooks;
- creación de recursos críticos;
- automatizaciones;
- procesamiento de eventos.

Un mismo evento recibido dos veces no deberá producir dos efectos cuando la operación requiera comportamiento idempotente.

---

# 28. Transacciones

Las operaciones que modifiquen varias entidades relacionadas deberán utilizar transacciones cuando sea necesario garantizar consistencia.

Ejemplos:

- registrar venta y actualizar inventario;
- registrar pago y actualizar estado;
- crear reserva y bloquear disponibilidad;
- ejecutar una operación financiera;
- aplicar una acción compuesta de automatización.

Las transacciones deberán ser lo más pequeñas posible.

No se mantendrán transacciones abiertas durante llamadas externas o procesos largos de IA.

---

# 29. Eventos

Los eventos representarán hechos ocurridos en el sistema.

Ejemplos:

- customer.created;
- appointment.created;
- appointment.cancelled;
- sale.created;
- payment.received;
- inventory.low;
- campaign.completed.

Los eventos deberán contener suficiente información para identificar:

- negocio;
- tipo;
- entidad;
- identificador;
- momento;
- origen;
- versión.

Los consumidores deberán poder procesar eventos de manera segura e idempotente.

---

# 30. Logs

Los logs deberán permitir diagnosticar problemas sin exponer información sensible innecesaria.

Deberán incluir contexto técnico suficiente para identificar:

- servicio;
- ambiente;
- operación;
- request;
- job;
- negocio cuando corresponda;
- usuario cuando corresponda;
- error;
- duración.

No deberán registrarse secretos ni credenciales.

La información personal deberá manejarse de acuerdo con las políticas de privacidad del producto.

---

# 31. Observabilidad

Desde las primeras versiones se deberá poder observar:

- errores;
- latencia;
- requests;
- jobs;
- eventos;
- automatizaciones;
- integraciones;
- operaciones de IA;
- consumo de IA;
- costos;
- estado de base de datos;
- disponibilidad.

La observabilidad no se agregará únicamente cuando el sistema esté en producción.

---

# 32. Testing

La plataforma tendrá diferentes niveles de pruebas.

## Unitarias

Para lógica aislada.

## Integración

Para módulos y dependencias reales.

## API

Para contratos y comportamiento HTTP.

## E2E

Para flujos completos.

## IA

Para evaluar:

- calidad;
- cumplimiento de instrucciones;
- selección de herramientas;
- seguridad;
- consistencia;
- costos.

## Seguridad

Para:

- autorización;
- aislamiento de tenants;
- validación;
- exposición de secretos;
- abuso;
- prompt injection.

---

# 33. Regla de calidad

Una funcionalidad no se considerará técnicamente terminada únicamente porque funciona visualmente.

Debe considerar, cuando corresponda:

- lógica;
- validación;
- permisos;
- persistencia;
- errores;
- auditoría;
- observabilidad;
- pruebas;
- seguridad;
- experiencia de usuario.

---

# 34. Decisión técnica fundamental

El sistema se construirá como:

**Monorepo + TypeScript + Next.js + NestJS + PostgreSQL + Redis/BullMQ + almacenamiento S3 + AI Gateway propio + arquitectura modular.**

La arquitectura inicial evitará microservicios prematuros, pero mantendrá fronteras claras que permitan extraer servicios posteriormente.

La prioridad será construir un núcleo sólido y modular capaz de soportar todos los módulos definidos por el producto.


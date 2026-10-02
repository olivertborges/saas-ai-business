# Diseño técnico de API

## 1. Objetivo

Este documento define el diseño concreto de la API de SaaS AI Business.

La API será la frontera entre:

- frontend;
- backend;
- workers;
- AI Orchestrator;
- módulos;
- integraciones;
- automatizaciones;
- servicios externos.

La API deberá representar operaciones del negocio y no simplemente exponer tablas de PostgreSQL.

---

# 2. Principios

La API seguirá estos principios:

1. contratos claros;
2. respuestas consistentes;
3. validación estricta;
4. autorización centralizada;
5. aislamiento multi-tenant;
6. idempotencia cuando corresponda;
7. errores estructurados;
8. versionado;
9. observabilidad;
10. auditoría;
11. compatibilidad evolutiva;
12. seguridad por defecto.

---

# 3. Transporte

La API principal utilizará HTTP sobre HTTPS.

El formato principal será JSON.

Los recursos seguirán convenciones consistentes.

Ejemplo conceptual:

GET /api/v1/customers

POST /api/v1/customers

GET /api/v1/customers/:id

PATCH /api/v1/customers/:id

DELETE /api/v1/customers/:id

---

# 4. Versionado

La API pública utilizará versionado explícito.

Formato:

/api/v1/...

Una nueva versión será necesaria cuando exista un cambio incompatible.

Los cambios compatibles deberán poder incorporarse sin crear innecesariamente una nueva versión.

---

# 5. Contexto del negocio

Las operaciones empresariales deberán ejecutarse dentro del contexto de un negocio.

El backend determinará el `business_id` autorizado a partir de:

- sesión;
- membresía;
- permisos;
- contexto seleccionado.

El frontend no podrá elegir arbitrariamente un `business_id` para acceder a datos.

---

# 6. Autenticación

Las solicitudes protegidas deberán contener una identidad autenticada.

La API deberá poder determinar:

- account;
- business;
- membership;
- role;
- permissions.

Las credenciales no deberán exponerse a módulos ni agentes que no las necesiten.

---

# 7. Autorización

Antes de ejecutar una operación se comprobará:

1. identidad;
2. membresía;
3. negocio;
4. permiso;
5. módulo;
6. estado del recurso;
7. límites;
8. políticas especiales.

La autorización deberá ocurrir en backend.

---

# 8. Recursos principales

La API expondrá recursos relacionados con:

- accounts;
- businesses;
- memberships;
- users;
- roles;
- permissions;
- modules;
- customers;
- products;
- services;
- appointments;
- sales;
- payments;
- finance;
- inventory;
- marketing;
- campaigns;
- communications;
- automations;
- events;
- analytics;
- reports;
- AI;
- integrations;
- notifications;
- audit.

No todos los recursos deberán exponerse directamente al frontend.

---

# 9. CRUD

Los recursos que necesiten operaciones CRUD utilizarán convenciones consistentes.

Ejemplo:

GET /api/v1/customers

POST /api/v1/customers

GET /api/v1/customers/:id

PATCH /api/v1/customers/:id

DELETE /api/v1/customers/:id

Las operaciones de negocio complejas no deberán forzarse artificialmente dentro de CRUD.

---

# 10. Comandos

Cuando una operación represente una acción empresarial, podrá utilizarse un endpoint de comando.

Ejemplos:

POST /api/v1/appointments/:id/confirm

POST /api/v1/appointments/:id/cancel

POST /api/v1/sales/:id/refund

POST /api/v1/campaigns/:id/launch

POST /api/v1/automations/:id/execute

Esto permite representar acciones explícitas en lugar de modificar estados arbitrariamente.


---

# 11. Customers API

Ejemplos:

GET /api/v1/customers

POST /api/v1/customers

GET /api/v1/customers/:id

PATCH /api/v1/customers/:id

DELETE /api/v1/customers/:id

GET /api/v1/customers/:id/history

GET /api/v1/customers/:id/appointments

GET /api/v1/customers/:id/sales

GET /api/v1/customers/:id/conversations

---

# 12. Products API

Ejemplos:

GET /api/v1/products

POST /api/v1/products

GET /api/v1/products/:id

PATCH /api/v1/products/:id

DELETE /api/v1/products/:id

---

# 13. Services API

Ejemplos:

GET /api/v1/services

POST /api/v1/services

GET /api/v1/services/:id

PATCH /api/v1/services/:id

DELETE /api/v1/services/:id

---

# 14. Agenda API

La agenda tendrá operaciones especializadas.

Ejemplos:

GET /api/v1/appointments

POST /api/v1/appointments

GET /api/v1/appointments/:id

PATCH /api/v1/appointments/:id

POST /api/v1/appointments/:id/confirm

POST /api/v1/appointments/:id/cancel

POST /api/v1/appointments/:id/complete

GET /api/v1/availability

POST /api/v1/availability/check

POST /api/v1/appointments/:id/reschedule

---

# 15. Sales API

Ejemplos:

GET /api/v1/sales

POST /api/v1/sales

GET /api/v1/sales/:id

POST /api/v1/sales/:id/cancel

POST /api/v1/sales/:id/refund

GET /api/v1/sales/:id/payments

POST /api/v1/sales/:id/payments

---

# 16. Finance API

Ejemplos:

GET /api/v1/finance/accounts

POST /api/v1/finance/accounts

GET /api/v1/finance/transactions

POST /api/v1/finance/transactions

GET /api/v1/finance/summary

GET /api/v1/finance/categories

---

# 17. Inventory API

Ejemplos:

GET /api/v1/inventory

GET /api/v1/inventory/:productId

POST /api/v1/inventory/adjustments

GET /api/v1/inventory/movements

POST /api/v1/purchases

GET /api/v1/purchases

GET /api/v1/suppliers

---

# 18. Marketing API

Ejemplos:

GET /api/v1/content

POST /api/v1/content

GET /api/v1/content/:id

PATCH /api/v1/content/:id

POST /api/v1/content/:id/generate

GET /api/v1/publications

POST /api/v1/publications

POST /api/v1/publications/:id/schedule

POST /api/v1/publications/:id/publish

---

# 19. Campaigns API

Ejemplos:

GET /api/v1/campaigns

POST /api/v1/campaigns

GET /api/v1/campaigns/:id

PATCH /api/v1/campaigns/:id

POST /api/v1/campaigns/:id/prepare

POST /api/v1/campaigns/:id/launch

POST /api/v1/campaigns/:id/pause

GET /api/v1/campaigns/:id/metrics

---

# 20. Communications API

Ejemplos:

GET /api/v1/conversations

GET /api/v1/conversations/:id

GET /api/v1/conversations/:id/messages

POST /api/v1/conversations/:id/messages

POST /api/v1/conversations/:id/assign

POST /api/v1/conversations/:id/close

La API podrá recibir mensajes provenientes de integraciones mediante endpoints de webhook independientes.


---

# 21. AI API

La IA tendrá una API propia dentro del backend.

La API no expondrá directamente los proveedores de modelos.

El cliente interactuará con conceptos propios del producto.

---

# 22. AI request

Una solicitud de IA podrá representar:

- pregunta;
- análisis;
- recomendación;
- generación;
- preparación de acción;
- ejecución;
- seguimiento.

Ejemplo conceptual:

POST /api/v1/ai/requests

---

# 23. AI analysis

Para análisis empresariales:

POST /api/v1/ai/analyze

La solicitud podrá indicar:

- objetivo;
- módulo;
- período;
- contexto;
- restricciones.

El backend determinará qué información necesita el Context Engine.

---

# 24. AI recommendations

Las recomendaciones podrán representarse como recursos.

POST /api/v1/ai/recommendations

GET /api/v1/ai/recommendations

GET /api/v1/ai/recommendations/:id

Una recomendación podrá tener:

- objetivo;
- explicación;
- evidencia;
- impacto esperado;
- acciones propuestas;
- nivel de autonomía;
- estado.

---

# 25. AI proposals

Cuando la IA prepare una acción pero todavía no deba ejecutarla:

POST /api/v1/ai/proposals

GET /api/v1/ai/proposals

GET /api/v1/ai/proposals/:id

Una propuesta deberá poder mostrar:

- qué hará;
- por qué;
- qué datos utilizó;
- qué herramientas utilizará;
- qué permisos necesita;
- qué impacto puede producir;
- si requiere aprobación.

---

# 26. AI approvals

Ejemplos:

POST /api/v1/ai/proposals/:id/approve

POST /api/v1/ai/proposals/:id/reject

POST /api/v1/ai/proposals/:id/modify

Una aprobación deberá estar asociada a una identidad autorizada.

---

# 27. AI execution

Cuando una acción pueda ejecutarse:

POST /api/v1/ai/executions

GET /api/v1/ai/executions

GET /api/v1/ai/executions/:id

GET /api/v1/ai/executions/:id/steps

La ejecución podrá ser:

- síncrona;
- asíncrona.

Las operaciones largas deberán utilizar jobs.

---

# 28. AI autonomy

La API deberá respetar el nivel de autonomía configurado.

Niveles:

0. información;
1. recomendación;
2. preparación;
3. ejecución con aprobación;
4. automatización supervisada;
5. autonomía amplia.

El backend deberá comprobar el nivel permitido antes de ejecutar una acción.

---

# 29. AI context

El cliente no deberá enviar manualmente todo el Business Brain para cada solicitud.

El backend utilizará:

- business_id;
- objetivo;
- módulo;
- usuario;
- contexto de conversación;
- parámetros;

para construir el contexto necesario.

---

# 30. AI tools

Las Tools no serán endpoints públicos arbitrarios.

Serán capacidades internas controladas.

Una Tool deberá declarar:

- nombre;
- versión;
- descripción;
- schema de entrada;
- schema de salida;
- permisos;
- módulo;
- nivel de riesgo;
- requisitos de aprobación.

---

# 31. AI result

Los resultados deberán ser estructurados cuando formen parte de un proceso del sistema.

Una respuesta podrá contener:

- status;
- explanation;
- data;
- proposed_actions;
- execution_id;
- approval_required;
- warnings.

Esto permitirá que el frontend represente resultados de manera consistente.


---

# 32. Internal events

Los eventos internos no se expondrán necesariamente como endpoints públicos.

Serán generados por operaciones del sistema.

Ejemplos:

customer.created

appointment.created

appointment.cancelled

sale.created

payment.received

inventory.low

campaign.completed

automation.completed

---

# 33. Event consumers

Los consumidores podrán reaccionar a eventos para ejecutar:

- automatizaciones;
- notificaciones;
- métricas;
- IA;
- sincronizaciones;
- tareas asíncronas.

Los consumidores deberán ser idempotentes cuando el evento pueda procesarse más de una vez.

---

# 34. External webhooks

Las integraciones externas utilizarán endpoints específicos.

Ejemplos conceptuales:

POST /api/v1/webhooks/whatsapp/:connection

POST /api/v1/webhooks/stripe/:connection

POST /api/v1/webhooks/meta/:connection

POST /api/v1/webhooks/email/:connection

La implementación concreta dependerá del proveedor.

---

# 35. Webhook security

Cada webhook deberá validar cuando el proveedor lo permita:

- firma;
- secreto;
- timestamp;
- origen;
- estructura;
- identificador del evento.

Un webhook inválido no deberá ejecutar operaciones empresariales.

---

# 36. Webhook idempotency

Los webhooks deberán registrar identificadores externos cuando existan.

Antes de procesar un evento deberá comprobarse si ya fue procesado.

Esto evitará:

- pagos duplicados;
- mensajes duplicados;
- publicaciones duplicadas;
- cambios de estado repetidos.

---

# 37. Background jobs

Los procesos pesados podrán convertirse en jobs.

Ejemplo:

POST /api/v1/ai/executions

Respuesta inicial:

{
  "id": "...",
  "status": "queued"
}

Posteriormente:

GET /api/v1/ai/executions/:id

permitirá consultar el resultado.

---

# 38. Job status

Los jobs podrán tener estados:

- queued;
- running;
- completed;
- failed;
- cancelled;
- retrying.

Los errores deberán conservar suficiente información para diagnóstico sin exponer secretos.

---

# 39. Retries

Los trabajos recuperables podrán reintentarse.

El número de reintentos dependerá del tipo de operación.

No deberán reintentarse ciegamente operaciones que puedan producir efectos duplicados.

La idempotencia deberá determinar si un retry es seguro.

---

# 40. Dead letter

Los trabajos que no puedan completarse después de los reintentos definidos podrán enviarse a una cola de fallos.

Esto permitirá:

- investigación;
- re-procesamiento;
- diagnóstico;
- auditoría.

---

# 41. Scheduling

Los procesos programados utilizarán jobs con fecha o recurrencia.

Ejemplos:

- publicación futura;
- recordatorio;
- reporte diario;
- análisis semanal;
- sincronización;
- automatización recurrente.

---

# 42. Regla de procesamiento

Una solicitud HTTP no deberá mantenerse abierta innecesariamente esperando:

- generación larga de IA;
- campañas;
- sincronizaciones;
- reportes complejos;
- procesamiento de archivos;
- múltiples integraciones.

Cuando el proceso sea largo:

API → Job → Worker → Resultado.


---

# 43. Paginación

Las colecciones deberán utilizar paginación.

Inicialmente podrá utilizarse:

- limit;
- cursor.

Para conjuntos pequeños podrá aceptarse paginación basada en página cuando resulte conveniente.

---

# 44. Cursor pagination

Para grandes volúmenes se preferirá cursor pagination.

Ejemplo:

GET /api/v1/customers?limit=50&cursor=...

La respuesta podrá incluir:

{
  "data": [],
  "pagination": {
    "next_cursor": "...",
    "has_more": true
  }
}

---

# 45. Filters

Los recursos podrán admitir filtros controlados.

Ejemplos:

GET /api/v1/appointments?status=confirmed

GET /api/v1/sales?from=2026-01-01&to=2026-01-31

GET /api/v1/customers?tag=vip

Los filtros disponibles deberán estar definidos por recurso.

No se permitirá ejecutar consultas arbitrarias desde parámetros del cliente.

---

# 46. Sorting

Los recursos podrán permitir ordenamiento sobre campos autorizados.

Ejemplo:

?sort=created_at

?sort=-created_at

Los campos disponibles deberán estar explícitamente definidos.

---

# 47. Search

Cuando un recurso necesite búsqueda textual:

GET /api/v1/customers?search=nombre

La búsqueda deberá implementarse mediante mecanismos controlados.

No se utilizarán consultas SQL construidas directamente desde input del usuario.

---

# 48. Respuestas exitosas

Las respuestas deberán mantener estructuras consistentes.

Ejemplo:

{
  "data": {
    "id": "...",
    "name": "..."
  }
}

Las colecciones utilizarán:

{
  "data": [],
  "pagination": {}
}

---

# 49. Errores

Los errores deberán utilizar una estructura consistente.

Ejemplo:

{
  "error": {
    "code": "CUSTOMER_NOT_FOUND",
    "message": "Customer not found",
    "details": {}
  }
}

El código será estable para que el frontend pueda reaccionar sin depender del texto.

---

# 50. Errores de validación

Ejemplo:

{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": {
      "fields": {
        "email": [
          "Invalid email"
        ]
      }
    }
  }
}

---

# 51. Errores de autorización

La API distinguirá conceptualmente entre:

- no autenticado;
- no autorizado;
- recurso inexistente;
- operación no permitida.

No deberá revelar información sensible sobre recursos que el usuario no puede consultar.

---

# 52. Request ID

Cada solicitud deberá poder identificarse mediante un request ID.

Esto permitirá relacionar:

- request;
- logs;
- errores;
- jobs;
- auditoría;
- operaciones de IA.

---

# 53. Idempotency-Key

Las operaciones críticas podrán aceptar:

Idempotency-Key

Ejemplos:

- pagos;
- publicaciones;
- mensajes;
- creación de operaciones críticas;
- comandos externos.

El backend conservará temporalmente la relación entre la clave y el resultado.

---

# 54. Rate limiting

La API aplicará límites de frecuencia.

Los límites podrán depender de:

- IP;
- cuenta;
- negocio;
- endpoint;
- tipo de operación;
- plan;
- riesgo.

Las operaciones de IA podrán tener límites adicionales por costo.


---

# 55. Documentación de API

La API deberá disponer de documentación técnica generada a partir de los contratos.

Se utilizará OpenAPI cuando corresponda.

La documentación deberá permitir conocer:

- endpoint;
- método;
- parámetros;
- autenticación;
- permisos;
- request;
- response;
- errores;
- ejemplos.

---

# 56. Compatibilidad

Los cambios de API deberán clasificarse como:

- compatibles;
- potencialmente incompatibles;
- incompatibles.

Los cambios incompatibles deberán utilizar una estrategia explícita de versionado o migración.

---

# 57. Seguridad de API

La API deberá protegerse contra:

- acceso no autorizado;
- escalación de privilegios;
- inyección;
- abuso;
- replay;
- exposición de secretos;
- manipulación de parámetros;
- acceso cross-tenant;
- ejecución no autorizada de Tools.

---

# 58. API interna

Algunos servicios internos podrán utilizar contratos diferentes de la API pública.

Sin embargo, deberán mantener:

- autenticación interna cuando corresponda;
- autorización;
- validación;
- observabilidad;
- versionado cuando sea necesario.

---

# 59. Regla sobre base de datos

La API no será un espejo de PostgreSQL.

No se creará automáticamente un endpoint para cada tabla.

La API representará:

- recursos;
- operaciones;
- comandos;
- procesos;
- resultados.

Esto permitirá mantener el dominio del negocio independiente de la estructura física de la base de datos.

---

# 60. Regla sobre IA

La API tampoco será un simple proxy hacia un proveedor de IA.

El cliente hablará con conceptos propios:

- análisis;
- recomendaciones;
- propuestas;
- aprobaciones;
- ejecuciones;
- resultados.

El AI Gateway y los proveedores serán detalles internos de implementación.

---

# 61. Regla fundamental

La API debe representar las capacidades reales del negocio de forma segura, consistente y evolutiva.

Su responsabilidad no es solamente transportar datos.

Debe proteger:

- identidad;
- permisos;
- contexto del negocio;
- reglas;
- integridad;
- operaciones;
- IA;
- integraciones;
- trazabilidad.


# Diseño técnico de base de datos

## 1. Objetivo

Este documento define el modelo técnico de datos de SaaS AI Business.

Su objetivo es transformar la arquitectura de datos conceptual en un diseño implementable.

Define:

- entidades;
- relaciones;
- claves;
- índices;
- aislamiento multi-tenant;
- permisos;
- auditoría;
- eventos;
- integridad;
- evolución del esquema.

Este documento será la referencia antes de crear las migraciones reales de PostgreSQL.

---

# 2. Base tecnológica

La base de datos principal será:

- PostgreSQL.

El acceso desde backend utilizará:

- Drizzle ORM.

PostgreSQL será la fuente de verdad de los datos empresariales.

Redis no reemplazará datos persistentes.

---

# 3. Principios de modelado

El modelo deberá:

1. representar entidades reales del negocio;
2. evitar duplicación innecesaria;
3. mantener relaciones explícitas;
4. utilizar identificadores estables;
5. garantizar integridad referencial;
6. soportar multi-tenancy;
7. permitir evolución;
8. conservar trazabilidad cuando sea necesario;
9. evitar depender de estructuras específicas del frontend;
10. mantener separadas las responsabilidades de cada dominio.

---

# 4. Identificadores

Las entidades principales utilizarán UUID como identificador.

Los identificadores deberán ser:

- únicos;
- no predecibles;
- independientes de la posición del registro;
- utilizables entre servicios.

No se utilizarán identificadores autoincrementales expuestos públicamente como identificadores principales de recursos.

---

# 5. Multi-tenancy

El negocio será la unidad principal de aislamiento empresarial.

Las entidades pertenecientes a un negocio deberán contener una referencia a:

`business_id`

cuando corresponda.

Ejemplo:

businesses
    ↓
customers
    ↓
appointments
    ↓
sales

Los datos de un negocio nunca deberán ser accesibles desde otro negocio.

---

# 6. Account

La cuenta representa la identidad principal utilizada para acceder a la plataforma.

Entidad conceptual:

accounts

Campos principales:

- id;
- email;
- status;
- created_at;
- updated_at.

La cuenta representa al usuario de la plataforma y no necesariamente al negocio.

Una cuenta podrá participar en uno o varios negocios.

---

# 7. Business

La entidad `businesses` representa un negocio dentro de la plataforma.

Campos conceptuales:

- id;
- name;
- legal_name;
- slug;
- business_type;
- status;
- country;
- timezone;
- currency;
- locale;
- contact_email;
- contact_phone;
- website;
- created_at;
- updated_at.

El negocio será el tenant principal de la plataforma.

---

# 8. Business settings

La configuración específica del negocio se mantendrá separada cuando resulte conveniente.

Podrá incluir:

- identidad visual;
- horarios;
- preferencias;
- configuración regional;
- reglas;
- preferencias de IA;
- límites;
- configuración operativa.

No se deberá convertir `businesses` en una tabla con cientos de columnas de configuración.

---

# 9. Business membership

La relación entre cuentas y negocios se representará mediante una entidad intermedia.

Entidad conceptual:

business_memberships

Campos principales:

- id;
- business_id;
- account_id;
- role_id;
- status;
- joined_at;
- created_at;
- updated_at.

Esto permitirá que una misma cuenta tenga diferentes roles en diferentes negocios.

---

# 10. Roles

Los roles estarán separados de las cuentas.

Entidades conceptuales:

roles

permissions

role_permissions

Los permisos deberán poder representar acciones concretas.

Ejemplos:

- customers.read;
- customers.create;
- customers.update;
- sales.read;
- sales.create;
- finance.read;
- finance.approve;
- ai.execute;
- automation.execute.

---

# 11. Permisos

Los permisos serán evaluados en backend.

Una operación deberá comprobar:

- identidad;
- negocio;
- membresía;
- rol;
- permiso;
- módulo;
- estado del recurso;
- límites aplicables.

El frontend podrá ocultar acciones no disponibles, pero no será responsable de hacer cumplir la autorización.

---

# 12. Modules

Los módulos disponibles para la plataforma estarán representados por un catálogo.

Entidad conceptual:

modules

Ejemplos:

- dashboard;
- customers;
- agenda;
- sales;
- finance;
- inventory;
- marketing;
- social;
- campaigns;
- communications;
- automations;
- analytics;
- reports;
- ai.

---

# 13. Business modules

La activación de módulos por negocio se almacenará mediante una relación independiente.

Entidad conceptual:

business_modules

Campos principales:

- id;
- business_id;
- module_id;
- status;
- configuration;
- activated_at;
- deactivated_at;
- created_at;
- updated_at.

Esto permitirá activar o desactivar funcionalidades sin alterar la estructura principal del negocio.

---

# 14. Configuración modular

La configuración específica de un módulo podrá almacenarse en estructuras propias del módulo.

Cuando la configuración tenga estructura estable, se utilizarán columnas tipadas.

Cuando sea necesario almacenar configuración flexible, podrá utilizarse JSONB.

JSONB no deberá utilizarse para reemplazar entidades relacionales claramente definidas.

---

# 15. Integridad multi-tenant

Toda relación entre entidades empresariales deberá comprobar que pertenece al mismo negocio.

Ejemplo:

Una venta de `business_id = A` no podrá asociarse a un cliente de `business_id = B`.

Estas restricciones deberán protegerse mediante:

- diseño de claves;
- validaciones de backend;
- constraints;
- políticas de acceso;
- RLS cuando corresponda.

---

# 16. Regla fundamental

El aislamiento entre negocios será una propiedad estructural del sistema.

No dependerá únicamente de filtros agregados por el frontend.


---

# 17. Customers

La entidad `customers` representará personas o entidades que mantienen una relación comercial con el negocio.

Campos conceptuales:

- id;
- business_id;
- name;
- email;
- phone;
- status;
- notes;
- source;
- created_at;
- updated_at.

Información adicional podrá separarse cuando tenga suficiente complejidad.

---

# 18. Customer attributes

Los clientes podrán tener información adicional:

- etiquetas;
- preferencias;
- historial;
- segmentación;
- datos de contacto adicionales;
- consentimientos;
- campos personalizados.

Las funcionalidades complejas deberán utilizar entidades relacionadas en lugar de convertir `customers` en una tabla excesivamente amplia.

---

# 19. Customer tags

Se utilizará un modelo de etiquetas reutilizable.

Entidades conceptuales:

customer_tags

customer_tag_assignments

Esto permitirá:

- segmentación;
- automatizaciones;
- campañas;
- filtros;
- personalización de comunicaciones.

---

# 20. Products

La entidad `products` representará productos comercializados por el negocio.

Campos conceptuales:

- id;
- business_id;
- name;
- description;
- sku;
- price;
- cost;
- status;
- category_id;
- created_at;
- updated_at.

Los valores monetarios deberán utilizar tipos adecuados para evitar errores de precisión.

---

# 21. Services

La entidad `services` representará servicios ofrecidos por el negocio.

Campos conceptuales:

- id;
- business_id;
- name;
- description;
- price;
- duration;
- status;
- category_id;
- created_at;
- updated_at.

Un servicio podrá participar en:

- agenda;
- ventas;
- promociones;
- marketing;
- análisis.

---

# 22. Categories

Productos y servicios podrán utilizar categorías.

Entidad conceptual:

categories

La categoría deberá pertenecer al negocio cuando sea una categoría personalizada del negocio.

---

# 23. Staff

Las personas que ejecutan servicios u operaciones dentro del negocio deberán representarse mediante una relación con usuarios o miembros del negocio.

No se deberá duplicar innecesariamente la identidad de una persona.

La estructura deberá permitir distinguir:

- usuario del sistema;
- miembro del negocio;
- profesional/staff;
- cliente.

---

# 24. Appointments

La entidad `appointments` representará reservas o citas.

Campos conceptuales:

- id;
- business_id;
- customer_id;
- staff_id;
- start_at;
- end_at;
- status;
- notes;
- source;
- created_at;
- updated_at.

El estado podrá representar situaciones como:

- scheduled;
- confirmed;
- completed;
- cancelled;
- no_show.

---

# 25. Appointment services

Una cita podrá contener uno o varios servicios.

Entidad conceptual:

appointment_services

Campos principales:

- id;
- appointment_id;
- service_id;
- quantity;
- unit_price;
- duration;
- created_at.

El precio utilizado en una cita deberá poder conservar el valor aplicado en ese momento.

Esto evita que cambiar posteriormente el precio del servicio modifique históricamente una cita.

---

# 26. Disponibilidad

La disponibilidad deberá modelarse separadamente de las citas.

Podrá contemplar:

- horarios habituales;
- excepciones;
- días cerrados;
- vacaciones;
- bloqueos;
- disponibilidad específica del staff.

La disponibilidad no deberá inferirse únicamente de las citas existentes.

---

# 27. Agenda

La agenda será un dominio compuesto por:

- disponibilidad;
- profesionales;
- citas;
- servicios;
- clientes;
- bloqueos.

El módulo de agenda será responsable de las reglas relacionadas con disponibilidad y reservas.

---

# 28. Regla histórica

Los datos históricos importantes deberán conservar el valor utilizado en el momento de la operación.

Ejemplos:

- precio de venta;
- precio de servicio;
- descuento;
- impuestos;
- comisión;
- duración aplicada.

No se deberá depender exclusivamente de consultar el estado actual de otra entidad.


---

# 29. Sales

La entidad `sales` representará operaciones comerciales.

Campos conceptuales:

- id;
- business_id;
- customer_id;
- status;
- subtotal;
- discount;
- tax;
- total;
- currency;
- sold_at;
- created_at;
- updated_at.

---

# 30. Sale items

Los productos y servicios vendidos estarán representados mediante:

sale_items

Campos conceptuales:

- id;
- sale_id;
- item_type;
- product_id;
- service_id;
- description;
- quantity;
- unit_price;
- discount;
- total.

El registro deberá conservar la información necesaria para reconstruir la venta histórica.

---

# 31. Payments

Los pagos estarán separados de las ventas.

Entidad conceptual:

payments

Campos principales:

- id;
- business_id;
- sale_id;
- amount;
- currency;
- method;
- status;
- external_reference;
- paid_at;
- created_at.

Una venta podrá tener uno o varios pagos.

---

# 32. Payment methods

Los métodos de pago podrán representar:

- efectivo;
- tarjeta;
- transferencia;
- medios digitales;
- proveedores externos.

Los proveedores externos deberán poder guardar referencias externas sin convertirlas en la identidad principal del pago.

---

# 33. Finance accounts

El módulo financiero podrá representar cuentas internas del negocio.

Ejemplos:

- caja;
- banco;
- cuenta digital;
- tarjeta empresarial.

Entidad conceptual:

finance_accounts

---

# 34. Financial transactions

Las entradas y salidas financieras se representarán mediante una entidad de movimientos.

Campos conceptuales:

- id;
- business_id;
- account_id;
- type;
- category_id;
- amount;
- currency;
- description;
- reference_type;
- reference_id;
- occurred_at;
- created_at.

Tipos posibles:

- income;
- expense;
- transfer;
- adjustment.

---

# 35. Financial categories

Las categorías financieras permitirán clasificar:

- ventas;
- compras;
- salarios;
- publicidad;
- alquiler;
- servicios;
- impuestos;
- otros gastos.

Cada negocio podrá tener categorías propias.

---

# 36. Inventory

El inventario se separará de los productos.

Una entidad de inventario podrá representar la existencia de un producto en una ubicación.

Campos conceptuales:

- id;
- business_id;
- product_id;
- location_id;
- quantity;
- minimum_quantity;
- updated_at.

---

# 37. Inventory movements

Los cambios de inventario deberán quedar registrados.

Entidad:

inventory_movements

Ejemplos:

- purchase;
- sale;
- adjustment;
- return;
- transfer;
- loss.

Campos principales:

- id;
- business_id;
- product_id;
- location_id;
- quantity;
- movement_type;
- reference_type;
- reference_id;
- occurred_at;
- created_at.

---

# 38. Suppliers

Los proveedores podrán representarse mediante:

suppliers

Campos conceptuales:

- id;
- business_id;
- name;
- contact;
- status;
- created_at;
- updated_at.

---

# 39. Purchases

Las compras de inventario podrán representarse mediante:

purchases

purchase_items

Esto permitirá relacionar:

- proveedor;
- productos;
- cantidades;
- costos;
- pagos;
- movimientos de inventario.

---

# 40. Regla financiera

Las operaciones financieras deberán mantener:

- monto;
- moneda;
- fecha;
- origen;
- referencia;
- estado;
- trazabilidad.

Los importes no deberán almacenarse como valores de texto.

---

# 41. Regla de inventario

El inventario actual deberá poder reconstruirse a partir de movimientos cuando sea necesario.

Las operaciones críticas de inventario deberán generar movimientos auditables.


---

# 42. Marketing content

El contenido generado o administrado por el negocio tendrá una entidad propia.

Entidad conceptual:

contents

Podrá incluir:

- título;
- cuerpo;
- formato;
- estado;
- autor;
- origen;
- campaña;
- fecha;
- metadata.

El origen podrá distinguir:

- human;
- ai;
- imported;
- integration.

---

# 43. Content versions

El contenido importante podrá conservar versiones.

Entidad:

content_versions

Esto permitirá:

- historial;
- comparación;
- restauración;
- auditoría;
- evaluación de cambios realizados por IA.

---

# 44. Publications

La publicación de contenido estará separada del contenido original.

Entidad:

publications

Una publicación podrá relacionarse con:

- contenido;
- canal;
- cuenta externa;
- fecha programada;
- estado;
- resultado externo.

Esto permite que un mismo contenido pueda utilizarse en diferentes canales.

---

# 45. Campaigns

Las campañas representarán iniciativas de marketing.

Campos conceptuales:

- id;
- business_id;
- name;
- objective;
- status;
- budget;
- start_at;
- end_at;
- created_at;
- updated_at.

---

# 46. Campaign audiences

Las audiencias podrán utilizar:

- clientes;
- segmentos;
- etiquetas;
- criterios;
- audiencias externas.

Las audiencias no deberán depender únicamente de una lista estática cuando puedan derivarse mediante criterios.

---

# 47. Campaign metrics

Las métricas de campañas deberán poder registrar:

- impresiones;
- alcance;
- interacciones;
- clics;
- conversiones;
- ingresos;
- costo;
- otros indicadores relevantes.

Los datos externos deberán conservar referencia a su fuente cuando corresponda.

---

# 48. Communications

Las conversaciones estarán representadas mediante:

conversations

y los mensajes mediante:

messages

Una conversación deberá pertenecer a un negocio.

Podrá estar asociada a:

- cliente;
- canal;
- usuario;
- agente de IA.

---

# 49. Conversation messages

Los mensajes podrán contener:

- dirección;
- contenido;
- tipo;
- estado;
- remitente;
- timestamp;
- referencia externa.

El sistema deberá distinguir entre:

- mensaje entrante;
- mensaje saliente;
- mensaje generado por usuario;
- mensaje generado por IA;
- mensaje proveniente de integración.

---

# 50. Channels

Los canales externos estarán representados por conexiones configurables.

Ejemplos:

- WhatsApp;
- Instagram;
- Facebook;
- email;
- sitio web.

Un negocio podrá tener múltiples conexiones.

---

# 51. External identities

Las identidades externas deberán almacenarse separadamente de las entidades internas.

Ejemplo:

Un cliente interno podrá estar relacionado con una identidad externa de WhatsApp y otra de Instagram.

Esto evita convertir un identificador externo en la identidad principal del cliente.

---

# 52. Campaign executions

Cuando una campaña produzca acciones concretas, podrán registrarse ejecuciones separadas.

Esto permitirá conocer:

- qué se ejecutó;
- cuándo;
- en qué canal;
- con qué contenido;
- resultado;
- error;
- origen.

---

# 53. Regla de comunicaciones

Las conversaciones y mensajes deben conservar suficiente contexto para continuar una relación comercial.

La información externa deberá mantenerse separada de la identidad interna del negocio.


---

# 54. Business Brain

Business Brain no será una única tabla gigante.

Será una capa compuesta por información proveniente de diferentes entidades y registros especializados.

Podrá incluir:

- información del negocio;
- preferencias;
- conocimiento;
- decisiones;
- patrones;
- objetivos;
- contexto operacional;
- resultados;
- aprendizaje.

---

# 55. Business knowledge

El conocimiento explícito del negocio podrá almacenarse mediante una entidad especializada.

Campos conceptuales:

- id;
- business_id;
- type;
- title;
- content;
- source;
- confidence;
- status;
- created_at;
- updated_at.

El contenido podrá utilizar estructuras adecuadas para búsqueda y recuperación.

---

# 56. Business decisions

Las decisiones importantes podrán conservarse.

Ejemplos:

- estrategia adoptada;
- preferencia comercial;
- regla operativa;
- decisión aprobada;
- configuración estratégica.

Esto permitirá que la IA no vuelva a preguntar continuamente por decisiones ya tomadas.

---

# 57. Business insights

Los análisis relevantes podrán almacenarse como insights.

Podrán incluir:

- observación;
- evidencia;
- período;
- fuente;
- estado;
- resultado posterior.

Los insights generados por IA deberán distinguirse de hechos directamente registrados por el negocio.

---

# 58. AI executions

Cada ejecución significativa de IA podrá registrarse.

Campos conceptuales:

- id;
- business_id;
- account_id;
- agent;
- model;
- provider;
- task;
- status;
- input_reference;
- output_reference;
- tokens_input;
- tokens_output;
- duration_ms;
- estimated_cost;
- created_at.

No será obligatorio almacenar todo el prompt completo si hacerlo supone riesgos de privacidad o seguridad.

---

# 59. AI execution steps

Una ejecución compleja podrá tener múltiples pasos.

Entidad:

ai_execution_steps

Esto permitirá registrar:

- agente;
- herramienta;
- modelo;
- acción;
- duración;
- resultado;
- error;
- costo.

Esto será especialmente importante para el AI Orchestrator.

---

# 60. AI approvals

Las acciones de IA que requieran aprobación podrán representarse mediante:

ai_approvals

Campos conceptuales:

- id;
- business_id;
- execution_id;
- requested_by;
- approved_by;
- status;
- expires_at;
- decision_at;
- created_at.

---

# 61. AI memory

La memoria de IA se dividirá conceptualmente.

Tipos:

- session;
- conversation;
- business;
- decision;
- learning;
- operational.

No toda memoria deberá almacenarse de la misma manera.

---

# 62. Embeddings

Si se utilizan embeddings, estos se almacenarán únicamente para información que realmente necesite búsqueda semántica.

La infraestructura podrá utilizar capacidades vectoriales de PostgreSQL.

Los embeddings no reemplazarán las relaciones estructuradas de la base de datos.

---

# 63. Automations

Las automatizaciones tendrán una definición persistente.

Campos conceptuales:

- id;
- business_id;
- name;
- status;
- trigger;
- conditions;
- actions;
- limits;
- approval_policy;
- schedule;
- created_at;
- updated_at.

---

# 64. Automation executions

Cada ejecución de automatización podrá registrarse separadamente.

Campos:

- id;
- automation_id;
- business_id;
- trigger_event_id;
- status;
- started_at;
- completed_at;
- error;
- result.

---

# 65. Events

Los eventos persistentes podrán representarse mediante una entidad de eventos.

Campos conceptuales:

- id;
- business_id;
- event_type;
- entity_type;
- entity_id;
- payload;
- version;
- occurred_at;
- created_at.

El payload deberá mantenerse controlado y validado.

---

# 66. Event processing

Cuando sea necesario garantizar procesamiento confiable, podrá utilizarse un patrón de outbox.

Una operación de negocio podrá:

1. modificar los datos;
2. registrar el evento;
3. confirmar la transacción;
4. procesar el evento posteriormente.

Esto evita perder eventos cuando la operación principal se confirma correctamente.

---

# 67. AI y datos empresariales

La IA no será la fuente principal de verdad.

La base de datos empresarial seguirá siendo la autoridad.

La IA:

- consulta;
- interpreta;
- propone;
- coordina;
- ejecuta mediante Tools;
- analiza resultados;
- registra aprendizaje.

La IA no deberá convertirse en una base de datos paralela no controlada.


---

# 68. Audit log

Las operaciones importantes deberán poder registrarse.

Entidad:

audit_logs

Campos conceptuales:

- id;
- business_id;
- account_id;
- action;
- entity_type;
- entity_id;
- module;
- origin;
- metadata;
- created_at.

El campo `origin` podrá distinguir:

- user;
- ai;
- automation;
- integration;
- system.

---

# 69. Auditoría de IA

Cuando una IA realice una acción sobre el sistema, deberá ser posible determinar:

- qué usuario la autorizó;
- qué agente actuó;
- qué herramienta se utilizó;
- qué entidad fue modificada;
- cuándo ocurrió;
- qué aprobación existió;
- cuál fue el resultado.

---

# 70. Soft delete

No todas las entidades utilizarán eliminación física inmediata.

Para información empresarial importante podrá utilizarse:

- deleted_at;
- archived_at;
- status.

La estrategia dependerá del dominio.

Los registros financieros y de auditoría tendrán requisitos especiales de conservación.

---

# 71. Timestamps

Las entidades principales deberán utilizar timestamps consistentes.

Como regla general:

- created_at;
- updated_at.

Las entidades operacionales podrán incluir además:

- occurred_at;
- started_at;
- completed_at;
- cancelled_at.

---

# 72. Timezone

Los timestamps se almacenarán de forma consistente, preferentemente en UTC.

Cada negocio conservará su timezone.

La interfaz convertirá las fechas al timezone del negocio cuando corresponda.

---

# 73. Monedas

Los negocios tendrán una moneda principal.

Las operaciones monetarias deberán conservar la moneda utilizada cuando exista posibilidad de múltiples monedas.

No se deberá asumir que todos los negocios utilizan la misma moneda.

---

# 74. Índices

Los índices deberán diseñarse a partir de consultas reales.

Serán especialmente importantes las búsquedas por:

- business_id;
- customer_id;
- appointment dates;
- status;
- created_at;
- updated_at;
- external identifiers;
- event type;
- automation status.

No se crearán índices indiscriminadamente.

---

# 75. Índices multi-tenant

Las consultas empresariales frecuentes deberán considerar `business_id` en sus índices.

Ejemplo conceptual:

business_id + created_at

business_id + status

business_id + customer_id

Esto permitirá mantener buen rendimiento cuando el volumen crezca.

---

# 76. Restricciones

Cuando una regla pueda garantizarse directamente en PostgreSQL, se utilizarán:

- foreign keys;
- unique constraints;
- check constraints;
- not null;
- índices únicos;
- constraints compuestos.

Las reglas críticas no dependerán únicamente del código de aplicación.

---

# 77. RLS

El sistema deberá evaluar Row Level Security de PostgreSQL para reforzar el aislamiento multi-tenant.

La política deberá impedir que una sesión pueda consultar o modificar datos de otro negocio.

RLS complementará, pero no reemplazará:

- autorización de aplicación;
- roles;
- permisos;
- validaciones;
- aislamiento lógico.

---

# 78. Migraciones

Todas las modificaciones del esquema serán gestionadas mediante migraciones versionadas.

Las migraciones deberán ser:

- reproducibles;
- ordenadas;
- revisables;
- reversibles cuando sea razonable;
- compatibles con el proceso de despliegue.

No se realizarán cambios manuales permanentes sobre producción sin una migración equivalente.

---

# 79. Seed data

Los datos iniciales controlados podrán gestionarse mediante seeds.

Ejemplos:

- permisos;
- módulos;
- roles del sistema;
- configuraciones iniciales.

Los seeds deberán distinguirse de datos reales de negocios.

---

# 80. Backup

La base de datos deberá contar con:

- backups automáticos;
- política de retención;
- almacenamiento protegido;
- pruebas de restauración.

Un backup no se considerará confiable hasta comprobar que puede restaurarse.

---

# 81. Evolución del esquema

El modelo deberá evolucionar mediante cambios incrementales.

Antes de agregar una nueva tabla deberá comprobarse:

1. si ya existe una entidad adecuada;
2. si la funcionalidad pertenece realmente al dominio;
3. si puede reutilizarse una relación existente;
4. si el cambio afecta a otros módulos;
5. si necesita migración de datos;
6. si requiere actualización de índices o políticas RLS.

---

# 82. Regla fundamental de la base de datos

La base de datos debe representar el negocio real y proteger su integridad.

El frontend representa la experiencia.

La API representa las operaciones.

La IA representa razonamiento y coordinación.

Pero PostgreSQL mantiene la verdad persistente del negocio.


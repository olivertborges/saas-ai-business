# SaaS AI Business — Arquitectura de Datos

## 1. Objetivo

Definir las entidades principales de la plataforma y sus relaciones.

El modelo deberá soportar:

- múltiples negocios;
- múltiples usuarios;
- módulos independientes;
- operaciones empresariales;
- Business Brain;
- inteligencia artificial;
- automatizaciones;
- integraciones;
- auditoría.

---

# 2. Principio de datos

Los datos operativos deberán pertenecer al negocio correspondiente.

Las entidades deberán evitar duplicaciones innecesarias y mantener relaciones claras.

Business Brain utilizará información existente para construir contexto, sin convertirse en una copia completa de toda la base de datos.


---

# 3. Negocio

La entidad `business` representa cada negocio dentro de la plataforma.

Contendrá información como:

- identidad;
- configuración;
- tipo de negocio;
- estado;
- datos de contacto;
- configuración de marca.

Todo dato operativo deberá poder relacionarse con un negocio.

---

# 4. Usuarios

La entidad `user` representa a las personas que utilizan la plataforma.

Un usuario podrá pertenecer a uno o varios negocios según los permisos definidos.

La relación entre usuarios y negocios determinará su acceso.


---

# 5. Roles y permisos

Los roles determinarán qué puede hacer cada usuario.

El sistema deberá permitir permisos específicos para:

- consultar;
- crear;
- modificar;
- eliminar;
- aprobar;
- ejecutar.

Los permisos deberán poder aplicarse también a acciones de IA.

---

# 6. Módulos activos

Cada negocio podrá tener diferentes módulos habilitados.

La plataforma deberá registrar:

- módulo;
- negocio;
- estado;
- configuración;
- fecha de activación.

Esto permitirá construir planes y funcionalidades modulares.


---

# 7. Clientes

La entidad `customer` almacenará la relación entre el negocio y sus clientes.

Podrá contener:

- datos básicos;
- contacto;
- historial;
- preferencias;
- etiquetas;
- estado;
- actividad.

---

# 8. Productos y servicios

Los negocios podrán registrar productos y servicios.

Deberán poder incluir:

- nombre;
- descripción;
- precio;
- duración;
- categoría;
- estado;
- configuración específica.

Estas entidades podrán relacionarse con ventas, agenda, campañas e inventario.


---

# 9. Agenda

La agenda almacenará citas y disponibilidad.

Las citas podrán relacionarse con:

- negocio;
- cliente;
- empleado;
- servicio;
- fecha;
- horario;
- estado.

---

# 10. Ventas

Las ventas podrán relacionarse con:

- negocio;
- cliente;
- productos;
- servicios;
- pagos;
- promociones;
- fechas.

Esto permitirá conectar actividad comercial con clientes y resultados.


---

# 11. Finanzas

El sistema podrá registrar:

- ingresos;
- gastos;
- costos;
- pagos;
- métodos de pago;
- períodos.

Los registros financieros deberán pertenecer al negocio correspondiente.

---

# 12. Inventario

El inventario podrá registrar:

- productos;
- existencias;
- movimientos;
- compras;
- proveedores;
- costos.

Los movimientos deberán mantener trazabilidad sobre los cambios de stock.


---

# 13. Marketing

El sistema podrá almacenar:

- contenidos;
- publicaciones;
- calendarios;
- audiencias;
- promociones;
- métricas.

Los contenidos deberán poder relacionarse con campañas y canales.

---

# 14. Campañas

Una campaña podrá relacionar:

- objetivo;
- audiencia;
- contenido;
- promoción;
- canales;
- fechas;
- resultados.

Esto permitirá medir campañas completas y no únicamente publicaciones individuales.


---

# 15. Comunicaciones

Las conversaciones y mensajes podrán relacionarse con:

- negocio;
- cliente;
- canal;
- usuario;
- agente;
- fecha;
- estado.

El sistema deberá conservar el contexto necesario para continuar una conversación.

---

# 16. Canales

Los canales externos deberán identificarse independientemente.

Ejemplos:

- WhatsApp;
- Instagram;
- Facebook;
- correo;
- sitio web.

Esto permitirá incorporar nuevos canales sin cambiar las entidades principales.


---

# 17. Business Brain

Business Brain utilizará información de diferentes entidades del negocio.

Podrá almacenar información adicional como:

- preferencias;
- conocimiento generado;
- decisiones;
- patrones;
- aprendizajes;
- contexto relevante.

El conocimiento deberá poder identificarse por negocio y origen.


---

# 18. Ejecuciones de IA

Cada ejecución importante de IA podrá registrar:

- negocio;
- usuario;
- agente;
- modelo;
- proveedor;
- tarea;
- entrada relevante;
- resultado;
- costo;
- fecha;
- estado.

Esto permitirá trazabilidad y control del consumo.


---

# 19. Automatizaciones

Las automatizaciones deberán almacenar:

- negocio;
- nombre;
- estado;
- disparador;
- condiciones;
- acciones;
- límites;
- configuración.

Las ejecuciones deberán registrarse por separado para mantener historial.


---

# 20. Eventos

Los eventos representarán hechos relevantes dentro del sistema.

Ejemplos:

- venta creada;
- cliente creado;
- cita cancelada;
- pago recibido;
- stock actualizado;
- campaña finalizada.

Los eventos podrán activar automatizaciones y otros procesos.


---

# 21. Auditoría

Las acciones importantes deberán generar registros de auditoría.

Cada registro podrá incluir:

- negocio;
- usuario;
- acción;
- entidad afectada;
- fecha;
- resultado;
- origen;
- agente de IA cuando corresponda.

Los registros deberán ser protegidos contra modificaciones no autorizadas.


---

# 22. Integraciones

Las conexiones externas deberán tener sus propios registros de configuración.

Podrán incluir:

- proveedor;
- negocio;
- estado;
- credenciales seguras;
- configuración;
- fecha de conexión.

Las credenciales sensibles nunca deberán almacenarse directamente como datos comunes.


---

# 15. Comunicaciones

Las conversaciones y mensajes estarán relacionados con el negocio y, cuando corresponda, con un cliente.

Podrán registrar:

- canal;
- conversación;
- mensajes;
- participantes;
- estado;
- fecha;
- usuario o agente responsable.

La información deberá conservar el contexto necesario para continuar una conversación.

---

# 16. Canales

Los canales externos se manejarán mediante entidades de integración independientes.

Ejemplos:

- WhatsApp;
- Instagram;
- Facebook;
- correo electrónico;
- sitio web.

Un negocio podrá tener múltiples canales conectados.

La arquitectura deberá permitir agregar nuevos canales sin modificar las entidades principales del sistema.


---

# 23. Relaciones principales

La estructura conceptual será:

Business
├── Users
├── Modules
├── Customers
├── Products / Services
├── Appointments
├── Sales
├── Finance
├── Inventory
├── Marketing
├── Campaigns
├── Communications
├── Automations
├── AI Executions
├── Events
└── Audit

Business Brain utilizará información relacionada con estas áreas para construir contexto.


---

# 24. Reglas de integridad

El modelo deberá garantizar:

- aislamiento entre negocios;
- relaciones válidas;
- datos consistentes;
- trazabilidad;
- permisos adecuados;
- eliminación controlada;
- historial cuando sea necesario.

Las reglas críticas deberán aplicarse en el backend y, cuando corresponda, en la base de datos.


---

# 25. Evolución del modelo

El modelo deberá poder evolucionar sin romper los datos existentes.

Las nuevas funcionalidades deberán:

- reutilizar entidades existentes cuando corresponda;
- evitar duplicaciones;
- mantener compatibilidad;
- utilizar migraciones controladas.

No se crearán entidades nuevas únicamente para resolver problemas que puedan solucionarse reutilizando el modelo existente.


---

# 26. Regla fundamental

Los datos deben representar el negocio real.

La plataforma no deberá diseñar entidades únicamente pensando en las pantallas.

Primero se definirá el modelo de negocio y después las interfaces que utilizarán esos datos.


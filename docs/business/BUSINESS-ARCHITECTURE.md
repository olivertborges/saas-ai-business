# SaaS AI Business — Arquitectura de Negocio

## 1. Objetivo

La arquitectura de negocio define cómo funciona comercial y organizacionalmente la plataforma.

Deberá permitir que diferentes negocios utilicen el mismo sistema de forma independiente, con sus propios usuarios, datos, módulos, configuraciones, automatizaciones, integraciones y capacidades de IA.

---

# 2. Principios

La arquitectura seguirá estos principios:

- un negocio no puede acceder a información de otro;
- los módulos son activables;
- las capacidades pueden configurarse;
- los planes comerciales no deben acoplarse directamente a la lógica interna;
- los límites deben ser configurables;
- las funciones críticas deben ser trazables;
- la plataforma debe poder evolucionar comercialmente sin rediseñar el núcleo.

---

# 3. Modelo de negocio

La plataforma será un SaaS multi-tenant.

Cada negocio utilizará una instancia lógica independiente dentro de la plataforma.

El negocio podrá contratar diferentes capacidades según sus necesidades.

Las capacidades podrán incluir:

- IA;
- marketing;
- redes sociales;
- CRM;
- agenda;
- comunicaciones;
- ventas;
- finanzas;
- inventario;
- campañas;
- automatizaciones;
- analítica;
- reportes.

---

# 4. Cuenta y negocio

La cuenta representa la identidad de acceso del usuario.

El negocio representa la organización o actividad comercial administrada dentro de la plataforma.

Una cuenta podrá:

- pertenecer a uno o varios negocios;
- tener diferentes roles en cada negocio;
- acceder a diferentes módulos según permisos.

El negocio será el principal límite de aislamiento de datos.

---

# 5. Usuarios

Los usuarios podrán tener diferentes responsabilidades.

Ejemplos:

- propietario;
- administrador;
- gerente;
- empleado;
- especialista;
- colaborador.

Los permisos deberán determinar qué puede consultar, modificar, aprobar o ejecutar cada usuario.


---

# 6. Roles

Los roles agruparán permisos relacionados con una responsabilidad.

Un rol podrá controlar:

- acceso a módulos;
- lectura;
- creación;
- modificación;
- eliminación;
- aprobación;
- ejecución;
- administración;
- configuración de IA.

La arquitectura deberá permitir agregar roles sin modificar el modelo fundamental de negocio.

---

# 7. Módulos comerciales

Los módulos serán unidades funcionales que podrán activarse según las necesidades del negocio.

Un módulo podrá tener:

- estado;
- configuración;
- permisos;
- límites;
- dependencias;
- métricas;
- capacidades de IA.

La activación de un módulo no deberá crear un nuevo tenant.

---

# 8. Planes

La plataforma podrá ofrecer diferentes planes comerciales.

Un plan podrá definir:

- módulos incluidos;
- cantidad de usuarios;
- límites de uso;
- capacidad de IA;
- automatizaciones;
- almacenamiento;
- integraciones;
- soporte;
- características avanzadas.

Los planes deberán ser configurables para permitir evolución comercial.

---

# 9. Entitlements

Las capacidades comerciales deberán representarse mediante permisos de producto o entitlements.

Un entitlement podrá representar:

- módulo habilitado;
- funcionalidad habilitada;
- límite de uso;
- capacidad máxima;
- acceso a una característica.

La aplicación deberá consultar los entitlements en lugar de depender exclusivamente del nombre del plan.

---

# 10. Límites

Los límites podrán aplicarse a:

- usuarios;
- clientes;
- operaciones;
- mensajes;
- publicaciones;
- campañas;
- automatizaciones;
- almacenamiento;
- ejecuciones de IA;
- consumo de modelos;
- integraciones.

Los límites deberán poder cambiar sin rediseñar los módulos.


---

# 11. Suscripciones

La suscripción representará la relación comercial entre un negocio y un plan.

Podrá contener:

- plan;
- estado;
- fecha de inicio;
- período;
- renovación;
- límites;
- entitlements;
- estado de pago.

La suscripción no deberá contener directamente la lógica de cada módulo.

---

# 12. Facturación

La arquitectura deberá permitir integrar proveedores externos de facturación y pagos.

La información comercial podrá incluir:

- facturas;
- pagos;
- períodos;
- importes;
- impuestos cuando correspondan;
- descuentos;
- créditos;
- estado.

Las credenciales y operaciones sensibles deberán permanecer protegidas.

---

# 13. Prueba y activación

La plataforma podrá ofrecer períodos de prueba o activaciones temporales.

Estas capacidades deberán poder configurarse sin modificar la arquitectura principal.

Una prueba podrá tener:

- fecha de inicio;
- fecha de finalización;
- módulos disponibles;
- límites;
- estado.

---

# 14. Ciclo de vida del negocio

Un negocio podrá pasar por diferentes estados:

- creado;
- configurándose;
- activo;
- suspendido;
- cancelado;
- archivado.

Cada estado deberá tener reglas claras sobre el acceso y las operaciones permitidas.

---

# 15. Cancelación

La cancelación de una suscripción no deberá implicar automáticamente la eliminación inmediata de los datos.

La plataforma deberá separar:

- estado comercial;
- estado operativo;
- retención de datos;
- eliminación definitiva.

Las políticas de retención deberán ser configurables y compatibles con las obligaciones aplicables.


---

# 16. Expansión de módulos

Un negocio podrá comenzar con determinados módulos y posteriormente activar otros.

Ejemplo:

CRM
→ Agenda
→ Marketing
→ IA
→ Automatizaciones
→ Finanzas.

La activación deberá preservar los datos existentes.

Los nuevos módulos deberán poder utilizar información autorizada de módulos anteriores.

---

# 17. Integraciones comerciales

Las integraciones podrán ser:

- incluidas en un plan;
- opcionales;
- de pago adicional;
- limitadas por uso.

La arquitectura comercial deberá permitir diferentes modelos sin modificar las integraciones internamente.

---

# 18. Consumo de IA

El uso de IA podrá formar parte del plan o funcionar mediante límites específicos.

Podrán existir:

- ejecuciones incluidas;
- créditos;
- límites mensuales;
- límites por módulo;
- límites por usuario;
- límites por agente.

El sistema deberá poder medir el consumo real.

---

# 19. Modelo comercial futuro

La plataforma podrá evolucionar hacia diferentes modelos:

- suscripción mensual;
- suscripción anual;
- módulos adicionales;
- consumo de IA;
- créditos;
- servicios empresariales;
- integraciones premium.

La arquitectura deberá permitir probar modelos comerciales sin cambiar el núcleo técnico.

---

# 20. Regla fundamental de negocio

La arquitectura comercial deberá separar:

producto,
plan,
módulo,
capacidad,
uso,
suscripción
y facturación.

Ninguno de estos conceptos deberá depender rígidamente de los demás.


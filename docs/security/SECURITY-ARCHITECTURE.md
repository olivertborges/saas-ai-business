# SaaS AI Business — Arquitectura de Seguridad

## 1. Objetivo

La arquitectura de seguridad protegerá:

- cuentas;
- negocios;
- usuarios;
- datos;
- credenciales;
- integraciones;
- operaciones;
- ejecuciones de IA;
- infraestructura.

La seguridad deberá formar parte de cada capa del sistema.

---

# 2. Principios

La plataforma seguirá:

- mínimo privilegio;
- defensa en profundidad;
- aislamiento por tenant;
- autenticación fuerte;
- autorización explícita;
- secretos protegidos;
- auditoría;
- validación de entradas;
- trazabilidad;
- recuperación ante incidentes.

---

# 3. Identidad

La plataforma deberá utilizar un sistema centralizado de identidad.

La identidad permitirá:

- autenticación;
- recuperación de acceso;
- sesiones;
- verificación;
- gestión de credenciales.

La identidad deberá mantenerse separada de los permisos específicos de cada negocio.

---

# 4. Autenticación

La autenticación podrá soportar:

- correo y contraseña;
- proveedores externos;
- métodos adicionales de seguridad;
- recuperación de cuenta;
- verificación de identidad.

Los métodos concretos podrán evolucionar sin modificar el modelo de autorización.

---

# 5. Sesiones

Las sesiones deberán:

- expirar;
- poder revocarse;
- proteger credenciales;
- limitar abuso;
- registrar eventos relevantes.

Las sesiones deberán asociarse a una identidad válida.


---

# 6. Autorización

Toda operación protegida deberá verificar:

- identidad;
- negocio;
- rol;
- permiso;
- módulo;
- acción.

No deberá confiarse únicamente en controles visuales del frontend.

---

# 7. Aislamiento multi-tenant

Cada consulta y operación deberá respetar el tenant correspondiente.

El sistema deberá impedir:

- lectura cruzada;
- modificación cruzada;
- eliminación cruzada;
- ejecución cruzada;
- acceso indirecto mediante IA.

El aislamiento deberá existir tanto en backend como en la capa de datos.

---

# 8. Seguridad de IA

Los agentes deberán operar con permisos limitados.

La IA no deberá:

- acceder a tenants no autorizados;
- obtener secretos;
- modificar datos directamente;
- saltarse reglas de negocio;
- ejecutar herramientas fuera de su autorización.

---

# 9. Seguridad de herramientas

Cada herramienta deberá validar:

- usuario;
- negocio;
- permisos;
- parámetros;
- límites;
- estado del recurso.

Una herramienta no deberá confiar en que el agente ya validó la autorización.

---

# 10. Protección de secretos

Los secretos deberán almacenarse en mecanismos especializados.

Ejemplos:

- claves de API;
- tokens OAuth;
- contraseñas;
- credenciales de proveedores;
- secretos de webhooks.

Los secretos no deberán almacenarse como texto común en entidades operativas ni exponerse a modelos de IA.


---

# 11. Datos sensibles

Los datos sensibles deberán recibir protección adicional.

La plataforma deberá minimizar:

- almacenamiento innecesario;
- exposición;
- duplicación;
- acceso indiscriminado.

El contexto enviado a IA deberá contener solamente información necesaria.

---

# 12. Validación de entradas

Todas las entradas externas deberán validarse.

Esto incluye:

- formularios;
- API;
- webhooks;
- integraciones;
- archivos;
- mensajes;
- parámetros de herramientas.

La validación deberá ocurrir antes de ejecutar operaciones críticas.

---

# 13. Protección contra abuso

La plataforma deberá contemplar controles contra:

- fuerza bruta;
- abuso de API;
- spam;
- automatizaciones excesivas;
- consumo anormal de IA;
- solicitudes maliciosas.

Podrán utilizarse límites de frecuencia y consumo.

---

# 14. Auditoría

Las operaciones relevantes deberán generar registros de auditoría.

La auditoría podrá incluir:

- usuario;
- negocio;
- acción;
- módulo;
- entidad;
- fecha;
- origen;
- agente;
- resultado.

Los registros deberán estar protegidos contra modificaciones no autorizadas.

---

# 15. Seguridad de integraciones

Las integraciones externas deberán utilizar mecanismos seguros de autenticación y comunicación.

La plataforma deberá:

- validar respuestas;
- proteger tokens;
- verificar firmas cuando existan;
- manejar expiración;
- revocar credenciales;
- registrar errores.


---

# 16. Seguridad de archivos

Los archivos deberán:

- validar tipo;
- validar tamaño;
- almacenarse de forma controlada;
- tener permisos apropiados;
- evitar ejecución no autorizada.

Los archivos proporcionados a IA deberán tratarse como contenido no confiable.

---

# 17. Prompt injection

La arquitectura deberá considerar que instrucciones maliciosas pueden encontrarse dentro de:

- mensajes;
- documentos;
- páginas web;
- archivos;
- contenido generado;
- datos de clientes.

Los datos externos deberán permanecer separados de las instrucciones de control.

---

# 18. Protección de operaciones críticas

Las operaciones de alto impacto podrán requerir:

- aprobación;
- autenticación adicional;
- límites;
- confirmación explícita;
- auditoría.

La IA no deberá poder elevar sus propios permisos.

---

# 19. Recuperación

La plataforma deberá disponer de mecanismos para:

- backups;
- recuperación;
- restauración;
- continuidad;
- análisis de incidentes.

La estrategia concreta dependerá de la infraestructura utilizada.

---

# 20. Regla fundamental de seguridad

Ninguna capa deberá asumir que otra capa ya protegió una operación.

Cada frontera deberá validar sus propias condiciones de seguridad.


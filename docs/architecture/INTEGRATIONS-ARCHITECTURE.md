# SaaS AI Business — Arquitectura de Integraciones

## 1. Objetivo

La capa de integraciones permitirá conectar la plataforma con servicios externos sin acoplar los módulos internos a proveedores específicos.

---

# 2. Principios

Las integraciones deberán ser:

- reemplazables;
- aisladas;
- configurables;
- seguras;
- observables;
- versionables.

---

# 3. Categorías

Podrán existir integraciones para:

- mensajería;
- redes sociales;
- correo;
- pagos;
- calendario;
- almacenamiento;
- IA;
- publicidad;
- analítica;
- facturación.

---

# 4. Conexiones

Cada negocio podrá tener múltiples conexiones externas.

Una conexión deberá registrar:

- proveedor;
- tipo;
- negocio;
- estado;
- configuración;
- fecha;
- permisos.

Las credenciales deberán mantenerse protegidas.

---

# 5. Adaptadores

Cada proveedor deberá conectarse mediante un adaptador.

El módulo interno deberá comunicarse con una interfaz común en lugar de depender directamente de la API externa.


---

# 6. OAuth

Cuando un proveedor utilice OAuth, la plataforma deberá:

- solicitar autorización;
- recibir credenciales;
- almacenar tokens de forma segura;
- renovar tokens cuando sea posible;
- revocar conexiones.

---

# 7. Webhooks externos

Las integraciones podrán recibir eventos externos.

El sistema deberá:

- validar origen;
- verificar firma;
- procesar eventos;
- evitar duplicados;
- registrar errores;
- reintentar cuando corresponda.

---

# 8. Sincronización

Las integraciones podrán utilizar:

- sincronización inmediata;
- eventos;
- sincronización programada;
- sincronización manual.

La estrategia dependerá del proveedor.

---

# 9. Fallos externos

La indisponibilidad de un proveedor externo no deberá bloquear innecesariamente el resto del sistema.

El sistema deberá:

- registrar el fallo;
- reintentar cuando corresponda;
- informar al usuario;
- mantener estados coherentes;
- permitir recuperación.

---

# 10. Regla fundamental

Los proveedores externos deberán ser dependencias reemplazables y no formar parte inseparable del núcleo del producto.


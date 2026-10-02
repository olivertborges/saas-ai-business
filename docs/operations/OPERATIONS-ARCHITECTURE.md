# SaaS AI Business — Arquitectura Operacional

## 1. Objetivo

La arquitectura operacional define cómo se mantendrá, observará y evolucionará la plataforma una vez esté funcionando.

---

# 2. Ambientes

La plataforma deberá separar como mínimo:

- desarrollo;
- pruebas;
- producción.

Los datos y credenciales deberán mantenerse separados entre ambientes.

---

# 3. Configuración

La configuración deberá estar separada del código cuando corresponda.

Los secretos nunca deberán formar parte del repositorio.

---

# 4. Despliegues

Los despliegues deberán ser:

- reproducibles;
- auditables;
- versionados;
- reversibles cuando sea posible.

---

# 5. Migraciones

Los cambios de datos deberán realizarse mediante migraciones controladas.

Las migraciones deberán:

- estar versionadas;
- ser reproducibles;
- mantener compatibilidad cuando sea necesario;
- poder verificarse.


---

# 6. Observabilidad

La plataforma deberá observar:

- disponibilidad;
- errores;
- latencia;
- consumo;
- ejecuciones;
- integraciones;
- IA;
- base de datos.

---

# 7. Logs

Los logs deberán permitir diagnosticar problemas sin almacenar información sensible innecesariamente.

Deberán incluir contexto suficiente para localizar una operación.

---

# 8. Métricas

Podrán medirse:

- usuarios activos;
- negocios activos;
- operaciones;
- errores;
- latencia;
- consumo de IA;
- costos;
- ejecuciones automáticas;
- conversiones;
- uso de módulos.

---

# 9. Alertas

Las alertas podrán activarse ante:

- errores elevados;
- indisponibilidad;
- costos anormales;
- fallos de integración;
- consumo excesivo;
- degradación de rendimiento.

---

# 10. Backups

Los datos críticos deberán disponer de mecanismos de respaldo.

La estrategia deberá definir:

- frecuencia;
- retención;
- almacenamiento;
- recuperación;
- pruebas de restauración.


---

# 11. Recuperación

La plataforma deberá definir procedimientos para recuperar:

- base de datos;
- configuraciones;
- archivos;
- integraciones;
- servicios.

---

# 12. Incidentes

Los incidentes deberán poder:

- detectarse;
- registrarse;
- clasificarse;
- investigarse;
- mitigarse;
- cerrarse;
- documentarse.

---

# 13. Cambios

Los cambios importantes deberán ser trazables.

El sistema deberá conservar información suficiente para conocer:

- qué cambió;
- cuándo;
- quién;
- por qué;
- qué versión estaba activa.

---

# 14. Costos operativos

La plataforma deberá poder observar sus propios costos.

Podrán incluir:

- infraestructura;
- almacenamiento;
- base de datos;
- IA;
- integraciones;
- comunicaciones.

Esto permitirá controlar márgenes y evolución comercial.

---

# 15. Regla fundamental

La operación de producción deberá considerarse parte del producto y no una actividad posterior al desarrollo.


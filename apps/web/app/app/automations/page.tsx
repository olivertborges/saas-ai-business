const automations = [
  {
    name: 'Reactivar clientes inactivos',
    description:
      'Detecta clientes sin compras recientes y activa una secuencia de reactivación.',
    trigger: 'Cliente sin comprar durante 60 días',
    action: 'Crear campaña personalizada',
    status: 'Activa',
    executions: '128 ejecuciones',
    lastRun: 'Hace 24 min',
  },
  {
    name: 'Nuevo cliente',
    description:
      'Da la bienvenida a cada nuevo cliente y prepara acciones para fortalecer la relación.',
    trigger: 'Nuevo cliente registrado',
    action: 'Enviar bienvenida + crear seguimiento',
    status: 'Activa',
    executions: '86 ejecuciones',
    lastRun: 'Hace 1 h',
  },
  {
    name: 'Contenido semanal',
    description:
      'Prepara automáticamente contenido alineado con la estrategia y los objetivos del negocio.',
    trigger: 'Cada lunes · 08:00',
    action: 'Generar contenido de la semana',
    status: 'Activa',
    executions: '12 ejecuciones',
    lastRun: 'Hace 2 días',
  },
  {
    name: 'Seguimiento de oportunidad',
    description:
      'Identifica oportunidades comerciales y prepara una acción para convertirlas.',
    trigger: 'Oportunidad detectada por IA',
    action: 'Crear recomendación',
    status: 'Pausada',
    executions: '34 ejecuciones',
    lastRun: 'Hace 5 días',
  },
];

const activity = [
  {
    title: 'Ejecutó una automatización',
    detail: 'Reactivación de clientes · 12 clientes procesados',
    time: 'Hace 24 min',
  },
  {
    title: 'Generó contenido automáticamente',
    detail: 'Contenido semanal · 5 piezas preparadas',
    time: 'Hace 2 h',
  },
  {
    title: 'Detectó una nueva oportunidad',
    detail: 'Seguimiento comercial disponible',
    time: 'Hace 4 h',
  },
];

export default function AutomationsPage() {
  return (
    <div className="automations-page">
      <section className="automations-heading">
        <div>
          <div className="dashboard-eyebrow">
            <span className="dashboard-status-dot" />
            AUTOMATIZACIONES INTELIGENTES
          </div>

          <h1>Automatizaciones</h1>

          <p>
            Convierte tareas repetitivas en procesos inteligentes que trabajan
            automáticamente siguiendo las reglas de tu negocio.
          </p>
        </div>

        <button className="automations-primary-button" type="button">
          <span>＋</span>
          Nueva automatización
        </button>
      </section>

      <section className="automations-ai-banner">
        <div className="automations-ai-icon">✦</div>

        <div className="automations-ai-copy">
          <div className="automations-ai-label">
            <span />
            MOTOR DE AUTOMATIZACIÓN ACTIVO
          </div>

          <h2>
            Tu negocio puede seguir trabajando aunque tú no estés mirando.
          </h2>

          <p>
            La IA puede detectar eventos, evaluar condiciones y ejecutar
            acciones automáticamente dentro de las reglas que hayas definido.
          </p>
        </div>

        <div className="automations-ai-metrics">
          <div>
            <strong>3</strong>
            <span>activas</span>
          </div>

          <div>
            <strong>260</strong>
            <span>ejecuciones</span>
          </div>

          <div>
            <strong>24 h</strong>
            <span>última actividad</span>
          </div>
        </div>
      </section>

      <section className="automations-section">
        <div className="automations-section-header">
          <div>
            <span className="card-eyebrow">TUS PROCESOS</span>
            <h2>Automatizaciones activas</h2>
          </div>

          <button type="button">Ver todas →</button>
        </div>

        <div className="automations-list">
          {automations.map((automation) => (
            <article className="automation-card" key={automation.name}>
              <div className="automation-card-main">
                <div className="automation-card-top">
                  <span
                    className={
                      automation.status === 'Activa'
                        ? 'automation-status is-active'
                        : 'automation-status is-paused'
                    }
                  >
                    <span />
                    {automation.status}
                  </span>

                  <span className="automation-executions">
                    {automation.executions}
                  </span>
                </div>

                <h3>{automation.name}</h3>

                <p>{automation.description}</p>

                <div className="automation-flow">
                  <div>
                    <small>CUANDO</small>
                    <strong>{automation.trigger}</strong>
                  </div>

                  <span>→</span>

                  <div>
                    <small>ENTONCES</small>
                    <strong>{automation.action}</strong>
                  </div>
                </div>
              </div>

              <div className="automation-card-side">
                <span>Última ejecución</span>
                <strong>{automation.lastRun}</strong>

                <button type="button">
                  Gestionar →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="automations-builder">
        <div className="automations-builder-copy">
          <span className="card-eyebrow">CREAR CON IA</span>

          <h2>Describe lo que quieres automatizar.</h2>

          <p>
            No necesitas construir reglas complejas. Dile a la IA qué quieres
            conseguir y ella puede convertirlo en un flujo de automatización.
          </p>

          <div className="automation-example">
            <span>✦</span>
            <p>
              “Cuando un cliente lleve 60 días sin comprar, quiero intentar
              recuperarlo con una propuesta personalizada.”
            </p>
          </div>

          <button type="button">
            Crear con IA <span>→</span>
          </button>
        </div>

        <div className="automations-builder-flow">
          <div>
            <span>01</span>
            <strong>Detecta</strong>
            <small>Identifica el evento</small>
          </div>

          <i>↓</i>

          <div>
            <span>02</span>
            <strong>Decide</strong>
            <small>Evalúa las condiciones</small>
          </div>

          <i>↓</i>

          <div>
            <span>03</span>
            <strong>Ejecuta</strong>
            <small>Realiza la acción</small>
          </div>
        </div>
      </section>

      <section className="automations-bottom-grid">
        <div className="automations-activity-card">
          <div className="automations-section-header">
            <div>
              <span className="card-eyebrow">ACTIVIDAD</span>
              <h2>Actividad reciente</h2>
            </div>
          </div>

          <div className="automations-activity-list">
            {activity.map((item) => (
              <div className="automation-activity" key={item.title}>
                <span className="automation-activity-icon">✦</span>

                <div>
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                </div>

                <time>{item.time}</time>
              </div>
            ))}
          </div>
        </div>

        <aside className="automations-control-card">
          <div className="automations-control-icon">⚙</div>

          <span className="card-eyebrow">CONTROL Y SEGURIDAD</span>

          <h2>Vos decides qué puede ejecutarse automáticamente.</h2>

          <p>
            Cada automatización puede requerir aprobación, ejecutarse bajo
            determinadas condiciones o funcionar completamente sola.
          </p>

          <div className="automation-permission-list">
            <span>✓ Requiere aprobación</span>
            <span>✓ Ejecuta con reglas</span>
            <span>✓ Registra cada acción</span>
          </div>

          <button type="button">
            Configurar reglas <span>→</span>
          </button>
        </aside>
      </section>
    </div>
  );
}

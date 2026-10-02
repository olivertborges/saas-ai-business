const metrics = [
  {
    label: 'Ingresos',
    value: '$48.240',
    change: '+18,4%',
    detail: 'vs. período anterior',
    tone: 'primary',
  },
  {
    label: 'Clientes',
    value: '1.284',
    change: '+12,8%',
    detail: 'clientes activos',
    tone: 'success',
  },
  {
    label: 'Contenido',
    value: '42',
    change: '+9',
    detail: 'publicaciones este mes',
    tone: 'gold',
  },
  {
    label: 'Conversión',
    value: '8,6%',
    change: '+2,1%',
    detail: 'tasa de conversión',
    tone: 'dark',
  },
];

const activities = [
  {
    icon: '✦',
    title: 'IA generó una nueva campaña',
    description: 'Campaña de primavera · Instagram',
    time: 'Hace 12 min',
    tone: 'purple',
  },
  {
    icon: '$',
    title: 'Nueva venta registrada',
    description: 'Servicio Premium · Cliente recurrente',
    time: 'Hace 28 min',
    tone: 'green',
  },
  {
    icon: '○',
    title: 'Nuevo cliente agregado',
    description: 'María Rodríguez',
    time: 'Hace 1 h',
    tone: 'blue',
  },
  {
    icon: '✓',
    title: 'Contenido publicado',
    description: 'Instagram · Post promocional',
    time: 'Hace 2 h',
    tone: 'gold',
  },
];

const tasks = [
  {
    title: 'Revisar campaña de octubre',
    type: 'IA',
    priority: 'Alta',
  },
  {
    title: 'Confirmar 3 citas pendientes',
    type: 'Agenda',
    priority: 'Media',
  },
  {
    title: 'Actualizar catálogo de servicios',
    type: 'Negocio',
    priority: 'Baja',
  },
];

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <section className="dashboard-heading">
        <div>
          <div className="dashboard-eyebrow">
            <span className="dashboard-status-dot" />
            TU NEGOCIO ESTÁ ACTIVO
          </div>

          <h1>Buenos días, Olivert.</h1>

          <p>
            Aquí tienes una visión general de lo que está pasando en tu
            negocio.
          </p>
        </div>

        <button className="dashboard-date" type="button">
          <span>Hoy</span>
          <strong>02 OCT 2026</strong>
          <span>⌄</span>
        </button>
      </section>

      <section className="metrics-grid">
        {metrics.map((metric) => (
          <article className={`metric-panel metric-${metric.tone}`} key={metric.label}>
            <div className="metric-panel-top">
              <span>{metric.label}</span>
              <span className="metric-menu">•••</span>
            </div>

            <strong>{metric.value}</strong>

            <div className="metric-panel-bottom">
              <span className="metric-change">{metric.change}</span>
              <span>{metric.detail}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card revenue-card">
          <div className="card-heading">
            <div>
              <span className="card-eyebrow">RENDIMIENTO</span>
              <h2>Ingresos del negocio</h2>
            </div>

            <button className="card-filter" type="button">
              Últimos 30 días <span>⌄</span>
            </button>
          </div>

          <div className="revenue-summary">
            <strong>$48.240</strong>
            <span>
              <b>+18,4%</b> respecto al período anterior
            </span>
          </div>

          <div className="dashboard-chart">
            <div className="chart-y-axis">
              <span>$50k</span>
              <span>$40k</span>
              <span>$30k</span>
              <span>$20k</span>
              <span>$10k</span>
              <span>$0</span>
            </div>

            <div className="chart-area">
              <div className="dashboard-chart-line line-1" />
              <div className="dashboard-chart-line line-2" />
              <div className="dashboard-chart-line line-3" />
              <div className="dashboard-chart-line line-4" />
              <div className="dashboard-chart-line line-5" />

              <svg
                className="revenue-line"
                viewBox="0 0 800 260"
                preserveAspectRatio="none"
                aria-label="Gráfico de ingresos"
              >
                <defs>
                  <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#635bff" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#635bff" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  d="M0 220 C65 210 80 180 145 194 C205 207 230 154 285 165 C340 177 360 110 420 128 C480 147 510 80 565 95 C620 110 655 50 715 65 C750 73 775 42 800 28 L800 260 L0 260 Z"
                  fill="url(#areaGradient)"
                />

                <path
                  d="M0 220 C65 210 80 180 145 194 C205 207 230 154 285 165 C340 177 360 110 420 128 C480 147 510 80 565 95 C620 110 655 50 715 65 C750 73 775 42 800 28"
                  fill="none"
                  stroke="#635bff"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <circle cx="800" cy="28" r="6" fill="#ffffff" stroke="#635bff" strokeWidth="4" />
              </svg>

              <div className="chart-x-axis">
                <span>03 SEP</span>
                <span>10 SEP</span>
                <span>17 SEP</span>
                <span>24 SEP</span>
                <span>02 OCT</span>
              </div>
            </div>
          </div>
        </article>

        <article className="dashboard-card ai-card">
          <div className="ai-card-top">
            <div className="ai-symbol">✦</div>

            <div>
              <span className="card-eyebrow">BUSINESS AI</span>
              <h2>Asistente inteligente</h2>
            </div>

            <span className="ai-live">ACTIVO</span>
          </div>

          <p className="ai-message">
            Detecté <strong>3 oportunidades</strong> que podrían ayudarte a
            mejorar el rendimiento de tu negocio.
          </p>

          <div className="ai-opportunity">
            <span className="opportunity-number">01</span>

            <div>
              <strong>Contenido</strong>
              <p>Tu audiencia tiene mayor actividad los jueves.</p>
            </div>

            <span className="opportunity-arrow">→</span>
          </div>

          <div className="ai-opportunity">
            <span className="opportunity-number">02</span>

            <div>
              <strong>Clientes</strong>
              <p>18 clientes no han regresado en más de 60 días.</p>
            </div>

            <span className="opportunity-arrow">→</span>
          </div>

          <button className="ai-button" type="button">
            Ver análisis completo <span>→</span>
          </button>
        </article>
      </section>

      <section className="dashboard-grid dashboard-grid-bottom">
        <article className="dashboard-card">
          <div className="card-heading">
            <div>
              <span className="card-eyebrow">ACTIVIDAD</span>
              <h2>Últimos movimientos</h2>
            </div>

            <button className="card-link" type="button">
              Ver todo →
            </button>
          </div>

          <div className="activity-list">
            {activities.map((activity) => (
              <div className="activity-item" key={activity.title}>
                <div className={`activity-icon activity-${activity.tone}`}>
                  {activity.icon}
                </div>

                <div className="activity-content">
                  <strong>{activity.title}</strong>
                  <span>{activity.description}</span>
                </div>

                <time>{activity.time}</time>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-card">
          <div className="card-heading">
            <div>
              <span className="card-eyebrow">PRÓXIMOS PASOS</span>
              <h2>Tareas pendientes</h2>
            </div>

            <span className="task-count">3</span>
          </div>

          <div className="task-list">
            {tasks.map((task) => (
              <div className="task-item" key={task.title}>
                <button className="task-check" type="button" aria-label="Completar tarea">
                  ✓
                </button>

                <div className="task-content">
                  <strong>{task.title}</strong>

                  <div>
                    <span>{task.type}</span>
                    <i />
                    <span>{task.priority}</span>
                  </div>
                </div>

                <span className="task-arrow">→</span>
              </div>
            ))}
          </div>

          <button className="task-add" type="button">
            + Agregar tarea
          </button>
        </article>
      </section>
    </div>
  );
}

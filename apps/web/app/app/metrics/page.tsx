const metrics = [
  {
    label: 'Ingresos',
    value: '$48.240',
    change: '+18,4%',
    detail: 'vs. período anterior',
    tone: 'positive',
  },
  {
    label: 'Clientes nuevos',
    value: '86',
    change: '+12,8%',
    detail: 'este mes',
    tone: 'positive',
  },
  {
    label: 'Ticket promedio',
    value: '$1.240',
    change: '+6,2%',
    detail: 'vs. período anterior',
    tone: 'positive',
  },
  {
    label: 'Conversión',
    value: '8,6%',
    change: '+1,4 pp',
    detail: 'vs. período anterior',
    tone: 'positive',
  },
];

const revenueBars = [
  { day: 'LUN', value: 62 },
  { day: 'MAR', value: 74 },
  { day: 'MIÉ', value: 58 },
  { day: 'JUE', value: 82 },
  { day: 'VIE', value: 94 },
  { day: 'SÁB', value: 68 },
  { day: 'DOM', value: 43 },
];

const channelMetrics = [
  {
    name: 'Instagram',
    value: '42%',
    detail: 'del tráfico generado',
    trend: '+8,4%',
  },
  {
    name: 'WhatsApp',
    value: '31%',
    detail: 'de las conversiones',
    trend: '+5,7%',
  },
  {
    name: 'Recomendaciones',
    value: '18%',
    detail: 'de nuevos clientes',
    trend: '+3,2%',
  },
  {
    name: 'Orgánico',
    value: '9%',
    detail: 'del tráfico generado',
    trend: '+1,8%',
  },
];

const businessActivity = [
  {
    title: 'Las ventas crecieron 18,4%',
    detail: 'El crecimiento estuvo impulsado por clientes recurrentes.',
    time: 'Hoy',
  },
  {
    title: 'El contenido generó más interacción',
    detail: 'Los Reels educativos superaron el promedio del negocio.',
    time: 'Ayer',
  },
  {
    title: 'Aumentó la captación de clientes',
    detail: '86 nuevos clientes durante el período analizado.',
    time: 'Hace 2 días',
  },
  {
    title: 'La IA detectó una oportunidad',
    detail: 'Existe potencial para aumentar el ticket promedio.',
    time: 'Hace 3 días',
  },
];

const aiInsights = [
  {
    title: 'El contenido educativo está funcionando.',
    description:
      'Las piezas educativas generan 34% más interacción que el promedio de tus publicaciones.',
    action: 'Crear más contenido educativo',
  },
  {
    title: 'Los clientes recurrentes generan más valor.',
    description:
      'Los clientes que vuelven compran, en promedio, 2,4 veces más durante el período.',
    action: 'Crear estrategia de fidelización',
  },
];

export default function MetricsPage() {
  return (
    <div className="metrics-page">
      <section className="metrics-heading">
        <div>
          <div className="dashboard-eyebrow">
            <span className="dashboard-status-dot" />
            BUSINESS INTELLIGENCE
          </div>

          <h1>Métricas</h1>

          <p>
            Entiende qué está pasando en tu negocio, qué está funcionando y
            dónde existen nuevas oportunidades de crecimiento.
          </p>
        </div>

        <div className="metrics-heading-actions">
          <button type="button">Últimos 30 días⌄</button>

          <button className="metrics-primary-button" type="button">
            <span>↓</span>
            Exportar
          </button>
        </div>
      </section>

      <section className="metrics-summary-grid">
        {metrics.map((metric) => (
          <article className="metrics-summary-card" key={metric.label}>
            <span>{metric.label}</span>

            <strong>{metric.value}</strong>

            <div>
              <em className={metric.tone}>{metric.change}</em>
              <small>{metric.detail}</small>
            </div>
          </article>
        ))}
      </section>

      <section className="metrics-main-grid">
        <div className="metrics-revenue-card">
          <div className="metrics-card-header">
            <div>
              <span className="card-eyebrow">RENDIMIENTO COMERCIAL</span>
              <h2>Ingresos</h2>
            </div>

            <span className="metrics-period">Últimos 7 días</span>
          </div>

          <div className="metrics-chart">
            <div className="metrics-chart-scale">
              <span>$10k</span>
              <span>$7,5k</span>
              <span>$5k</span>
              <span>$2,5k</span>
              <span>$0</span>
            </div>

            <div className="metrics-chart-area">
              <div className="metrics-chart-grid">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="metrics-bars">
                {revenueBars.map((item) => (
                  <div className="metrics-bar-column" key={item.day}>
                    <div className="metrics-bar-track">
                      <span style={{ height: `${item.value}%` }} />
                    </div>

                    <small>{item.day}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="metrics-chart-footer">
            <div>
              <span>Total generado</span>
              <strong>$48.240</strong>
            </div>

            <div>
              <span>Promedio diario</span>
              <strong>$6.891</strong>
            </div>

            <div>
              <span>Crecimiento</span>
              <strong>+18,4%</strong>
            </div>
          </div>
        </div>

        <aside className="metrics-performance-card">
          <div className="metrics-card-header">
            <div>
              <span className="card-eyebrow">CANALES</span>
              <h2>De dónde llegan</h2>
            </div>
          </div>

          <div className="metrics-channel-list">
            {channelMetrics.map((channel) => (
              <div className="metrics-channel" key={channel.name}>
                <div className="metrics-channel-top">
                  <strong>{channel.name}</strong>
                  <span>{channel.value}</span>
                </div>

                <div className="metrics-channel-track">
                  <span
                    style={{
                      width: channel.value,
                    }}
                  />
                </div>

                <div className="metrics-channel-bottom">
                  <small>{channel.detail}</small>
                  <em>{channel.trend}</em>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="metrics-section">
        <div className="metrics-section-header">
          <div>
            <span className="card-eyebrow">ANÁLISIS DEL NEGOCIO</span>
            <h2>Qué está funcionando</h2>
          </div>

          <button type="button">Ver análisis completo →</button>
        </div>

        <div className="metrics-insights-grid">
          {aiInsights.map((insight) => (
            <article className="metrics-insight-card" key={insight.title}>
              <div className="metrics-insight-icon">✦</div>

              <span className="card-eyebrow">IA DETECTÓ</span>

              <h3>{insight.title}</h3>

              <p>{insight.description}</p>

              <button type="button">
                {insight.action}
                <span>→</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="metrics-bottom-grid">
        <div className="metrics-activity-card">
          <div className="metrics-section-header">
            <div>
              <span className="card-eyebrow">ACTIVIDAD</span>
              <h2>Lo que cambió</h2>
            </div>
          </div>

          <div className="metrics-activity-list">
            {businessActivity.map((item) => (
              <div className="metrics-activity" key={item.title}>
                <span className="metrics-activity-icon">↗</span>

                <div>
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                </div>

                <time>{item.time}</time>
              </div>
            ))}
          </div>
        </div>

        <aside className="metrics-ai-card">
          <div className="metrics-ai-card-icon">✦</div>

          <span className="card-eyebrow">BUSINESS AI</span>

          <h2>Los números cuentan una historia.</h2>

          <p>
            Tu IA no solo muestra métricas. Conecta los resultados para
            explicarte qué los está provocando y qué podrías hacer después.
          </p>

          <div className="metrics-ai-highlight">
            <strong>+18,4%</strong>
            <span>crecimiento de ingresos</span>
          </div>

          <button type="button">
            Preguntar a la IA <span>→</span>
          </button>
        </aside>
      </section>
    </div>
  );
}

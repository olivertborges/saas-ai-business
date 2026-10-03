const insights = [
  {
    type: 'OPORTUNIDAD',
    title: 'Reactivar clientes inactivos',
    description:
      'Detecté 128 clientes con alta probabilidad de volver a comprar si reciben una propuesta personalizada.',
    impact: 'Alto impacto',
  },
  {
    type: 'CONTENIDO',
    title: 'Crear más contenido educativo',
    description:
      'Los contenidos educativos están generando más interacción y pueden ayudar a captar nuevos clientes.',
    impact: 'Oportunidad',
  },
  {
    type: 'VENTAS',
    title: 'Optimizar el ticket promedio',
    description:
      'Existe una oportunidad para combinar servicios y aumentar el valor de cada compra.',
    impact: 'En análisis',
  },
];

const activity = [
  {
    title: 'Analizó el rendimiento del negocio',
    detail: 'Ventas, clientes y contenido de los últimos 30 días.',
    time: 'Hace 12 min',
  },
  {
    title: 'Detectó una oportunidad comercial',
    detail: '128 clientes potencialmente reactivables.',
    time: 'Hace 24 min',
  },
  {
    title: 'Generó nuevas recomendaciones',
    detail: '3 acciones priorizadas para esta semana.',
    time: 'Hace 41 min',
  },
  {
    title: 'Actualizó el contexto del Business Brain',
    detail: 'Nuevos patrones incorporados al análisis.',
    time: 'Hace 1 h',
  },
];

const autonomyLevels = [
  {
    level: 'Nivel 1',
    name: 'Asistente',
    description: 'Analiza y recomienda.',
    active: false,
  },
  {
    level: 'Nivel 2',
    name: 'Creador',
    description: 'También genera contenido.',
    active: false,
  },
  {
    level: 'Nivel 3',
    name: 'Ejecutor',
    description: 'Programa acciones automáticamente.',
    active: true,
  },
  {
    level: 'Nivel 4',
    name: 'Autónomo',
    description: 'Decide y ejecuta dentro de tus reglas.',
    active: false,
  },
];

export default function AiPage() {
  return (
    <div className="ai-page">
      <section className="ai-heading">
        <div>
          <div className="dashboard-eyebrow">
            <span className="dashboard-status-dot" />
            BUSINESS AI
          </div>

          <h1>Inteligencia artificial</h1>

          <p>
            Tu IA conoce tu negocio, analiza lo que está pasando y transforma
            esos datos en decisiones, acciones y oportunidades.
          </p>
        </div>

        <button className="ai-primary-button" type="button">
          <span>✦</span>
          Hablar con la IA
        </button>
      </section>

      <section className="ai-brain-banner">
        <div className="ai-brain-orb">
          <span>✦</span>
        </div>

        <div className="ai-brain-copy">
          <div className="ai-live-label">
            <span />
            IA ACTIVA
          </div>

          <h2>Tu negocio está siendo analizado continuamente.</h2>

          <p>
            La IA conecta el Business Brain con tus ventas, clientes, contenido
            y campañas para detectar patrones y encontrar oportunidades.
          </p>
        </div>

        <div className="ai-brain-status">
          <strong>Business Brain</strong>
          <span>Conectado · actualizado hace 8 min</span>
        </div>
      </section>

      <section className="ai-command-card">
        <div className="ai-command-header">
          <div>
            <span className="card-eyebrow">CENTRO DE INTELIGENCIA</span>
            <h2>¿Qué quieres analizar?</h2>
          </div>

          <span className="ai-command-badge">Contexto completo</span>
        </div>

        <div className="ai-command-input">
          <span>✦</span>
          <p>
            Pregúntale cualquier cosa sobre tu negocio o deja que la IA
            encuentre oportunidades por ti...
          </p>
          <button type="button">Analizar →</button>
        </div>

        <div className="ai-suggestions">
          <button type="button">¿Cómo puedo aumentar mis ventas?</button>
          <button type="button">Analiza mis clientes</button>
          <button type="button">¿Qué debería publicar esta semana?</button>
        </div>
      </section>

      <section className="ai-section">
        <div className="ai-section-header">
          <div>
            <span className="card-eyebrow">INTELIGENCIA DEL NEGOCIO</span>
            <h2>Oportunidades detectadas</h2>
          </div>

          <button type="button">Ver todas →</button>
        </div>

        <div className="ai-insights-grid">
          {insights.map((insight) => (
            <article className="ai-insight-card" key={insight.title}>
              <div className="ai-insight-top">
                <span>✦</span>
                <small>{insight.type}</small>
                <em>{insight.impact}</em>
              </div>

              <h3>{insight.title}</h3>

              <p>{insight.description}</p>

              <button type="button">
                Ver recomendación <span>→</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-bottom-grid">
        <div className="ai-activity-card">
          <div className="ai-section-header">
            <div>
              <span className="card-eyebrow">ACTIVIDAD</span>
              <h2>Lo que está haciendo tu IA</h2>
            </div>
          </div>

          <div className="ai-activity-list">
            {activity.map((item) => (
              <div className="ai-activity-item" key={item.title}>
                <span className="ai-activity-icon">✦</span>

                <div>
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                </div>

                <time>{item.time}</time>
              </div>
            ))}
          </div>
        </div>

        <aside className="ai-autonomy-card">
          <div className="ai-autonomy-icon">⚙</div>

          <span className="card-eyebrow">AUTONOMÍA DE LA IA</span>

          <h2>Decide cuánto puede hacer por ti.</h2>

          <p>
            La autonomía define qué puede hacer la IA sin pedirte permiso y
            qué acciones requieren tu aprobación.
          </p>

          <div className="ai-autonomy-levels">
            {autonomyLevels.map((item) => (
              <div
                className={item.active ? 'is-active' : ''}
                key={item.level}
              >
                <span>{item.level}</span>
                <strong>{item.name}</strong>
                <small>{item.description}</small>
              </div>
            ))}
          </div>

          <button type="button">
            Configurar autonomía <span>→</span>
          </button>
        </aside>
      </section>
    </div>
  );
}

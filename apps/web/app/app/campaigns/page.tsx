const campaigns = [
  {
    name: 'Campaña Primavera 2026',
    objective: 'Captar nuevos clientes',
    status: 'Activa',
    progress: 72,
    channels: 'Instagram · Facebook',
    results: '184 leads',
    budget: '$8.500',
    period: '22 Sep — 12 Oct',
  },
  {
    name: 'Servicio destacado',
    objective: 'Aumentar ventas',
    status: 'Programada',
    progress: 38,
    channels: 'Instagram · WhatsApp',
    results: '62 conversiones',
    budget: '$5.200',
    period: '05 Oct — 19 Oct',
  },
  {
    name: 'Reactivación de clientes',
    objective: 'Recuperar clientes',
    status: 'En preparación',
    progress: 18,
    channels: 'Email · WhatsApp',
    results: '—',
    budget: '$2.400',
    period: '10 Oct — 24 Oct',
  },
];

const campaignActivity = [
  {
    title: 'La IA optimizó la campaña Primavera 2026',
    detail: 'Redistribuyó contenido hacia los días con mayor interacción.',
    time: 'Hace 24 min',
  },
  {
    title: 'Detectó una nueva oportunidad',
    detail: 'Clientes inactivos con alta probabilidad de volver.',
    time: 'Hace 1 h',
  },
  {
    title: 'Preparó una nueva campaña',
    detail: 'Reactivación de clientes · 4 piezas generadas.',
    time: 'Hace 2 h',
  },
];

export default function CampaignsPage() {
  return (
    <div className="campaigns-page">
      <section className="campaigns-heading">
        <div>
          <div className="dashboard-eyebrow">
            <span className="dashboard-status-dot" />
            CAMPAÑAS INTELIGENTES
          </div>

          <h1>Campañas</h1>

          <p>
            Convierte tus objetivos de negocio en campañas completas que la IA
            puede planificar, crear, optimizar y medir.
          </p>
        </div>

        <button className="campaigns-primary-button" type="button">
          <span>＋</span>
          Nueva campaña
        </button>
      </section>

      <section className="campaigns-ai-banner">
        <div className="campaigns-ai-banner-copy">
          <div className="campaigns-ai-label">
            <span>✦</span>
            IA ESTRATÉGICA ACTIVA
          </div>

          <h2>
            Tu IA está trabajando para alcanzar tus objetivos.
          </h2>

          <p>
            Analiza el Business Brain, tus resultados y el comportamiento de
            tus clientes para detectar oportunidades y preparar campañas.
          </p>
        </div>

        <div className="campaigns-ai-metrics">
          <div>
            <strong>3</strong>
            <span>campañas</span>
          </div>

          <div>
            <strong>246</strong>
            <span>conversiones</span>
          </div>

          <div>
            <strong>8,4×</strong>
            <span>retorno</span>
          </div>
        </div>
      </section>

      <section className="campaigns-section">
        <div className="campaigns-section-header">
          <div>
            <span className="card-eyebrow">GESTIÓN DE CAMPAÑAS</span>
            <h2>Tus campañas</h2>
          </div>

          <button type="button">Ver todas →</button>
        </div>

        <div className="campaigns-list">
          {campaigns.map((campaign) => (
            <article className="campaign-card" key={campaign.name}>
              <div className="campaign-card-main">
                <div className="campaign-card-top">
                  <span
                    className={
                      campaign.status === 'Activa'
                        ? 'campaign-status is-active'
                        : campaign.status === 'Programada'
                          ? 'campaign-status is-scheduled'
                          : 'campaign-status is-draft'
                    }
                  >
                    {campaign.status}
                  </span>

                  <span className="campaign-period">
                    {campaign.period}
                  </span>
                </div>

                <h3>{campaign.name}</h3>

                <p>{campaign.objective}</p>

                <div className="campaign-channel-list">
                  {campaign.channels.split(' · ').map((channel) => (
                    <span key={channel}>{channel}</span>
                  ))}
                </div>
              </div>

              <div className="campaign-progress">
                <div className="campaign-progress-header">
                  <span>Progreso</span>
                  <strong>{campaign.progress}%</strong>
                </div>

                <div className="campaign-progress-track">
                  <span style={{ width: `${campaign.progress}%` }} />
                </div>

                <div className="campaign-results">
                  <div>
                    <small>Resultados</small>
                    <strong>{campaign.results}</strong>
                  </div>

                  <div>
                    <small>Presupuesto</small>
                    <strong>{campaign.budget}</strong>
                  </div>
                </div>
              </div>

              <button className="campaign-view-button" type="button">
                Abrir campaña →
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="campaigns-bottom-grid">
        <div className="campaigns-activity-card">
          <div className="campaigns-section-header">
            <div>
              <span className="card-eyebrow">ACTIVIDAD DE LA IA</span>
              <h2>Lo que está haciendo tu IA</h2>
            </div>
          </div>

          <div className="campaigns-activity-list">
            {campaignActivity.map((item) => (
              <div className="campaign-activity" key={item.title}>
                <span className="campaign-activity-icon">✦</span>

                <div>
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                </div>

                <time>{item.time}</time>
              </div>
            ))}
          </div>
        </div>

        <aside className="campaigns-strategy-card">
          <div className="campaigns-strategy-icon">✦</div>

          <span className="card-eyebrow">OPORTUNIDAD DETECTADA</span>

          <h2>Hay una oportunidad para reactivar clientes.</h2>

          <p>
            La IA detectó un grupo de clientes que no compra desde hace más de
            60 días y coincide con tu perfil de cliente ideal.
          </p>

          <div className="campaigns-opportunity">
            <strong>128 clientes</strong>
            <span>potencialmente reactivables</span>
          </div>

          <button type="button">
            Crear campaña <span>→</span>
          </button>
        </aside>
      </section>
    </div>
  );
}

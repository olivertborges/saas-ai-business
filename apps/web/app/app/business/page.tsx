const businessSections = [
  {
    number: '01',
    title: 'Identidad',
    description: 'Cómo se presenta y se reconoce tu negocio.',
    status: 'Completo',
  },
  {
    number: '02',
    title: 'Oferta',
    description: 'Qué vendes y qué valor entregas a tus clientes.',
    status: 'Completo',
  },
  {
    number: '03',
    title: 'Cliente ideal',
    description: 'A quién quieres atraer y servir.',
    status: 'Pendiente',
  },
  {
    number: '04',
    title: 'Marca y comunicación',
    description: 'El tono, estilo y personalidad de tu negocio.',
    status: 'Pendiente',
  },
];

export default function BusinessPage() {
  return (
    <div className="business-page">
      <section className="business-heading">
        <div>
          <div className="dashboard-eyebrow">
            <span className="dashboard-status-dot" />
            BUSINESS BRAIN
          </div>

          <h1>Mi negocio</h1>

          <p>
            Construye el contexto que la IA utilizará para entender y hacer
            crecer tu negocio.
          </p>
        </div>

        <div className="business-completion">
          <span>PROGRESO DEL PERFIL</span>
          <strong>50%</strong>

          <div className="business-progress">
            <i />
          </div>
        </div>
      </section>

      <section className="business-hero">
        <div className="business-hero-main">
          <div className="business-logo-large">MB</div>

          <div>
            <span className="card-eyebrow">TU NEGOCIO</span>
            <h2>Mi negocio</h2>

            <p>
              Información centralizada para que SaaS AI pueda tomar mejores
              decisiones contigo.
            </p>

            <div className="business-tags">
              <span>Servicios</span>
              <span>Profesional</span>
              <span>Montevideo</span>
            </div>
          </div>
        </div>

        <button className="business-edit-button" type="button">
          Editar información <span>→</span>
        </button>
      </section>

      <section className="business-layout">
        <div className="business-section-list">
          <div className="business-section-header">
            <div>
              <span className="card-eyebrow">CONTEXTO DEL NEGOCIO</span>
              <h2>Business Brain</h2>
            </div>

            <span className="business-count">2 / 4</span>
          </div>

          <div className="business-sections">
            {businessSections.map((section) => (
              <button
                className={`business-section ${
                  section.status === 'Completo' ? 'is-complete' : ''
                }`}
                key={section.number}
                type="button"
              >
                <span className="business-section-number">
                  {section.number}
                </span>

                <span className="business-section-content">
                  <strong>{section.title}</strong>
                  <span>{section.description}</span>
                </span>

                <span
                  className={`business-section-status ${
                    section.status === 'Completo' ? 'is-complete' : ''
                  }`}
                >
                  {section.status}
                </span>

                <span className="business-section-arrow">→</span>
              </button>
            ))}
          </div>
        </div>

        <aside className="business-ai-card">
          <div className="business-ai-icon">✦</div>

          <span className="card-eyebrow">BUSINESS AI</span>

          <h2>Tu negocio, entendido por la IA.</h2>

          <p>
            Cuanto más completo esté tu Business Brain, más precisas serán las
            estrategias, contenidos y recomendaciones que genere la plataforma.
          </p>

          <div className="business-ai-stat">
            <div>
              <span>CONTEXTO CAPTURADO</span>
              <strong>50%</strong>
            </div>

            <div className="business-ai-progress">
              <i />
            </div>
          </div>

          <button className="business-ai-button" type="button">
            Completar Business Brain <span>→</span>
          </button>
        </aside>
      </section>

      <section className="business-insight">
        <div className="business-insight-icon">✧</div>

        <div>
          <span className="card-eyebrow">RECOMENDACIÓN DE IA</span>
          <h2>Empieza por definir a tu cliente ideal.</h2>

          <p>
            Conocer a quién quieres atraer permitirá que la IA adapte tus
            contenidos, campañas y mensajes a personas más relevantes para tu
            negocio.
          </p>
        </div>

        <button type="button">Completar ahora →</button>
      </section>
    </div>
  );
}

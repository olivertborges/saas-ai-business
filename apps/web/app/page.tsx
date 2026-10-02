const features = [
  {
    label: 'Business Brain',
    description: 'Toda la información estratégica de tu negocio en un solo lugar.',
  },
  {
    label: 'Contenido con IA',
    description: 'Ideas, textos y campañas adaptadas a tu marca.',
  },
  {
    label: 'Métricas',
    description: 'Entiende qué está funcionando y dónde crecer.',
  },
];

export default function HomePage() {
  return (
    <main className="landing">
      <nav className="nav">
        <div className="brand">
          <div className="brand-mark">AI</div>
          <span>SaaS AI Business</span>
        </div>

        <div className="nav-actions">
          <button className="button button-ghost">Iniciar sesión</button>
          <button className="button button-primary">Comenzar</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" />
            Inteligencia para tu negocio
          </div>

          <h1>
            Convierte tu negocio en un
            <span> negocio inteligente.</span>
          </h1>

          <p className="hero-description">
            Una plataforma para organizar tu negocio, crear contenido,
            automatizar tareas y tomar mejores decisiones con inteligencia
            artificial.
          </p>

          <div className="hero-actions">
            <button className="button button-primary button-large">
              Crear mi negocio
            </button>
            <button className="button button-secondary button-large">
              Explorar plataforma
            </button>
          </div>

          <p className="hero-note">
            Una plataforma. Todo tu negocio. Más inteligencia.
          </p>
        </div>

        <div className="hero-preview">
          <div className="preview-window">
            <div className="preview-header">
              <div className="preview-dots">
                <span />
                <span />
                <span />
              </div>

              <span className="preview-title">Business Overview</span>

              <div className="preview-status">● Live</div>
            </div>

            <div className="preview-body">
              <div className="preview-welcome">
                <div>
                  <span className="preview-label">RESUMEN DEL NEGOCIO</span>
                  <h2>Tu negocio hoy</h2>
                </div>

                <div className="preview-period">Últimos 30 días</div>
              </div>

              <div className="metric-grid">
                <div className="metric-card">
                  <span>Ingresos</span>
                  <strong>$48.240</strong>
                  <small>+18,4%</small>
                </div>

                <div className="metric-card">
                  <span>Clientes</span>
                  <strong>1.284</strong>
                  <small>+12,8%</small>
                </div>

                <div className="metric-card">
                  <span>Contenido</span>
                  <strong>42</strong>
                  <small>+9 publicaciones</small>
                </div>
              </div>

              <div className="preview-chart">
                <div className="chart-heading">
                  <span>Actividad del negocio</span>
                  <span>Últimas semanas</span>
                </div>

                <div className="chart">
                  <div className="chart-line chart-line-one" />
                  <div className="chart-line chart-line-two" />
                  <div className="chart-line chart-line-three" />

                  <div className="chart-bars">
                    <span style={{ height: '34%' }} />
                    <span style={{ height: '48%' }} />
                    <span style={{ height: '42%' }} />
                    <span style={{ height: '63%' }} />
                    <span style={{ height: '56%' }} />
                    <span style={{ height: '78%' }} />
                    <span style={{ height: '70%' }} />
                    <span style={{ height: '92%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="floating-card floating-card-ai">
            <div className="floating-icon">✦</div>
            <div>
              <strong>AI Assistant</strong>
              <span>3 oportunidades detectadas</span>
            </div>
          </div>

          <div className="floating-card floating-card-content">
            <div className="content-icon">✓</div>
            <div>
              <strong>Contenido listo</strong>
              <span>12 publicaciones esta semana</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        {features.map((feature) => (
          <article className="feature-card" key={feature.label}>
            <span className="feature-number">0{features.indexOf(feature) + 1}</span>
            <h3>{feature.label}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

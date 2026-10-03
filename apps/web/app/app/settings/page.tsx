export default function SettingsPage() {
  const sections = [
    {
      title: 'Perfil del negocio',
      description: 'Información general, identidad y datos públicos de tu negocio.',
      status: 'Configurado',
      icon: '🏢',
    },
    {
      title: 'Usuarios y permisos',
      description: 'Administra usuarios, roles y niveles de acceso.',
      status: '3 usuarios',
      icon: '👥',
    },
    {
      title: 'Notificaciones',
      description: 'Define qué avisos quieres recibir y por qué canales.',
      status: 'Activas',
      icon: '🔔',
    },
    {
      title: 'Integraciones',
      description: 'Conecta redes sociales, mensajería y otras herramientas.',
      status: '2 conectadas',
      icon: '🔗',
    },
    {
      title: 'IA y autonomía',
      description: 'Configura cómo puede actuar la inteligencia artificial en tu negocio.',
      status: 'Nivel 3',
      icon: '🤖',
    },
    {
      title: 'Suscripción y plan',
      description: 'Consulta tu plan, consumo y opciones de facturación.',
      status: 'Business Pro',
      icon: '💳',
    },
    {
      title: 'Seguridad',
      description: 'Protege tu cuenta y administra las opciones de seguridad.',
      status: 'Protegida',
      icon: '🔐',
    },
  ];

  return (
    <section className="settings-page">
      <div className="settings-heading">
        <div>
          <span className="settings-eyebrow">CONFIGURACIÓN</span>
          <h1>Configuración</h1>
          <p>Controla cómo funciona tu negocio dentro de SaaS AI Business.</p>
        </div>

        <button className="settings-save">Guardar cambios</button>
      </div>

      <div className="settings-layout">
        <aside className="settings-sidebar">
          <button className="settings-nav-item active">
            <span>⚙️</span>
            General
          </button>
          <button className="settings-nav-item">
            <span>👥</span>
            Usuarios
          </button>
          <button className="settings-nav-item">
            <span>🔔</span>
            Notificaciones
          </button>
          <button className="settings-nav-item">
            <span>🔗</span>
            Integraciones
          </button>
          <button className="settings-nav-item">
            <span>🤖</span>
            Inteligencia artificial
          </button>
          <button className="settings-nav-item">
            <span>💳</span>
            Plan y facturación
          </button>
          <button className="settings-nav-item">
            <span>🔐</span>
            Seguridad
          </button>
        </aside>

        <div className="settings-main">
          <div className="settings-profile-card">
            <div className="settings-profile-avatar">MB</div>

            <div className="settings-profile-copy">
              <span className="settings-card-eyebrow">NEGOCIO ACTIVO</span>
              <h2>Mi negocio</h2>
              <p>Servicios profesionales · Montevideo, Uruguay</p>
            </div>

            <button className="settings-outline-button">Editar perfil</button>
          </div>

          <div className="settings-section-heading">
            <div>
              <span className="settings-card-eyebrow">CONTROL DEL SISTEMA</span>
              <h2>Configuración general</h2>
            </div>
            <span className="settings-count">7 opciones</span>
          </div>

          <div className="settings-grid">
            {sections.map((section) => (
              <button className="settings-card" key={section.title}>
                <div className="settings-card-top">
                  <span className="settings-card-icon">{section.icon}</span>
                  <span className="settings-card-status">{section.status}</span>
                </div>

                <div>
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                </div>

                <span className="settings-card-arrow">→</span>
              </button>
            ))}
          </div>

          <div className="settings-ai-card">
            <div className="settings-ai-orb">✦</div>

            <div>
              <span className="settings-card-eyebrow">BUSINESS AI</span>
              <h2>La IA también puede ayudarte a configurar tu negocio.</h2>
              <p>
                Puede detectar configuraciones incompletas, recomendar ajustes y
                explicarte el impacto de cada decisión antes de aplicarla.
              </p>
            </div>

            <button className="settings-ai-button">Hablar con la IA</button>
          </div>
        </div>
      </div>
    </section>
  );
}

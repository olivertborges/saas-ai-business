const navigation = [
  { label: 'Inicio', icon: '⌂', active: true },
  { label: 'Mi negocio', icon: '◈' },
  { label: 'Clientes', icon: '○' },
  { label: 'Agenda', icon: '□' },
  { label: 'Ventas', icon: '$' },
  { label: 'Contenido', icon: '✦' },
  { label: 'Campañas', icon: '◉' },
  { label: 'IA', icon: '✧' },
  { label: 'Automatizaciones', icon: '↗' },
  { label: 'Métricas', icon: '▥' },
  { label: 'Finanzas', icon: '◫' },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">AI</div>

        <div>
          <strong>SaaS AI</strong>
          <span>Business</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Navegación principal">
        <span className="sidebar-section-label">PLATAFORMA</span>

        {navigation.map((item) => (
          <button
            className={`sidebar-item${item.active ? ' is-active' : ''}`}
            key={item.label}
            type="button"
          >
            <span className="sidebar-item-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className="sidebar-item" type="button">
          <span className="sidebar-item-icon">⚙</span>
          <span>Configuración</span>
        </button>

        <div className="sidebar-business">
          <div className="business-avatar">MB</div>

          <div className="business-info">
            <strong>Mi negocio</strong>
            <span>Plan Professional</span>
          </div>

          <span className="business-more">•••</span>
        </div>
      </div>
    </aside>
  );
}

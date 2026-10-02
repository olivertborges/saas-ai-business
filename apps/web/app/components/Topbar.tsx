export function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="mobile-brand">
          <div className="mobile-brand-mark">AI</div>
          <span>SaaS AI</span>
        </div>

        <div className="breadcrumb">
          <span>Plataforma</span>
          <strong>/</strong>
          <span className="breadcrumb-current">Inicio</span>
        </div>
      </div>

      <div className="topbar-actions">
        <button className="search-button" type="button" aria-label="Buscar">
          <span className="search-icon">⌕</span>
          <span>Buscar</span>
          <kbd>⌘ K</kbd>
        </button>

        <button
          className="notification-button"
          type="button"
          aria-label="Notificaciones"
        >
          <span>♧</span>
          <i />
        </button>

        <div className="topbar-user">
          <div className="topbar-avatar">OB</div>

          <div className="topbar-user-info">
            <strong>Olivert</strong>
            <span>Administrador</span>
          </div>

          <span className="topbar-chevron">⌄</span>
        </div>
      </div>
    </header>
  );
}

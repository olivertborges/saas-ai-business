'use client';

import { usePathname } from 'next/navigation';

const routeLabels: Record<string, string> = {
  '/app': 'Inicio',
  '/app/business': 'Mi negocio',
  '/app/clients': 'Clientes',
  '/app/calendar': 'Agenda',
  '/app/sales': 'Ventas',
  '/app/content': 'Contenido',
  '/app/campaigns': 'Campañas',
  '/app/ai': 'IA',
  '/app/automations': 'Automatizaciones',
  '/app/metrics': 'Métricas',
  '/app/settings': 'Configuración',
};

export function Topbar({
  onMenuClick,
}: {
  onMenuClick?: () => void;
}) {
  const pathname = usePathname();

  const currentLabel =
    routeLabels[pathname] ??
    Object.entries(routeLabels).find(
      ([route]) => route !== '/app' && pathname.startsWith(`${route}/`),
    )?.[1] ??
    'Inicio';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="mobile-menu-button"
          aria-label="Abrir menú"
          onClick={onMenuClick}
        >
          <span />
          <span />
          <span />
        </button>

        <div className="mobile-brand">
          <div className="mobile-brand-mark">AI</div>
          <span>SaaS AI</span>
        </div>

        <div className="breadcrumb">
          <span>Plataforma</span>
          <strong>/</strong>
          <span className="breadcrumb-current">{currentLabel}</span>
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

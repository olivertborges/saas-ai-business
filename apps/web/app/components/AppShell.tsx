'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

const navigation = [
  { label: 'Inicio', icon: '⌂', href: '/app' },
  { label: 'Mi negocio', icon: '◈', href: '/app/business' },
  { label: 'Clientes', icon: '○', href: '/app/clients' },
  { label: 'Agenda', icon: '□', href: '/app/calendar' },
  { label: 'Ventas', icon: '$', href: '/app/sales' },
  { label: 'Contenido', icon: '✦', href: '/app/content' },
  { label: 'Campañas', icon: '◉', href: '/app/campaigns' },
  { label: 'IA', icon: '✧', href: '/app/ai' },
  { label: 'Automatizaciones', icon: '↗', href: '/app/automations' },
  { label: 'Métricas', icon: '▥', href: '/app/metrics' },
  { label: 'Configuración', icon: '⚙', href: '/app/settings' },
];

export function AppShell({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-main">
        <Topbar
          onMenuClick={() => setMobileMenuOpen(true)}
        />

        {mobileMenuOpen && (
          <div
            className="mobile-menu-overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        <aside
          className={`mobile-navigation${
            mobileMenuOpen ? ' is-open' : ''
          }`}
          aria-label="Navegación móvil"
        >
          <div className="mobile-navigation-header">
            <div className="mobile-navigation-brand">
              <div className="mobile-navigation-mark">AI</div>

              <div>
                <strong>SaaS AI</strong>
                <span>Business</span>
              </div>
            </div>

            <button
              type="button"
              className="mobile-navigation-close"
              aria-label="Cerrar menú"
              onClick={() => setMobileMenuOpen(false)}
            >
              ×
            </button>
          </div>

          <nav className="mobile-navigation-list">
            <span className="mobile-navigation-label">
              PLATAFORMA
            </span>

            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="mobile-navigation-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mobile-navigation-icon">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="mobile-navigation-footer">
            <div className="business-avatar">MB</div>

            <div className="business-info">
              <strong>Mi negocio</strong>
              <span>Plan Professional</span>
            </div>
          </div>
        </aside>

        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}

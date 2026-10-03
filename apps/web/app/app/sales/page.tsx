const sales = [
  {
    id: 'V-1048',
    client: 'Sofía Cardozo',
    concept: 'Servicio premium',
    amount: '$2.480',
    method: 'Tarjeta',
    status: 'Completada',
    date: 'Hoy · 10:30',
    initials: 'SC',
  },
  {
    id: 'V-1047',
    client: 'Martín Rodríguez',
    concept: 'Servicio premium',
    amount: '$1.920',
    method: 'Transferencia',
    status: 'Completada',
    date: 'Hoy · 09:15',
    initials: 'MR',
  },
  {
    id: 'V-1046',
    client: 'Valentina Pérez',
    concept: 'Sesión de seguimiento',
    amount: '$1.350',
    method: 'Efectivo',
    status: 'Completada',
    date: 'Ayer · 16:40',
    initials: 'VP',
  },
  {
    id: 'V-1045',
    client: 'Lucía Fernández',
    concept: 'Servicio premium',
    amount: '$2.180',
    method: 'Tarjeta',
    status: 'Pendiente',
    date: 'Ayer · 14:20',
    initials: 'LF',
  },
  {
    id: 'V-1044',
    client: 'Gabriel Núñez',
    concept: 'Consulta inicial',
    amount: '$890',
    method: 'Transferencia',
    status: 'Completada',
    date: '30 Sep · 11:00',
    initials: 'GN',
  },
];

export default function SalesPage() {
  return (
    <div className="sales-page">
      <section className="sales-heading">
        <div>
          <div className="dashboard-eyebrow">
            <span className="dashboard-status-dot" />
            OPERACIONES
          </div>

          <h1>Ventas</h1>

          <p>
            Controla tus ingresos, transacciones y rendimiento comercial desde
            un solo lugar.
          </p>
        </div>

        <button className="sales-primary-button" type="button">
          <span>+</span>
          Registrar venta
        </button>
      </section>

      <section className="sales-metrics">
        <article className="sales-metric-card sales-metric-primary">
          <div className="sales-metric-top">
            <span>INGRESOS ESTE MES</span>
            <span className="sales-metric-icon">↗</span>
          </div>

          <strong>$48.240</strong>

          <div className="sales-metric-bottom">
            <span className="sales-positive">+12,8%</span>
            <span>vs. mes anterior</span>
          </div>
        </article>

        <article className="sales-metric-card">
          <div className="sales-metric-top">
            <span>VENTAS</span>
            <span className="sales-metric-icon">◫</span>
          </div>

          <strong>186</strong>

          <div className="sales-metric-bottom">
            <span className="sales-positive">+18</span>
            <span>este mes</span>
          </div>
        </article>

        <article className="sales-metric-card">
          <div className="sales-metric-top">
            <span>TICKET PROMEDIO</span>
            <span className="sales-metric-icon">$</span>
          </div>

          <strong>$1.240</strong>

          <div className="sales-metric-bottom">
            <span className="sales-positive">+6,4%</span>
            <span>vs. mes anterior</span>
          </div>
        </article>

        <article className="sales-metric-card">
          <div className="sales-metric-top">
            <span>PENDIENTE DE COBRO</span>
            <span className="sales-metric-icon">!</span>
          </div>

          <strong>$3.420</strong>

          <div className="sales-metric-bottom">
            <span className="sales-warning">4 ventas</span>
            <span>pendientes</span>
          </div>
        </article>
      </section>

      <section className="sales-main-grid">
        <div className="sales-history-card">
          <div className="sales-history-header">
            <div>
              <span className="card-eyebrow">MOVIMIENTOS</span>
              <h2>Ventas recientes</h2>
            </div>

            <div className="sales-history-actions">
              <button type="button">Este mes⌄</button>
              <button type="button">Filtrar</button>
            </div>
          </div>

          <div className="sales-table">
            <div className="sales-table-head">
              <span>CLIENTE</span>
              <span>CONCEPTO</span>
              <span>IMPORTE</span>
              <span>MÉTODO</span>
              <span>ESTADO</span>
              <span />
            </div>

            {sales.map((sale) => (
              <button className="sales-row" key={sale.id} type="button">
                <span className="sales-client">
                  <span className="sales-avatar">{sale.initials}</span>
                  <span>
                    <strong>{sale.client}</strong>
                    <small>{sale.id} · {sale.date}</small>
                  </span>
                </span>

                <span className="sales-concept">{sale.concept}</span>

                <strong className="sales-amount">{sale.amount}</strong>

                <span className="sales-method">{sale.method}</span>

                <span
                  className={`sales-status ${
                    sale.status === 'Completada'
                      ? 'is-completed'
                      : 'is-pending'
                  }`}
                >
                  {sale.status}
                </span>

                <span className="sales-row-arrow">→</span>
              </button>
            ))}
          </div>

          <button className="sales-view-all" type="button">
            Ver todas las ventas <span>→</span>
          </button>
        </div>

        <aside className="sales-ai-card">
          <div className="sales-ai-icon">✦</div>

          <span className="card-eyebrow">BUSINESS AI</span>

          <h2>Las ventas están creciendo.</h2>

          <p>
            Tus ingresos aumentaron un 12,8% respecto al mes anterior. El mayor
            crecimiento viene de tus servicios premium.
          </p>

          <div className="sales-ai-stat">
            <div>
              <span>SERVICIOS PREMIUM</span>
              <strong>62%</strong>
            </div>

            <div className="sales-ai-progress">
              <i />
            </div>
          </div>

          <button type="button">
            Analizar ventas <span>→</span>
          </button>
        </aside>
      </section>

      <section className="sales-bottom-grid">
        <article className="sales-chart-card">
          <div className="sales-card-header">
            <div>
              <span className="card-eyebrow">RENDIMIENTO</span>
              <h2>Ingresos</h2>
            </div>

            <span className="sales-period">Últimos 7 días</span>
          </div>

          <div className="sales-chart">
            <div className="sales-chart-value">
              <strong>$8.420</strong>
              <span>Esta semana</span>
            </div>

            <svg
              viewBox="0 0 700 190"
              role="img"
              aria-label="Gráfico de ingresos de los últimos siete días"
            >
              <path
                d="M20 145 C90 132, 100 148, 155 116 S240 118, 285 92 S370 110, 415 72 S500 88, 545 48 S625 62, 680 25"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>

            <div className="sales-chart-labels">
              <span>LUN</span>
              <span>MAR</span>
              <span>MIÉ</span>
              <span>JUE</span>
              <span>VIE</span>
              <span>SÁB</span>
              <span>DOM</span>
            </div>
          </div>
        </article>

        <article className="sales-method-card">
          <div className="sales-card-header">
            <div>
              <span className="card-eyebrow">COBROS</span>
              <h2>Métodos de pago</h2>
            </div>
          </div>

          <div className="sales-method-list">
            <div>
              <span><i className="sales-method-dot" />Tarjeta</span>
              <strong>48%</strong>
            </div>

            <div>
              <span><i className="sales-method-dot" />Transferencia</span>
              <strong>32%</strong>
            </div>

            <div>
              <span><i className="sales-method-dot" />Efectivo</span>
              <strong>20%</strong>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

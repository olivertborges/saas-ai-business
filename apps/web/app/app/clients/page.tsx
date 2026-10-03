const clients = [
  {
    initials: 'SC',
    name: 'Sofía Cardozo',
    email: 'sofia.cardozo@email.com',
    status: 'Activo',
    visits: '18 visitas',
    spent: '$12.480',
    lastVisit: 'Hoy, 10:30',
  },
  {
    initials: 'MR',
    name: 'Martín Rodríguez',
    email: 'martin.rodriguez@email.com',
    status: 'Activo',
    visits: '12 visitas',
    spent: '$8.920',
    lastVisit: 'Ayer, 16:00',
  },
  {
    initials: 'VP',
    name: 'Valentina Pérez',
    email: 'valentina.perez@email.com',
    status: 'Activo',
    visits: '9 visitas',
    spent: '$6.750',
    lastVisit: '28 Sep, 11:30',
  },
  {
    initials: 'GN',
    name: 'Gabriel Núñez',
    email: 'gabriel.nunez@email.com',
    status: 'Inactivo',
    visits: '4 visitas',
    spent: '$2.340',
    lastVisit: '12 Sep, 15:00',
  },
  {
    initials: 'LF',
    name: 'Lucía Fernández',
    email: 'lucia.fernandez@email.com',
    status: 'Activo',
    visits: '7 visitas',
    spent: '$5.180',
    lastVisit: '26 Sep, 09:00',
  },
];

export default function ClientsPage() {
  return (
    <div className="clients-page">
      <section className="clients-heading">
        <div>
          <div className="dashboard-eyebrow">
            <span className="dashboard-status-dot" />
            RELACIÓN CON CLIENTES
          </div>

          <h1>Clientes</h1>

          <p>
            Conoce, organiza y gestiona las relaciones que hacen crecer tu
            negocio.
          </p>
        </div>

        <button className="clients-primary-button" type="button">
          <span>+</span>
          Nuevo cliente
        </button>
      </section>

      <section className="clients-metrics">
        <article className="clients-metric-card">
          <div className="clients-metric-icon clients-icon-purple">○</div>
          <div>
            <span>CLIENTES TOTALES</span>
            <strong>1.284</strong>
            <small>+8,4% este mes</small>
          </div>
        </article>

        <article className="clients-metric-card">
          <div className="clients-metric-icon clients-icon-green">↗</div>
          <div>
            <span>CLIENTES ACTIVOS</span>
            <strong>936</strong>
            <small>72,9% del total</small>
          </div>
        </article>

        <article className="clients-metric-card">
          <div className="clients-metric-icon clients-icon-blue">✦</div>
          <div>
            <span>NUEVOS ESTE MES</span>
            <strong>86</strong>
            <small>+14,2% vs. mes anterior</small>
          </div>
        </article>

        <article className="clients-metric-card">
          <div className="clients-metric-icon clients-icon-orange">$</div>
          <div>
            <span>VALOR PROMEDIO</span>
            <strong>$1.240</strong>
            <small>por cliente</small>
          </div>
        </article>
      </section>

      <section className="clients-content-card">
        <div className="clients-toolbar">
          <div>
            <span className="card-eyebrow">BASE DE CLIENTES</span>
            <h2>Todos tus clientes</h2>
          </div>

          <div className="clients-toolbar-actions">
            <label className="clients-search">
              <span>⌕</span>
              <input placeholder="Buscar cliente..." />
            </label>

            <button className="clients-filter-button" type="button">
              <span>≡</span>
              Filtrar
            </button>
          </div>
        </div>

        <div className="clients-table">
          <div className="clients-table-header">
            <span>CLIENTE</span>
            <span>ESTADO</span>
            <span>ACTIVIDAD</span>
            <span>VALOR</span>
            <span>ÚLTIMA VISITA</span>
            <span />
          </div>

          {clients.map((client) => (
            <button className="client-row" key={client.email} type="button">
              <span className="client-identity">
                <span className="client-avatar">{client.initials}</span>

                <span>
                  <strong>{client.name}</strong>
                  <small>{client.email}</small>
                </span>
              </span>

              <span>
                <span
                  className={`client-status ${
                    client.status === 'Activo' ? 'is-active' : 'is-inactive'
                  }`}
                >
                  {client.status}
                </span>
              </span>

              <span className="client-activity">
                {client.visits}
              </span>

              <span className="client-value">{client.spent}</span>

              <span className="client-last-visit">{client.lastVisit}</span>

              <span className="client-arrow">→</span>
            </button>
          ))}
        </div>

        <div className="clients-footer">
          <span>Mostrando 5 de 1.284 clientes</span>

          <div className="clients-pagination">
            <button type="button" aria-label="Página anterior">
              ←
            </button>
            <strong>1</strong>
            <button type="button" aria-label="Página siguiente">
              →
            </button>
          </div>
        </div>
      </section>

      <section className="clients-insight">
        <div className="clients-insight-icon">✦</div>

        <div>
          <span className="card-eyebrow">BUSINESS AI</span>
          <h2>Hay 86 nuevos clientes este mes.</h2>
          <p>
            La IA puede ayudarte a identificar qué tienen en común y detectar
            oportunidades para aumentar su recurrencia.
          </p>
        </div>

        <button type="button">Analizar clientes →</button>
      </section>
    </div>
  );
}

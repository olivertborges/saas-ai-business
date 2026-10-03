const weekDays = [
  { day: 'LUN', date: '28' },
  { day: 'MAR', date: '29' },
  { day: 'MIÉ', date: '30' },
  { day: 'JUE', date: '01' },
  { day: 'VIE', date: '02', active: true },
  { day: 'SÁB', date: '03' },
  { day: 'DOM', date: '04' },
];

const appointments = [
  {
    time: '09:00',
    duration: '45 min',
    client: 'Sofía Cardozo',
    service: 'Consulta inicial',
    professional: 'María',
    initials: 'SC',
    status: 'Confirmada',
  },
  {
    time: '10:30',
    duration: '60 min',
    client: 'Valentina Pérez',
    service: 'Servicio premium',
    professional: 'Carolina',
    initials: 'VP',
    status: 'Confirmada',
  },
  {
    time: '12:00',
    duration: '45 min',
    client: 'Martín Rodríguez',
    service: 'Sesión de seguimiento',
    professional: 'María',
    initials: 'MR',
    status: 'Pendiente',
  },
  {
    time: '15:30',
    duration: '60 min',
    client: 'Lucía Fernández',
    service: 'Servicio premium',
    professional: 'Carolina',
    initials: 'LF',
    status: 'Confirmada',
  },
  {
    time: '17:00',
    duration: '45 min',
    client: 'Gabriel Núñez',
    service: 'Consulta',
    professional: 'María',
    initials: 'GN',
    status: 'Pendiente',
  },
];

export default function CalendarPage() {
  return (
    <div className="calendar-page">
      <section className="calendar-heading">
        <div>
          <div className="dashboard-eyebrow">
            <span className="dashboard-status-dot" />
            OPERACIONES
          </div>

          <h1>Agenda</h1>

          <p>
            Organiza tu día, controla tus citas y mantén tu operación bajo
            control.
          </p>
        </div>

        <button className="calendar-primary-button" type="button">
          <span>+</span>
          Nueva cita
        </button>
      </section>

      <section className="calendar-summary">
        <div className="calendar-summary-main">
          <div>
            <span className="card-eyebrow">HOY · VIERNES 02 OCT</span>
            <h2>Tu agenda de hoy</h2>
          </div>

          <div className="calendar-summary-stats">
            <div>
              <strong>5</strong>
              <span>Citas</span>
            </div>

            <div>
              <strong>4h 15m</strong>
              <span>Ocupado</span>
            </div>

            <div>
              <strong>2</strong>
              <span>Pendientes</span>
            </div>
          </div>
        </div>

        <div className="calendar-status">
          <span />
          Agenda activa
        </div>
      </section>

      <section className="calendar-week-card">
        <div className="calendar-week-header">
          <div>
            <span className="card-eyebrow">CALENDARIO</span>
            <h2>Esta semana</h2>
          </div>

          <div className="calendar-navigation">
            <button type="button" aria-label="Semana anterior">
              ←
            </button>

            <button type="button" className="calendar-today-button">
              Hoy
            </button>

            <button type="button" aria-label="Semana siguiente">
              →
            </button>
          </div>
        </div>

        <div className="calendar-days">
          {weekDays.map((item) => (
            <button
              className={`calendar-day${item.active ? ' is-active' : ''}`}
              key={item.date}
              type="button"
            >
              <span>{item.day}</span>
              <strong>{item.date}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="calendar-content">
        <div className="appointments-card">
          <div className="appointments-header">
            <div>
              <span className="card-eyebrow">02 OCTUBRE</span>
              <h2>Citas de hoy</h2>
            </div>

            <button type="button">Ver todas →</button>
          </div>

          <div className="appointments-list">
            {appointments.map((appointment) => (
              <button
                className="appointment-row"
                key={`${appointment.time}-${appointment.client}`}
                type="button"
              >
                <span className="appointment-time">
                  <strong>{appointment.time}</strong>
                  <small>{appointment.duration}</small>
                </span>

                <span className="appointment-line" />

                <span className="appointment-client">
                  <span className="appointment-avatar">
                    {appointment.initials}
                  </span>

                  <span>
                    <strong>{appointment.client}</strong>
                    <small>{appointment.service}</small>
                  </span>
                </span>

                <span className="appointment-professional">
                  <small>PROFESIONAL</small>
                  <strong>{appointment.professional}</strong>
                </span>

                <span
                  className={`appointment-status ${
                    appointment.status === 'Confirmada'
                      ? 'is-confirmed'
                      : 'is-pending'
                  }`}
                >
                  {appointment.status}
                </span>

                <span className="appointment-arrow">→</span>
              </button>
            ))}
          </div>
        </div>

        <aside className="calendar-side-card">
          <div className="calendar-side-icon">✦</div>

          <span className="card-eyebrow">BUSINESS AI</span>

          <h2>Tu agenda está 78% ocupada.</h2>

          <p>
            Hay espacios disponibles entre las 13:00 y las 15:00. Podrías
            aprovecharlos para captar una nueva reserva.
          </p>

          <div className="calendar-occupancy">
            <div>
              <span>OCUPACIÓN</span>
              <strong>78%</strong>
            </div>

            <div className="calendar-occupancy-bar">
              <i />
            </div>
          </div>

          <button type="button">
            Encontrar oportunidad <span>→</span>
          </button>
        </aside>
      </section>
    </div>
  );
}

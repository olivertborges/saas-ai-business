const generatedContent = [
  {
    type: 'REEL',
    icon: '▶',
    title: '3 razones por las que tus clientes deberían elegirte',
    description:
      'La IA detectó una oportunidad para comunicar tu propuesta de valor de forma rápida y cercana.',
    platform: 'Instagram',
    status: 'Listo para publicar',
    time: 'Hoy · 18:00',
  },
  {
    type: 'CARRUSEL',
    icon: '▤',
    title: '5 errores que están haciendo perder clientes',
    description:
      'Creado a partir de los objetivos actuales del negocio y los temas con mayor potencial de interacción.',
    platform: 'Instagram',
    status: 'Listo para publicar',
    time: 'Mañana · 11:00',
  },
  {
    type: 'HISTORIA',
    icon: '◈',
    title: 'Promoción destacada de esta semana',
    description:
      'La IA identificó una oportunidad comercial y preparó una secuencia de Stories para comunicarla.',
    platform: 'Instagram',
    status: 'Requiere aprobación',
    time: 'Mañana · 17:30',
  },
  {
    type: 'IMAGEN',
    icon: '✦',
    title: 'Servicio destacado de la semana',
    description:
      'Creatividad visual generada siguiendo la identidad y el posicionamiento de la marca.',
    platform: 'Instagram / Facebook',
    status: 'Listo para publicar',
    time: 'Viernes · 12:00',
  },
];

const weekPlan = [
  { day: 'LUN', type: 'Post', topic: 'Consejo práctico', state: 'Publicado' },
  { day: 'MAR', type: 'Historia', topic: 'Promoción', state: 'Listo' },
  { day: 'MIÉ', type: 'Reel', topic: 'Educativo', state: 'Listo' },
  { day: 'JUE', type: 'Carrusel', topic: 'Valor', state: 'Listo' },
  { day: 'VIE', type: 'Video', topic: 'Marca', state: 'Generando' },
];

const activity = [
  {
    title: 'Analizó el rendimiento de tus publicaciones',
    detail: '12 publicaciones · últimos 30 días',
    time: 'Hace 18 min',
  },
  {
    title: 'Detectó una oportunidad de contenido',
    detail: 'Educación + captación de nuevos clientes',
    time: 'Hace 14 min',
  },
  {
    title: 'Generó 5 piezas para esta semana',
    detail: '3 listas · 1 requiere aprobación · 1 en proceso',
    time: 'Hace 8 min',
  },
];

export default function ContentPage() {
  return (
    <div className="content-page">
      <section className="content-heading">
        <div>
          <div className="dashboard-eyebrow">
            <span className="dashboard-status-dot" />
            AI CONTENT STUDIO
          </div>

          <h1>Contenido</h1>

          <p>
            Tu IA estudia tu negocio, detecta oportunidades y crea contenido
            automáticamente para mantener activa tu presencia digital.
          </p>
        </div>

        <button className="content-primary-button" type="button">
          <span>✦</span>
          Crear contenido
        </button>
      </section>

      <section className="content-ai-command">
        <div className="content-ai-command-top">
          <div className="content-ai-status">
            <span className="content-ai-live-dot" />
            IA TRABAJANDO
          </div>

          <span className="content-brain-badge">
            <span>✦</span>
            Business Brain conectado
          </span>
        </div>

        <div className="content-ai-command-main">
          <div>
            <span className="card-eyebrow">ACTIVIDAD DE TU IA</span>

            <h2>Tu IA ya creó contenido para tu negocio.</h2>

            <p>
              Analizó tu negocio, tus objetivos y el rendimiento reciente de
              tus publicaciones. Encontró oportunidades y preparó nuevas
              piezas sin que tuvieras que pedirlas una por una.
            </p>
          </div>

          <div className="content-ai-summary">
            <div>
              <strong>5</strong>
              <span>creadas</span>
            </div>

            <div>
              <strong>3</strong>
              <span>listas</span>
            </div>

            <div>
              <strong>1</strong>
              <span>aprobación</span>
            </div>
          </div>
        </div>

        <div className="content-ai-reason">
          <span>✦</span>

          <div>
            <strong>¿Por qué creó esto?</strong>
            <p>
              Detecté una oportunidad para aumentar el alcance y convertir
              más seguidores en clientes esta semana.
            </p>
          </div>
        </div>
      </section>

      <section className="content-generated">
        <div className="content-card-header">
          <div>
            <span className="card-eyebrow">CREADO POR TU IA</span>
            <h2>Contenido listo para publicar</h2>
          </div>

          <button type="button">Ver todo →</button>
        </div>

        <div className="content-generated-grid">
          {generatedContent.map((item) => (
            <article className="content-generated-card" key={item.title}>
              <div className="content-generated-visual">
                <span className="content-generated-format">
                  {item.icon} {item.type}
                </span>

                <span className="content-generated-sparkle">✦</span>

                <div className="content-generated-preview">
                  <strong>{item.title}</strong>
                  <small>Creado por IA</small>
                </div>
              </div>

              <div className="content-generated-body">
                <div className="content-generated-meta">
                  <span>{item.platform}</span>
                  <span>{item.time}</span>
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <div className="content-generated-footer">
                  <span
                    className={
                      item.status === 'Requiere aprobación'
                        ? 'is-review'
                        : 'is-ready'
                    }
                  >
                    {item.status}
                  </span>

                  <button type="button">Ver contenido →</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-autopilot">
        <div className="content-autopilot-copy">
          <span className="card-eyebrow">MODO AUTOPILOTO</span>

          <h2>La IA prepara tu semana completa.</h2>

          <p>
            No necesitas entrar todos los días a decirle qué publicar. Tu IA
            puede analizar el negocio, decidir qué contenido necesita y
            preparar las piezas automáticamente.
          </p>

          <div className="content-autopilot-flow">
            <span>Analiza</span>
            <i>→</i>
            <span>Decide</span>
            <i>→</i>
            <span>Crea</span>
            <i>→</i>
            <span>Programa</span>
          </div>

          <button type="button">
            Configurar autonomía <span>→</span>
          </button>
        </div>

        <div className="content-week-preview">
          {weekPlan.map((item, index) => (
            <div
              className={index === 2 ? 'is-highlighted' : ''}
              key={item.day}
            >
              <span>{item.day}</span>
              <strong>{item.type}</strong>
              <small>{item.topic}</small>
              <em>{item.state}</em>
            </div>
          ))}
        </div>
      </section>

      <section className="content-main-grid">
        <div className="content-library-card">
          <div className="content-card-header">
            <div>
              <span className="card-eyebrow">ACTIVIDAD DE LA IA</span>
              <h2>Lo que tu IA está haciendo</h2>
            </div>
          </div>

          <div className="content-list">
            {activity.map((item) => (
              <div className="content-ai-activity" key={item.title}>
                <span className="content-ai-activity-icon">✦</span>

                <div>
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                </div>

                <time>{item.time}</time>
              </div>
            ))}
          </div>
        </div>

        <aside className="content-ai-card">
          <div className="content-ai-icon">✦</div>

          <span className="card-eyebrow">CONTROL HUMANO</span>

          <h2>Vos decides cuánto puede hacer la IA.</h2>

          <p>
            Puedes dejar que la IA sugiera, cree, programe o ejecute
            automáticamente según el nivel de autonomía que configures.
          </p>

          <div className="content-autonomy-levels">
            <span>Asistir</span>
            <span>Crear</span>
            <span>Programar</span>
            <span>Ejecutar</span>
          </div>

          <button type="button">
            Configurar IA <span>→</span>
          </button>
        </aside>
      </section>
    </div>
  );
}

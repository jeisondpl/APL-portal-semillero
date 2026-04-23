import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'APL Semilleros — Portal de Capacitación INDRA',
  description:
    'Plataforma de aprendizaje front-end para el programa de semilleros INDRA Colombia. Aprende Next.js, React y Clean Architecture.',
}

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const STATS = [
  { value: '12+', label: 'Cursos',    sub: 'en el catálogo' },
  { value: '80+', label: 'Lecciones', sub: 'de contenido' },
  { value: '3',   label: 'Niveles',   sub: 'de dificultad' },
  { value: '100%',label: 'Gratis',    sub: 'para semilleros' },
]

const FEATURES = [
  {
    num: '01',
    title: 'Cursos estructurados',
    description:
      'Ruta de aprendizaje diseñada por el equipo técnico de INDRA con estándares reales de la industria. Desde fundamentos hasta arquitectura avanzada.',
    accent: '#004254',
    pill: 'rgba(0,66,84,0.1)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 5.5h12a.5.5 0 01.5.5v12.5l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5V6a.5.5 0 01.5-.5z" fill="currentColor"/>
        <path d="M17.5 5.5H20a.5.5 0 01.5.5V18.5l-1.5-1.2-1.5 1.2V5.5z" fill="currentColor" opacity="0.35"/>
        <path d="M7 9h7M7 12h5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Seguimiento de progreso',
    description:
      'Monitorea tu avance por curso y lección con métricas en tiempo real. Visualiza tu crecimiento semana a semana dentro del programa.',
    accent: '#44B757',
    pill: 'rgba(68,183,87,0.1)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 18l5-6.5 4 4 5-8 4 3.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.18"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Aprendizaje práctico',
    description:
      'Ejercicios, proyectos y evaluaciones alineados con casos reales de INDRA. Aplica lo que aprendes en un entorno profesional desde el primer día.',
    accent: '#8661F5',
    pill: 'rgba(134,97,245,0.1)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor"/>
        <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.45"/>
        <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.45"/>
        <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor"/>
      </svg>
    ),
  },
]

const TECH = ['Next.js 16', 'React 19', 'TypeScript', 'Clean Architecture', 'Tailwind CSS 4', 'Prisma', 'NextAuth']

/* ─── Mock UI card (hero visual) ───────────────────────────────────────────── */
function HeroCard() {
  const items = [
    { title: 'React Fundamentals',    pct: 100, done: true  },
    { title: 'Clean Architecture',    pct: 65,  done: false },
    { title: 'Next.js Avanzado',      pct: 30,  done: false },
    { title: 'TypeScript Patterns',   pct: 0,   done: false },
  ]
  return (
    <div
      className="w-[300px] rounded-2xl overflow-hidden select-none"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.08) inset',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-1.5 px-4 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        {['#FF5F57','#FEBC2E','#28C840'].map((c) => (
          <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
        ))}
        <span
          className="ml-3 text-[11px] font-medium"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          Mi progreso
        </span>
      </div>

      {/* Stats row */}
      <div
        className="grid grid-cols-3 gap-px"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        {[['1','Completado'],['3','En progreso'],['65%','Avance']].map(([v, l]) => (
          <div
            key={l}
            className="flex flex-col items-center py-3 px-2"
            style={{ background: 'rgba(0,30,46,0.8)' }}
          >
            <span className="text-[15px] font-bold text-white">{v}</span>
            <span className="text-[9px] font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Courses */}
      <div className="px-4 py-3 space-y-3">
        {items.map(({ title, pct, done }) => (
          <div key={title}>
            <div className="flex items-center justify-between mb-1.5">
              <span
                className="text-[11px] font-semibold truncate"
                style={{ color: done ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.65)' }}
              >
                {title}
              </span>
              <span
                className="text-[10px] font-bold shrink-0 ml-2"
                style={{ color: done ? '#44B757' : 'rgba(255,255,255,0.38)' }}
              >
                {pct}%
              </span>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  background: done
                    ? 'linear-gradient(90deg,#44B757,#5BD972)'
                    : 'linear-gradient(90deg,#005A72,#007A9A)',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* CTA inside card */}
      <div className="px-4 pb-4">
        <div
          className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold"
          style={{
            background: 'linear-gradient(135deg,rgba(0,90,114,0.5) 0%, rgba(0,66,84,0.3) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          <span>Continuar: Clean Architecture</span>
          <span style={{ color: '#44B757' }}>→</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>

      {/* ── Top nav ─────────────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 h-16"
        style={{
          background: 'rgba(0,30,46,0.92)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'linear-gradient(135deg,#005A72,#004254)' }}
          >
            A
          </div>
          <span className="text-sm font-bold text-white">
            APL{' '}
            <span style={{ color: '#44B757' }}>Semilleros</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-semibold transition-colors"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="px-4 py-1.5 rounded-lg text-sm font-bold text-white transition-all hover:brightness-110"
            style={{
              background: 'linear-gradient(150deg,#005A72,#004254)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
            }}
          >
            Crear cuenta
          </Link>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{
          background: 'linear-gradient(150deg, #001620 0%, #002838 50%, #003448 100%)',
          minHeight: 'calc(100vh - 64px)',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        {/* Decorations */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(0,90,114,0.22) 0%, transparent 65%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(68,183,87,0.07) 0%, transparent 65%)' }}
          />
          <div
            className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(134,97,245,0.07) 0%, transparent 65%)' }}
          />
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />
          {/* Dots accent */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1.5px, transparent 1.5px)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative w-full max-w-6xl mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase mb-7"
              style={{
                backgroundColor: 'rgba(68,183,87,0.14)',
                color: '#5BD972',
                border: '1px solid rgba(68,183,87,0.28)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#44B757' }} />
              INDRA · Semilleros Front-End
            </div>

            <h1 className="font-extrabold text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}
            >
              Tu plataforma de
              <br />
              <span
                style={{
                  background: 'linear-gradient(95deg, #44B757 0%, #7DDB8E 55%, #44B757 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                aprendizaje
              </span>
              <br />
              <span style={{ color: 'rgba(255,255,255,0.9)' }}>front-end</span>
            </h1>

            <p className="text-[17px] leading-[1.75] mb-9 max-w-lg mx-auto lg:mx-0"
              style={{ color: 'rgba(255,255,255,0.58)' }}
            >
              Aprende <strong style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Next.js, React y Clean Architecture</strong>{' '}
              con los estándares de INDRA. Avanza a tu propio ritmo y mide tu progreso en tiempo real.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/courses"
                className="px-7 py-3.5 rounded-xl text-[14px] font-bold text-white transition-all hover:brightness-110 active:scale-[0.97]"
                style={{
                  background: 'linear-gradient(150deg, #005A72 0%, #004254 100%)',
                  boxShadow: '0 6px 20px rgba(0,66,84,0.45), inset 0 1px 0 rgba(255,255,255,0.12)',
                }}
              >
                Explorar cursos →
              </Link>
              <Link
                href="/register"
                className="px-7 py-3.5 rounded-xl text-[14px] font-bold transition-all hover:bg-white/10 active:scale-[0.97]"
                style={{
                  border: '1px solid rgba(255,255,255,0.16)',
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                Crear cuenta gratis
              </Link>
            </div>

            {/* Trust line */}
            <p className="mt-6 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Sin tarjeta de crédito · Acceso inmediato · Contenido actualizado
            </p>
          </div>

          {/* Right: Mock card */}
          <div className="hidden lg:flex shrink-0 items-center justify-center" style={{ transform: 'perspective(1000px) rotateY(-6deg) rotateX(2deg)' }}>
            <HeroCard />
          </div>
        </div>

        {/* Stats band */}
        <div
          className="absolute bottom-0 inset-x-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-4 divide-x"
              style={{ ['--tw-divide-opacity' as string]: '1', borderColor: 'rgba(255,255,255,0.07)' }}
            >
              {STATS.map(({ value, label, sub }) => (
                <div key={label} className="py-5 flex flex-col items-center text-center">
                  <span className="text-[26px] font-extrabold text-white leading-none">{value}</span>
                  <span className="text-[11px] font-semibold mt-1" style={{ color: '#44B757' }}>{label}</span>
                  <span className="text-[10px] mt-0.5 hidden sm:block" style={{ color: 'rgba(255,255,255,0.28)' }}>{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="text-center mb-14">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.16em] mb-3"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Por qué APL Semilleros
            </p>
            <h2
              className="text-[32px] md:text-[38px] font-extrabold tracking-tight"
              style={{ color: 'var(--color-text)' }}
            >
              Todo lo que necesitas para crecer
            </h2>
            <p className="mt-3 text-[16px] max-w-xl mx-auto" style={{ color: 'var(--color-text-soft)' }}>
              Un programa diseñado por desarrolladores senior de INDRA para llevarte
              de principiante a profesional front-end.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map(({ num, title, description, accent, pill, icon }) => (
              <div
                key={num}
                className="group card-interactive rounded-2xl bg-white p-7 flex flex-col"
                style={{
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                {/* Number + Icon */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: pill, color: accent }}
                  >
                    {icon}
                  </div>
                  <span
                    className="text-[13px] font-bold tabular-nums"
                    style={{ color: 'var(--color-border-strong)' }}
                  >
                    {num}
                  </span>
                </div>

                <h3 className="text-[17px] font-bold mb-3 leading-snug" style={{ color: 'var(--color-text)' }}>
                  {title}
                </h3>
                <p className="text-[14px] leading-relaxed flex-1" style={{ color: 'var(--color-text-soft)' }}>
                  {description}
                </p>

                {/* Arrow */}
                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold transition-colors"
                  style={{ color: accent }}
                >
                  <span>Saber más</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech stack ──────────────────────────────────────────────────────── */}
      <section
        className="py-14 px-6 md:px-10"
        style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <p className="text-[12px] font-bold uppercase tracking-widest shrink-0" style={{ color: 'var(--color-text-muted)' }}>
            Tecnologías que aprenderás
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {TECH.map((t) => (
              <span
                key={t}
                className="px-4 py-2 rounded-full text-[13px] font-semibold"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10">
        <div
          className="max-w-6xl mx-auto rounded-3xl overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, #001A27 0%, #002C3E 40%, #004054 100%)',
          }}
        >
          {/* Decorations */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #44B757 0%, transparent 65%)' }}
            />
            <div
              className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-15"
              style={{ background: 'radial-gradient(circle, #8661F5 0%, transparent 65%)' }}
            />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
          </div>

          <div className="relative px-10 md:px-16 py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left">
              <p
                className="text-[11px] font-bold uppercase tracking-widest mb-3"
                style={{ color: 'rgba(68,183,87,0.8)' }}
              >
                Únete ahora
              </p>
              <h2
                className="text-[32px] md:text-[40px] font-extrabold text-white leading-tight tracking-tight mb-4"
              >
                ¿Listo para comenzar
                <br />
                tu carrera front-end?
              </h2>
              <p className="text-[16px] leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.52)' }}>
                Crea tu cuenta en menos de 1 minuto y accede a todo el contenido
                del programa de semilleros de INDRA de forma completamente gratuita.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 shrink-0">
              <Link
                href="/register"
                className="block px-10 py-4 rounded-2xl text-[15px] font-bold text-white transition-all hover:brightness-110 active:scale-[0.97] text-center"
                style={{
                  background: 'linear-gradient(150deg, #44B757 0%, #2D9E44 100%)',
                  boxShadow: '0 8px 28px rgba(68,183,87,0.45), inset 0 1px 0 rgba(255,255,255,0.15)',
                  minWidth: '220px',
                }}
              >
                Crear cuenta gratis
              </Link>
              <Link
                href="/login"
                className="text-[13px] font-semibold transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                Ya tengo cuenta →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer
        className="py-8 px-6 md:px-10"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold"
              style={{ background: 'linear-gradient(135deg,#005A72,#004254)' }}
            >
              A
            </div>
            <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
              APL Semilleros
            </span>
          </div>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            &copy; 2026 INDRA Colombia · Todos los derechos reservados
          </p>
          <div className="flex items-center gap-5">
            {['Cursos', 'Ingresar', 'Registro'].map((item) => (
              <Link
                key={item}
                href={`/${item === 'Cursos' ? 'courses' : item === 'Ingresar' ? 'login' : 'register'}`}
                className="text-xs font-medium hover:underline"
                style={{ color: 'var(--color-text-soft)' }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

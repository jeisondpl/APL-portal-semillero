export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ═══ LEFT · Brand panel ═══════════════════════════════════════════ */}
      <aside
        className="relative hidden lg:flex lg:w-[520px] xl:w-[600px] shrink-0 flex-col overflow-hidden text-white"
        style={{
          background:
            'radial-gradient(130% 100% at 0% 0%, #005472 0%, #002F42 55%, #00141E 100%)',
        }}
      >
        {/* Film grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.09]"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>")`,
          }}
        />

        {/* Subtle grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
          }}
        />

        {/* Ambient glow drifting */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full animate-drift"
          style={{
            background:
              'radial-gradient(circle, rgba(0,130,170,0.28) 0%, transparent 65%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(68,183,87,0.14) 0%, transparent 65%)',
          }}
        />

        <div className="relative z-10 flex flex-col h-full px-14 py-14 xl:px-16">
          {/* Logo */}
          <div className="flex items-center gap-3.5">
            <div
              className="w-11 h-11 rounded-xl grid place-items-center shrink-0"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.18)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M4 5h12M4 9h9M4 13h10M4 17h6"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-white text-[15px] font-bold leading-none tracking-tight">
                APL Semilleros
              </p>
              <p className="text-[12px] mt-1 text-white/45 font-medium tracking-wide">
                INDRA Colombia · Cohorte 2026
              </p>
            </div>
          </div>

          {/* Headline block */}
          <div className="flex-1 flex flex-col justify-center py-10">
            <div
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full self-start mb-10"
              style={{
                background: 'rgba(68,183,87,0.12)',
                border: '1px solid rgba(68,183,87,0.3)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: '#44B757', boxShadow: '0 0 8px #44B757' }}
              />
              <span
                className="text-[12px] font-semibold tracking-wider uppercase"
                style={{ color: '#7DDC8E' }}
              >
                Cohorte activa
              </span>
            </div>

            <h1 className="font-serif font-light text-[3rem] xl:text-[3.4rem] leading-[1.04] tracking-[-0.02em] text-white">
              Construimos{' '}
              <span className="italic font-normal">software</span>
              <br />
              que mueve
              <br />
              <span className="italic font-normal relative inline-block pr-1">
                países
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 right-1 h-[4px] origin-left animate-draw rounded-full"
                  style={{ background: '#44B757' }}
                />
              </span>
              <span style={{ color: '#44B757' }}>.</span>
            </h1>

            <p className="mt-10 text-[16px] leading-[1.7] text-white/65 max-w-[440px]">
              El programa de Semilleros forma a la próxima generación de
              ingenieros Front-End con los equipos que entregan soluciones
              críticas para gobierno, banca y energía en Latinoamérica.
            </p>

            {/* Feature list */}
            <ul className="mt-10 space-y-4">
              {[
                'Mentoría directa con ingenieros INDRA en activo',
                'Proyectos reales del programa Semilleros',
                'Certificación al completar la ruta',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3.5">
                  <span
                    className="w-5 h-5 rounded-full grid place-items-center shrink-0"
                    style={{
                      background: 'rgba(68,183,87,0.18)',
                      border: '1px solid rgba(68,183,87,0.4)',
                    }}
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                      <path
                        d="M1 4l2.5 2.5L9 1"
                        stroke="#7DDC8E"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-[14.5px] text-white/75 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats footer */}
          <div
            className="grid grid-cols-3 gap-6 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
          >
            {[
              { k: '12',   l: 'Semilleros' },
              { k: '06',   l: 'Módulos' },
              { k: '100%', l: 'Práctico' },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif font-light text-[2.4rem] leading-none text-white">
                  {s.k}
                </p>
                <p className="mt-2 text-[12px] uppercase tracking-[0.14em] text-white/50 font-medium">
                  {s.l}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[12px] text-white/30 font-medium tracking-wide">
            © 2026 INDRA Colombia · Programa Semilleros Front-End
          </p>
        </div>
      </aside>

      {/* ═══ RIGHT · Form area ════════════════════════════════════════════ */}
      <main
        className="relative flex-1 flex items-center justify-center px-6 py-12 overflow-auto"
        style={{ backgroundColor: '#F1EEE3' }}
      >
        {/* Subtle corner glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(50% 50% at 90% 5%, rgba(0,66,84,0.10) 0%, transparent 60%), radial-gradient(50% 40% at 5% 95%, rgba(68,183,87,0.06) 0%, transparent 60%)',
          }}
        />

        <div className="relative w-full max-w-[400px] animate-grow-up">
          {children}
        </div>
      </main>
    </div>
  )
}

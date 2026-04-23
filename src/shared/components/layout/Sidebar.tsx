'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { cn } from '@/shared/lib/utils'

function IconDashboard() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" aria-hidden="true">
      <rect x="1"   y="1"   width="5.5" height="5.5" rx="1.5" />
      <rect x="8.5" y="1"   width="5.5" height="5.5" rx="1.5" />
      <rect x="1"   y="8.5" width="5.5" height="5.5" rx="1.5" />
      <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1.5" />
    </svg>
  )
}

function IconCourses() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path
        d="M2.5 2.5h7a.5.5 0 01.5.5v8.2l-1.2-.9-1.3.9-1.3-.9-1.3.9-1.2-.9V3a.5.5 0 01.5-.5z"
        fill="currentColor"
      />
      <path
        d="M11 2.5h1.5a.5.5 0 01.5.5v8l-1-.8-1 .8V2.5z"
        fill="currentColor"
        opacity="0.45"
      />
    </svg>
  )
}

function IconProfile() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="5" r="2.8" fill="currentColor" />
      <path
        d="M2 13c0-3.03 2.46-5.5 5.5-5.5S13 9.97 13 13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconUsers() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="5.5" cy="4.5" r="2" fill="currentColor" />
      <path
        d="M1 13c0-1.66 1.79-3 4-3s4 1.34 4 3M9.5 1c1.1 0 2 .9 2 2s-.9 2-2 2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M10.5 9c1.66 0 3.5 1.34 3.5 3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard',  Icon: IconDashboard },
  { href: '/courses',   label: 'Cursos',     Icon: IconCourses },
  { href: '/profile',   label: 'Mi Perfil',  Icon: IconProfile },
]

const ADMIN_NAV_ITEMS = [
  { href: '/admin/users', label: 'Usuarios', Icon: IconUsers },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside
      className="w-64 flex flex-col shrink-0 h-full"
      style={{
        background: 'linear-gradient(180deg, #002E42 0%, #001E2E 100%)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Logo */}
      <div className="px-5 py-5">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, #005A72 0%, #004254 100%)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.12) inset, 0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-bold text-white leading-tight">
              APL{' '}
              <span style={{ color: '#44B757' }}>Semilleros</span>
            </p>
            <p
              className="text-[10px] font-semibold tracking-[0.15em] uppercase leading-tight mt-0.5"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              INDRA
            </p>
          </div>
        </div>
      </div>

      <div className="mx-5 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />

      {/* Navigation */}
      <nav
        className="flex-1 px-3 py-4 flex flex-col gap-0.5"
        aria-label="Navegación principal"
      >
        <p
          className="px-3 mb-2 text-[10px] font-semibold tracking-[0.14em] uppercase"
          style={{ color: 'rgba(255,255,255,0.28)' }}
        >
          Menú
        </p>
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const isActive = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm',
                'transition-all duration-150 font-medium',
                isActive
                  ? 'text-white'
                  : 'text-[rgba(255,255,255,0.52)] hover:text-[rgba(255,255,255,0.88)] hover:bg-[rgba(255,255,255,0.06)]'
              )}
              style={
                isActive
                  ? {
                      background:
                        'linear-gradient(90deg, rgba(0,90,114,0.65) 0%, rgba(0,66,84,0.35) 100%)',
                      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
                    }
                  : undefined
              }
            >
              {isActive && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-[22px] rounded-r-full"
                  style={{ backgroundColor: '#44B757' }}
                />
              )}
              <span
                className={cn(
                  'shrink-0 transition-colors',
                  isActive ? 'text-white' : 'text-[rgba(255,255,255,0.45)] group-hover:text-[rgba(255,255,255,0.75)]'
                )}
              >
                <Icon />
              </span>
              {label}
            </Link>
          )
        })}

        {/* Admin section */}
        {session?.user?.role === 'ADMIN' && (
          <>
            <div className="my-2 mx-3 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <p
              className="px-3 mb-2 text-[10px] font-semibold tracking-[0.14em] uppercase"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              Administración
            </p>
            {ADMIN_NAV_ITEMS.map(({ href, label, Icon }) => {
              const isActive = pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm',
                    'transition-all duration-150 font-medium',
                    isActive
                      ? 'text-white'
                      : 'text-[rgba(255,255,255,0.52)] hover:text-[rgba(255,255,255,0.88)] hover:bg-[rgba(255,255,255,0.06)]'
                  )}
                  style={
                    isActive
                      ? {
                          background:
                            'linear-gradient(90deg, rgba(0,90,114,0.65) 0%, rgba(0,66,84,0.35) 100%)',
                          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
                        }
                      : undefined
                  }
                >
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-[22px] rounded-r-full"
                      style={{ backgroundColor: '#44B757' }}
                    />
                  )}
                  <span
                    className={cn(
                      'shrink-0 transition-colors',
                      isActive ? 'text-white' : 'text-[rgba(255,255,255,0.45)] group-hover:text-[rgba(255,255,255,0.75)]'
                    )}
                  >
                    <Icon />
                  </span>
                  {label}
                </Link>
              )
            })}
          </>
        )}
      </nav>

      {/* Footer */}
      <div
        className="px-5 py-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
          &copy; 2026 INDRA Colombia
        </p>
      </div>
    </aside>
  )
}

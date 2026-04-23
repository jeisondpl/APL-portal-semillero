'use client'

import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

const PAGE_LABELS: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/courses':   'Cursos',
  '/profile':   'Mi Perfil',
}

function getLabel(pathname: string): string {
  for (const [prefix, label] of Object.entries(PAGE_LABELS)) {
    if (pathname.startsWith(prefix)) return label
  }
  return 'Portal'
}

function getInitials(name?: string | null): string {
  if (!name) return 'US'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

function BellIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <path
        d="M8.5 2A3.75 3.75 0 014.75 5.75V8.5L3.5 10.25h10L12.25 8.5V5.75A3.75 3.75 0 018.5 2z"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M7 12.25a1.5 1.5 0 003 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path
        d="M6 2H3a1 1 0 00-1 1v9a1 1 0 001 1h3M10 10l3-2.5L10 5M13 7.5H6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Topbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const label    = getLabel(pathname)
  const initials = getInitials(session?.user?.name)

  return (
    <header
      className="h-14 flex items-center justify-between px-6 shrink-0"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="flex flex-col justify-center">
        <p
          className="text-[10px] font-semibold tracking-[0.13em] uppercase leading-none"
          style={{ color: 'var(--color-text-muted)' }}
        >
          APL Semilleros
        </p>
        <p
          className="text-[13px] font-bold leading-tight mt-0.5"
          style={{ color: 'var(--color-text)' }}
        >
          {label}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
          style={{ color: 'var(--color-text-soft)' }}
          aria-label="Notificaciones"
        >
          <BellIcon />
        </button>

        <div
          className="h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white select-none"
          style={{
            background: 'linear-gradient(135deg, #005A72 0%, #004254 100%)',
            boxShadow: '0 0 0 2px var(--color-surface), 0 0 0 3.5px rgba(0,66,84,0.22)',
          }}
          title={session?.user?.name ?? undefined}
        >
          {initials}
        </div>

        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-1.5 px-3 h-8 rounded-lg text-[12px] font-medium transition-colors"
          style={{
            color:           'var(--color-text-soft)',
            backgroundColor: 'transparent',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(0,66,84,0.08)'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-soft)'
          }}
          aria-label="Cerrar sesión"
        >
          <LogoutIcon />
          <span>Salir</span>
        </button>
      </div>
    </header>
  )
}

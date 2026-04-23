'use client'

import { useEffect } from 'react'
import { useDashboardController } from '@/modules/dashboard/aplications/controllers/dashboard.controller'
import { Card } from '@/shared/components/ui/Card'
import { PageHeader } from '@/shared/components/ui/PageHeader'
import { formatPct } from '@/shared/lib/utils'

const KPI_CONFIG = [
  {
    key: 'totalCourses' as const,
    label: 'Cursos inscritos',
    accent: '#004254',
    accentBg: 'rgba(0,66,84,0.08)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M3 3.5h9a.5.5 0 01.5.5v9.5L11 12.5l-1.5 1-1.5-1-1.5 1-1.5-1L3.5 13.5V4a.5.5 0 01.5-.5z" fill="currentColor"/>
        <path d="M13 3.5h1.5a.5.5 0 01.5.5v9L13.5 12l-1 1V3.5z" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
  },
  {
    key: 'totalLessonsCompleted' as const,
    label: 'Lecciones completadas',
    accent: '#44B757',
    accentBg: 'rgba(68,183,87,0.08)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.6" fill="none"/>
        <path d="M5.5 9l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: 'activeUsersThisWeek' as const,
    label: 'Usuarios activos',
    accent: '#8661F5',
    accentBg: 'rgba(134,97,245,0.08)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="7" cy="6" r="3" fill="currentColor"/>
        <path d="M1 15c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
        <circle cx="13" cy="5.5" r="2.2" fill="currentColor" opacity="0.45"/>
        <path d="M13 9c1.7.3 3 1.8 3 3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.45"/>
      </svg>
    ),
  },
  {
    key: 'averageProgress' as const,
    label: 'Progreso general',
    accent: '#E56813',
    accentBg: 'rgba(229,104,19,0.08)',
    format: (v: number) => formatPct(v),
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M3 13.5l3.5-4.5 3 3 3.5-5.5 3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

function SkeletonCard() {
  return (
    <div className="rounded-card bg-white p-5" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
      <div className="skeleton h-3 w-24 mb-4" />
      <div className="skeleton h-8 w-16" />
    </div>
  )
}

export function DashboardView() {
  const { metrics, loading, error, _getMetrics } = useDashboardController()

  useEffect(() => { void _getMetrics({}) }, [_getMetrics])

  if (loading) {
    return (
      <div>
        <div className="mb-7">
          <div className="skeleton h-7 w-40 mb-2" />
          <div className="skeleton h-4 w-72" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    )
  }

  if (error !== null) {
    return (
      <div className="px-4 py-3 rounded-lg text-sm font-medium"
        style={{ color: '#B02F20', backgroundColor: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.2)' }}>
        {error}
      </div>
    )
  }

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Dashboard"
        subtitle="Resumen de tu progreso en el programa de semilleros"
      />

      {metrics !== null ? (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7 stagger">
            {KPI_CONFIG.map(({ key, label, accent, accentBg, icon, format }) => {
              const raw = metrics[key]
              const value = format !== undefined ? format(raw as number) : raw
              return (
                <div
                  key={key}
                  className="rounded-card bg-white p-5 animate-fade-in-up"
                  style={{
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <p
                      className="text-[11px] font-semibold uppercase tracking-wider leading-tight"
                      style={{ color: 'var(--color-text-soft)' }}
                    >
                      {label}
                    </p>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: accentBg, color: accent }}
                    >
                      {icon}
                    </div>
                  </div>
                  <p
                    className="text-[28px] font-bold leading-none"
                    style={{ color: accent }}
                  >
                    {value}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Detailed metrics */}
          {metrics.metrics.length > 0 && (
            <Card.Root>
              <Card.Header>
                <h2 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                  Métricas detalladas
                </h2>
              </Card.Header>
              <Card.Body className="p-0">
                {metrics.metrics.map((metric, i) => (
                  <div
                    key={metric.label}
                    className="flex items-center justify-between px-5 py-3"
                    style={{
                      borderBottom: i < metrics.metrics.length - 1
                        ? '1px solid var(--color-border)'
                        : 'none',
                    }}
                  >
                    <span className="text-sm" style={{ color: 'var(--color-text)' }}>
                      {metric.label}
                    </span>
                    <span
                      className="text-sm font-bold tabular-nums"
                      style={{ color: 'var(--color-petroleum)' }}
                    >
                      {metric.value}
                      {metric.unit !== undefined ? ` ${metric.unit}` : ''}
                    </span>
                  </div>
                ))}
              </Card.Body>
            </Card.Root>
          )}
        </>
      ) : (
        <Card.Root>
          <Card.Body>
            <p className="text-sm text-center" style={{ color: 'var(--color-text-soft)' }}>
              No hay datos disponibles en este momento.
            </p>
          </Card.Body>
        </Card.Root>
      )}
    </div>
  )
}

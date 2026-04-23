'use client'

import { useEffect } from 'react'
import { useProgressController } from '@/modules/progress/aplications/controllers/progress.controller'
import { Card } from '@/shared/components/ui/Card'
import { PageHeader } from '@/shared/components/ui/PageHeader'
import { Badge } from '@/shared/components/ui/Badge'
import { formatPct, formatDate } from '@/shared/lib/utils'

export function ProfileView() {
  const { progress, loading, error, _getUserProgress } = useProgressController()

  useEffect(() => {
    void _getUserProgress('me')
  }, [_getUserProgress])

  if (loading) {
    return (
      <div>
        <div className="mb-7">
          <div className="skeleton h-7 w-36 mb-2" />
          <div className="skeleton h-4 w-64" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-card bg-white p-5" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
              <div className="skeleton h-3 w-28 mb-3" />
              <div className="skeleton h-8 w-12" />
            </div>
          ))}
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
      <PageHeader title="Mi Perfil" subtitle="Resumen de tu actividad y progreso" />

      {progress !== null ? (
        <div className="space-y-6">
          {/* KPI summary */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 stagger">
            {[
              { label: 'Cursos inscritos',    value: progress.totalCoursesEnrolled,  accent: '#004254', bg: 'rgba(0,66,84,0.08)' },
              { label: 'Cursos completados',  value: progress.totalCoursesCompleted, accent: '#44B757', bg: 'rgba(68,183,87,0.08)' },
              { label: 'Lecciones completadas', value: progress.totalLessonsCompleted, accent: '#8661F5', bg: 'rgba(134,97,245,0.08)' },
            ].map(({ label, value, accent, bg }) => (
              <div
                key={label}
                className="rounded-card bg-white p-5 animate-fade-in-up"
                style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}
              >
                <p
                  className="text-[11px] font-semibold uppercase tracking-wider mb-3"
                  style={{ color: 'var(--color-text-soft)' }}
                >
                  {label}
                </p>
                <p
                  className="text-[28px] font-bold leading-none"
                  style={{ color: accent }}
                >
                  {value}
                </p>
                <div
                  className="mt-3 h-1 rounded-full"
                  style={{ backgroundColor: bg }}
                />
              </div>
            ))}
          </div>

          {/* Overall progress */}
          <Card.Root>
            <Card.Body>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                  Progreso general
                </span>
                <span
                  className="text-sm font-bold tabular-nums"
                  style={{ color: 'var(--color-petroleum)' }}
                >
                  {formatPct(progress.overallPercentage)}
                </span>
              </div>
              <div
                className="h-2.5 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--color-border)' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress.overallPercentage}%`,
                    background: 'linear-gradient(90deg, #004254 0%, #005A72 100%)',
                    transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>
            </Card.Body>
          </Card.Root>

          {/* Per-course progress */}
          {progress.coursesProgress.length > 0 && (
            <Card.Root>
              <Card.Header>
                <h2 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                  Progreso por curso
                </h2>
              </Card.Header>
              <Card.Body>
                <div className="space-y-5">
                  {progress.coursesProgress.map((cp) => {
                    const done = cp.percentageComplete === 100
                    return (
                      <div key={cp.courseId}>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="text-[13px] font-semibold line-clamp-1"
                            style={{ color: 'var(--color-text)' }}
                          >
                            {cp.courseTitle}
                          </span>
                          <div className="flex items-center gap-2 shrink-0 ml-4">
                            <Badge variant={done ? 'success' : 'neutral'} dot={done}>
                              {formatPct(cp.percentageComplete)}
                            </Badge>
                            <span className="text-xs tabular-nums" style={{ color: 'var(--color-text-muted)' }}>
                              {cp.completedLessons}/{cp.totalLessons}
                            </span>
                          </div>
                        </div>
                        <div
                          className="h-1.5 rounded-full overflow-hidden"
                          style={{ backgroundColor: 'var(--color-border)' }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${cp.percentageComplete}%`,
                              backgroundColor: done
                                ? 'var(--color-success)'
                                : 'var(--color-petroleum)',
                              transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                          />
                        </div>
                        <p className="text-[11px] mt-1.5" style={{ color: 'var(--color-text-muted)' }}>
                          Último acceso: {formatDate(cp.lastAccessedAt)}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </Card.Body>
            </Card.Root>
          )}
        </div>
      ) : (
        <Card.Root>
          <Card.Body>
            <p className="text-sm text-center" style={{ color: 'var(--color-text-soft)' }}>
              No hay datos de progreso disponibles.
            </p>
          </Card.Body>
        </Card.Root>
      )}
    </div>
  )
}

'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCoursesController } from '@/modules/courses/aplications/controllers/courses.controller'
import { Badge } from '@/shared/components/ui/Badge'
import { Button } from '@/shared/components/ui/Button'
import type { CourseLevel, IResponseCourse } from '@/modules/courses/domain/entities/courses.entities'

const levelLabel: Record<CourseLevel, string> = {
  BEGINNER:     'Principiante',
  INTERMEDIATE: 'Intermedio',
  ADVANCED:     'Avanzado',
}

const levelVariant: Record<CourseLevel, 'success' | 'warning' | 'info'> = {
  BEGINNER:     'success',
  INTERMEDIATE: 'warning',
  ADVANCED:     'info',
}

const UPCOMING_SESSIONS = [
  { n: '02', title: 'React Avanzado — Hooks y Context' },
  { n: '03', title: 'TypeScript con React' },
  { n: '04', title: 'Next.js 16 App Router' },
  { n: '05', title: 'Clean Architecture' },
  { n: '06', title: 'Zustand y React Query' },
  { n: '07', title: 'Testing con Vitest' },
  { n: '08', title: 'Proyectos Finales' },
]

function HeroCardSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card-hover)' }}
    >
      <div className="flex">
        <div className="skeleton hidden lg:block w-72 h-64 rounded-none shrink-0" />
        <div className="flex-1 p-8">
          <div className="skeleton h-4 w-28 mb-4" />
          <div className="skeleton h-7 w-3/4 mb-2" />
          <div className="skeleton h-5 w-1/2 mb-4" />
          <div className="skeleton h-4 w-full mb-2" />
          <div className="skeleton h-4 w-5/6 mb-6" />
          <div className="flex gap-3">
            <div className="skeleton h-9 w-36" />
            <div className="skeleton h-9 w-28" />
          </div>
        </div>
      </div>
    </div>
  )
}

function FeaturedHeroCard({ course, index }: { course: IResponseCourse; index: number }) {
  const sessionNum = String(index + 1).padStart(2, '0')

  return (
    <div
      className="rounded-2xl overflow-hidden animate-fade-in-up"
      style={{
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card-hover)',
      }}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left panel — dark petroleum accent */}
        <div
          className="hidden lg:flex lg:w-72 shrink-0 flex-col justify-between p-6"
          style={{
            background: 'linear-gradient(160deg, #001820 0%, #003040 60%, #004254 100%)',
          }}
        >
          {/* Session badge */}
          <div>
            <span
              className="inline-block text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-md mb-4"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              Sesión {sessionNum}
            </span>
          </div>

          {/* Big session number */}
          <div
            className="text-8xl font-black leading-none select-none"
            style={{ color: 'rgba(255,255,255,0.12)' }}
          >
            {sessionNum}
          </div>

          {/* Duration pill */}
          <div>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.75)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <span>⏱</span>
              <span>{course.durationMinutes} min</span>
            </span>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 bg-white p-8 flex flex-col gap-4">
          {/* Top row: level badge + tags */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={levelVariant[course.level]} dot>
              {levelLabel[course.level]}
            </Badge>
            {course.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                style={{
                  background: 'rgba(0,66,84,0.07)',
                  color: 'var(--color-petroleum)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <div>
            <h2
              className="text-xl font-extrabold leading-snug line-clamp-2 mb-1"
              style={{ color: 'var(--color-text)' }}
            >
              {course.title}
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-soft)' }}>
              Por {course.instructor}
            </p>
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed line-clamp-3"
            style={{ color: 'var(--color-text-soft)' }}
          >
            {course.description}
          </p>

          {/* Stats */}
          <div
            className="flex items-center gap-5 py-3"
            style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}
          >
            <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
              <span>📚</span>
              <span>{course.lessonsCount} {course.lessonsCount === 1 ? 'lección' : 'lecciones'}</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
              <span>⏱</span>
              <span>{course.durationMinutes} min</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
              <span>👥</span>
              <span>{course.enrolledCount} inscritos</span>
            </span>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-3 pt-1">
            <Link href={`/courses/${course.slug}`}>
              <Button variant="primary" size="md">
                Comenzar Sesión →
              </Button>
            </Link>
            <Link href={`/courses/${course.slug}`}>
              <Button variant="ghost" size="md">
                Ver detalles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function UpcomingCard({ n, title }: { n: string; title: string }) {
  return (
    <div
      className="rounded-xl bg-white p-4 shrink-0 opacity-60 transition-all duration-200"
      style={{
        border: '1px solid var(--color-border)',
        minWidth: '200px',
        width: '220px',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base" aria-hidden="true">
          🔒
        </span>
        <span className="text-xs font-bold tracking-wide" style={{ color: 'var(--color-text-soft)' }}>
          Sesión {n}
        </span>
      </div>

      {/* Title */}
      <p className="text-xs font-semibold leading-snug mb-3" style={{ color: 'var(--color-text)' }}>
        {title}
      </p>

      <Badge variant="neutral">Próximamente</Badge>
    </div>
  )
}

export function CoursesView() {
  const { courses, loading, error, _list } = useCoursesController()

  useEffect(() => { void _list({}) }, [_list])

  if (loading) {
    return (
      <div className="animate-fade-in">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="skeleton h-7 w-56 mb-2" />
          <div className="skeleton h-4 w-80" />
        </div>
        <div className="space-y-6">
          <HeroCardSkeleton />
          <HeroCardSkeleton />
        </div>
      </div>
    )
  }

  if (error !== null) {
    return (
      <div
        className="px-4 py-3 rounded-xl text-sm font-medium"
        style={{
          color: '#B02F20',
          backgroundColor: 'rgba(192,57,43,0.08)',
          border: '1px solid rgba(192,57,43,0.2)',
        }}
      >
        {error}
      </div>
    )
  }

  return (
    <div className="animate-fade-in-up">
      {/* Section header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
          Cursos disponibles
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-soft)' }}>
          Capacitaciones del programa de semilleros INDRA · Capacidades Tech
        </p>
      </div>

      {/* Hero cards for each available course */}
      {courses.length === 0 ? (
        <div
          className="rounded-2xl p-10 text-center"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--color-text-soft)' }}>
            No hay cursos disponibles en este momento.
          </p>
        </div>
      ) : (
        <div className="space-y-6 mb-10">
          {courses.map((course, i) => (
            <FeaturedHeroCard key={course.id} course={course} index={i} />
          ))}
        </div>
      )}

      {/* Upcoming sessions */}
      <div>
        <div className="mb-4">
          <h2 className="text-base font-bold mb-1" style={{ color: 'var(--color-text)' }}>
            Próximas sesiones
          </h2>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            El contenido se irá desbloqueando a lo largo del programa
          </p>
        </div>

        <div
          className="flex gap-4 overflow-x-auto pb-4"
          style={{ scrollbarWidth: 'thin' }}
        >
          {UPCOMING_SESSIONS.map(({ n, title }) => (
            <UpcomingCard key={n} n={n} title={title} />
          ))}
        </div>
      </div>
    </div>
  )
}

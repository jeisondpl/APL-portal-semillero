'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCoursesController } from '@/modules/courses/aplications/controllers/courses.controller'
import { Badge } from '@/shared/components/ui/Badge'
import { Button } from '@/shared/components/ui/Button'
import { Card } from '@/shared/components/ui/Card'
import type { CourseLevel, IResponseCourse } from '@/modules/courses/domain/entities/courses.entities'

interface CourseDetailViewProps {
  slug: string
}

type LessonListItem = {
  id: string
  title: string
  order: number
  durationMinutes: number
  type: string
  isCompleted: boolean
}

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

function DetailSkeleton() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <div className="skeleton h-4 w-32 mb-4" />
        <div className="skeleton h-8 w-3/4 mb-2" />
        <div className="skeleton h-5 w-48" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-card bg-white overflow-hidden" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <div className="flex gap-2">
                <div className="skeleton h-5 w-20" />
                <div className="skeleton h-5 w-16" />
              </div>
            </div>
            <div className="px-5 py-5 space-y-2">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-5/6" />
              <div className="skeleton h-4 w-4/6" />
            </div>
          </div>
          <div className="rounded-card bg-white overflow-hidden" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <div className="skeleton h-5 w-48" />
            </div>
            <div className="px-5 py-5 space-y-3">
              <div className="skeleton h-14 w-full rounded-xl" />
              <div className="skeleton h-14 w-full rounded-xl" />
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-card bg-white overflow-hidden" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
            <div className="px-5 py-5 space-y-4">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-9 w-full mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LessonRow({ lesson, courseSlug }: { lesson: LessonListItem; courseSlug: string }) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl transition-colors duration-150"
      style={{
        background: 'var(--color-surface-raised)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* Order bubble */}
      <div
        className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
        style={{
          background: lesson.isCompleted ? 'rgba(68,183,87,0.15)' : 'rgba(0,66,84,0.1)',
          color: lesson.isCompleted ? '#22753B' : 'var(--color-petroleum)',
        }}
      >
        {lesson.isCompleted ? '✓' : lesson.order}
      </div>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>
          {lesson.title}
        </p>
      </div>

      {/* Duration badge */}
      <Badge variant="neutral">{lesson.durationMinutes} min</Badge>

      {/* CTA */}
      <Link href={`/courses/${courseSlug}/lessons/${lesson.id}`}>
        <Button variant="primary" size="sm">
          Ver sesión →
        </Button>
      </Link>
    </div>
  )
}

function CourseStats({ course }: { course: IResponseCourse }) {
  return (
    <dl className="space-y-4">
      {[
        { label: 'Duración total', value: `${course.durationMinutes} min`, icon: '⏱' },
        { label: 'Lecciones',      value: `${course.lessonsCount}`,        icon: '📚' },
        { label: 'Inscritos',      value: `${course.enrolledCount}`,       icon: '👥' },
      ].map(({ label, value, icon }) => (
        <div key={label} className="flex items-center justify-between">
          <dt className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-soft)' }}>
            <span>{icon}</span>
            <span>{label}</span>
          </dt>
          <dd className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
            {value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function CourseDetailView({ slug }: CourseDetailViewProps) {
  const { course, loading, error, _get, _enroll } = useCoursesController()
  const [lessons, setLessons] = useState<LessonListItem[]>([])
  const [lessonsLoading, setLessonsLoading] = useState(false)

  useEffect(() => {
    void _get(slug)
  }, [_get, slug])

  useEffect(() => {
    setLessonsLoading(true)
    fetch(`/api/courses/${slug}/lessons`)
      .then(r => r.json())
      .then((json: { data: LessonListItem[] }) => { setLessons(json.data) })
      .catch(() => { setLessons([]) })
      .finally(() => { setLessonsLoading(false) })
  }, [slug])

  if (loading) return <DetailSkeleton />

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

  if (course === null) {
    return (
      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
        Curso no encontrado.
      </p>
    )
  }

  return (
    <div className="animate-fade-in-up">
      {/* Back link */}
      <Link
        href="/courses"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors duration-150"
        style={{ color: 'var(--color-text-soft)' }}
      >
        <span>←</span>
        <span>Volver a cursos</span>
      </Link>

      {/* Course header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
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

        <h1 className="text-xl font-bold leading-snug mb-1" style={{ color: 'var(--color-text)' }}>
          {course.title}
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-soft)' }}>
          Por {course.instructor}
        </p>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main column */}
        <div className="lg:col-span-2 space-y-5">

          {/* Description card */}
          <Card.Root>
            <Card.Header>
              <h2 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                Sobre esta sesión
              </h2>
            </Card.Header>
            <Card.Body>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-soft)' }}>
                {course.description}
              </p>
            </Card.Body>
          </Card.Root>

          {/* Lessons list card */}
          <Card.Root>
            <Card.Header>
              <h2 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                Contenido de la sesión
              </h2>
            </Card.Header>
            <Card.Body>
              {lessonsLoading ? (
                <div className="space-y-3">
                  <div className="skeleton h-14 w-full rounded-xl" />
                  <div className="skeleton h-14 w-full rounded-xl" />
                </div>
              ) : lessons.length === 0 ? (
                <p className="text-sm text-center py-4" style={{ color: 'var(--color-text-muted)' }}>
                  No hay lecciones disponibles aún.
                </p>
              ) : (
                <div className="space-y-3">
                  {lessons.map((lesson) => (
                    <LessonRow key={lesson.id} lesson={lesson} courseSlug={slug} />
                  ))}
                </div>
              )}
            </Card.Body>
          </Card.Root>
        </div>

        {/* Sidebar column */}
        <div className="space-y-5">
          {/* Stats card */}
          <Card.Root>
            <Card.Header>
              <h2 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                Detalles del curso
              </h2>
            </Card.Header>
            <Card.Body>
              <CourseStats course={course} />
            </Card.Body>
          </Card.Root>

          {/* Enroll card */}
          <Card.Root>
            <Card.Body>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-soft)' }}>
                Inscríbete para marcar tu progreso y acceder a todos los materiales.
              </p>
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => void _enroll({ courseId: course.id, userId: 'me' })}
              >
                Matricularme en esta sesión
              </Button>
            </Card.Body>
          </Card.Root>
        </div>
      </div>
    </div>
  )
}

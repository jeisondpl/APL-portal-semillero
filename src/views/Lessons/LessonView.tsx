'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useLessonsController } from '@/modules/lessons/aplications/controllers/lessons.controller'
import { Badge } from '@/shared/components/ui/Badge'
import { Button } from '@/shared/components/ui/Button'

interface LessonViewProps {
  lessonId: string
}

type ViewMode = 'slides' | 'reading'
type Direction = 'right' | 'left'

interface StepMeta {
  type: 'cover' | 'content' | 'completion'
  shortTitle: string
  title: string
  duration: number
  color: string
  bg: string
  emoji: string
}

const STEPS: StepMeta[] = [
  { type: 'cover',      shortTitle: 'Inicio',    title: 'Bienvenida a la Sesión 1',            duration: 5,  color: '#004254', bg: 'rgba(0,66,84,0.07)',    emoji: '🚀' },
  { type: 'content',    shortTitle: 'Equipo',    title: 'Presentación del equipo',             duration: 15, color: '#004254', bg: 'rgba(0,66,84,0.07)',    emoji: '👥' },
  { type: 'content',    shortTitle: 'Contexto',  title: 'Contexto y visión del Frontend',      duration: 10, color: '#004254', bg: 'rgba(0,66,84,0.07)',    emoji: '🌐' },
  { type: 'content',    shortTitle: 'Pilares',   title: '10 Pilares del Frontend',             duration: 15, color: '#3178C6', bg: 'rgba(49,120,198,0.07)', emoji: '🏛' },
  { type: 'content',    shortTitle: '10-Steps',  title: 'Ruta de aprendizaje (10-Step Path)',  duration: 15, color: '#8661F5', bg: 'rgba(134,97,245,0.07)', emoji: '🗺' },
  { type: 'content',    shortTitle: 'Sesiones',  title: 'Roadmap de capacitaciones',           duration: 10, color: '#44B757', bg: 'rgba(68,183,87,0.07)',  emoji: '📅' },
  { type: 'content',    shortTitle: 'Proyectos', title: 'Proyectos finales del programa',      duration: 10, color: '#E56813', bg: 'rgba(229,104,19,0.07)', emoji: '🚧' },
  { type: 'content',    shortTitle: 'Stack',     title: 'Stack tecnológico del programa',      duration: 15, color: '#0D9488', bg: 'rgba(13,148,136,0.07)', emoji: '⚡' },
  { type: 'content',    shortTitle: 'Architect', title: 'Clean Architecture en Frontend',      duration: 10, color: '#8661F5', bg: 'rgba(134,97,245,0.07)', emoji: '🏗' },
  { type: 'content',    shortTitle: 'React',     title: 'Introducción a React',                duration: 25, color: '#E56813', bg: 'rgba(229,104,19,0.07)', emoji: '⚛' },
  { type: 'content',    shortTitle: 'Cierre',    title: 'Dinámica de trabajo y cierre',        duration: 10, color: '#44B757', bg: 'rgba(68,183,87,0.07)',  emoji: '🎯' },
  { type: 'completion', shortTitle: '¡Listo!',   title: '¡Sesión completada!',                 duration: 5,  color: '#44B757', bg: 'rgba(68,183,87,0.07)',  emoji: '🏆' },
]

const COVER_TOPICS = [
  '🌐 Visión del Frontend',
  '🏛 10 Pilares',
  '👥 Equipo instructor',
  '🗺 10-Step Path',
  '⚛ React fundamentals',
]

const ACHIEVEMENTS = [
  { label: 'Conociste al equipo instructor',               icon: '👥' },
  { label: 'Entendiste la visión del Frontend moderno',    icon: '🌐' },
  { label: 'Conociste los 10 Pilares del Frontend',        icon: '🏛' },
  { label: 'Revisaste la ruta de aprendizaje 10-Steps',    icon: '🗺' },
  { label: 'Exploraste el plan de 8 capacitaciones',       icon: '📅' },
  { label: 'Conociste los proyectos P1, P2 y P3',          icon: '🚧' },
  { label: 'Analizaste el stack tecnológico completo',     icon: '⚡' },
  { label: 'Comprendiste Clean Architecture',              icon: '🏗' },
  { label: 'Diste tus primeros pasos en React',            icon: '⚛' },
  { label: 'Conociste la dinámica del programa',           icon: '🎯' },
]

const TOTAL = STEPS.length

function splitIntoSlides(html: string): string[] {
  const inner = html.replace(/^<div[^>]*>\s*/, '').replace(/\s*<\/div>\s*$/, '')
  return inner.split(/<hr[^>]*\/>/).map(s => s.trim()).filter(Boolean)
}

/* ── Loading skeleton ──────────────────────────────────────────────────────── */
function LoadingSkeleton() {
  return (
    <div className="animate-fade-in space-y-5">
      <div className="skeleton h-10 w-full rounded-xl" />
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-raised)' }}>
        <div className="skeleton h-20 w-full rounded-none" />
        <div className="p-6 space-y-3">
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-5/6" />
          <div className="skeleton h-4 w-4/6" />
        </div>
      </div>
    </div>
  )
}

/* ── Step Navigator ────────────────────────────────────────────────────────── */
function StepNavigator({
  current,
  steps,
  onGo,
}: {
  current: number
  steps: StepMeta[]
  onGo: (n: number) => void
}) {
  const pct = TOTAL <= 1 ? 100 : (current / (TOTAL - 1)) * 100
  const activeColor = steps[current]?.color ?? '#004254'

  return (
    <div className="overflow-x-auto pb-1 mb-5" style={{ scrollbarWidth: 'none' }}>
    <div className="relative flex items-start justify-between px-2 mt-5" style={{ minWidth: `${TOTAL * 60}px` }}>
      {/* Track line */}
      <div
        className="absolute top-3.5 left-0 right-0 mx-6 h-0.5"
        style={{ backgroundColor: 'var(--color-border)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: activeColor }}
        />
      </div>

      {steps.map((s, i) => {
        const isActive   = i === current
        const isComplete = i < current
        return (
          <button
            key={i}
            onClick={() => onGo(i)}
            className="relative flex flex-col items-center gap-1 z-10"
            title={s.title}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] transition-all duration-300"
              style={{
                backgroundColor: isActive || isComplete ? s.color : 'var(--color-surface)',
                border: `2px solid ${isActive || isComplete ? s.color : 'var(--color-border)'}`,
                color: isActive || isComplete ? '#fff' : 'var(--color-text-muted)',
                transform: isActive ? 'scale(1.25)' : 'scale(1)',
                boxShadow: isActive ? `0 0 0 4px ${s.color}28` : 'none',
              }}
            >
              {isComplete ? '✓' : s.emoji}
            </div>
            <span
              className="text-[8px] font-bold leading-none max-w-[48px] text-center"
              style={{ color: isActive ? s.color : 'var(--color-text-muted)' }}
            >
              {s.shortTitle}
            </span>
          </button>
        )
      })}
    </div>
    </div>
  )
}

/* ── Cover Slide ───────────────────────────────────────────────────────────── */
function CoverSlide({ onStart }: { onStart: () => void }) {
  return (
    <div
      className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden animate-cover-reveal"
      style={{
        background: 'linear-gradient(160deg, #001820 0%, #003040 55%, #004254 100%)',
        minHeight: '380px',
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute w-72 h-72 rounded-full pointer-events-none animate-drift"
        style={{
          background: 'radial-gradient(circle, rgba(68,183,87,0.18) 0%, transparent 70%)',
          top: '-48px', right: '-48px',
        }}
      />
      <div
        className="absolute w-56 h-56 rounded-full pointer-events-none animate-drift"
        style={{
          background: 'radial-gradient(circle, rgba(134,97,245,0.12) 0%, transparent 70%)',
          bottom: '-32px', left: '-32px',
          animationDelay: '-9s',
        }}
      />

      {/* Big number */}
      <div
        className="text-[8rem] font-black leading-none select-none animate-counter"
        style={{ color: 'rgba(255,255,255,0.09)', letterSpacing: '-4px' }}
      >
        01
      </div>

      {/* Session badge */}
      <span
        className="inline-block text-[10px] font-black tracking-[0.18em] uppercase px-3 py-1.5 rounded-full mb-4 animate-fade-in-up"
        style={{
          background: 'rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.12)',
          animationDelay: '0.12s',
        }}
      >
        Sesión 01 · 95 min
      </span>

      <h2
        className="text-2xl font-black text-center text-white mb-3 animate-fade-in-up"
        style={{ animationDelay: '0.22s' }}
      >
        Presentación del equipo<br />
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', fontWeight: 600 }}>
          y primeros pasos en React
        </span>
      </h2>

      <p
        className="text-sm text-center mb-7 animate-fade-in-up"
        style={{ color: 'rgba(255,255,255,0.45)', animationDelay: '0.32s' }}
      >
        4 bloques temáticos · Usa ← → para navegar
      </p>

      {/* Topic pills */}
      <div
        className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in-up"
        style={{ animationDelay: '0.42s' }}
      >
        {COVER_TOPICS.map((t) => (
          <span
            key={t}
            className="text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.09)',
              color: 'rgba(255,255,255,0.72)',
              border: '1px solid rgba(255,255,255,0.13)',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onStart}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 animate-fade-in-up"
        style={{
          background: '#44B757',
          color: '#fff',
          boxShadow: '0 4px 20px rgba(68,183,87,0.45)',
          animationDelay: '0.52s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
      >
        Comenzar sesión →
      </button>
    </div>
  )
}

/* ── Completion Slide ──────────────────────────────────────────────────────── */
function CompletionSlide({ onComplete }: { onComplete: () => void }) {
  return (
    <div
      className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden animate-cover-reveal"
      style={{
        background: 'linear-gradient(160deg, #0a1f0e 0%, #163824 55%, #22753B 100%)',
        minHeight: '380px',
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Trophy */}
      <div className="text-6xl mb-4 animate-check" style={{ animationDelay: '0.1s' }}>
        🏆
      </div>

      <h2
        className="text-2xl font-black text-white text-center mb-2 animate-fade-in-up"
        style={{ animationDelay: '0.2s' }}
      >
        ¡Sesión completada!
      </h2>
      <p
        className="text-sm text-center mb-8 animate-fade-in-up"
        style={{ color: 'rgba(255,255,255,0.55)', animationDelay: '0.3s' }}
      >
        Repasaste todos los bloques de la Sesión 01
      </p>

      {/* Achievement list */}
      <div className="space-y-3 w-full max-w-sm mb-8">
        {ACHIEVEMENTS.map((a, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3 rounded-xl animate-fade-in-up"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.11)',
              animationDelay: `${0.38 + i * 0.1}s`,
            }}
          >
            <span className="text-base shrink-0 animate-check" style={{ animationDelay: `${0.44 + i * 0.1}s` }}>
              {a.icon}
            </span>
            <span className="text-sm font-semibold flex-1" style={{ color: 'rgba(255,255,255,0.82)' }}>
              {a.label}
            </span>
            <span
              className="text-xs font-black animate-check"
              style={{ color: '#44B757', animationDelay: `${0.50 + i * 0.1}s` }}
            >
              ✓
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onComplete}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 animate-fade-in-up"
        style={{
          background: '#44B757',
          color: '#fff',
          boxShadow: '0 4px 20px rgba(68,183,87,0.5)',
          animationDelay: '0.85s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
      >
        ✅ Marcar como completada
      </button>
    </div>
  )
}

/* ── Main component ────────────────────────────────────────────────────────── */
export function LessonView({ lessonId }: LessonViewProps) {
  const { lesson, loading, error, _get, _complete } = useLessonsController()
  const [mode, setMode]       = useState<ViewMode>('slides')
  const [step, setStep]       = useState(0)
  const [direction, setDir]   = useState<Direction>('right')
  const [animKey, setAnimKey] = useState(0)
  const [slides, setSlides]   = useState<string[]>([])

  const stepRef    = useRef(step)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => { void _get(lessonId) }, [_get, lessonId])

  useEffect(() => {
    if (lesson?.content !== undefined && lesson.content !== '') {
      setSlides(splitIntoSlides(lesson.content))
      setStep(0)
      setAnimKey(k => k + 1)
    }
  }, [lesson?.content])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const cur = stepRef.current
      if (e.key === 'ArrowRight' && cur < TOTAL - 1) {
        setDir('right')
        const next = cur + 1
        setStep(next)
        stepRef.current = next
        setAnimKey(k => k + 1)
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
      }
      if (e.key === 'ArrowLeft' && cur > 0) {
        setDir('left')
        const prev = cur - 1
        setStep(prev)
        stepRef.current = prev
        setAnimKey(k => k + 1)
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const navigate = (n: number, dir: Direction) => {
    if (n < 0 || n >= TOTAL) return
    setDir(dir)
    setStep(n)
    stepRef.current = n
    setAnimKey(k => k + 1)
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // -- States --
  if (loading) return <LoadingSkeleton />

  if (error !== null) {
    return (
      <div
        className="px-4 py-3 rounded-xl text-sm font-medium"
        style={{ color: '#B02F20', backgroundColor: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.2)' }}
      >
        {error}
      </div>
    )
  }

  if (lesson === null) {
    return <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Lección no encontrada.</p>
  }

  const currentStep = STEPS[step] ?? STEPS[0]
  const animClass   = direction === 'right' ? 'animate-slide-right' : 'animate-slide-left'

  // ── READING MODE ──────────────────────────────────────────────────────────
  if (mode === 'reading') {
    return (
      <div className="animate-fade-in-up">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <Link
              href={`/courses/${lesson.courseSlug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium mb-2 transition-colors duration-150"
              style={{ color: 'var(--color-text-soft)' }}
            >
              <span>←</span>
              <span>Volver al curso</span>
            </Link>
            <h1 className="text-xl font-bold leading-snug mb-1" style={{ color: 'var(--color-text)' }}>
              {lesson.title}
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Lección {lesson.order} · {lesson.durationMinutes} min
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setMode('slides')}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150"
              style={{ background: 'rgba(0,66,84,0.08)', color: 'var(--color-petroleum)', border: '1px solid rgba(0,66,84,0.15)' }}
            >
              <span>🎯</span>
              <span>Modo presentación</span>
            </button>
            {lesson.isCompleted ? (
              <Badge variant="success" dot>Completada</Badge>
            ) : (
              <Button variant="primary" size="sm" onClick={() => void _complete({ lessonId: lesson.id, userId: 'me' })}>
                ✅ Completar
              </Button>
            )}
          </div>
        </div>
        <div
          className="bg-white rounded-2xl p-8"
          style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}
          dangerouslySetInnerHTML={{ __html: lesson.content ?? '' }}
        />
      </div>
    )
  }

  // ── SLIDES MODE ───────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col animate-fade-in-up" style={{ minHeight: 'calc(100vh - 160px)' }}>

      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <Link
          href={`/courses/${lesson.courseSlug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium shrink-0 transition-colors duration-150"
          style={{ color: 'var(--color-text-soft)' }}
        >
          <span>←</span>
          <span className="hidden sm:inline">Cursos</span>
        </Link>

        <p
          className="text-sm font-semibold text-center truncate flex-1"
          style={{ color: 'var(--color-text)' }}
          title={lesson.title}
        >
          {lesson.title}
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setMode('reading')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
            style={{ background: 'rgba(0,66,84,0.08)', color: 'var(--color-petroleum)', border: '1px solid rgba(0,66,84,0.15)' }}
          >
            <span>📖</span>
            <span className="hidden sm:inline">Lectura</span>
          </button>
          {lesson.isCompleted && <Badge variant="success" dot>Completada</Badge>}
        </div>
      </div>

      {/* Step Navigator */}
      <StepNavigator
        current={step}
        steps={STEPS}
        onGo={(n) => navigate(n, n > step ? 'right' : 'left')}
      />

      {/* Main slide card */}
      <div
        className="flex-1 flex flex-col rounded-2xl overflow-hidden bg-white"
        style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-raised)' }}
      >
        {/* Section header strip — content slides only */}
        {currentStep.type === 'content' && (
          <div
            className="px-6 py-4 shrink-0"
            style={{ backgroundColor: currentStep.bg, borderBottom: '1px solid var(--color-border)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-black text-white shrink-0"
                  style={{ backgroundColor: currentStep.color }}
                >
                  {currentStep.emoji}
                </span>
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                    Bloque {step} de {slides.length || 4}
                  </p>
                  <p className="text-sm font-bold" style={{ color: currentStep.color }}>
                    {currentStep.title}
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold shrink-0" style={{ color: 'var(--color-text-muted)' }}>
                {currentStep.duration} min
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.08)' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(step / (TOTAL - 1)) * 100}%`,
                  backgroundColor: currentStep.color,
                }}
              />
            </div>
          </div>
        )}

        {/* Slide content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto flex flex-col">
          {currentStep.type === 'cover' ? (
            <CoverSlide key={animKey} onStart={() => navigate(1, 'right')} />
          ) : currentStep.type === 'completion' ? (
            <CompletionSlide
              key={animKey}
              onComplete={() => void _complete({ lessonId: lesson.id, userId: 'me' })}
            />
          ) : slides.length > 0 ? (
            <div
              key={animKey}
              className={`p-6 slide-content ${animClass}`}
              dangerouslySetInnerHTML={{ __html: slides[step - 1] ?? '' }}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Cargando contenido…</p>
            </div>
          )}
        </div>

        {/* Bottom navigation */}
        <div
          className="px-6 py-4 shrink-0 flex items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(step - 1, 'left')}
            disabled={step === 0}
          >
            ← Anterior
          </Button>

          {/* Keyboard hint */}
          <div className="hidden sm:flex items-center gap-1">
            {(['←', '→'] as const).map((k) => (
              <kbd
                key={k}
                className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold"
                style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
              >
                {k}
              </kbd>
            ))}
          </div>

          <Button
            variant={step === TOTAL - 1 ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => {
              if (step < TOTAL - 1) {
                navigate(step + 1, 'right')
              } else {
                void _complete({ lessonId: lesson.id, userId: 'me' })
              }
            }}
          >
            {step === TOTAL - 1 ? '✓ Finalizar' : 'Siguiente →'}
          </Button>
        </div>
      </div>
    </div>
  )
}

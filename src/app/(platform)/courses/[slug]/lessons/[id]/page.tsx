import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LessonView } from '@/views/Lessons/LessonView'

interface LessonPageProps {
  params: Promise<{ slug: string; id: string }>
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Lección | APL Semilleros`,
    description: `Lección ${id} en el portal de capacitación front-end INDRA`,
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { id } = await params
  return (
    <Suspense
      fallback={
        <div className="p-6 text-sm" style={{ color: 'var(--color-text-soft)' }}>
          Cargando lección…
        </div>
      }
    >
      <LessonView lessonId={id} />
    </Suspense>
  )
}

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CourseDetailView } from '@/views/Courses/CourseDetailView'

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Curso: ${slug} | APL Semilleros`,
    description: `Detalle del curso ${slug} en el portal de capacitación front-end INDRA`,
  }
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params
  return (
    <Suspense
      fallback={
        <div className="p-6 text-sm" style={{ color: 'var(--color-text-soft)' }}>
          Cargando curso…
        </div>
      }
    >
      <CourseDetailView slug={slug} />
    </Suspense>
  )
}

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CoursesView } from '@/views/Courses/CoursesView'

export const metadata: Metadata = {
  title: 'Cursos | APL Semilleros',
  description: 'Catálogo de cursos del programa de capacitación front-end INDRA',
}

export default function CoursesPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-sm" style={{ color: 'var(--color-text-soft)' }}>
          Cargando cursos…
        </div>
      }
    >
      <CoursesView />
    </Suspense>
  )
}

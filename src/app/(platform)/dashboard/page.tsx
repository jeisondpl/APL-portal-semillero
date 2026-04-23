import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DashboardView } from '@/views/Dashboard/DashboardView'

export const metadata: Metadata = {
  title: 'Dashboard | APL Semilleros',
  description: 'Panel principal con métricas de progreso del programa de semilleros INDRA',
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-sm" style={{ color: 'var(--color-text-soft)' }}>
          Cargando dashboard…
        </div>
      }
    >
      <DashboardView />
    </Suspense>
  )
}

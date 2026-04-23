import type { Metadata } from 'next'
import { Suspense } from 'react'
import { RegisterView } from '@/views/Auth/RegisterView'

export const metadata: Metadata = {
  title: 'Crear cuenta | APL Semilleros',
  description: 'Regístrate en el portal de aprendizaje APL Semilleros INDRA',
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-sm" style={{ color: 'var(--color-text-soft)' }}>
          Cargando…
        </div>
      }
    >
      <RegisterView />
    </Suspense>
  )
}

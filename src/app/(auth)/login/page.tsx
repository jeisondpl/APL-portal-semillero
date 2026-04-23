import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginView } from '@/views/Auth/LoginView'

export const metadata: Metadata = {
  title: 'Iniciar sesión | APL Semilleros',
  description: 'Accede a tu cuenta del portal de aprendizaje APL Semilleros INDRA',
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-sm" style={{ color: 'var(--color-text-soft)' }}>
          Cargando…
        </div>
      }
    >
      <LoginView />
    </Suspense>
  )
}

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProfileView } from '@/views/Profile/ProfileView'

export const metadata: Metadata = {
  title: 'Mi Perfil | APL Semilleros',
  description: 'Gestiona tu perfil y configuración en el portal APL Semilleros INDRA',
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-sm" style={{ color: 'var(--color-text-soft)' }}>
          Cargando perfil…
        </div>
      }
    >
      <ProfileView />
    </Suspense>
  )
}

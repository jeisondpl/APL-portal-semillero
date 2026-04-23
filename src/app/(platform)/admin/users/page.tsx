import { Suspense } from 'react'
import { PageHeader } from '@/shared/components/ui/PageHeader'
import { UsersListView } from '@/views/Admin'

export const metadata = {
  title: 'Gestión de Usuarios',
  description: 'Administra usuarios y roles del portal',
}

function UsersSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-12 bg-[var(--color-surface-raised)] rounded-lg animate-pulse" />
      ))}
    </div>
  )
}

export default function UsersPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Gestión de Usuarios"
        subtitle="Crea, edita y administra usuarios del portal"
      />

      <Suspense fallback={<UsersSkeleton />}>
        <UsersListView />
      </Suspense>
    </div>
  )
}

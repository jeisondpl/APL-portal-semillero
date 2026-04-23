import { Sidebar } from '@/shared/components/layout/Sidebar'
import { Topbar } from '@/shared/components/layout/Topbar'

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main
          className="flex-1 overflow-y-auto px-8 py-7"
          style={{ backgroundColor: 'var(--color-bg)' }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

'use client'

import { cn } from '@/shared/lib/utils'

type ModalSize = 'sm' | 'md' | 'lg'

const sizeClass: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

/* ── Root ─────────────────────────────────────────────────────────────────── */
export function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode
  onClose?: () => void
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centering layer */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        aria-modal="true"
        role="dialog"
      >
        {children}
      </div>
    </>
  )
}

/* ── Content (the actual dialog box) ─────────────────────────────────────── */
function Content({
  size = 'md',
  children,
  className,
}: {
  size?: ModalSize
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative w-full rounded-2xl overflow-hidden animate-scale-in',
        'pointer-events-auto',
        sizeClass[size],
        className
      )}
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow:
          '0 4px 6px -1px rgba(0,0,0,0.05), 0 20px 48px -8px rgba(0,36,50,0.18)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
}

/* ── Header ───────────────────────────────────────────────────────────────── */
function Header({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-between px-6 py-4"
      style={{ borderBottom: '1px solid var(--color-border)' }}
    >
      {children}
    </div>
  )
}

/* ── Title ────────────────────────────────────────────────────────────────── */
function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[15px] font-bold leading-snug"
      style={{ color: 'var(--color-text)' }}
    >
      {children}
    </h2>
  )
}

/* ── Close button ─────────────────────────────────────────────────────────── */
function Close({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Cerrar"
      className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors ml-3"
      style={{ color: 'var(--color-text-muted)' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          'var(--color-surface-raised)'
        ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-soft)'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
        ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-muted)'
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M4 4l8 8M12 4l-8 8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </button>
  )
}

/* ── Body ─────────────────────────────────────────────────────────────────── */
function Body({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('px-6 py-5', className)}>{children}</div>
  )
}

/* ── Footer ───────────────────────────────────────────────────────────────── */
function Footer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn('px-6 py-4 flex items-center justify-end gap-3', className)}
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      {children}
    </div>
  )
}

/* ── Compound ─────────────────────────────────────────────────────────────── */
Modal.Content = Content
Modal.Header  = Header
Modal.Title   = Title
Modal.Close   = Close
Modal.Body    = Body
Modal.Footer  = Footer

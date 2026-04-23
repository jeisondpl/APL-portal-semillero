import { cn } from '@/shared/lib/utils'

function Root({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-card bg-white transition-shadow duration-200',
        className
      )}
      style={{
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
      }}
      {...props}
    >
      {children}
    </div>
  )
}

function Header({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-5 py-4', className)}
      style={{ borderBottom: '1px solid var(--color-border)' }}
      {...props}
    >
      {children}
    </div>
  )
}

function Body({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-5 py-5', className)} {...props}>
      {children}
    </div>
  )
}

function Footer({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-5 py-4', className)}
      style={{ borderTop: '1px solid var(--color-border)' }}
      {...props}
    >
      {children}
    </div>
  )
}

export const Card = { Root, Header, Body, Footer }

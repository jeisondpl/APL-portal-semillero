interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-7">
      <div>
        <h1
          className="text-[22px] font-bold leading-tight tracking-tight"
          style={{ color: 'var(--color-text)' }}
        >
          {title}
        </h1>
        {subtitle !== undefined && (
          <p className="mt-1 text-sm" style={{ color: 'var(--color-text-soft)' }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions !== undefined && (
        <div className="flex items-center gap-3 shrink-0 ml-6">{actions}</div>
      )}
    </div>
  )
}

import { cn } from '@/shared/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label !== undefined && (
        <label
          htmlFor={id}
          className="text-[13px] font-semibold"
          style={{ color: 'var(--color-text)' }}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'h-10 w-full px-3.5 text-sm rounded-lg border outline-none',
          'transition-all duration-150',
          'border-[var(--color-border)]',
          'bg-white placeholder:text-[var(--color-text-muted)]',
          'focus:border-[var(--color-petroleum)]',
          'focus:ring-3 focus:ring-[var(--color-petroleum-50)]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--color-surface-raised)]',
          error !== undefined &&
            'border-red-400 focus:border-red-500 focus:ring-red-100',
          className
        )}
        {...props}
      />
      {error !== undefined && (
        <p className="text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  )
}

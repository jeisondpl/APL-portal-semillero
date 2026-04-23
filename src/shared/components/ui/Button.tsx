'use client'

import { cn } from '@/shared/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'text-white shadow-sm hover:brightness-110 active:scale-[0.97]',
  secondary:
    'bg-white text-petroleum border border-[var(--color-border)] hover:bg-[var(--color-surface-raised)] active:scale-[0.97] shadow-xs',
  ghost:
    'bg-transparent text-petroleum hover:bg-[rgba(0,66,84,0.07)] active:bg-[rgba(0,66,84,0.13)]',
  danger:
    'text-white shadow-sm hover:brightness-110 active:scale-[0.97]',
}

const variantStyle: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(150deg, #005A72 0%, #004254 60%)',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
  },
  secondary: {},
  ghost: {},
  danger: {
    background: 'linear-gradient(150deg, #D44C3B 0%, #C0392B 60%)',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
  },
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'h-7  px-3    text-xs  rounded-lg  gap-1.5',
  md: 'h-9  px-4    text-sm  rounded-lg  gap-2',
  lg: 'h-11 px-5    text-sm  rounded-xl  gap-2',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  className,
  children,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled ?? loading}
      className={cn(
        'inline-flex items-center justify-center font-semibold',
        'transition-all duration-150 ease-out',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[var(--color-petroleum)] focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        variantClass[variant],
        sizeClass[size],
        className
      )}
      style={{ ...variantStyle[variant], ...style }}
      {...props}
    >
      {loading === true && (
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  )
}

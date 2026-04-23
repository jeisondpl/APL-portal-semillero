import { cn } from '@/shared/lib/utils'

type BadgeVariant = 'success' | 'warning' | 'info' | 'neutral' | 'danger'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
  dot?: boolean
}

const styles: Record<BadgeVariant, { bg: string; color: string; dot: string }> = {
  success: { bg: 'rgba(68,183,87,0.12)',   color: '#22753B', dot: '#44B757' },
  warning: { bg: 'rgba(229,104,19,0.12)',  color: '#9D4710', dot: '#E56813' },
  info:    { bg: 'rgba(134,97,245,0.12)',  color: '#5C35C7', dot: '#8661F5' },
  neutral: { bg: 'rgba(170,170,159,0.18)', color: '#555549', dot: '#AAAA9F' },
  danger:  { bg: 'rgba(192,57,43,0.12)',   color: '#B02F20', dot: '#C0392B' },
}

export function Badge({ variant = 'neutral', children, className, dot }: BadgeProps) {
  const { bg, color, dot: dotColor } = styles[variant]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full',
        'text-[11px] font-semibold tracking-wide',
        className
      )}
      style={{ backgroundColor: bg, color }}
    >
      {dot === true && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: dotColor }}
        />
      )}
      {children}
    </span>
  )
}

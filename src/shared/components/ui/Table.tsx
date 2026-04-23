'use client'

import { cn } from '@/shared/lib/utils'

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
}

interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
  hover?: boolean
}

interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  align?: 'left' | 'center' | 'right'
}

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  align?: 'left' | 'center' | 'right'
}

export function Table({ className, children, ...props }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
      <table
        className={cn('w-full border-collapse text-sm', className)}
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

export function TableHead({ className, children, ...props }: TableHeadProps) {
  return (
    <thead
      className={cn(className)}
      style={{ backgroundColor: 'var(--color-petroleum)' }}
      {...props}
    >
      {children}
    </thead>
  )
}

export function TableBody({ className, children, ...props }: TableBodyProps) {
  return (
    <tbody className={cn(className)} {...props}>
      {children}
    </tbody>
  )
}

export function TableRow({
  className,
  children,
  hover = true,
  ...props
}: TableRowProps) {
  return (
    <tr
      className={cn(
        'border-b transition-colors',
        hover &&
          'hover:bg-[var(--color-surface-raised)] cursor-pointer',
        className
      )}
      style={{ borderColor: 'var(--color-border)' }}
      {...props}
    >
      {children}
    </tr>
  )
}

export function TableHeader({
  className,
  children,
  align = 'left',
  ...props
}: TableHeaderProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align]

  return (
    <th
      className={cn(
        'px-4 py-3 font-semibold text-white uppercase tracking-wider text-xs',
        alignClass,
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
}

export function TableCell({
  className,
  children,
  align = 'left',
  ...props
}: TableCellProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align]

  return (
    <td
      className={cn('px-4 py-3', alignClass, className)}
      style={{ color: 'var(--color-text)' }}
      {...props}
    >
      {children}
    </td>
  )
}

// Compound component exports
Table.Root = Table
Table.Thead = TableHead
Table.Tbody = TableBody
Table.Tr = TableRow
Table.Header = TableHeader
Table.Cell = TableCell

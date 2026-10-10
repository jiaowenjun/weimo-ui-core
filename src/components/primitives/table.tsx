import type { ComponentPropsWithoutRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'weimo-ui-core/lib/utils'

import './table.css'

const tableVariants = cva('coss-table', {
  variants: {
    variant: {
      default: '',
      card: 'coss-table--card',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type TableProps = ComponentPropsWithoutRef<'table'> &
  VariantProps<typeof tableVariants>

export function Table({ className, variant, ...props }: TableProps) {
  return (
    <div
      className="coss-table-container"
      data-slot="table-container"
      data-variant={variant ?? 'default'}
    >
      <table
        className={cn(tableVariants({ variant }), className)}
        data-slot="table"
        {...props}
      />
    </div>
  )
}

export function TableBody({ className, ...props }: ComponentPropsWithoutRef<'tbody'>) {
  return (
    <tbody
      className={cn('coss-table__body', className)}
      data-slot="table-body"
      {...props}
    />
  )
}

export function TableRow({ className, ...props }: ComponentPropsWithoutRef<'tr'>) {
  return (
    <tr
      className={cn('coss-table__row', className)}
      data-slot="table-row"
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: ComponentPropsWithoutRef<'td'>) {
  return (
    <td
      className={cn('coss-table__cell', className)}
      data-slot="table-cell"
      {...props}
    />
  )
}

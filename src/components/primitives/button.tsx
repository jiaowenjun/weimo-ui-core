import { type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'weimo-ui-core/lib/utils'

import './button.css'

const buttonVariants = cva('coss-button', {
  variants: {
    variant: {
      default: 'coss-button--default',
      ghost: 'coss-button--ghost',
      outline: 'coss-button--outline',
    },
    size: {
      default: 'coss-button--md',
      icon: 'coss-button--icon',
      sm: 'coss-button--sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export function Button({
  className,
  variant,
  size,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      data-slot="button"
      type={type}
      {...props}
    />
  )
}

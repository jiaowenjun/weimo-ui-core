import { cva, type VariantProps } from 'class-variance-authority'

export const iconButtonVariants = cva('icon-button', {
  variants: {
    variant: {
      glass: 'icon-button--frosted',
      ghost: 'icon-button--ghost',
    },
    size: {
      default: 'icon-button--md',
      sm: 'icon-button--sm',
      xs: 'icon-button--xs',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export type IconButtonSize = NonNullable<
  VariantProps<typeof iconButtonVariants>['size']
>

export function getIconButtonClassName(
  variant: 'glass' | 'ghost',
  size?: IconButtonSize | null,
) {
  return iconButtonVariants({ variant, size })
}

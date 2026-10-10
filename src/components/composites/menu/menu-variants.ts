import { cva, type VariantProps } from 'class-variance-authority'

export type MenuItemVariant = 'default' | 'destructive'

export const menuItemVariants = cva('weimo-menu__item', {
  variants: {
    inset: {
      true: 'weimo-menu__item--inset',
    },
    variant: {
      default: '',
      destructive: 'weimo-menu__item--destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type MenuItemStyleProps = VariantProps<typeof menuItemVariants> & {
  variant?: MenuItemVariant
}

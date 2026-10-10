import { forwardRef, type ComponentPropsWithoutRef } from 'react'

import { getIconButtonClassName, type IconButtonSize } from './icon-button-model'
import { cn } from 'weimo-ui-core/lib/utils'

import './icon-button.css'

export type GhostIconButtonProps = ComponentPropsWithoutRef<'button'> & {
  /** 选中态（toggle 语义）：渲染 aria-pressed 与 data-active 样式钩子。 */
  active?: boolean
  size?: IconButtonSize
}

export const GhostIconButton = forwardRef<HTMLButtonElement, GhostIconButtonProps>(function GhostIconButton(
  {
    active,
    className,
    size,
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <button
      {...props}
      aria-pressed={active}
      className={cn(getIconButtonClassName('ghost', size), className)}
      data-active={active === undefined ? undefined : active ? 'true' : 'false'}
      ref={ref}
      type={type}
    />
  )
})

GhostIconButton.displayName = 'GhostIconButton'

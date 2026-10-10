import { type ComponentPropsWithoutRef, type ReactNode } from 'react'

import { cn } from 'weimo-ui-core/lib/utils'

import './top-bar.css'

export type TopBarProps = ComponentPropsWithoutRef<'div'> & {
  leftSlot?: ReactNode
  rightSlot?: ReactNode
}

export function TopBar({
  className,
  leftSlot,
  role,
  'aria-label': label,
  rightSlot,
  ...props
}: TopBarProps) {
  return (
    <div
      role={role ?? 'toolbar'}
      aria-label={label ?? '顶部工具栏'}
      {...props}
      className={cn('top-bar', className)}
    >
      <div className="top-bar__frame">
        <div className="top-bar__slot top-bar__slot--left">
          {leftSlot}
        </div>
        <div className="top-bar__slot top-bar__slot--right">
          {rightSlot}
        </div>
      </div>
    </div>
  )
}

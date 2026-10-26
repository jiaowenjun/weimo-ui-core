import { type ComponentPropsWithoutRef, type ReactNode } from 'react'

import { cn } from 'weimo-ui-core/lib/utils'

import './top-bar.css'

export type TopBarProps = ComponentPropsWithoutRef<'div'> & {
  leftSlot?: ReactNode
  rightSlot?: ReactNode
  /**
   * 布局款式:`contained`(默认)frame 限宽并与限宽壳内容列对齐;
   * `full-width` 解除限宽,frame 通到视口两侧,与全宽壳内容区边缘对齐
   */
  variant?: 'contained' | 'full-width'
}

export function TopBar({
  className,
  leftSlot,
  role,
  'aria-label': label,
  rightSlot,
  variant = 'contained',
  ...props
}: TopBarProps) {
  return (
    <div
      role={role ?? 'toolbar'}
      aria-label={label ?? '顶部工具栏'}
      {...props}
      className={cn('top-bar', className)}
    >
      <div
        className={cn(
          'top-bar__frame',
          variant === 'full-width' && 'top-bar__frame--full-width',
        )}
      >
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

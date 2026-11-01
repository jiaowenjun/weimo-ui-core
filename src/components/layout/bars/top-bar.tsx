import { type ComponentPropsWithoutRef, type ReactNode } from 'react'

import { cn } from 'weimo-ui-core/lib/utils'

import 'weimo-ui-core/styles/tokens.css'
import './top-bar.css'

export type TopBarProps = ComponentPropsWithoutRef<'div'> & {
  /**
   * 居中悬浮槽位:绝对居中浮于左右槽位之上(灵动岛式),不参与两列网格。
   * 专为短驻通知设计,配 TopBarNotice 使用;不传不渲染任何节点。
   */
  centerSlot?: ReactNode
  leftSlot?: ReactNode
  rightSlot?: ReactNode
  /**
   * 布局款式:`contained`(默认)frame 限宽并与限宽壳内容列对齐;
   * `full-width` 解除限宽,frame 通到视口两侧,与全宽壳内容区边缘对齐
   */
  variant?: 'contained' | 'full-width'
}

export function TopBar({
  'aria-label': label,
  centerSlot,
  className,
  leftSlot,
  role,
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
        {/* 悬浮层放最后:不占网格轨道,叠在左右槽位之上;条件渲染保证
            未使用时 DOM 与旧版逐字节一致 */}
        {centerSlot != null && <div className="top-bar__center">{centerSlot}</div>}
      </div>
    </div>
  )
}

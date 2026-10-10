import type { HTMLAttributes, ReactNode } from 'react'

import {
  getFrostedSurfaceClassName,
  useFrostedSurfaceBackgroundToneRef,
} from 'weimo-ui-core/components/frosted-surface'
import { cn } from 'weimo-ui-core/lib/utils'

import 'weimo-ui-core/styles/frosted-surface.css'
import './frosted-label.css'

export type FrostedLabelSize = 'sm' | 'lg'

export type FrostedLabelProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  children: ReactNode
  /** 字号档:sm 用于工具栏栏位标题,lg(粗体 600)用于页面标题。 */
  size?: FrostedLabelSize
}

// 磨砂标题标签:非交互的展示胶囊,span 自身持有磨砂材质(与磨砂图标钮同构,
// 无独立材质层与 sizer);文字色随自身 tone 采样自适应,浮动/顶部工具栏用
// 它展示栏位与页面标题。
export function FrostedLabel({
  children,
  className,
  size = 'sm',
  style,
  ...props
}: FrostedLabelProps) {
  const { backgroundStyle, backgroundTone, setElementRef } =
    useFrostedSurfaceBackgroundToneRef<HTMLSpanElement>(true)

  return (
    <span
      className={cn(
        getFrostedSurfaceClassName('frosted-surface--bordered'),
        'frosted-label',
        `frosted-label--${size}`,
        className,
      )}
      data-background-tone={backgroundTone ?? undefined}
      ref={setElementRef}
      style={{ ...style, ...backgroundStyle }}
      {...props}
    >
      {children}
    </span>
  )
}

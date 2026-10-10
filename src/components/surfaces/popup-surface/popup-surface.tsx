import type { ComponentPropsWithoutRef } from 'react'
import type { ClassValue } from 'clsx'

import { cn } from 'weimo-ui-core/lib/utils'

import './popup-surface.css'

export type PopupSurfaceLevel = 'modal' | 'tooltip'

export type PopupSurfaceProps = ComponentPropsWithoutRef<'div'> & {
  level?: PopupSurfaceLevel
}

export function getPopupSurfaceClassName(
  level: PopupSurfaceLevel = 'modal',
  ...className: ClassValue[]
) {
  void level

  return cn('popup-surface', className)
}

/* 浮层材质固定双态，不提供变体：亮主题抬升阴影无边框，暗主题边框无阴影。 */
export function PopupSurface({
  className,
  level = 'modal',
  ...props
}: PopupSurfaceProps) {
  return (
    <div
      className={getPopupSurfaceClassName(level, className)}
      data-level={level === 'modal' ? undefined : level}
      {...props}
    />
  )
}

import type { ComponentPropsWithoutRef } from 'react'
import type { ClassValue } from 'clsx'

import { cn } from 'weimo-ui-core/lib/utils'

import './card-surface.css'

export type CardSurfaceProps = ComponentPropsWithoutRef<'div'>

export function getCardSurfaceClassName(...className: ClassValue[]) {
  return cn('card-surface', className)
}

/* 卡片材质固定双态，不提供变体：亮主题细微阴影无边框，暗主题边框无阴影。 */
export function CardSurface({ className, ...props }: CardSurfaceProps) {
  return <div className={getCardSurfaceClassName(className)} {...props} />
}

import { useState } from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

import { getCardSurfaceClassName } from 'weimo-ui-core/components/card-surface'
import { GhostIconButton } from 'weimo-ui-core/components/ghost-icon-button'
import { cn } from 'weimo-ui-core/lib/utils'

import './base-card.css'

export type BaseCardProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'title'
> & {
  actionSlot?: ReactNode
  footerSlot?: ReactNode
  meta?: ReactNode
  metaCollapsible?: boolean
  title?: ReactNode
}

export function BaseCard({
  actionSlot,
  children,
  className,
  footerSlot,
  meta,
  metaCollapsible = false,
  title,
  ...props
}: BaseCardProps) {
  const [metaExpanded, setMetaExpanded] = useState(false)

  return (
    <div
      className={cn(getCardSurfaceClassName('base-card'), className)}
      {...props}
    >
      {title === undefined ? null : (
        <header
          className="base-card__header"
          data-meta-collapsible={metaCollapsible ? 'true' : undefined}
        >
          <span className="base-card__title">{title}</span>
          {meta === undefined || !metaCollapsible ? null : (
            <GhostIconButton
              aria-expanded={metaExpanded}
              aria-label={metaExpanded ? '收起元信息' : '展开元信息'}
              className="base-card__meta-toggle"
              data-expanded={metaExpanded ? 'true' : undefined}
              onClick={() => setMetaExpanded((current) => !current)}
              size="sm"
            >
              <ChevronRight aria-hidden="true" />
            </GhostIconButton>
          )}
          {actionSlot === undefined ? null : (
            <div className="base-card__header-action">{actionSlot}</div>
          )}
        </header>
      )}
      {meta === undefined ? null : (
        <div
          className="base-card__meta-region"
          data-expanded={!metaCollapsible || metaExpanded ? 'true' : 'false'}
        >
          <div className="base-card__meta">{meta}</div>
        </div>
      )}
      <div className="base-card__content">{children}</div>
      {footerSlot === undefined ? null : (
        <div className="base-card__footer">{footerSlot}</div>
      )}
    </div>
  )
}

import { useLayoutEffect, useRef } from 'react'
import type { ComponentPropsWithoutRef, ComponentRef, ReactNode, RefObject } from 'react'

import { BaseCard } from './base-card'
import { cn } from 'weimo-ui-core/lib/utils'

import './component-preview-card.css'

const colorValuePattern =
  /^(?:#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|(?:hsl|hsla|rgb|rgba|oklch|oklab|lch|lab|hwb|color)\()/i

function colorValueHasAlpha(value: string) {
  if (value.startsWith('#')) {
    const digits = value.slice(1)
    if (digits.length === 4) return digits[3].toLowerCase() !== 'f'
    if (digits.length === 8) return digits.slice(6).toLowerCase() !== 'ff'
    return false
  }

  const slashAlpha = value.match(/\/\s*([^)]+)/)
  if (slashAlpha) {
    const alpha = slashAlpha[1].trim().endsWith('%')
      ? Number.parseFloat(slashAlpha[1]) / 100
      : Number.parseFloat(slashAlpha[1])
    return Number.isFinite(alpha) && alpha < 1
  }

  const legacyAlpha = value.match(/^(?:rgba|hsla)\([^)]*,\s*([^),\s]+)\s*\)$/i)
  if (legacyAlpha) {
    const alpha = legacyAlpha[1].trim().endsWith('%')
      ? Number.parseFloat(legacyAlpha[1]) / 100
      : Number.parseFloat(legacyAlpha[1])
    return Number.isFinite(alpha) && alpha < 1
  }

  return false
}

function renderTokenValue(value: ReactNode, swatchClassName: string) {
  if (typeof value !== 'string' || !colorValuePattern.test(value.trim())) return value

  const background = colorValueHasAlpha(value.trim())
    ? `linear-gradient(${value}), repeating-linear-gradient(45deg, hsl(0 0% 50% / 0.16) 0 4px, transparent 4px 8px), repeating-linear-gradient(-45deg, hsl(0 0% 50% / 0.16) 0 4px, transparent 4px 8px), linear-gradient(#fff, #fff)`
    : `linear-gradient(${value})`

  return (
    <>
      <span className="component-preview-card__value-text">{value}</span>
      <span aria-hidden="true" className={swatchClassName} style={{ background }} />
    </>
  )
}

function useCollapseValueTextWhenTokenWraps(rowRef: RefObject<ComponentRef<'div'> | null>) {
  useLayoutEffect(() => {
    const row = rowRef.current
    if (!row || typeof ResizeObserver === 'undefined') return

    const tokenEl = row.querySelector<HTMLElement>('.component-preview-card__token')
    const valueEl = row.querySelector<HTMLElement>('.component-preview-card__value')
    const collapsedClass = 'component-preview-card__row--value-text-collapsed'
    if (!tokenEl || !valueEl || !row.querySelector('.component-preview-card__value-swatch')) return

    const measureNowrapWidth = (element: HTMLElement) => {
      const previous = element.style.whiteSpace
      element.style.whiteSpace = 'nowrap'
      const width = element.scrollWidth
      element.style.whiteSpace = previous
      return width
    }

    const sync = () => {
      const wasCollapsed = row.classList.contains(collapsedClass)
      if (wasCollapsed) row.classList.remove(collapsedClass)
      const gap = Number.parseFloat(getComputedStyle(row).columnGap) || 0
      const needed = measureNowrapWidth(tokenEl) + gap + measureNowrapWidth(valueEl)
      row.classList.toggle(collapsedClass, row.getBoundingClientRect().width + 1 < needed)
    }

    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(row)
    observer.observe(tokenEl)
    return () => observer.disconnect()
  }, [rowRef])
}

function TokenPreviewRow(row: ComponentPreviewCardItem) {
  const rowRef = useRef<ComponentRef<'div'>>(null)
  useCollapseValueTextWhenTokenWraps(rowRef)

  return (
    <div className="component-preview-card__row" ref={rowRef}>
      <code className="component-preview-card__token">{row.token}</code>
      <code className="component-preview-card__value">
        {row.darkValue === undefined ? (
          renderTokenValue(row.value, 'component-preview-card__value-swatch')
        ) : (
          <>
            <span className="component-preview-card__value--light">
              {renderTokenValue(row.value, 'component-preview-card__value-swatch')}
            </span>
            <span className="component-preview-card__value--dark">
              {renderTokenValue(row.darkValue, 'component-preview-card__value-swatch')}
            </span>
          </>
        )}
      </code>
    </div>
  )
}

export type ComponentPreviewCardItem = {
  darkValue?: ReactNode
  token: string
  value: ReactNode
}

export type ComponentPreviewCardProps = Omit<
  ComponentPropsWithoutRef<typeof BaseCard>,
  'actionSlot' | 'children' | 'footerSlot' | 'meta' | 'title'
> & {
  action?: ReactNode
  align?: 'start' | 'center'
  children: ReactNode
  darkValue?: ReactNode
  footer?: ReactNode
  items?: readonly ComponentPreviewCardItem[]
  label: ReactNode
  token?: string
  value?: ReactNode
}

export function ComponentPreviewCard({
  action,
  align = 'start',
  children,
  className,
  darkValue,
  footer,
  items,
  label,
  token,
  value,
  ...props
}: ComponentPreviewCardProps) {
  const rows: readonly ComponentPreviewCardItem[] =
    items ?? (token === undefined || value === undefined ? [] : [{ darkValue, token, value }])

  return (
    <BaseCard
      actionSlot={action}
      className={cn(
        'component-preview-card',
        align === 'center' && 'component-preview-card--align-center',
        className,
      )}
      footerSlot={footer}
      meta={
        rows.length > 0 ? (
          rows.map((row) => (
            <TokenPreviewRow darkValue={row.darkValue} key={row.token} token={row.token} value={row.value} />
          ))
        ) : undefined
      }
      metaCollapsible
      title={label}
      {...props}
    >
      {children}
    </BaseCard>
  )
}

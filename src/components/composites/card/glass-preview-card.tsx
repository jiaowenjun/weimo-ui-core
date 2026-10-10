import { useEffect, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

import { bgColorToneMap } from 'weimo-ui-core/components/bg-color'
import { Slider } from 'weimo-ui-core/components/slider'
import { cn } from 'weimo-ui-core/lib/utils'

import {
  ComponentPreviewCard,
  type ComponentPreviewCardProps,
} from './component-preview-card'

import './glass-preview-card.css'

function parseHslLightness(value: string) {
  const match = value.match(
    /^hsla?\(\s*[\d.]+(?:deg)?[\s,]+[\d.]+%[\s,]+([\d.]+)%(?:\s*(?:\/|,)\s*[\d.]+%?)?\s*\)$/iu,
  )

  return match ? Number(match[1]) : null
}

export const glassBackgroundGrayDark =
  parseHslLightness(bgColorToneMap.card.value.dark) ?? 12
export const glassBackgroundGrayLight =
  parseHslLightness(bgColorToneMap.card.value.light) ?? 100
export const glassBackgroundGrayMidpoint =
  (glassBackgroundGrayDark + glassBackgroundGrayLight) / 2

const glassGradientStops = [
  { hue: 220, saturation: 0.58, spread: -16 },
  { hue: 262, saturation: 0.55, spread: -8 },
  { hue: 316, saturation: 0.5, spread: 0 },
  { hue: 18, saturation: 0.64, spread: 8 },
  { hue: 44, saturation: 0.72, spread: 16 },
] as const

const glassStripeWidth = 48
const glassStripePeriod = glassGradientStops.length * glassStripeWidth

function glassHslToRgb(hue: number, saturation: number, lightness: number) {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  const secondary = chroma * (1 - Math.abs(((hue / 60) % 2) - 1))
  const match = lightness - chroma / 2
  const base =
    hue < 60
      ? ([chroma, secondary, 0] as const)
      : hue < 120
        ? ([secondary, chroma, 0] as const)
        : hue < 180
          ? ([0, chroma, secondary] as const)
          : hue < 240
            ? ([0, secondary, chroma] as const)
            : hue < 300
              ? ([secondary, 0, chroma] as const)
              : ([chroma, 0, secondary] as const)

  return [
    Math.round((base[0] + match) * 255),
    Math.round((base[1] + match) * 255),
    Math.round((base[2] + match) * 255),
  ] as const
}

export function getGlassPreviewBackground(gray: number): CSSProperties {
  const range = glassBackgroundGrayLight - glassBackgroundGrayDark
  const progress = Math.min(Math.max((gray - glassBackgroundGrayDark) / range, 0), 1)
  const colorfulness = progress <= 0 || progress >= 1 ? 0 : Math.sin(Math.PI * progress)
  const stripes = glassGradientStops.map(({ hue, saturation, spread }, index) => {
    const boundedGray =
      colorfulness === 0 ? gray : Math.min(Math.max(gray + spread * colorfulness, 3), 100)
    const [red, green, blue] = glassHslToRgb(
      hue,
      saturation * colorfulness,
      boundedGray / 100,
    )

    return `rgb(${red}, ${green}, ${blue}) ${index * glassStripeWidth}px ${(index + 1) * glassStripeWidth}px`
  })

  return {
    backgroundImage: `repeating-linear-gradient(90deg, ${stripes.join(', ')})`,
    backgroundPositionX: `${-progress * glassStripePeriod}px`,
  }
}

function getInitialGray(initialGray: number | undefined) {
  if (initialGray !== undefined) return initialGray

  if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
    return glassBackgroundGrayDark
  }

  return typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? glassBackgroundGrayDark
    : glassBackgroundGrayLight
}

export type GlassPreviewCardProps = Omit<
  ComponentPreviewCardProps,
  'align' | 'children' | 'footer'
> & {
  aboveCanvas?: ReactNode
  children: ReactNode
  initialGray?: number
  onGrayChange?: (gray: number) => void
}

export function GlassPreviewCard({
  aboveCanvas,
  children,
  className,
  initialGray,
  onGrayChange,
  ...props
}: GlassPreviewCardProps) {
  const [glassBackgroundGray, setGlassBackgroundGray] = useState(() =>
    getInitialGray(initialGray),
  )

  useEffect(() => {
    if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') return

    const syncThemeEndpoint = () => {
      setGlassBackgroundGray(
        initialGray ??
          (document.documentElement.classList.contains('dark')
            ? glassBackgroundGrayDark
            : glassBackgroundGrayLight),
      )
    }
    const themeObserver = new MutationObserver(syncThemeEndpoint)

    syncThemeEndpoint()
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => themeObserver.disconnect()
  }, [initialGray])

  useEffect(() => {
    onGrayChange?.(glassBackgroundGray)
  }, [glassBackgroundGray, onGrayChange])

  return (
    <ComponentPreviewCard
      {...props}
      className={cn('glass-preview-card', className)}
      footer={
        <div className="glass-preview-card__slider-row">
          <Slider
            ariaLabel="背景灰度"
            max={glassBackgroundGrayLight}
            min={glassBackgroundGrayDark}
            onValueChange={setGlassBackgroundGray}
            value={glassBackgroundGray}
          />
        </div>
      }
    >
      {aboveCanvas}
      <div
        className="glass-preview-card__canvas"
        style={getGlassPreviewBackground(glassBackgroundGray)}
      >
        {children}
      </div>
    </ComponentPreviewCard>
  )
}

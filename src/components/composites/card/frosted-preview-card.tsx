import { useEffect, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

import { bgColorToneMap } from 'weimo-ui-core/components/bg-color'
import { Slider } from 'weimo-ui-core/components/slider'
import { cn } from 'weimo-ui-core/lib/utils'

import {
  ComponentPreviewCard,
  type ComponentPreviewCardProps,
} from './component-preview-card'

import 'weimo-ui-core/styles/tokens.css'
import './frosted-preview-card.css'

function parseHslLightness(value: string) {
  const match = value.match(
    /^hsla?\(\s*[\d.]+(?:deg)?[\s,]+[\d.]+%[\s,]+([\d.]+)%(?:\s*(?:\/|,)\s*[\d.]+%?)?\s*\)$/iu,
  )

  return match ? Number(match[1]) : null
}

export const frostedBackgroundGrayDark =
  parseHslLightness(bgColorToneMap.card.value.dark) ?? 12
export const frostedBackgroundGrayLight =
  parseHslLightness(bgColorToneMap.card.value.light) ?? 100
export const frostedBackgroundGrayMidpoint =
  (frostedBackgroundGrayDark + frostedBackgroundGrayLight) / 2

const frostedGradientStops = [
  { hue: 220, saturation: 0.58, spread: -16 },
  { hue: 262, saturation: 0.55, spread: -8 },
  { hue: 316, saturation: 0.5, spread: 0 },
  { hue: 18, saturation: 0.64, spread: 8 },
  { hue: 44, saturation: 0.72, spread: 16 },
] as const

const frostedStripeWidth = 48
const frostedStripePeriod = frostedGradientStops.length * frostedStripeWidth

function frostedHslToRgb(hue: number, saturation: number, lightness: number) {
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

export function getFrostedPreviewBackground(gray: number): CSSProperties {
  const range = frostedBackgroundGrayLight - frostedBackgroundGrayDark
  const progress = Math.min(Math.max((gray - frostedBackgroundGrayDark) / range, 0), 1)
  const colorfulness = progress <= 0 || progress >= 1 ? 0 : Math.sin(Math.PI * progress)
  const stripes = frostedGradientStops.map(({ hue, saturation, spread }, index) => {
    const boundedGray =
      colorfulness === 0 ? gray : Math.min(Math.max(gray + spread * colorfulness, 3), 100)
    const [red, green, blue] = frostedHslToRgb(
      hue,
      saturation * colorfulness,
      boundedGray / 100,
    )

    return `rgb(${red}, ${green}, ${blue}) ${index * frostedStripeWidth}px ${(index + 1) * frostedStripeWidth}px`
  })

  return {
    backgroundImage: `repeating-linear-gradient(90deg, ${stripes.join(', ')})`,
    backgroundPositionX: `${-progress * frostedStripePeriod}px`,
  }
}

function getInitialGray(initialGray: number | undefined) {
  if (initialGray !== undefined) return initialGray

  if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
    return frostedBackgroundGrayDark
  }

  return typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? frostedBackgroundGrayDark
    : frostedBackgroundGrayLight
}

export type FrostedPreviewCardProps = Omit<
  ComponentPreviewCardProps,
  'align' | 'children' | 'footer'
> & {
  aboveCanvas?: ReactNode
  children: ReactNode
  initialGray?: number
  onGrayChange?: (gray: number) => void
}

export function FrostedPreviewCard({
  aboveCanvas,
  children,
  className,
  initialGray,
  onGrayChange,
  ...props
}: FrostedPreviewCardProps) {
  const [frostedBackgroundGray, setFrostedBackgroundGray] = useState(() =>
    getInitialGray(initialGray),
  )

  useEffect(() => {
    if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') return

    const syncThemeEndpoint = () => {
      setFrostedBackgroundGray(
        initialGray ??
          (document.documentElement.classList.contains('dark')
            ? frostedBackgroundGrayDark
            : frostedBackgroundGrayLight),
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
    onGrayChange?.(frostedBackgroundGray)
  }, [frostedBackgroundGray, onGrayChange])

  return (
    <ComponentPreviewCard
      {...props}
      className={cn('frosted-preview-card', className)}
      footer={
        <div className="frosted-preview-card__slider-row">
          <Slider
            ariaLabel="背景灰度"
            max={frostedBackgroundGrayLight}
            min={frostedBackgroundGrayDark}
            onValueChange={setFrostedBackgroundGray}
            value={frostedBackgroundGray}
          />
        </div>
      }
    >
      {aboveCanvas}
      <div
        className="frosted-preview-card__canvas"
        style={getFrostedPreviewBackground(frostedBackgroundGray)}
      >
        {children}
      </div>
    </ComponentPreviewCard>
  )
}

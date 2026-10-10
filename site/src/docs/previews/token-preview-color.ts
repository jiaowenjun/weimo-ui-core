import { useSyncExternalStore } from 'react'

export type ThemeColorValue = {
  light: string
  dark: string
}

type ParsedColor = {
  alpha: number
  lightness: number
}

const themeSubscribers = new Set<() => void>()
let themeObserver: MutationObserver | undefined

function currentThemeIsDark() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
}

function subscribeToTheme(listener: () => void) {
  themeSubscribers.add(listener)

  if (!themeObserver && typeof document !== 'undefined') {
    themeObserver = new MutationObserver(() => {
      themeSubscribers.forEach((subscriber) => subscriber())
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
  }

  return () => {
    themeSubscribers.delete(listener)

    if (themeSubscribers.size === 0) {
      themeObserver?.disconnect()
      themeObserver = undefined
    }
  }
}

function parseAlpha(value: string | undefined) {
  if (value === undefined) return 1

  return value.endsWith('%')
    ? Number(value.slice(0, -1)) / 100
    : Number(value)
}

export function parseColorLightness(value: string): ParsedColor | null {
  const hsl = value.match(
    /^hsla?\(\s*[\d.]+(?:deg)?[\s,]+[\d.]+%[\s,]+([\d.]+)%(?:\s*(?:\/|,)\s*([\d.]+%?))?\s*\)$/iu,
  )

  if (hsl) {
    return { lightness: Number(hsl[1]), alpha: parseAlpha(hsl[2]) }
  }

  const rgb = value.match(
    /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*(?:\/|,)\s*([\d.]+%?))?\s*\)$/iu,
  )

  if (rgb) {
    const channels = [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])]

    return {
      lightness: (Math.max(...channels) + Math.min(...channels)) / 2 / 2.55,
      alpha: parseAlpha(rgb[4]),
    }
  }

  const hex = value.match(/^#([0-9a-f]{6})$/iu)

  if (hex) {
    const channels = [0, 2, 4].map((offset) =>
      parseInt(hex[1].slice(offset, offset + 2), 16),
    )

    return {
      lightness: (Math.max(...channels) + Math.min(...channels)) / 2 / 2.55,
      alpha: 1,
    }
  }

  return null
}

export function effectiveColorLightness(value: string, backgroundLightness: number) {
  const color = parseColorLightness(value)

  if (!color) return 0

  return color.alpha * color.lightness + (1 - color.alpha) * backgroundLightness
}

export function sortByThemeLightness<T>(
  values: readonly T[],
  colorFor: (value: T) => ThemeColorValue,
  isDark: boolean,
  backgroundLightness: number,
) {
  const theme = isDark ? 'dark' : 'light'

  return values.toSorted(
    (left, right) =>
      effectiveColorLightness(colorFor(right)[theme], backgroundLightness) -
      effectiveColorLightness(colorFor(left)[theme], backgroundLightness),
  )
}

export function useIsDarkTheme() {
  return useSyncExternalStore(subscribeToTheme, currentThemeIsDark, () => false)
}

import { useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

export function useAnimatedInlineSize(measureKey: unknown) {
  const measureRef = useRef<HTMLElement | null>(null)
  const [inlineSize, setInlineSize] = useState<number | null>(null)

  useLayoutEffect(() => {
    const element = measureRef.current
    if (!element) return

    const nextSize = element.getBoundingClientRect().width
    setInlineSize((currentSize) =>
      currentSize === nextSize ? currentSize : nextSize,
    )
  }, [measureKey])

  return { measureRef, inlineSize }
}

export function getAnimatedInlineSizeStyle(
  style: CSSProperties | undefined,
  inlineSize: number | null,
) {
  return inlineSize === null ? style : { ...style, inlineSize: `${inlineSize}px` }
}

import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import type { ComponentPropsWithoutRef, CSSProperties, RefObject } from 'react'

import {
  getFrostedSurfaceClassName,
  interpolateFrostedBorderColor,
  resolveElementBackgroundSample,
  type FrostedSurfaceBackgroundSample,
} from './frosted-surface-model'

import './frosted-surface.css'

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect
type FrostedSurfaceScrollParent = HTMLElement | Window

export { getFrostedSurfaceClassName }

export type FrostedSurfaceProps = ComponentPropsWithoutRef<'div'> & {
  bordered?: boolean
  observe?: boolean
}

export function useFrostedSurfaceBackgroundTone<ElementType extends HTMLElement>(
  elementRef: RefObject<ElementType | null>,
  observe: boolean,
) {
  const backgroundSample = useFrostedSurfaceBackgroundToneForElement(
    elementRef.current,
    observe,
  )

  return backgroundSample?.tone ?? null
}

// 返回完整采样:backgroundTone 驱动 data-background-tone,backgroundLuminance 供
// 演示页直接展示材质感知到的背景相对亮度(两者来自同一次采样,不会相互漂移)。
// backgroundStyle 以 inline 自定义属性下发插值边框色——所有磨砂材质的边框
// 亮度随感知亮度两段递增,直接声明 border-color 的规则(如禁用描边)优先级更高
// 不受影响;采样前为 undefined,CSS 的 tone 二值声明作为回退。
export function useFrostedSurfaceBackgroundToneRef<ElementType extends HTMLElement>(
  observe: boolean,
) {
  const [element, setElement] = useState<ElementType | null>(null)
  const backgroundSample = useFrostedSurfaceBackgroundToneForElement(element, observe)
  const setElementRef = useCallback((nextElement: ElementType | null) => {
    setElement((currentElement) => (
      currentElement === nextElement ? currentElement : nextElement
    ))
  }, [])

  const interpolatedBorderColor = interpolateFrostedBorderColor(
    backgroundSample?.luminance ?? null,
  )

  return {
    backgroundLuminance: backgroundSample?.luminance ?? null,
    backgroundStyle: interpolatedBorderColor
      ? ({ '--frosted-surface-border': interpolatedBorderColor }) as CSSProperties
      : undefined,
    backgroundTone: backgroundSample?.tone ?? null,
    setElementRef,
  }
}

function useFrostedSurfaceBackgroundToneForElement<ElementType extends HTMLElement>(
  element: ElementType | null,
  observe: boolean,
) {
  const [backgroundSample, setBackgroundSample] =
    useState<FrostedSurfaceBackgroundSample | null>(null)

  useIsomorphicLayoutEffect(() => {
    const ownerWindow = element?.ownerDocument.defaultView

    if (!element || !ownerWindow || !observe) {
      setBackgroundSample(null)

      return undefined
    }

    let animationFrame = 0
    const scrollParents = getFrostedSurfaceScrollParents(element)
    const scrollListenerOptions = { capture: true, passive: true } as const

    const updateBackgroundTone = () => {
      animationFrame = 0
      const nextSample = resolveElementBackgroundSample(element)

      setBackgroundSample((currentSample) => {
        // 采样瞬态失败（如 iOS 手势滚动期间异步滚动与主线程命中测试不同步，
        // elementsFromPoint 落空或矩形失效）视为「本帧无新信息」，保留上次成功
        // 采样：置 null 会移除 data-background-tone，亮背景下回退成暗变体
        // （透明影+描边闪变）。observe 关闭与卸载路径仍显式清空。
        if (nextSample == null) {
          return currentSample
        }

        return currentSample?.tone === nextSample.tone &&
          currentSample?.luminance === nextSample.luminance
          ? currentSample
          : nextSample
      })
    }

    const scheduleUpdate = () => {
      if (animationFrame) {
        return
      }

      animationFrame = ownerWindow.requestAnimationFrame(updateBackgroundTone)
    }

    const resizeObserver =
      'ResizeObserver' in ownerWindow ? new ownerWindow.ResizeObserver(scheduleUpdate) : null
    const mutationObserver =
      'MutationObserver' in ownerWindow
        ? new ownerWindow.MutationObserver(scheduleUpdate)
        : null

    // Chromium 的 backdrop-filter 快照在「只有背景元素的内联样式变化」时会滞留:
    // 灰度滑块只改画布 style 时,磨砂材质停在旧模糊底色,直到材质自身发生一次
    // 样式提交(如按压反馈)才刷新。观察祖先链 class/style,在元素自身交替写入
    // 视觉恒等的 translate 强制重采样。
    // 只能观察祖先链、写入只能在自身:上面的采样观察器挂在 documentElement
    // subtree 上,抖动若由它触发会对自身写入形成 rAF 乒乓循环。
    const backdropObserver =
      'MutationObserver' in ownerWindow
        ? new ownerWindow.MutationObserver(() => {
            const nudged = element.dataset.frostedBackdropNudge === '1'
            element.dataset.frostedBackdropNudge = nudged ? '0' : '1'
            element.style.translate = nudged ? '' : '0 0.001px'
          })
        : null

    if (backdropObserver) {
      for (
        let ancestor = element.parentElement;
        ancestor;
        ancestor = ancestor.parentElement
      ) {
        backdropObserver.observe(ancestor, {
          attributeFilter: ['class', 'style'],
          attributes: true,
        })
      }
    }

    // 首次挂载在绘制前确定字色,后续定位/背景变化仍按帧合并采样。
    updateBackgroundTone()
    scheduleUpdate()
    resizeObserver?.observe(element)
    resizeObserver?.observe(element.ownerDocument.documentElement)
    mutationObserver?.observe(element.ownerDocument.documentElement, {
      attributeFilter: ['class', 'style'],
      attributes: true,
      childList: true,
      subtree: true,
    })
    ownerWindow.addEventListener('resize', scheduleUpdate, { passive: true })
    scrollParents.forEach((scrollParent) => {
      scrollParent.addEventListener('scroll', scheduleUpdate, scrollListenerOptions)
    })

    return () => {
      if (animationFrame) {
        ownerWindow.cancelAnimationFrame(animationFrame)
      }

      resizeObserver?.disconnect()
      mutationObserver?.disconnect()
      backdropObserver?.disconnect()
      ownerWindow.removeEventListener('resize', scheduleUpdate)
      scrollParents.forEach((scrollParent) => {
        scrollParent.removeEventListener('scroll', scheduleUpdate, scrollListenerOptions)
      })
    }
  }, [element, observe])

  return backgroundSample
}

export function FrostedSurface({
  bordered = true,
  className,
  observe = true,
  style,
  ...props
}: FrostedSurfaceProps) {
  const { backgroundStyle, backgroundTone, setElementRef } =
    useFrostedSurfaceBackgroundToneRef<HTMLDivElement>(observe)

  return (
    <div
      className={getFrostedSurfaceClassName(
        bordered ? 'frosted-surface--bordered' : undefined,
        className,
      )}
      data-background-tone={backgroundTone ?? undefined}
      ref={setElementRef}
      style={{ ...style, ...backgroundStyle }}
      {...props}
    />
  )
}

function getFrostedSurfaceScrollParents(element: HTMLElement) {
  const ownerWindow = element.ownerDocument.defaultView
  const scrollParents: FrostedSurfaceScrollParent[] = ownerWindow ? [ownerWindow] : []
  let current = element.parentElement

  while (current && ownerWindow) {
    const style = ownerWindow.getComputedStyle(current)
    const scrollableOverflow = `${style.overflowY} ${style.overflow}`
    const canScroll = current.scrollHeight > current.clientHeight

    if (canScroll && /\b(auto|scroll|overlay)\b/.test(scrollableOverflow)) {
      scrollParents.push(current)
    }

    current = current.parentElement
  }

  return scrollParents
}

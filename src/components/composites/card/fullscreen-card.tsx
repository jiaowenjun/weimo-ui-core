import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import { Maximize2, Minimize2 } from 'lucide-react'

import { BaseCard, type BaseCardProps } from './base-card'
import { GhostIconButton } from 'weimo-ui-core/components/ghost-icon-button'
import { cn } from 'weimo-ui-core/lib/utils'

import './fullscreen-card.css'

export type FullscreenCardProps = Omit<BaseCardProps, 'title'> & {
  /** 非受控初始态:是否默认全屏。 */
  defaultFullscreen?: boolean
  /** 受控全屏态;与 defaultFullscreen 二选一。 */
  fullscreen?: boolean
  /** 全屏态变化回调(受控与非受控均触发)。 */
  onFullscreenChange?: (fullscreen: boolean) => void
  title?: ReactNode
}

/* 全屏层钉在 body 下并以可视视口(visualViewport)计量尺寸:
   移动端 Safari 的地址栏与软键盘只收缩可视视口、不改变布局视口,
   100vh/dvh 均无法感知键盘,必须逐帧同步 top/height 才能保证
   底部内容(输入区)始终露在键盘上方。无 visualViewport 时回退 CSS dvh。 */
function syncHostToVisualViewport(host: HTMLElement) {
  const viewport = window.visualViewport
  if (!viewport) return undefined

  const sync = () => {
    host.style.top = `${viewport.offsetTop}px`
    host.style.left = `${viewport.offsetLeft}px`
    host.style.width = `${viewport.width}px`
    host.style.height = `${viewport.height}px`
  }

  sync()
  viewport.addEventListener('resize', sync)
  viewport.addEventListener('scroll', sync)
  /* 少数内嵌 WebView 改视口不派发 visualViewport 事件,窗口级事件兜底。 */
  window.addEventListener('resize', sync)
  window.addEventListener('orientationchange', sync)
  return () => {
    viewport.removeEventListener('resize', sync)
    viewport.removeEventListener('scroll', sync)
    window.removeEventListener('resize', sync)
    window.removeEventListener('orientationchange', sync)
  }
}

export function FullscreenCard({
  actionSlot,
  children,
  className,
  defaultFullscreen = false,
  footerSlot,
  fullscreen: fullscreenProp,
  meta,
  metaCollapsible = false,
  onFullscreenChange,
  title,
  ...props
}: FullscreenCardProps) {
  const [internalFullscreen, setInternalFullscreen] = useState(defaultFullscreen)
  const fullscreen = fullscreenProp ?? internalFullscreen
  const [slotElement, setSlotElement] = useState<HTMLDivElement | null>(null)

  /* host 是唯一常驻的 portal 容器:普通模式挂在 slot 内,全屏模式搬到 body。
     切换只移动 DOM 归属,React 子树位置不变,因此内部状态(输入内容、
     展开态、焦点等)在进出全屏时不丢失。 */
  const [host] = useState<HTMLElement | null>(() =>
    typeof document === 'undefined' ? null : document.createElement('div'),
  )

  /* Escape 处理器常驻 effect,经 ref 读取每次渲染的最新受控/非受控逻辑。 */
  const requestFullscreenChangeRef = useRef<(next: boolean) => void>(() => {})
  requestFullscreenChangeRef.current = (next: boolean) => {
    if (fullscreenProp === undefined) setInternalFullscreen(next)
    onFullscreenChange?.(next)
  }

  const requestFullscreenChange = useCallback((next: boolean) => {
    requestFullscreenChangeRef.current(next)
  }, [])

  useLayoutEffect(() => {
    if (!host || !slotElement) return

    if (!fullscreen) {
      host.className = 'fullscreen-card__host'
      host.removeAttribute('style')
      slotElement.appendChild(host)
      return
    }

    host.className = 'fullscreen-card__host fullscreen-card__host--fullscreen'
    document.body.appendChild(host)

    const stopViewportSync = syncHostToVisualViewport(host)

    /* 全屏期间锁住页面滚动,防止触摸穿透带动背景(避免地址栏收放抖动)。 */
    const { documentElement, body } = document
    const previousHtmlOverflow = documentElement.style.overflow
    const previousBodyOverflow = body.style.overflow
    documentElement.style.overflow = 'hidden'
    body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return
      requestFullscreenChange(false)
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      stopViewportSync?.()
      document.removeEventListener('keydown', handleKeyDown)
      documentElement.style.overflow = previousHtmlOverflow
      body.style.overflow = previousBodyOverflow
      host.remove()
    }
  }, [fullscreen, host, slotElement, requestFullscreenChange])

  /* 无标题卡片普通模式下不渲染标题栏(无内建切换按钮),只能受控驱动;
     全屏时强制渲染标题栏,保证始终有退出按钮(移动端没有 Escape)。 */
  const headerTitle = title !== undefined ? title : fullscreen ? '' : undefined

  const card = (
    <BaseCard
      actionSlot={
        headerTitle === undefined ? (
          actionSlot
        ) : (
          <>
            {actionSlot}
            <GhostIconButton
              aria-expanded={fullscreen}
              aria-label={fullscreen ? '退出全屏' : '进入全屏'}
              className="fullscreen-card__toggle"
              onClick={() => requestFullscreenChange(!fullscreen)}
              size="sm"
            >
              {fullscreen ? (
                <Minimize2 aria-hidden="true" />
              ) : (
                <Maximize2 aria-hidden="true" />
              )}
            </GhostIconButton>
          </>
        )
      }
      className={cn('fullscreen-card', className)}
      data-fullscreen={fullscreen ? 'true' : 'false'}
      footerSlot={footerSlot}
      meta={meta}
      metaCollapsible={metaCollapsible}
      title={headerTitle}
      {...props}
    >
      {children}
    </BaseCard>
  )

  if (!host) {
    /* 无 DOM 环境降级为普通卡片,不具备全屏能力。 */
    return card
  }

  return (
    <>
      <div className="fullscreen-card__slot" ref={setSlotElement} />
      {createPortal(card, host)}
    </>
  )
}

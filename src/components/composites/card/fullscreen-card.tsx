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

/* ===== 容器扩展转场(Container Transform)=====
   卡片在视觉上从原位几何延展为近全屏浮层,退出时回位到原卡片处。
   全屏态保留卡片外壳(圆角/描边/阴影),观感全程不变,转场只动几何:
   1. 首帧(绘制前,preparing):host 移入 body 并以内联样式钉在源矩形
      (内联 padding:0 抵消全屏边距,卡片与源卡片逐像素重合),遮罩透明;
   2. 播放(animating):撤掉首帧内联、写入目标盒(可视视口),
      CSS transition 接管 top/left/width/height 与 padding —— host
      边距由 0 过渡到全屏边距,卡片外壳悬浮于遮罩之上;
   3. 落位:定时器摘除 animating,此后 visualViewport 同步即时生效
      (键盘弹起不被 340ms 过渡拖慢)。
   退出反向:全屏期间 slot 以占位盒保持列表稳定("原列表稳定"),
   退出时实测占位盒作为回位目标(自动吸收滚动与列表变化)。 */

const MORPH_DURATION_MS = 340
const MORPH_SETTLE_DELAY_MS = 80

type MorphPhase = 'idle' | 'entering' | 'settled' | 'exiting'

type Box = { top: number; left: number; width: number; height: number }

/* 全屏层几何以可视视口(visualViewport)计量:
   移动端 Safari 的地址栏与软键盘只收缩可视视口、不改变布局视口,
   100vh/dvh 均无法感知键盘。无 visualViewport 时回退窗口内尺寸。 */
function getViewportBox(): Box {
  const viewport = window.visualViewport
  if (viewport) {
    return {
      top: viewport.offsetTop,
      left: viewport.offsetLeft,
      width: viewport.width,
      height: viewport.height,
    }
  }
  return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
}

function applyBox(host: HTMLElement, box: Box) {
  host.style.top = `${box.top}px`
  host.style.left = `${box.left}px`
  host.style.width = `${box.width}px`
  host.style.height = `${box.height}px`
}

function getCardElement(host: HTMLElement) {
  return host.querySelector<HTMLElement>(':scope > .fullscreen-card')
}

function getBackdropElement(host: HTMLElement) {
  return host.querySelector<HTMLElement>(':scope > .fullscreen-card__backdrop')
}

function ensureBackdrop(host: HTMLElement) {
  let backdrop = getBackdropElement(host)
  if (!backdrop) {
    backdrop = document.createElement('div')
    backdrop.className = 'fullscreen-card__backdrop'
    host.appendChild(backdrop)
  }
  return backdrop
}

function observeVisualViewport(host: HTMLElement) {
  const sync = () => applyBox(host, getViewportBox())
  const viewport = window.visualViewport
  /* 少数内嵌 WebView 改视口不派发 visualViewport 事件,窗口级事件兜底。 */
  window.addEventListener('resize', sync)
  window.addEventListener('orientationchange', sync)
  viewport?.addEventListener('resize', sync)
  viewport?.addEventListener('scroll', sync)
  return {
    sync,
    detach: () => {
      window.removeEventListener('resize', sync)
      window.removeEventListener('orientationchange', sync)
      viewport?.removeEventListener('resize', sync)
      viewport?.removeEventListener('scroll', sync)
    },
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
     展开态、焦点等)在进出全屏与转场期间不丢失。 */
  const [host] = useState<HTMLElement | null>(() =>
    typeof document === 'undefined' ? null : document.createElement('div'),
  )

  const phaseRef = useRef<MorphPhase>('idle')
  const morphTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const teardownRef = useRef<() => void>(() => {})

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
      /* 退出转场进行中由 completeExit 收尾,这里不得抢先把 host 拉回 slot。 */
      if (phaseRef.current === 'exiting') return
      host.className = 'fullscreen-card__host'
      host.removeAttribute('style')
      slotElement.appendChild(host)
      return
    }

    const card = getCardElement(host)
    if (!card) return

    const clearMorphTimer = () => {
      if (morphTimerRef.current !== undefined) clearTimeout(morphTimerRef.current)
      morphTimerRef.current = undefined
    }

    const completeExit = () => {
      clearMorphTimer()
      teardownRef.current()
      teardownRef.current = () => {}
      host.className = 'fullscreen-card__host'
      host.removeAttribute('style')
      getBackdropElement(host)?.style.removeProperty('opacity')
      slotElement.classList.remove('fullscreen-card__slot--placeholder')
      slotElement.style.removeProperty('min-height')
      slotElement.appendChild(host)
      phaseRef.current = 'idle'
    }

    /* 快速切回(退出转场未完)时先瞬时回位,再重新展开。 */
    clearMorphTimer()
    if (phaseRef.current === 'exiting') completeExit()

    /* 1. 源矩形:此时卡片仍在 slot 的文档流内。 */
    const sourceRect = card.getBoundingClientRect()
    /* 2. slot 占位:列表保持稳定,并为退出转场提供可测的回位目标。 */
    slotElement.classList.add('fullscreen-card__slot--placeholder')
    slotElement.style.minHeight = `${sourceRect.height}px`

    const backdrop = ensureBackdrop(host)

    /* 3. 首帧:host 移入 body 并钉在源矩形;内联 padding:0 抵消全屏边距,
       卡片与源卡片逐像素重合(外壳观感全程不变)。 */
    host.className =
      'fullscreen-card__host fullscreen-card__host--fullscreen fullscreen-card__host--preparing'
    document.body.appendChild(host)
    applyBox(host, {
      top: sourceRect.top,
      left: sourceRect.left,
      width: sourceRect.width,
      height: sourceRect.height,
    })
    host.style.padding = '0'
    backdrop.style.opacity = '0'

    /* 全屏期间锁页面滚动(防触摸穿透带动背景)、Escape 退出、视口同步。 */
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
    const viewportObserver = observeVisualViewport(host)
    teardownRef.current = () => {
      viewportObserver.detach()
      document.removeEventListener('keydown', handleKeyDown)
      documentElement.style.overflow = previousHtmlOverflow
      body.style.overflow = previousBodyOverflow
    }

    /* 4. 播放:先强制样式落盘,再撤首帧样式写入目标盒,交给过渡。 */
    host.getBoundingClientRect()
    host.classList.remove('fullscreen-card__host--preparing')
    host.classList.add('fullscreen-card__host--animating')
    host.style.removeProperty('padding')
    backdrop.style.removeProperty('opacity')
    viewportObserver.sync()
    phaseRef.current = 'entering'
    morphTimerRef.current = setTimeout(() => {
      host.classList.remove(
        'fullscreen-card__host--animating',
        'fullscreen-card__host--animating-exit',
      )
      phaseRef.current = 'settled'
    }, MORPH_DURATION_MS + MORPH_SETTLE_DELAY_MS)

    /* 5. 退出:反向回位;展开未完成时瞬时收尾(快速连点/StrictMode)。 */
    return () => {
      if (phaseRef.current === 'entering' || !card.isConnected) {
        completeExit()
        return
      }
      if (phaseRef.current !== 'settled') return

      const slotRect = slotElement.getBoundingClientRect()
      host.classList.add(
        'fullscreen-card__host--animating',
        'fullscreen-card__host--animating-exit',
      )
      applyBox(host, {
        top: slotRect.top,
        left: slotRect.left,
        width: slotRect.width,
        height: slotRect.height,
      })
      host.style.padding = '0'
      backdrop.style.opacity = '0'
      phaseRef.current = 'exiting'
      morphTimerRef.current = setTimeout(
        completeExit,
        MORPH_DURATION_MS + MORPH_SETTLE_DELAY_MS,
      )
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

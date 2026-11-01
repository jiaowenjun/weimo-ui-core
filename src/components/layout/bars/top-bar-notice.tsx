import { useEffect, useRef, useState } from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import {
  getFrostedSurfaceClassName,
  useFrostedSurfaceBackgroundToneRef,
} from 'weimo-ui-core/components/frosted-surface'
import { cn } from 'weimo-ui-core/lib/utils'

import 'weimo-ui-core/styles/tokens.css'
import 'weimo-ui-core/styles/frosted-surface.css'
import './top-bar-notice.css'

export type TopBarNoticeProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  /**
   * 通知内容(文字或图标+文字);置空(null/undefined/空串)即收起。
   * 建议常驻传入本组件(内容置空而非卸载组件),退场动画才能播完。
   */
  children?: ReactNode
  /**
   * 自动收起延时(毫秒):显示期间到点回调一次 onDismissed,由外部清空
   * children 完成收起;省略则不自动收起。内容变更会重置计时。
   */
  duration?: number
  /** duration 到点的回调;配自动收起使用,外部在此清空通知内容。 */
  onDismissed?: () => void
}

function hasNoticeContent(children: ReactNode) {
  return children !== null
    && children !== undefined
    && children !== true
    && children !== false
    && children !== ''
}

/**
 * 灵动岛式顶部通知胶囊:常驻 DOM、data-visible 驱动进出场(弹入/收拢
 * 过渡),磨砂材质随画布 tone 自适应;role="status" 让读屏自动播报。
 * 与 TopBar 的 centerSlot 配套使用。
 */
export function TopBarNotice({
  children,
  className,
  duration,
  onDismissed,
  style,
  ...props
}: TopBarNoticeProps) {
  const visible = hasNoticeContent(children)

  // 退场保留:children 清空后沿上一次非空内容播完退场动画再腾空
  const [retainedChildren, setRetainedChildren] = useState(children)
  if (visible && children !== retainedChildren) {
    setRetainedChildren(children)
  }

  // onDismissed 走 latest ref:回调内联箭头每次渲染换引用,不应重置计时
  const onDismissedRef = useRef(onDismissed)
  useEffect(() => {
    onDismissedRef.current = onDismissed
  })

  useEffect(() => {
    if (!duration || !visible) return

    const timer = setTimeout(() => onDismissedRef.current?.(), duration)

    return () => clearTimeout(timer)
  }, [duration, visible, children])

  const { backgroundStyle, backgroundTone, setElementRef } =
    useFrostedSurfaceBackgroundToneRef<HTMLDivElement>(true)

  return (
    <div
      className={cn(
        getFrostedSurfaceClassName('frosted-surface--bordered', 'top-bar-notice'),
        className,
      )}
      data-background-tone={backgroundTone ?? undefined}
      data-visible={visible}
      ref={setElementRef}
      role="status"
      style={{ ...style, ...backgroundStyle }}
      {...props}
    >
      {visible ? children : retainedChildren}
    </div>
  )
}

export type TopBarNoticeRingProps = {
  /** 进度百分比 0-100,驱动绿色进度弧;90ms 线性过渡抹平轮询/节拍回填
   *  时的进度跳变,只求不闪跳,弧的读感与文案数字同拍 */
  progress: number
  /** 完成态:满环内侧描出绿色对勾(线绘制动画,环到对勾一笔相承)再
   *  轻微弹性 pop;默认 progress >= 100。进度来源可能先于任务真终态
   *  报满(如后端 percent 到 100 但任务未结束),此时显式传 false 压住
   *  对勾,等真完成再翻转 */
  done?: boolean
}

/** 进度环几何:16 视框、r=6,周长两位小数参与 dasharray/dashoffset */
const RING_CIRCUMFERENCE = 2 * Math.PI * 6

/**
 * 灵动岛通知的环形进度:灰底环 + 绿色进度弧,作 TopBarNotice 的
 * children 使用(文字之后缀,胶囊自带 6px 间距)。纯装饰——播报归
 * 胶囊的 role="status" 文字,aria-hidden 对读屏静音。
 */
export function TopBarNoticeRing({ done, progress }: TopBarNoticeRingProps) {
  const isDone = done ?? progress >= 100
  const dashOffset =
    Math.round(RING_CIRCUMFERENCE * (1 - progress / 100) * 100) / 100

  return (
    <svg
      aria-hidden="true"
      className="top-bar-notice-ring"
      data-done={isDone}
      viewBox="0 0 16 16"
    >
      <circle
        className="top-bar-notice-ring-track"
        cx="8"
        cy="8"
        fill="none"
        r="6"
        strokeWidth="2.5"
      />
      <circle
        className="top-bar-notice-ring-arc"
        cx="8"
        cy="8"
        fill="none"
        r="6"
        strokeDasharray={Math.round(RING_CIRCUMFERENCE * 100) / 100}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        strokeWidth="2.5"
        transform="rotate(-90 8 8)"
      />
      {isDone && (
        <path
          className="top-bar-notice-ring-check"
          d="M5 8.6 L7 10.6 L11 5.4"
          fill="none"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={0}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />
      )}
    </svg>
  )
}

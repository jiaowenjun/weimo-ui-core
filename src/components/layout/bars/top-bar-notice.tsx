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

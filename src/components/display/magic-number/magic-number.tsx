import { useEffect, useRef, useState } from 'react'
import type { HTMLAttributes } from 'react'

import { cn } from 'weimo-ui-core/lib/utils'

import {
  formatMagicNumber,
  getMagicNumberProgress,
  getMagicNumberTweenValue,
  magicNumberEaseOut,
  type MagicNumberEasing,
} from './magic-number-model'

import 'weimo-ui-core/styles/tokens.css'
import './magic-number.css'

export type MagicNumberFormat = (value: number) => string

export type MagicNumberProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  value: number
  /** 滚动时长(毫秒),0 为瞬时跳变;默认 600。 */
  duration?: number
  /** 缓动函数,入参与返回均为 0~1 进度;默认 easeOutCubic。 */
  easing?: MagicNumberEasing
  /** 展示格式化,默认四舍五入取整;千分位/小数场景传入自定义实现。 */
  format?: MagicNumberFormat
  /** 挂载时是否从 0 滚动到 value(统计大数字的进场效果);默认直接显示。 */
  animateOnMount?: boolean
}

const DEFAULT_MAGIC_NUMBER_DURATION = 600

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

// 数字滚动:value 变动时从当前显示值逐帧滚到新值(升/降同构,rAF 驱动),
// 中途再次变动会从当前帧值重新起滚(流式刷新不断帧)。排版零主见——行内
// span 继承宿主字号/字重/颜色,tabular 数字保证滚动中位宽稳定,统计大数字
// (stats)与列表行计数(tagtree)共用同一组件;prefers-reduced-motion 下
// 跳过动画直接落值。duration/easing/format 经 latest ref 读取而非 effect
// 依赖,父组件每次渲染换内联函数身份不会重置滚动时间线。
export function MagicNumber({
  value,
  duration = DEFAULT_MAGIC_NUMBER_DURATION,
  easing = magicNumberEaseOut,
  format = formatMagicNumber,
  animateOnMount = false,
  className,
  ...props
}: MagicNumberProps) {
  const [displayValue, setDisplayValue] = useState(() =>
    animateOnMount ? 0 : value,
  )
  const displayedValueRef = useRef(displayValue)
  const optionsRef = useRef({ duration, easing })
  optionsRef.current = { duration, easing }
  const frameRef = useRef(0)

  useEffect(() => {
    const from = displayedValueRef.current
    const { duration, easing } = optionsRef.current

    if (from === value || !Number.isFinite(value) || prefersReducedMotion()) {
      displayedValueRef.current = value
      setDisplayValue(value)
      return
    }

    const startedAt = performance.now()
    const roll = (now: number) => {
      const easedProgress = easing(getMagicNumberProgress(now - startedAt, duration))
      const tweened = getMagicNumberTweenValue(from, value, easedProgress)
      displayedValueRef.current = tweened
      setDisplayValue(tweened)

      if (now - startedAt < duration) {
        frameRef.current = requestAnimationFrame(roll)
        return
      }
      // 收尾钉住目标值,消除缓动与浮点运算的残差
      displayedValueRef.current = value
      setDisplayValue(value)
    }
    frameRef.current = requestAnimationFrame(roll)

    return () => cancelAnimationFrame(frameRef.current)
  }, [value])

  return (
    <span className={cn('magic-number', className)} {...props}>
      {format(displayValue)}
    </span>
  )
}

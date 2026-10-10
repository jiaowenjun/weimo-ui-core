import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'

import { FloatBar } from './float-bar'
import { cn } from 'weimo-ui-core/lib/utils'

import './bottom-bar.css'

export type BottomBarProps = ComponentPropsWithoutRef<'div'> & {
  /* 公开定制钩子,转发给内部 FloatBar(center 槽被 BottomBar 隐藏,不设)。 */
  frameClassName?: string
  leftSlot?: ReactNode
  leftSlotClassName?: string
  rightSlot?: ReactNode
  rightSlotClassName?: string
}

export const BottomBar = forwardRef<HTMLDivElement, BottomBarProps>(function BottomBar(
  {
    className,
    frameClassName,
    leftSlot,
    leftSlotClassName,
    rightSlot,
    rightSlotClassName,
    ...props
  },
  ref,
) {
  return (
    <FloatBar
      {...props}
      ref={ref}
      className={cn('bottom-bar', className)}
      frameClassName={frameClassName}
      leftSlot={leftSlot}
      leftSlotClassName={leftSlotClassName}
      rightSlot={rightSlot}
      rightSlotClassName={rightSlotClassName}
    />
  )
})

BottomBar.displayName = 'BottomBar'

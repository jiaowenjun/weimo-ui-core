import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'

import { cn } from 'weimo-ui-core/lib/utils'

import './float-bar.css'

export type FloatBarProps = ComponentPropsWithoutRef<'div'> & {
  centerSlot?: ReactNode
  /* frame 与三槽的公开定制钩子:消费方样式只允许落在这类自有类名上,
     不得选择 .float-bar__* 内部结构类。 */
  centerSlotClassName?: string
  frameClassName?: string
  leftSlot?: ReactNode
  leftSlotClassName?: string
  rightSlot?: ReactNode
  rightSlotClassName?: string
}

export const FloatBar = forwardRef<HTMLDivElement, FloatBarProps>(function FloatBar(
  {
    centerSlot,
    centerSlotClassName,
    className,
    frameClassName,
    leftSlot,
    leftSlotClassName,
    role,
    rightSlot,
    rightSlotClassName,
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      role={role ?? 'toolbar'}
      {...props}
      className={cn('float-bar', className)}
    >
      <div className={cn('float-bar__frame', frameClassName)}>
        <div className={cn('float-bar__slot float-bar__slot--left', leftSlotClassName)}>
          {leftSlot}
        </div>
        <div className={cn('float-bar__slot float-bar__slot--center', centerSlotClassName)}>
          {centerSlot}
        </div>
        <div className={cn('float-bar__slot float-bar__slot--right', rightSlotClassName)}>
          {rightSlot}
        </div>
      </div>
    </div>
  )
})

FloatBar.displayName = 'FloatBar'

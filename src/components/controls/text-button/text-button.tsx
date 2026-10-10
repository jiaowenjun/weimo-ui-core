import { forwardRef, type ComponentPropsWithoutRef } from 'react'

import { cn } from 'weimo-ui-core/lib/utils'

import './text-button.css'

export type TextButtonVariant = 'default' | 'ghost'

export type TextButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: TextButtonVariant
}

export const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(function TextButton(
  {
    className,
    type = 'button',
    variant = 'default',
    ...props
  },
  ref,
) {
  // 变体走 data 属性而非修饰类:cn() 的 twMerge 会把 text-button 与任何
  // text-* 类判为同组工具类而丢弃前者(基类样式整体失效)。
  return (
    <button
      {...props}
      className={cn('text-button', className)}
      data-variant={variant === 'default' ? undefined : variant}
      ref={ref}
      type={type}
    />
  )
})

TextButton.displayName = 'TextButton'

import { forwardRef, useCallback } from 'react'
import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react'

import {
  getFrostedSurfaceClassName,
  useFrostedSurfaceBackgroundToneRef,
} from 'weimo-ui-core/components/frosted-surface'
import { withIconButtonTooltip } from './icon-button-tooltip'
import { getIconButtonClassName, type IconButtonSize } from './icon-button-model'
import { cn } from 'weimo-ui-core/lib/utils'

import './frosted-icon-button-group.css'

export type FrostedIconButtonGroupProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  children: ReactNode
  bordered?: boolean
}

export const FrostedIconButtonGroup = forwardRef<HTMLDivElement, FrostedIconButtonGroupProps>(function FrostedIconButtonGroup(
  {
    bordered = true,
    children,
    className,
    role,
    style,
    ...props
  },
  ref,
) {
  const {
    backgroundStyle,
    backgroundTone,
    setElementRef: setFrostedSurfaceElementRef,
  } = useFrostedSurfaceBackgroundToneRef<HTMLDivElement>(true)
  const setElementRef = useCallback((element: HTMLDivElement | null) => {
    setFrostedSurfaceElementRef(element)
    assignGroupRef(ref, element)
  }, [ref, setFrostedSurfaceElementRef])

  return (
    <div
      {...props}
      role={role ?? 'group'}
      className={getFrostedSurfaceClassName(
        'frosted-icon-button-group',
        bordered ? 'frosted-surface--bordered' : undefined,
        className,
      )}
      data-background-tone={backgroundTone ?? undefined}
      ref={setElementRef}
      style={{ ...style, ...backgroundStyle }}
    >
      {children}
    </div>
  )
})

FrostedIconButtonGroup.displayName = 'FrostedIconButtonGroup'

export type FrostedIconGroupButtonProps = ComponentPropsWithoutRef<'button'> & {
  size?: IconButtonSize
  /** 悬停/聚焦提示：传入后按钮原地接入 Tooltip 原语，不新增 DOM 节点。 */
  tooltip?: ReactNode
}

export const FrostedIconGroupButton = forwardRef<HTMLButtonElement, FrostedIconGroupButtonProps>(function FrostedIconGroupButton(
  {
    className,
    size,
    tooltip,
    type = 'button',
    ...props
  },
  ref,
) {
  return withIconButtonTooltip(
    <button
      {...props}
      className={cn(getIconButtonClassName('glass', size), className)}
      ref={ref}
      type={type}
    />,
    tooltip,
  )
})

FrostedIconGroupButton.displayName = 'FrostedIconGroupButton'

function assignGroupRef(
  ref: Ref<HTMLDivElement> | undefined,
  element: HTMLDivElement | null,
) {
  if (!ref) return

  if (typeof ref === 'function') {
    ref(element)
    return
  }

  ref.current = element
}

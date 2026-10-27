import { forwardRef, useCallback } from 'react'
import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react'

import {
  getFrostedSurfaceClassName,
  useFrostedSurfaceBackgroundToneRef,
} from 'weimo-ui-core/components/frosted-surface'
import { withIconButtonTooltip } from './icon-button-tooltip'
import { getIconButtonClassName, type IconButtonSize } from './icon-button-model'

import 'weimo-ui-core/styles/frosted-surface.css'
import './icon-button.css'

export type FrostedIconButtonProps = ComponentPropsWithoutRef<'button'> & {
  size?: IconButtonSize
  bordered?: boolean
  /** 悬停/聚焦提示：传入后按钮原地接入 Tooltip 原语，不新增 DOM 节点。 */
  tooltip?: ReactNode
}

export const FrostedIconButton = forwardRef<HTMLButtonElement, FrostedIconButtonProps>(function FrostedIconButton(
  {
    bordered = true,
    className,
    size,
    style,
    tooltip,
    type = 'button',
    ...props
  },
  ref,
) {
  const {
    backgroundStyle,
    backgroundTone,
    setElementRef: setFrostedSurfaceElementRef,
  } = useFrostedSurfaceBackgroundToneRef<HTMLButtonElement>(true)
  const setElementRef = useCallback((element: HTMLButtonElement | null) => {
    setFrostedSurfaceElementRef(element)
    assignButtonRef(ref, element)
  }, [ref, setFrostedSurfaceElementRef])

  return withIconButtonTooltip(
    <button
      {...props}
      className={getFrostedSurfaceClassName(
        getIconButtonClassName('glass', size),
        bordered ? 'frosted-surface--bordered' : undefined,
        className,
      )}
      data-background-tone={backgroundTone ?? undefined}
      ref={setElementRef}
      style={{ ...style, ...backgroundStyle }}
      type={type}
    />,
    tooltip,
  )
})

FrostedIconButton.displayName = 'FrostedIconButton'

function assignButtonRef(
  ref: Ref<HTMLButtonElement> | undefined,
  element: HTMLButtonElement | null,
) {
  if (!ref) return

  if (typeof ref === 'function') {
    ref(element)
    return
  }

  ref.current = element
}

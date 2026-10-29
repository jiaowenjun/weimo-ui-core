import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'

import { withIconButtonTooltip } from './icon-button-tooltip'
import { getIconButtonClassName, type IconButtonSize } from './icon-button-model'
import { cn } from 'weimo-ui-core/lib/utils'

import 'weimo-ui-core/styles/tokens.css'
import './icon-button.css'

export type GhostIconButtonProps = ComponentPropsWithoutRef<'button'> & {
  /** 选中态（toggle 语义）：渲染 aria-pressed 与 data-active 样式钩子。 */
  active?: boolean
  size?: IconButtonSize
  /** 悬停/聚焦提示：传入后按钮原地接入 Tooltip 原语，不新增 DOM 节点。 */
  tooltip?: ReactNode
}

export const GhostIconButton = forwardRef<HTMLButtonElement, GhostIconButtonProps>(function GhostIconButton(
  {
    active,
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
      aria-pressed={active}
      className={cn(getIconButtonClassName('ghost', size), className)}
      data-active={active === undefined ? undefined : active ? 'true' : 'false'}
      ref={ref}
      type={type}
    />,
    tooltip,
  )
})

GhostIconButton.displayName = 'GhostIconButton'

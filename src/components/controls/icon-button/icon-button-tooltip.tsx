import type { ReactElement, ReactNode } from 'react'

import { Tooltip, TooltipPopup, TooltipTrigger } from 'weimo-ui-core/components/coss/tooltip'

/**
 * icon-button 家族的 tooltip 接线：tooltip 缺省时按钮原样返回，
 * 传入后经 Base UI render 合并把按钮自身升级为 tooltip 触发器——
 * 不新增 DOM 节点，ref 与 className 均由 useRenderElement 合并。
 * 注意 Base UI 1.9 的 Tooltip 不设 aria-describedby，语义提示仍以
 * 按钮自身的 aria-label 为准。
 */
export function withIconButtonTooltip(button: ReactElement, tooltip: ReactNode) {
  if (tooltip === undefined) return button

  return (
    <Tooltip>
      <TooltipTrigger render={button} />
      <TooltipPopup>{tooltip}</TooltipPopup>
    </Tooltip>
  )
}

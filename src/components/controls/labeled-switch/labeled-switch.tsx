import type { ReactNode } from 'react'

import { Switch } from 'weimo-ui-core/components/coss/switch'

import './labeled-switch.css'

// 带状态标签的开关：可见文案随选中态在 labelOn/labelOff 之间切换，叠在
// coss Switch 之上，文档页标题栏的启用/编辑态等状态切换共用。
export function LabeledSwitch({
  ariaLabel,
  checked,
  labelOff,
  labelOn,
  onCheckedChange,
}: {
  ariaLabel: string
  checked: boolean
  labelOff: ReactNode
  labelOn: ReactNode
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <span className="labeled-switch">
      <span className="labeled-switch__label">{checked ? labelOn : labelOff}</span>
      <Switch
        aria-label={ariaLabel}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </span>
  )
}

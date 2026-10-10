import { useState } from 'react'

import { bgColorToneMap } from 'weimo-ui-core/components/bg-color'
import { borderColorToneMap } from 'weimo-ui-core/components/border-color'
import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import { LabeledSwitch } from 'weimo-ui-core/components/labeled-switch'
import type { ComponentDefinition } from '../../component-docs'

// coss Switch 专属背景 token（定义在 switch.css 的 .coss-switch 内部，仅开关子树可用）：
// 未选中轨道/选中轨道/滑块各一枚，值别名共享色板，展示行按亮暗主题给出解析后的色值。
const switchItems = [
  {
    token: '--switch-track-bg',
    value: borderColorToneMap.default.value.light,
    darkValue: borderColorToneMap.default.value.dark,
  },
  {
    // 选中轨道 = color-mix(in srgb, --color-bg-primary, --color-bg-card 15%)
    // 的解析值（27.75%/83.4%），按整数展示
    token: '--switch-track-checked-bg',
    value: 'hsl(0 0% 28%)',
    darkValue: 'hsl(0 0% 83%)',
  },
  {
    token: '--switch-thumb-bg',
    value: bgColorToneMap.page.value.light,
    darkValue: bgColorToneMap.page.value.dark,
  },
]

// Docs definitions intentionally colocate preview components with exported page metadata.
function LabeledSwitchDemo() {
  const [enabled, setEnabled] = useState(true)

  return (
    <ComponentPreviewCard align="center" items={switchItems} label="开关">
      <div aria-label="LabeledSwitch 状态预览">
        <LabeledSwitch
          ariaLabel="启用"
          checked={enabled}
          labelOff="已禁用"
          labelOn="已启用"
          onCheckedChange={setEnabled}
        />
      </div>
    </ComponentPreviewCard>
  )
}

export const labeledSwitchDefinition = {
  id: 'labeled-switch',
  summary: '开/关状态文案随选中态切换的 coss Switch 标题栏开关',
  status: 'Ready',
  frame: 'plain',
  searchAliases: ['LabeledSwitch', 'Switch', '开关', '切换'],
  preview: () => <LabeledSwitchDemo />,
} satisfies ComponentDefinition

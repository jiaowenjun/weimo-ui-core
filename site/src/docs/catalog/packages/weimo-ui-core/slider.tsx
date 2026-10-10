import { useState } from 'react'
import { RotateCcw } from 'lucide-react'

import { borderColorToneMap } from 'weimo-ui-core/components/border-color'
import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import { GhostIconButton } from 'weimo-ui-core/components/ghost-icon-button'
import { Slider } from 'weimo-ui-core/components/slider'
import type { ComponentDefinition } from '../../component-docs'

const SLIDER_INITIAL_VALUE = 50

// Slider 专属背景 token（定义在 slider.css 的 .slider 内部，仅滑块子树可用）：
// 未填充轨道/填充指示条/滑块各一枚，值别名共享色板，展示行按亮暗主题给出解析后的色值。
// 指示条与滑块 = color-mix(in srgb, --color-bg-primary, --color-bg-card 15%)
// 的解析值（27.75%/83.4%），按整数展示。
const sliderItems = [
  {
    token: '--slider-track-bg',
    value: borderColorToneMap.default.value.light,
    darkValue: borderColorToneMap.default.value.dark,
  },
  {
    token: '--slider-indicator-bg',
    value: 'hsl(0 0% 28%)',
    darkValue: 'hsl(0 0% 83%)',
  },
  {
    token: '--slider-thumb-bg',
    value: 'hsl(0 0% 28%)',
    darkValue: 'hsl(0 0% 83%)',
  },
]

// Docs definitions intentionally colocate preview components with exported page metadata.
function SliderDemo() {
  const [value, setValue] = useState(SLIDER_INITIAL_VALUE)

  return (
    <ComponentPreviewCard
      action={
        <GhostIconButton
          aria-label="复位滑块"
          onClick={() => setValue(SLIDER_INITIAL_VALUE)}
          size="sm"
        >
          <RotateCcw aria-hidden="true" />
        </GhostIconButton>
      }
      items={sliderItems}
      label="滑块"
    >
      <div className="slider-preview" aria-label="Slider 滑块预览">
        <Slider
          ariaLabel="数值"
          max={100}
          min={0}
          onValueChange={setValue}
          value={value}
        />
        <span aria-hidden="true" className="slider-preview__value">
          {value}
        </span>
      </div>
    </ComponentPreviewCard>
  )
}

export const sliderDefinition = {
  id: 'slider',
  summary: '透明原生 range 交互层 + 单一 --fill 驱动自绘轨道的受控滑块',
  status: 'Ready',
  frame: 'plain',
  searchAliases: ['Slider', 'range'],
  preview: () => <SliderDemo />,
} satisfies ComponentDefinition

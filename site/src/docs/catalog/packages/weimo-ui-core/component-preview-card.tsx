import { useState } from 'react'

import { bgColorToneMap } from 'weimo-ui-core/components/bg-color'
import { borderRadiusScaleMap } from 'weimo-ui-core/components/border-radius'
import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import { FrostedSurface } from 'weimo-ui-core/components/frosted-surface'
import { LabeledSwitch } from 'weimo-ui-core/components/labeled-switch'
import { TextButton } from 'weimo-ui-core/components/text-button'
import type { ComponentDefinition } from '../../component-docs'
import { GlassPreviewCard } from 'weimo-ui-core/components/glass-preview-card'

// 示例 token 行直接取真实 token 表（通用 hover 底色 + 基础圆角）。
const previewCardItems = [
  {
    token: bgColorToneMap.hover.token,
    value: bgColorToneMap.hover.value.light,
    darkValue: bgColorToneMap.hover.value.dark,
  },
  {
    token: borderRadiusScaleMap.base.token,
    value: borderRadiusScaleMap.base.value,
  },
]

// Docs definitions intentionally colocate preview components with exported page metadata.
function PreviewCardDemo() {
  const [debugBorder, setDebugBorder] = useState(false)
  const debugClassName = `base-card-debug${debugBorder ? '' : ' base-card-debug--hidden'}`

  return (
    <>
      <ComponentPreviewCard
        align="center"
        className={debugClassName}
        items={previewCardItems}
        label="组件预览卡"
      >
        <TextButton>内容区示例</TextButton>
      </ComponentPreviewCard>
      <GlassPreviewCard className={debugClassName} label="磨砂预览卡">
        <FrostedSurface className="frosted-surface-preview__tile">
          <span className="frosted-surface-preview__title">Glass Preview</span>
          <span className="frosted-surface-preview__meta">拖动灰度滑块验证磨砂材质</span>
        </FrostedSurface>
      </GlassPreviewCard>
      <div className="docs-debug-toggle">
        <LabeledSwitch
          ariaLabel="切换 DEBUG 边框显示"
          checked={debugBorder}
          labelOff="已隐藏 DEBUG 边框"
          labelOn="已显示 DEBUG 边框"
          onCheckedChange={setDebugBorder}
        />
      </div>
    </>
  )
}

export const componentPreviewCardDefinition = {
  id: 'component-preview-card',
  summary: '文档站预览卡外壳：标题栏 + 可选 token 行 + 内容画布；磨砂变体自带灰度滑块画布',
  status: 'Preview',
  frame: 'plain',
  searchAliases: [
    'ComponentPreviewCard',
    'GlassPreviewCard',
    'TokenPreviewCard',
    '预览卡',
  ],
  preview: () => <PreviewCardDemo />,
} satisfies ComponentDefinition

import { useLayoutEffect, useRef, useState } from 'react'
import { Hash, X } from 'lucide-react'

import { CapsuleButton } from 'weimo-ui-core/components/capsule-button'
import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import { LabeledSwitch } from 'weimo-ui-core/components/labeled-switch'
import type { ComponentDefinition } from '../../component-docs'
import { GlassPreviewCard } from 'weimo-ui-core/components/glass-preview-card'

// 胶囊材质:普通(default 态)、磨砂(frosted 态)两例并列于灰度画布,拖动滑块
// 可对比两种材质随背景的表现,磨砂文字色随自身 tone 采样自适应。
function CapsuleMaterialDemo() {
  return (
    <GlassPreviewCard label="胶囊材质">
      <div aria-label="胶囊材质预览" className="capsule-material-row">
        <CapsuleButton prefix={null} state="default">普通胶囊</CapsuleButton>
        <CapsuleButton prefix={null} state="frosted">磨砂胶囊</CapsuleButton>
      </div>
    </GlassPreviewCard>
  )
}

function CapsuleSlotDemo() {
  return (
    <ComponentPreviewCard align="center" label="胶囊插槽">
      <div className="capsule-slot-preview" aria-label="CapsuleButton 前后缀预览">
        <CapsuleButton prefix={<Hash aria-hidden="true" />}>写作/日记</CapsuleButton>
        <CapsuleButton
          prefix={null}
          state="frosted"
          suffix={
            <span aria-hidden="true" className="icon-button icon-button--ghost icon-button--xs">
              <X aria-hidden="true" />
            </span>
          }
        >
          可关闭标签
        </CapsuleButton>
      </div>
    </ComponentPreviewCard>
  )
}

function StateToggleCapsuleButtonDemo() {
  const [state, setState] = useState<'default' | 'frosted'>('default')

  return (
    <ComponentPreviewCard
      action={
        <LabeledSwitch
          ariaLabel="切换磨砂态"
          checked={state === 'frosted'}
          labelOff="默认态"
          labelOn="磨砂态"
          onCheckedChange={(checked) => setState(checked ? 'frosted' : 'default')}
        />
      }
      align="center"
      label="胶囊材质切换"
    >
      <div aria-label="CapsuleButton 状态预览">
        <CapsuleButton state={state}>写作/日记</CapsuleButton>
      </div>
    </ComponentPreviewCard>
  )
}

function WidthToggleCapsuleButtonDemo() {
  const [widthMode, setWidthMode] = useState<'short' | 'long'>('short')
  const widthMeasureRef = useRef<HTMLSpanElement | null>(null)
  const [widthPreviewSize, setWidthPreviewSize] = useState<number | null>(null)
  const widthPreviewLabel = widthMode === 'short' ? '短标签' : '观察宽度变化的长标签'
  const widthPreviewStyle = widthPreviewSize === null
    ? undefined
    : { inlineSize: `${widthPreviewSize}px` }

  useLayoutEffect(() => {
    const element = widthMeasureRef.current
    if (!element) return

    const nextSize = element.getBoundingClientRect().width
    setWidthPreviewSize((currentSize) =>
      currentSize === nextSize ? currentSize : nextSize,
    )
  }, [widthPreviewLabel])

  return (
    <ComponentPreviewCard
      action={
        <LabeledSwitch
          ariaLabel="切换长标签"
          checked={widthMode === 'long'}
          labelOff="短标签"
          labelOn="长标签"
          onCheckedChange={(checked) => setWidthMode(checked ? 'long' : 'short')}
        />
      }
      align="center"
      label="胶囊长度切换"
    >
      <div
        className="capsule-button-preview__width-example"
        aria-label="CapsuleButton 宽度变化预览"
      >
        <span
          className="capsule-button-preview__width-slot"
          style={widthPreviewStyle}
        >
          <CapsuleButton state="default">{widthPreviewLabel}</CapsuleButton>
        </span>
        <span className="capsule-button-preview__width-measure" aria-hidden="true">
          <span ref={widthMeasureRef}>
            <CapsuleButton state="default">{widthPreviewLabel}</CapsuleButton>
          </span>
        </span>
      </div>
    </ComponentPreviewCard>
  )
}

// Docs definitions intentionally colocate preview components with exported page metadata.
function CapsuleButtonDemo() {
  return (
    <>
      <CapsuleMaterialDemo />
      <CapsuleSlotDemo />
      <StateToggleCapsuleButtonDemo />
      <WidthToggleCapsuleButtonDemo />
    </>
  )
}

export const capsuleButtonDefinition = {
  id: 'capsule-button',
  summary: '按钮形态的交互胶囊：前后缀、磨砂状态与内容宽度切换',
  status: 'Preview',
  frame: 'plain',
  searchAliases: [
    'Chip',
    'CapsuleButton',
    '按钮胶囊',
    '标签胶囊',
    '状态标签胶囊',
    '胶囊材质切换',
    '胶囊长度切换',
    '胶囊前缀',
    '胶囊后缀',
    '胶囊材质',
  ],
  preview: () => <CapsuleButtonDemo />,
} satisfies ComponentDefinition

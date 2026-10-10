import { useState } from 'react'
import { Ellipsis, Menu, Share } from 'lucide-react'

import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import { GhostIconButton } from 'weimo-ui-core/components/ghost-icon-button'
import { FrostedIconButton } from 'weimo-ui-core/components/frosted-icon-button'
import {
  FrostedIconButtonGroup,
  FrostedIconGroupButton,
} from 'weimo-ui-core/components/frosted-icon-button-group'
import { TextButton } from 'weimo-ui-core/components/text-button'
import { LabeledSwitch } from 'weimo-ui-core/components/labeled-switch'
import type { ComponentDefinition } from '../../component-docs'
import { GlassPreviewCard } from 'weimo-ui-core/components/glass-preview-card'

function TextButtonPreview() {
  const [disabled, setDisabled] = useState(false)

  return (
    <ComponentPreviewCard
      action={
        <LabeledSwitch
          ariaLabel="启用"
          checked={!disabled}
          labelOff="禁用"
          labelOn="启用"
          onCheckedChange={(checked) => setDisabled(!checked)}
        />
      }
      align="center"
      label="文本按钮"
    >
      <div className="text-button-preview" aria-label="TextButton 状态预览">
        <TextButton disabled={disabled}>文本按钮</TextButton>
        <TextButton disabled={disabled} variant="ghost">
          幽灵文本按钮
        </TextButton>
      </div>
    </ComponentPreviewCard>
  )
}

function GhostIconButtonPreviewGroup({ disabled }: { disabled: boolean }) {
  return (
    <div className="icon-preview__row" aria-label="GhostIconButton 幽灵外观预览">
      <GhostIconButton aria-label="菜单" disabled={disabled}>
        <Menu />
      </GhostIconButton>
      <GhostIconButton aria-label="小号菜单" disabled={disabled} size="sm">
        <Menu />
      </GhostIconButton>
      <GhostIconButton aria-label="极小号菜单" disabled={disabled} size="xs">
        <Menu />
      </GhostIconButton>
    </div>
  )
}

function GhostIconButtonPreview() {
  const [disabled, setDisabled] = useState(false)

  return (
    <ComponentPreviewCard
      action={
        <LabeledSwitch
          ariaLabel="启用"
          checked={!disabled}
          labelOff="禁用"
          labelOn="启用"
          onCheckedChange={(checked) => setDisabled(!checked)}
        />
      }
      label="幽灵图标按钮"
    >
      <div className="icon-button-preview" aria-label="GhostIconButton 普通背景预览">
        <GhostIconButtonPreviewGroup disabled={disabled} />
      </div>
    </ComponentPreviewCard>
  )
}

function FrostedIconButtonPreviewGroup({ disabled }: { disabled: boolean }) {
  return (
    <div className="icon-preview__row" aria-label="FrostedIconButton 磨砂外观预览">
      <FrostedIconButton aria-label="菜单" disabled={disabled}>
        <Menu />
      </FrostedIconButton>
      <FrostedIconButton aria-label="小号菜单" disabled={disabled} size="sm">
        <Menu />
      </FrostedIconButton>
    </div>
  )
}

function FrostedIconButtonPreview() {
  const [disabled, setDisabled] = useState(false)

  return (
    <GlassPreviewCard
      action={
        <LabeledSwitch
          ariaLabel="启用"
          checked={!disabled}
          labelOff="禁用"
          labelOn="启用"
          onCheckedChange={(checked) => setDisabled(!checked)}
        />
      }
      label="磨砂图标按钮"
    >
      <FrostedIconButtonPreviewGroup disabled={disabled} />
    </GlassPreviewCard>
  )
}

function FrostedIconButtonGroupPreviewGroup({ disabled }: { disabled: boolean }) {
  return (
    <div className="icon-preview__row" aria-label="FrostedIconButtonGroup 磨砂按钮组预览">
      <FrostedIconButtonGroup aria-label="磨砂图标按钮组">
        <FrostedIconGroupButton aria-label="分享" disabled={disabled}>
          <Share />
        </FrostedIconGroupButton>
        <FrostedIconGroupButton aria-label="更多" disabled={disabled}>
          <Ellipsis />
        </FrostedIconGroupButton>
      </FrostedIconButtonGroup>
      <FrostedIconButtonGroup aria-label="小号磨砂图标按钮组">
        <FrostedIconGroupButton aria-label="小号分享" disabled={disabled} size="sm">
          <Share />
        </FrostedIconGroupButton>
        <FrostedIconGroupButton aria-label="小号更多" disabled={disabled} size="sm">
          <Ellipsis />
        </FrostedIconGroupButton>
      </FrostedIconButtonGroup>
    </div>
  )
}

function FrostedIconButtonGroupPreview() {
  const [disabled, setDisabled] = useState(false)

  return (
    <GlassPreviewCard
      action={
        <LabeledSwitch
          ariaLabel="启用"
          checked={!disabled}
          labelOff="禁用"
          labelOn="启用"
          onCheckedChange={(checked) => setDisabled(!checked)}
        />
      }
      label="磨砂图标按钮组"
    >
      <FrostedIconButtonGroupPreviewGroup disabled={disabled} />
    </GlassPreviewCard>
  )
}

// 液态玻璃图标按钮/按钮组演示卡已删除:工具栏家族全站磨砂化后,液态玻璃
// 图标按钮不再有演示场景,液态玻璃材质本体亦已从 core 整体下线。

// Docs definitions intentionally colocate preview components with exported page metadata.
function ButtonDemo() {
  return (
    <>
      <TextButtonPreview />
      <GhostIconButtonPreview />
      <FrostedIconButtonPreview />
      <FrostedIconButtonGroupPreview />
    </>
  )
}

export const buttonDefinition = {
  id: 'button',
  summary: '文本按钮、幽灵/磨砂图标按钮与磨砂图标按钮组的按钮总览',
  status: 'Ready',
  frame: 'plain',
  searchAliases: [
    'TextButton',
    'GhostIconButton',
    'FrostedIconButton',
    'FrostedIconButtonGroup',
    '文本按钮',
    '幽灵文本按钮',
    '幽灵图标按钮',
    '磨砂图标按钮',
    '磨砂图标按钮组',
  ],
  preview: () => <ButtonDemo />,
} satisfies ComponentDefinition

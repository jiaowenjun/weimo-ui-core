import { useState } from 'react'
import { Copy, Edit3, Trash2 } from 'lucide-react'

import { BaseCard } from 'weimo-ui-core/components/base-card'
import { GhostIconButton } from 'weimo-ui-core/components/ghost-icon-button'
import {
  ActionMenu,
  type ActionMenuItem,
} from 'weimo-ui-core/components/menu'
import { LabeledSwitch } from 'weimo-ui-core/components/labeled-switch'
import type { ComponentDefinition } from '../../component-docs'

const TITLE_BAR_MENU_ITEMS = [
  {
    key: 'edit',
    icon: <Edit3 aria-hidden="true" />,
    label: '编辑',
  },
  {
    key: 'copy',
    icon: <Copy aria-hidden="true" />,
    label: '复制',
  },
  {
    key: 'delete',
    icon: <Trash2 aria-hidden="true" />,
    label: '删除',
    variant: 'destructive' as const,
  },
] satisfies ActionMenuItem[]

function renderTitleBarAction() {
  return (
    <ActionMenu
      ariaLabel="更多操作"
      items={TITLE_BAR_MENU_ITEMS}
      triggerProps={{
        render: <GhostIconButton aria-label="更多操作" size="sm" />,
      }}
    />
  )
}

// Docs definitions intentionally colocate preview components with exported page metadata.
function BaseCardDemo() {
  const [debugBorder, setDebugBorder] = useState(false)
  const cardClassName = `base-card-docs-preview base-card-debug${debugBorder ? '' : ' base-card-debug--hidden'}`

  return (
    <>
      <BaseCard
        aria-label="BaseCard 基础卡片预览"
        className={cardClassName}
      >
        <p className="base-card-docs-preview__body">
          基础卡片在卡片材质上提供与笔记卡片一致的圆角与内边距,不包含顶栏、正文、标签等任何业务结构。
        </p>
        <p className="base-card-docs-preview__note">
          DEBUG 分区观察边框可用页面底部开关显示或隐藏。
        </p>
      </BaseCard>
      <BaseCard
        actionSlot={renderTitleBarAction()}
        aria-label="BaseCard 带标题栏基础卡片预览"
        className={cardClassName}
        title="卡片标题"
      >
        <p className="base-card-docs-preview__body">
          带标题栏变体在基础卡片上增加标题栏,标题栏与内容区之间保持 1em 纵向间隔,右侧可放置操作按钮。
        </p>
      </BaseCard>
      <BaseCard
        actionSlot={renderTitleBarAction()}
        aria-label="BaseCard 标题栏元信息区基础卡片预览"
        className={cardClassName}
        meta="3 条笔记 · 今天 14:06 更新"
        metaCollapsible
        title="卡片标题"
      >
        <p className="base-card-docs-preview__body">
          元信息区默认折叠,点击标题栏右侧动作区前的按钮展开;折叠时图标为 chevron-right,展开时旋转为 chevron-down。
        </p>
      </BaseCard>
      <BaseCard
        actionSlot={renderTitleBarAction()}
        aria-label="BaseCard 标题栏元信息区底部栏基础卡片预览"
        className={cardClassName}
        footerSlot={<span>笔记 · 设计 · weimo</span>}
        meta="3 条笔记 · 今天 14:06 更新"
        title="卡片标题"
      >
        <p className="base-card-docs-preview__body">
          标题栏+元信息区+底部栏变体在内容区之后追加一个底部栏(如标签栏),高度由内容自然撑开。
        </p>
      </BaseCard>
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

export const baseCardDefinition = {
  id: 'base-card',
  summary:
    '卡片材质上的最小卡片壳层:与 Card 一致的圆角与内边距,可选标题栏、可折叠元信息区、操作区与底部栏,分区 DEBUG 观察边框随页面开关演示',
  status: 'Preview',
  frame: 'plain',
  searchAliases: ['BaseCard', '卡片壳层', '标题栏', '元信息区', '底部栏'],
  preview: () => <BaseCardDemo />,
} satisfies ComponentDefinition

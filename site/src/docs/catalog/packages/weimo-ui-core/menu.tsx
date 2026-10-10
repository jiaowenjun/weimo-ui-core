import {
  Archive,
  Copy,
  Edit3,
  Trash2,
} from 'lucide-react'

import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import { GhostIconButton } from 'weimo-ui-core/components/ghost-icon-button'
import {
  ActionMenu,
  type ActionMenuItem,
} from 'weimo-ui-core/components/menu'
import type { ComponentDefinition } from '../../component-docs'

const MENU_PREVIEW_ITEMS = [
  {
    key: 'edit',
    icon: <Edit3 aria-hidden="true" />,
    label: '编辑',
    shortcut: '⌘E',
  },
  {
    key: 'copy',
    icon: <Copy aria-hidden="true" />,
    label: '复制',
  },
  {
    key: 'more',
    type: 'sub' as const,
    icon: <Archive aria-hidden="true" />,
    label: '更多',
    items: [
      { key: 'archive', inset: true, label: '归档' },
      { key: 'move', inset: true, label: '移动到标签' },
    ],
  },
  { key: 'after-actions', type: 'separator' as const },
  {
    key: 'pinned',
    type: 'checkbox' as const,
    defaultChecked: true,
    label: '保持置顶',
  },
  {
    key: 'newest',
    type: 'radio' as const,
    label: '最新优先',
    value: 'newest',
  },
  {
    key: 'oldest',
    type: 'radio' as const,
    label: '最早优先',
    value: 'oldest',
  },
  { key: 'before-delete', type: 'separator' as const },
  {
    key: 'delete',
    icon: <Trash2 aria-hidden="true" />,
    label: '删除',
    variant: 'destructive' as const,
  },
] satisfies ActionMenuItem[]

function renderMenuDemo() {
  return (
    <ComponentPreviewCard label="操作菜单">
      <div className="menu-preview" aria-label="ActionMenu 操作菜单预览">
        <ActionMenu
          ariaLabel="更多操作"
          items={MENU_PREVIEW_ITEMS}
          radioGroupProps={{ defaultValue: 'newest' }}
          triggerProps={{
            render: <GhostIconButton aria-label="更多操作" size="sm" />,
          }}
        />
      </div>
    </ComponentPreviewCard>
  )
}

export const menuDefinition = {
  id: 'menu',
  summary: 'Coss/Base UI 行为的磨砂弹出操作菜单',
  status: 'Ready',
  frame: 'plain',
  searchAliases: ['Menu'],
  preview: () => renderMenuDemo(),
} satisfies ComponentDefinition

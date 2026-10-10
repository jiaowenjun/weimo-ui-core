import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import type { ComponentDefinition } from '../../component-docs'
import { SideBarDrawerPreview } from './sidebar-preview'

function renderSideBarBlankPreview({
  tone = 'default',
}: { tone?: 'compact' | 'default' } = {}) {
  return (
    <div
      aria-label="空白常驻侧边栏预览"
      className="sidebar-preview__panel weimo-sidebar weimo-sidebar--normal"
      data-preview-tone={tone}
      role="img"
    >
      <strong className="sidebar-preview__title">常驻侧边栏</strong>
    </div>
  )
}

function SideBarDemo() {
  return (
    <>
      <ComponentPreviewCard label="常驻侧边栏">
        <div className="sidebar-preview">{renderSideBarBlankPreview()}</div>
      </ComponentPreviewCard>
      <ComponentPreviewCard label="抽屉侧边栏">
        <div className="sidebar-preview">
          <SideBarDrawerPreview />
        </div>
      </ComponentPreviewCard>
    </>
  )
}

// Docs definitions intentionally colocate preview components with exported page metadata.
export const sidebarDefinition = {
  id: 'sidebar',
  summary: '侧边栏总览',
  status: 'Ready',
  frame: 'plain',
  searchAliases: ['SideBar', '侧边栏'],
  preview: () => <SideBarDemo />,
} satisfies ComponentDefinition

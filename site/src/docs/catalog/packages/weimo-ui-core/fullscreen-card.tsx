import { Send } from 'lucide-react'

import { FullscreenCard } from 'weimo-ui-core/components/fullscreen-card'
import { GhostIconButton } from 'weimo-ui-core/components/ghost-icon-button'
import type { ComponentDefinition } from '../../component-docs'
import { ComponentCardTitle } from '../../component-card-title'

// Docs definitions intentionally colocate preview components with exported page metadata.
function FullscreenCardDemo() {
  return (
    <FullscreenCard
      aria-label="FullscreenCard 全屏卡片预览"
      className="fullscreen-card-docs-preview"
      footerSlot={
        <div
          aria-label="底部输入栏预览"
          className="fullscreen-card-docs-preview__composer"
          role="group"
        >
          <input
            className="fullscreen-card-docs-preview__input"
            placeholder="底部输入栏:全屏后聚焦,停在软键盘上方"
            type="text"
          />
          <GhostIconButton aria-label="发送">
            <Send aria-hidden="true" />
          </GhostIconButton>
        </div>
      }
      meta="3 条笔记 · 今天 14:06 更新"
      metaCollapsible
      title={
        <ComponentCardTitle componentName="fullscreen-card">
          卡片标题
        </ComponentCardTitle>
      }
    >
      <p className="base-card-docs-preview__body">
        点击标题栏右侧的切换按钮进入全屏:卡片以容器扩展转场从原位延展铺满视口(圆角、阴影同步过渡,背景遮罩渐显),标题栏与底部栏钉在上下两端,内容区在内部滚动。
      </p>
      <p className="base-card-docs-preview__note">
        退出时反向收拢回原卡片位置,列表全程保持稳定;全屏尺寸跟随可视视口(visualViewport),移动端 Safari 的地址栏收放、软键盘弹起时,底部输入栏始终露在键盘上方。
      </p>
      <label className="fullscreen-card-docs-preview__probe">
        <span>状态保持探针:进入全屏再退出,已输入内容不丢失</span>
        <input
          defaultValue=""
          placeholder="在这里输入几个字,然后切换全屏"
          type="text"
        />
      </label>
    </FullscreenCard>
  )
}

export const fullscreenCardDefinition = {
  id: 'fullscreen-card',
  summary:
    '在 BaseCard 上增加普通/全屏双态:容器扩展转场从原卡片位置延展铺满可视视口并跟随移动端 Safari 地址栏与软键盘收缩,背景遮罩渐显、退出反向回位、列表保持稳定;进出全屏不重建子树,内部状态与焦点保持',
  status: 'Preview',
  frame: 'plain',
  preview: () => <FullscreenCardDemo />,
} satisfies ComponentDefinition

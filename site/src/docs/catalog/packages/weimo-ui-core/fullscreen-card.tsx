import { useRef, useState } from 'react'
import { Bold, Code, Italic, List, ListOrdered, Quote } from 'lucide-react'
import type { ReactNode } from 'react'

import { FullscreenCard } from 'weimo-ui-core/components/fullscreen-card'
import { GhostIconButton } from 'weimo-ui-core/components/ghost-icon-button'
import type { ComponentDefinition } from '../../component-docs'
import { ComponentCardTitle } from '../../component-card-title'

const TOOLBAR_ITEMS = [
  { key: 'bold', icon: <Bold aria-hidden="true" />, label: '加粗' },
  { key: 'italic', icon: <Italic aria-hidden="true" />, label: '斜体' },
  { key: 'quote', icon: <Quote aria-hidden="true" />, label: '引用' },
  { key: 'code', icon: <Code aria-hidden="true" />, label: '代码' },
  { key: 'list', icon: <List aria-hidden="true" />, label: '无序列表' },
  { key: 'list-ordered', icon: <ListOrdered aria-hidden="true" />, label: '有序列表' },
] satisfies { key: string; icon: ReactNode; label: string }[]

// Docs definitions intentionally colocate preview components with exported page metadata.
function FullscreenCardDemo() {
  const [fullscreen, setFullscreen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  /* 进入全屏即聚焦正文:聚焦发生在切换按钮点击的用户激活窗口内,
     移动端 Safari 一定弹软键盘;host 搬运 DOM 不打断焦点。 */
  const handleFullscreenChange = (next: boolean) => {
    setFullscreen(next)
    if (next) textareaRef.current?.focus()
  }

  return (
    <FullscreenCard
      aria-label="FullscreenCard 全屏卡片预览"
      className="fullscreen-card-docs-preview"
      fullscreen={fullscreen}
      footerSlot={
        <div
          aria-label="底部工具栏预览"
          className="fullscreen-card-docs-preview__toolbar"
          role="toolbar"
        >
          {TOOLBAR_ITEMS.map((item) => (
            <GhostIconButton aria-label={item.label} key={item.key} size="sm">
              {item.icon}
            </GhostIconButton>
          ))}
        </div>
      }
      onFullscreenChange={handleFullscreenChange}
      meta="3 条笔记 · 今天 14:06 更新"
      metaCollapsible
      title={
        <ComponentCardTitle componentName="fullscreen-card">
          卡片标题
        </ComponentCardTitle>
      }
    >
      <textarea
        aria-label="卡片正文输入区"
        className="fullscreen-card-docs-preview__textarea"
        placeholder="进入全屏自动聚焦;退出再进入,内容与焦点保持"
        ref={textareaRef}
      />
    </FullscreenCard>
  )
}

export const fullscreenCardDefinition = {
  id: 'fullscreen-card',
  summary:
    '在 BaseCard 上增加普通/全屏双态:容器扩展转场从原卡片位置延展为近全屏浮层,保留圆角与阴影外壳、与屏幕边缘保持沟槽间隙,并跟随移动端 Safari 地址栏与软键盘收缩;背景遮罩渐显、退出反向回位、列表保持稳定;进出全屏不重建子树,内部状态与焦点保持',
  status: 'Preview',
  frame: 'plain',
  preview: () => <FullscreenCardDemo />,
} satisfies ComponentDefinition

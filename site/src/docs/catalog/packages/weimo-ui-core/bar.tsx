import { Check, Menu, Plus, Search, X } from 'lucide-react'

import { BottomBar } from 'weimo-ui-core/components/bottom-bar'
import { CardSurface } from 'weimo-ui-core/components/card-surface'
import { CapsuleButton } from 'weimo-ui-core/components/capsule-button'
import { FrostedLabel } from 'weimo-ui-core/components/frosted-label'
import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import { FloatBar } from 'weimo-ui-core/components/float-bar'
import { FrostedIconButton } from 'weimo-ui-core/components/frosted-icon-button'
import {
  FrostedIconButtonGroup,
  FrostedIconGroupButton,
} from 'weimo-ui-core/components/frosted-icon-button-group'
import { TopBar } from 'weimo-ui-core/components/top-bar'
import type { ComponentDefinition } from '../../component-docs'
import { GlassPreviewCard } from 'weimo-ui-core/components/glass-preview-card'

// 磨砂标签:磨砂材质的标题文字胶囊(全胶囊圆角),文字色随画布 tone
// 自适应;sm 档用于工具栏栏位标题,lg 档(粗体)用于页面标题。
function FrostedLabelDemo() {
  return (
    <GlassPreviewCard label="磨砂标签">
      <div aria-label="磨砂标签预览" className="frosted-label-preview">
        <FrostedLabel size="sm">浮动栏</FrostedLabel>
        <FrostedLabel size="lg">页面标题</FrostedLabel>
      </div>
    </GlassPreviewCard>
  )
}

function BottomBarDemo() {
  return (
    <ComponentPreviewCard label="底部操作栏">
      <div className="internal-bottom-preview" aria-label="BottomBar preview">
        <CardSurface className="internal-bottom-preview__surface">
          <p>正文区域</p>
          <BottomBar
            aria-label="底部操作栏预览"
            leftSlot={
              <CapsuleButton
                aria-label="保存 2 个标签"
                onClick={() => {}}
                prefix={null}
                state="frosted"
              >
                2 个标签待保存
              </CapsuleButton>
            }
            rightSlot={
              <span className="internal-preview__actions">
                <FrostedIconButton aria-label="新增" size="sm">
                  <Plus />
                </FrostedIconButton>
                <FrostedIconButton aria-label="保存" size="sm">
                  <Check />
                </FrostedIconButton>
              </span>
            }
          />
        </CardSurface>
      </div>
    </ComponentPreviewCard>
  )
}

// 浮动工具栏示例:标题胶囊与图标钮/按钮组均为磨砂材质(与底部工具栏同
// 规则),组件各自采样画布 tone 自适应;画布只负责网格排布。
function FloatBarDemo() {
  return (
    <GlassPreviewCard label="浮动工具栏">
      <div className="frosted-toolbar-preview">
        <FloatBar
          aria-label="浮动工具栏预览"
          className="internal-float-preview"
          leftSlot={<FrostedLabel size="sm">浮动栏</FrostedLabel>}
          rightSlot={
            <span className="internal-preview__actions">
              <FrostedIconButton aria-label="搜索" size="sm">
                <Search />
              </FrostedIconButton>
              <FrostedIconButtonGroup aria-label="确认与关闭">
                <FrostedIconGroupButton aria-label="确认" size="sm">
                  <Check />
                </FrostedIconGroupButton>
                <FrostedIconGroupButton aria-label="关闭" size="sm">
                  <X />
                </FrostedIconGroupButton>
              </FrostedIconButtonGroup>
            </span>
          }
        />
      </div>
    </GlassPreviewCard>
  )
}

function renderTopBarSidebarButton() {
  return (
    <FrostedIconButton aria-label="打开侧边栏">
      <Menu />
    </FrostedIconButton>
  )
}

function renderTopBarSearchButton() {
  return (
    <FrostedIconButton aria-label="搜索">
      <Search />
    </FrostedIconButton>
  )
}

// 顶部工具栏示例:标题胶囊与图标钮均为磨砂材质(与浮动/底部工具栏同
// 规则,图标钮用默认尺寸档),组件各自采样画布 tone 自适应。
function TopBarDemo() {
  return (
    <GlassPreviewCard label="顶部工具栏">
      <div className="frosted-toolbar-preview">
        <TopBar
          className="top-bar-preview"
          leftSlot={
            <>
              {renderTopBarSidebarButton()}
              <FrostedLabel size="lg">页面标题</FrostedLabel>
            </>
          }
          rightSlot={renderTopBarSearchButton()}
        />
      </div>
    </GlassPreviewCard>
  )
}

// Docs definitions intentionally colocate preview components with exported page metadata.
function BarDemo() {
  return (
    <>
      <FrostedLabelDemo />
      <FloatBarDemo />
      <TopBarDemo />
      <BottomBarDemo />
    </>
  )
}

export const barDefinition = {
  id: 'bar',
  summary: '磨砂标签与浮动/顶部/底部工具栏总览',
  status: 'Ready',
  frame: 'plain',
  searchAliases: [
    'BottomBar',
    'FloatBar',
    'FrostedLabel',
    'TopBar',
    '磨砂标签',
    '底部操作栏',
    '浮动工具栏',
    '顶部工具栏',
  ],
  preview: () => <BarDemo />,
} satisfies ComponentDefinition

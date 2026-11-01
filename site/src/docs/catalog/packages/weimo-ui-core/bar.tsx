import { useEffect, useRef, useState } from 'react'
import { Bell, Check, Copy, LoaderCircle, Menu, Moon, Plus, Search, X } from 'lucide-react'

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
import { GhostIconButton } from 'weimo-ui-core/components/ghost-icon-button'
import { TopBar } from 'weimo-ui-core/components/top-bar'
import { TopBarNotice, TopBarNoticeRing } from 'weimo-ui-core/components/top-bar-notice'
import type { ComponentDefinition } from '../../component-docs'
import { ComponentCardTitle } from '../../component-card-title'
import { FrostedPreviewCard } from 'weimo-ui-core/components/frosted-preview-card'

// 磨砂标签:磨砂材质的标题文字胶囊(全胶囊圆角),文字色随画布 tone
// 自适应;sm 档用于工具栏栏位标题,lg 档(粗体)用于页面标题。
function FrostedLabelDemo() {
  return (
    <FrostedPreviewCard
      label={<ComponentCardTitle componentName="frosted-label">磨砂标签</ComponentCardTitle>}
    >
      <div aria-label="磨砂标签预览" className="frosted-label-preview">
        <FrostedLabel size="sm">浮动栏</FrostedLabel>
        <FrostedLabel size="lg">页面标题</FrostedLabel>
      </div>
    </FrostedPreviewCard>
  )
}

function BottomBarDemo() {
  return (
    <ComponentPreviewCard
      label={<ComponentCardTitle componentName="bottom-bar">底部操作栏</ComponentCardTitle>}
    >
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
    <FrostedPreviewCard
      label={<ComponentCardTitle componentName="float-bar">浮动工具栏</ComponentCardTitle>}
    >
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
    </FrostedPreviewCard>
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

const topBarNoticeSamples = [
  { icon: Check, text: '已保存全部更改' },
  { icon: Copy, text: '已复制到剪贴板' },
  { icon: Moon, text: '已切换到深色模式' },
]

// 常驻通知(灵动岛加载态)的进度环参数:3.2s 走满,100% 后停留 3s 供
// 查看完成态再收起。进度按时间戳推进而非累加,节流环境(IAB 定时器
// ~1s)下也能准点到满。
const TOP_BAR_LOADING_DURATION = 3200
const TOP_BAR_LOADING_HOLD = 3000

// 顶部工具栏示例:标题胶囊与图标钮均为磨砂材质(与浮动/底部工具栏同
// 规则,图标钮用默认尺寸档),组件各自采样画布 tone 自适应。居中槽位
// 演示灵动岛通知的两副面孔:短驻通知 2.4s 自动收起;常驻通知不设
// duration,「加载中」标签 + 环形进度走满后由示例清空收起——两种都
// 常驻 DOM、退场动画完整,中途互切即内容原地变形(岛形态切换)。
// 触发钮为卡底栏滑条右侧的 GhostIconButton 纯图标钮(悬停有 tooltip)。
function TopBarDemo() {
  const [notice, setNotice] = useState<(typeof topBarNoticeSamples)[number] | null>(null)
  // 非 null 即常驻加载态:run 每次触发递增,重开计时器;progress 供进度弧
  const [loading, setLoading] = useState<{ run: number; progress: number } | null>(null)
  const noticeIndexRef = useRef(-1)

  const showNotice = () => {
    noticeIndexRef.current = (noticeIndexRef.current + 1) % topBarNoticeSamples.length
    setLoading(null)
    setNotice(topBarNoticeSamples[noticeIndexRef.current])
  }

  const showLoadingNotice = () => {
    setNotice(null)
    setLoading((current) => ({ run: (current?.run ?? 0) + 1, progress: 0 }))
  }

  useEffect(() => {
    if (loading == null) return

    const startedAt = performance.now()
    let holdTimer: ReturnType<typeof setTimeout> | undefined
    const progressTimer = setInterval(() => {
      const elapsed = performance.now() - startedAt
      const next = Math.min(100, Math.round((elapsed / TOP_BAR_LOADING_DURATION) * 100))
      setLoading((current) => (current ? { ...current, progress: next } : current))

      if (next >= 100) {
        clearInterval(progressTimer)
        holdTimer = setTimeout(() => setLoading(null), TOP_BAR_LOADING_HOLD)
      }
    }, 80)

    return () => {
      clearInterval(progressTimer)
      if (holdTimer !== undefined) clearTimeout(holdTimer)
    }
  }, [loading?.run])

  return (
    <FrostedPreviewCard
      label={<ComponentCardTitle componentName="top-bar">顶部工具栏</ComponentCardTitle>}
      footerExtra={
        <>
          <GhostIconButton
            aria-label="触发一条居中通知"
            onClick={showNotice}
            size="sm"
            tooltip="触发居中通知"
          >
            <Bell />
          </GhostIconButton>
          <GhostIconButton
            aria-label="触发一条常驻加载通知"
            onClick={showLoadingNotice}
            size="sm"
            tooltip="触发常驻通知"
          >
            <LoaderCircle />
          </GhostIconButton>
        </>
      }
    >
          <TopBar
            className="top-bar-preview"
            centerSlot={
              <TopBarNotice
                duration={loading == null ? 2400 : undefined}
                onDismissed={() => setNotice(null)}
              >
                {loading != null ? (
                  <>
                    <span>{loading.progress >= 100 ? '已完成' : '加载中'}</span>
                    <TopBarNoticeRing progress={loading.progress} />
                  </>
                ) : notice == null ? null : (
                  <>
                    <notice.icon aria-hidden="true" size={14} />
                    {notice.text}
                  </>
                )}
              </TopBarNotice>
            }
        leftSlot={
          <>
            {renderTopBarSidebarButton()}
            <FrostedLabel size="lg">页面标题</FrostedLabel>
          </>
        }
        rightSlot={renderTopBarSearchButton()}
      />
    </FrostedPreviewCard>
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
  preview: () => <BarDemo />,
} satisfies ComponentDefinition

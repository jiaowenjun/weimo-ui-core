import { useEffect, useState } from 'react'
import { Plus, RotateCcw } from 'lucide-react'

import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import { GhostIconButton } from 'weimo-ui-core/components/ghost-icon-button'
import { LabeledSwitch } from 'weimo-ui-core/components/labeled-switch'
import { MagicNumber } from 'weimo-ui-core/components/magic-number'
import { TextButton } from 'weimo-ui-core/components/text-button'
import type { ComponentDefinition } from '../../component-docs'
import { ComponentCardTitle } from '../../component-card-title'

const STAT_INITIAL_VALUE = 1024
const STAT_MAX_VALUE = 99999
const STAT_LIVE_INTERVAL_MS = 1200

// 列表行计数示例的行数据:模拟 tagtree 标签行右侧的条目数量。
const TAG_ROWS = [
  { id: 'daily', name: '#日记录', initialCount: 12 },
  { id: 'idea', name: '#灵感', initialCount: 3 },
  { id: 'reading', name: '#读书笔记', initialCount: 7 },
  { id: 'travel', name: '#旅行', initialCount: 21 },
] as const

// Docs definitions intentionally colocate preview components with exported page metadata.

// 统计大数字(stats 场景):进场从 0 滚到初值,按钮改值演示升降滚动,
// 实时刷新开关以固定间隔随机改值,演示滚动途中被打断后从当前帧值续滚。
function StatNumberDemo() {
  const [value, setValue] = useState(STAT_INITIAL_VALUE)
  const [live, setLive] = useState(false)

  useEffect(() => {
    if (!live) return
    const timer = setInterval(() => {
      setValue((current) => {
        const next = current + Math.round((Math.random() - 0.45) * 160)
        return Math.min(STAT_MAX_VALUE, Math.max(0, next))
      })
    }, STAT_LIVE_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [live])

  const shift = (delta: number) =>
    setValue((current) => Math.min(STAT_MAX_VALUE, Math.max(0, current + delta)))

  return (
    <ComponentPreviewCard
      action={
        <GhostIconButton
          aria-label="重置数值"
          onClick={() => setValue(STAT_INITIAL_VALUE)}
          size="sm"
        >
          <RotateCcw aria-hidden="true" />
        </GhostIconButton>
      }
      align="center"
      label={<ComponentCardTitle componentName="magic-number">数字滚动</ComponentCardTitle>}
    >
      <div aria-label="统计大数字预览" className="magic-number-preview">
        <MagicNumber
          animateOnMount
          className="magic-number-preview__stat"
          format={(current) => Math.round(current).toLocaleString()}
          value={value}
        />
        <div className="magic-number-preview__controls">
          <TextButton onClick={() => shift(-100)}>−100</TextButton>
          <TextButton onClick={() => shift(-10)}>−10</TextButton>
          <TextButton onClick={() => shift(10)}>+10</TextButton>
          <TextButton onClick={() => shift(100)}>+100</TextButton>
          <TextButton
            onClick={() => setValue(Math.round(Math.random() * STAT_MAX_VALUE))}
          >
            随机
          </TextButton>
        </div>
        <LabeledSwitch
          ariaLabel="模拟实时刷新"
          checked={live}
          labelOff="实时刷新关"
          labelOn="实时刷新开"
          onCheckedChange={setLive}
        />
      </div>
    </ComponentPreviewCard>
  )
}

// 列表行计数(tagtree 场景):小字号次级色的行内计数,300ms 快速滚动,
// 逐行 +1 演示窄空间里的滚动节奏;面板复刻标签树行列表的视觉语境。
function TagRowDemo() {
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(TAG_ROWS.map((row) => [row.id, row.initialCount])),
  )

  const increment = (id: string) =>
    setCounts((current) => ({ ...current, [id]: current[id] + 1 }))

  return (
    <ComponentPreviewCard
      align="center"
      label={<ComponentCardTitle componentName="magic-number">列表行计数</ComponentCardTitle>}
    >
      <div aria-label="列表行计数预览" className="magic-number-preview__rows">
        {TAG_ROWS.map((row) => (
          <div className="magic-number-preview__row" key={row.id}>
            <span className="magic-number-preview__row-tag">{row.name}</span>
            <span className="magic-number-preview__row-count">
              <MagicNumber duration={300} value={counts[row.id]} />
            </span>
            <GhostIconButton
              aria-label={`${row.name} 加一条`}
              onClick={() => increment(row.id)}
              size="xs"
            >
              <Plus aria-hidden="true" />
            </GhostIconButton>
          </div>
        ))}
      </div>
    </ComponentPreviewCard>
  )
}

function MagicNumberDemo() {
  return (
    <>
      <StatNumberDemo />
      <TagRowDemo />
    </>
  )
}

export const magicNumberDefinition = {
  id: 'magic-number',
  summary:
    '数值变动时从当前显示值逐帧滚到新值的行内数字——排版随宿主,统计大数字与列表行计数共用',
  status: 'Ready',
  frame: 'plain',
  preview: () => <MagicNumberDemo />,
} satisfies ComponentDefinition

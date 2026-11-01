import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

/* 「TopBar 居中悬浮槽位 + 灵动岛通知」契约:CI 无浏览器可断言计算样式,
   退而锁定源码必须自带的协议——条件渲染(未用时不添 DOM)、点击穿透、
   常驻 DOM 的 data-visible 进出场、退场内容保留与 status 播报。
   改动这些行为须同步本契约。 */
const topBarTsx = readFileSync(
  new URL('../src/components/layout/bars/top-bar.tsx', import.meta.url),
  'utf8',
)
const topBarCss = readFileSync(
  new URL('../src/components/layout/bars/top-bar.css', import.meta.url),
  'utf8',
)
const noticeTsx = readFileSync(
  new URL('../src/components/layout/bars/top-bar-notice.tsx', import.meta.url),
  'utf8',
)
const noticeCss = readFileSync(
  new URL('../src/components/layout/bars/top-bar-notice.css', import.meta.url),
  'utf8',
)

describe('TopBar 居中悬浮槽位', () => {
  it('centerSlot 条件渲染:不传不渲染节点(旧消费方 DOM 不变)', () => {
    expect(topBarTsx).toMatch(/centerSlot != null &&/)
  })

  it('居中容器绝对定位叠于槽位之上,自身穿透点击、子元素恢复点击', () => {
    expect(topBarCss).toMatch(/\.top-bar__center \{[^}]*position: absolute/s)
    expect(topBarCss).toMatch(/\.top-bar__center \{[^}]*pointer-events: none/s)
    expect(topBarCss).toMatch(/\.top-bar__center > \* \{[^}]*pointer-events: auto/s)
  })

  it('frame 持 position: relative 作悬浮锚点', () => {
    expect(topBarCss).toMatch(/\.top-bar__frame \{[^}]*position: relative/s)
  })
})

describe('TopBarNotice 灵动岛协议', () => {
  it('常驻 DOM + data-visible 驱动过渡,收起态关闭点击', () => {
    expect(noticeCss).toMatch(/\.top-bar-notice \{[^}]*pointer-events: none/s)
    expect(noticeCss).toMatch(/\.top-bar-notice\[data-visible='true'\] \{[^}]*pointer-events: auto/s)
    expect(noticeCss).toMatch(/\.top-bar-notice \{[^}]*transition:/s)
  })

  it('进退场为弹性缩放,且尊重 prefers-reduced-motion', () => {
    expect(noticeCss).toMatch(/\.top-bar-notice \{[^}]*transform: scale/s)
    expect(noticeCss).toMatch(/prefers-reduced-motion: reduce/)
  })

  it('role=status 播报 + duration 到点回调 onDismissed(自动收起由外部清空)', () => {
    expect(noticeTsx).toMatch(/role="status"/)
    expect(noticeTsx).toMatch(/onDismissedRef\.current\?\.\(\)/)
  })

  it('退场保留:children 清空后沿上一次非空内容播完动画', () => {
    expect(noticeTsx).toMatch(/setRetainedChildren/)
    expect(noticeTsx).toMatch(/\{visible \? children : retainedChildren\}/)
  })

  it('磨砂材质复用 frosted-surface 基类,不另起炉灶', () => {
    expect(noticeTsx).toMatch(/getFrostedSurfaceClassName\('frosted-surface--bordered', 'top-bar-notice'\)/)
  })
})

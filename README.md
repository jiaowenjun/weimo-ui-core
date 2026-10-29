# weimo-ui-core

一套以玻璃拟态（glassmorphism）为设计语言的 React 基础组件库：会随背景明暗自适应的磨砂材质、shadcn/ui 兼容的语义 token、内置可达性的交互原语，帮你把应用界面做出「精致工具」的质感。

![npm](https://img.shields.io/npm/v/weimo-ui-core) ![MIT](https://img.shields.io/badge/license-MIT-green) ![React 19](https://img.shields.io/badge/React-19-149eca) ![Base UI](https://img.shields.io/badge/Base_UI-1.9-ff6459) ![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6)

**[在线演示 →](https://jiaowenjun.github.io/weimo-ui-core/)** —— 每个组件都有文档与交互式预览，先玩再装。

## 为什么选它

- 🪟 **会呼吸的磨砂材质**：`FrostedSurface` 实时采样底图明暗，自动插值边框与文字颜色——玻璃放在浅色照片还是深色照片上都保持可读，不需要你手动调两套样式。
- 🎨 **shadcn/ui 兼容的语义 token**：全套 HSL CSS 变量（`--background`、`--card`、`--muted`……），改几个变量就能换肤，与现有 shadcn 生态无缝对接。
- ♿ **可达性开箱即用**：对话框、菜单、开关、标签页等交互原语基于 [Base UI](https://base-ui.com/) 封装，焦点管理、键盘导航、`aria` 语义不用你操心。
- 📦 **样式自带、零配置**：发布编译后的 CSS，组件导入时自动加载自己的样式。不要求你安装或配置 Tailwind，放进任何项目就能跑。
- 🧩 **按需引入**：所有能力通过显式子路径导出（如 `weimo-ui-core/components/text-button`），用哪个引哪个，没有巨型主入口。
- 🔒 **类型完备**：TypeScript 编写，每个入口都带类型声明，props 直接对应 DOM 属性并可透传 `ref`。

## 组件一览

| 分类 | 入口 |
| --- | --- |
| 材质 | `components/card-surface`、`frosted-surface`、`popup-surface` |
| 按钮与控件 | `components/text-button`、`capsule-button`、`frosted-icon-button`、`ghost-icon-button`、`slider`、`labeled-switch` |
| 卡片与预览 | `components/base-card`、`component-preview-card`、`frosted-preview-card` |
| 组合组件 | `components/menu`、`action-dialog` |
| 布局 | `components/sidebar`、`top-bar`、`bottom-bar`、`float-bar` |
| 样式变体 | `components/font-size`、`text-color`、`bg-color`、`bg-blur`、`border-color`、`border-radius`、`pressable` |
| 通用行为 | `components/animated-inline-size`、`lib/use-infinite-list-sentinel` |
| 基础原语 | `components/coss/button`、`dialog`、`switch`、`table`、`tabs`、`toolbar`、`tooltip` |

完整可导入路径以 [`package.json#exports`](./package.json) 为准。

## 快速开始

### 1. 安装

```bash
pnpm add weimo-ui-core @base-ui/react react react-dom
```

React 19 与 Base UI 是 peer 依赖，需要一并安装。

### 2. 使用组件（样式零配置）

样式随组件自动加载：引入任意组件或 variant 子路径，组件 JS 会一并带上自身
结构样式与 `styles/tokens.css`（颜色、字号、间距、圆角、阴影……含 `.dark`
暗色覆盖），无需在应用入口手动引任何 CSS。显式引入
`weimo-ui-core/styles/tokens.css` 仍然无害——`:root` 定义幂等；要定制主题，
在自己的 CSS 中覆盖对应变量即可（级联取后者）。

```tsx
import { useState } from 'react'
import { FrostedSurface } from 'weimo-ui-core/components/frosted-surface'
import { SideBar } from 'weimo-ui-core/components/sidebar'
import { TextButton } from 'weimo-ui-core/components/text-button'

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <TextButton variant="ghost" onClick={() => setSidebarOpen(true)}>
        打开侧栏
      </TextButton>

      <SideBar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ariaLabel="导航"
      >
        {/* 侧栏内容；宽屏固定展示，窄屏自动降级为抽屉 */}
      </SideBar>

      <FrostedSurface bordered observe>
        放在任意背景上都保持可读的磨砂卡片
      </FrostedSurface>
    </>
  )
}
```

组件会自动加载自身样式，不需要手动引 CSS；`styles/*.css` 入口留给 Registry、手动样式组合等不加载组件实现的场景。

## 主题定制

所有视觉决策都收敛在 `tokens.css` 的 CSS 变量里。想换个底色，覆盖对应变量即可，不用碰组件代码：

```css
:root {
  --background: 222 47% 6%;   /* 换成深色底 */
  --card: 222 44% 10%;
  --radius: 12px;
}
```

配合 `text-color`、`bg-color`、`font-size` 等样式变体入口，可以在不写新 CSS 的情况下组合出绝大多数排版。

## 环境要求

- React ≥ 19、`@base-ui/react` ≥ 1.9
- 支持原生 CSS 自定义属性、`color-mix()` 与 `backdrop-filter` 的现代浏览器

## 本地开发

```bash
pnpm install
pnpm verify        # 类型、测试、构建产物与公开入口检查
pnpm site:dev      # 文档站开发预览
```

文档站位于 `site/`，只通过本包公开子路径消费组件。推送到 `main` 后，GitHub Actions 自动构建并部署到 GitHub Pages。

## License

[MIT](./LICENSE)

# weimo-ui-core

`weimo-ui-core` 是独立的基础组件包，拥有全局 token、语义样式变体、Surface、基础控件、布局壳和通用行为。它不依赖其他 `weimo-ui` workspace 包。

包发布编译后的 ESM、类型声明和 CSS，并通过显式子路径导出组件、样式和工具；包根不提供 `.` 导出。

组件文档与交互预览：<https://jiaowenjun.github.io/weimo-ui-core/>

## 安装

```bash
pnpm add weimo-ui-core @base-ui/react react react-dom
```

## 主要入口

| 分类 | 入口 |
| --- | --- |
| Token | `styles/tokens.css` |
| 材质 | `components/card-surface`、`frosted-surface`、`popup-surface` |
| 按钮与控件 | `components/text-button`、`capsule-button`、`frosted-icon-button`、`ghost-icon-button`、`slider` |
| 卡片与预览 | `components/base-card`、`component-preview-card`、`frosted-preview-card` |
| 组合组件 | `components/menu`、`action-dialog` |
| 布局 | `components/sidebar`、`top-bar`、`bottom-bar`、`float-bar` |
| 样式变体 | `components/font-size`、`text-color`、`bg-color`、`bg-blur`、`border-color`、`border-radius`、`pressable` |
| 通用行为 | `components/animated-inline-size`、`lib/use-infinite-list-sentinel` |
| 基础适配 | `components/coss/*` |

完整可导入路径以本包 `package.json#exports` 为准。包根不提供 `.` 导出。

## 使用

```tsx
import { FrostedSurface } from 'weimo-ui-core/components/frosted-surface'
import { SideBar } from 'weimo-ui-core/components/sidebar'
import { TextButton } from 'weimo-ui-core/components/text-button'
```

应用入口加载一次全局 token：

```ts
import 'weimo-ui-core/styles/tokens.css'
```

组件会导入自身样式。单独的 `styles/*` 入口用于 Registry、手动样式组合和不加载组件实现的场景。

## 依赖边界

- 不依赖 `weimo-ui-card`、`weimo-ui-image`、`weimo-ui-markdown`、`weimo-ui-stats`、`weimo-ui-tagtree` 或站点包。
- 组件族内部使用相对导入；跨组件族使用 `weimo-ui-core/components/*`、`styles/*` 或 `lib/*`。
- 基础适配层只封装 Base UI 等通用原语，不承载业务数据和页面流程。
- 下游包只能通过显式子路径消费 core，不能引用 `src` 物理路径。

## 源码结构

```text
src/
├── behaviors/             # 可跨组件复用的交互与测量行为
├── components/
│   ├── primitives/        # Base UI 等基础适配层
│   ├── surfaces/          # 卡片、弹层和磨砂材质
│   ├── controls/          # 按钮、胶囊和滑块
│   ├── layout/            # 栏位与响应式侧栏
│   └── composites/        # 菜单、对话框、模式按钮和卡片壳
├── lib/                   # 无 UI 所有权的通用工具
└── styles/                # 全局 token 与语义样式变体
```

同一组件族的实现、模型和 CSS 放在同一目录。发布时保持这套目录结构到 `dist/`，公开子路径不暴露 `src` 物理路径。

## 验证

```bash
pnpm install
pnpm verify
npm pack --dry-run
```

`verify` 会检查类型、构建产物、公开入口和类型声明解析；组件的公开入口和依赖边界以本仓库的 `package.json#exports` 为准。

## 文档站

```bash
pnpm site:dev
pnpm site:build
pnpm site:preview
```

文档站位于 `site/`，只通过本包公开子路径消费组件。推送到 `main` 后，GitHub Actions 会构建并部署到 GitHub Pages。

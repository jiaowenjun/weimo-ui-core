# weimo-ui-core site

`site` 是 `weimo-ui-core` 的文档与组件预览应用。它通过组件包公开入口展示 Core 组件，并复用 `weimo-ui-template` 提供的导航、主题切换、响应式壳层和预览卡片。

## 开发

从仓库根目录运行：

```bash
pnpm site:dev
pnpm site:build
pnpm site:preview
```

本地开发地址为 `http://localhost:4176/weimo-ui-core/`。

站点只依赖 `weimo-ui-core` 的公开子路径；可复用组件应保留在根包 `src/` 中，不放入站点源码。

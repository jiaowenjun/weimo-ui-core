# weimo-ui-core site

`site` 是 `weimo-ui-core` 的文档与组件预览应用，复用组件包公开入口，负责组件目录、搜索、主题切换和 GitHub Pages 展示。

## 开发

从仓库根目录运行：

```bash
pnpm site:dev
pnpm site:build
pnpm site:preview
```

本地开发地址为 `http://localhost:4176/weimo-ui-core/`。

站点只依赖 `weimo-ui-core` 的公开子路径；可复用组件应保留在根包 `src/` 中，不放入站点源码。

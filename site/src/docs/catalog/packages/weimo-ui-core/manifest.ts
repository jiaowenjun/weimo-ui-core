import type { PackageCatalog } from '../../types'

export const coreCatalog = {
  id: 'weimo-ui-core',
  title: 'weimo-ui-core',
  pages: [
    {
      id: 'text-tokens',
      name: '文字样式',
      registryName: 'font-size',
      packageExport: './components/font-size',
      components: [
        { id: 'text-color', name: '字色', registryName: 'text-color', packageExport: './components/text-color' },
      ],
    },
    {
      id: 'background-tokens',
      name: '背景样式',
      registryName: 'bg-color',
      packageExport: './components/bg-color',
      components: [
        { id: 'bg-blur', name: '背景模糊度', registryName: 'bg-blur', packageExport: './components/bg-blur' },
        { id: 'pressable', name: '按压反馈色', registryName: 'pressable', packageExport: './components/pressable' },
      ],
    },
    {
      id: 'border-tokens',
      name: '边框样式',
      registryName: 'border-color',
      packageExport: './components/border-color',
      components: [
        { id: 'border-radius', name: '边框圆角', registryName: 'border-radius', packageExport: './components/border-radius' },
      ],
    },
    {
      id: 'surface',
      name: '材质',
      registryName: 'card-surface',
      packageExport: './components/card-surface',
      components: [
        { id: 'frosted-surface', name: 'FrostedSurface', registryName: 'frosted-surface', packageExport: './components/frosted-surface' },
        { id: 'popup-surface', name: 'PopupSurface', registryName: 'popup-surface', packageExport: './components/popup-surface' },
      ],
    },
    { id: 'base-card', name: '基础卡片', exportName: 'BaseCard', registryName: 'base-card', packageExport: './components/base-card' },
    {
      id: 'component-preview-card',
      name: '预览卡片',
      exportName: 'ComponentPreviewCard',
      registryName: 'component-preview-card',
      packageExport: './components/component-preview-card',
      components: [
        { id: 'glass-preview-card', name: 'GlassPreviewCard', registryName: 'glass-preview-card', packageExport: './components/glass-preview-card' },
      ],
    },
    {
      id: 'button',
      name: '按钮',
      exportName: 'TextButton',
      registryName: 'text-button',
      packageExport: './components/text-button',
      components: [
        { id: 'frosted-icon-button', name: 'FrostedIconButton', registryName: 'frosted-icon-button', packageExport: './components/frosted-icon-button' },
        { id: 'frosted-icon-button-group', name: 'FrostedIconButtonGroup', registryName: 'frosted-icon-button-group', packageExport: './components/frosted-icon-button-group' },
        { id: 'ghost-icon-button', name: 'GhostIconButton', registryName: 'ghost-icon-button', packageExport: './components/ghost-icon-button' },
      ],
    },
    { id: 'capsule-button', name: '按钮胶囊', exportName: 'CapsuleButton', registryName: 'capsule-button', packageExport: './components/capsule-button' },
    { id: 'labeled-switch', name: '开关', exportName: 'LabeledSwitch', registryName: 'labeled-switch', packageExport: './components/labeled-switch' },
    { id: 'slider', name: '滑块', exportName: 'Slider', registryName: 'slider', packageExport: './components/slider' },
    { id: 'menu', name: '菜单', exportName: 'Menu', registryName: 'menu', packageExport: './components/menu' },
    { id: 'action-dialog', name: '对话框', exportName: 'ActionDialog', registryName: 'action-dialog', packageExport: './components/action-dialog' },
    {
      id: 'bar',
      name: '浮动栏',
      exportName: 'FloatBar',
      registryName: 'float-bar',
      packageExport: './components/float-bar',
      components: [
        { id: 'bottom-bar', name: 'BottomBar', registryName: 'bottom-bar', packageExport: './components/bottom-bar' },
        { id: 'frosted-label', name: 'FrostedLabel', registryName: 'frosted-label', packageExport: './components/frosted-label' },
        { id: 'top-bar', name: 'TopBar', registryName: 'top-bar', packageExport: './components/top-bar' },
      ],
    },
    { id: 'sidebar', name: '侧边栏', exportName: 'SideBar', registryName: 'sidebar', packageExport: './components/sidebar' },
  ],
} as const satisfies PackageCatalog

export const borderRadiusScaleMap = {
  base: {
    label: '基础圆角',
    token: '--radius',
    value: '16px',
    description: 'shadcn 兼容基础圆角，统一承载基础面板、卡片容器、菜单弹层和应用级外壳。',
    uiUsage: 'ImageUploader、ImageView、OcrDetail、Menu popup',
    bijiUsage: 'Auth shell、memo-list 状态块、筛选条容器',
  },
  xs: {
    label: '细小圆角',
    token: '--radius-xs',
    value: '4px',
    description: '小型焦点框、热力单元和紧凑代码片段使用的最小圆角。',
    uiUsage: 'Breadcrumb focus、Heatmap cell、Markdown inline code',
    bijiUsage: '继承 ui/styles/tokens.css，暂无独立使用',
  },
  sm: {
    label: '小圆角',
    token: '--radius-sm',
    value: '8px',
    description: '按钮、菜单项、输入框和小型提示面板的默认圆角。',
    uiUsage: 'Button、Menu item、Tabs、Tooltip、TagTree item',
    bijiUsage: 'Form controls、Auth error',
  },
  round: {
    label: '胶囊圆角',
    token: '--radius-round',
    value: '999px',
    description: '胶囊、圆形图标按钮、头像按钮和骨架条使用的完全圆角。',
    uiUsage: 'CapsuleButton / TagBread、FrostedIconButton / GhostIconButton、TagPicker check、ScrollArea thumb',
    bijiUsage: 'Toolbar icon button、memo-list skeleton',
  },
} as const

export type BorderRadiusScale = keyof typeof borderRadiusScaleMap

export const borderRadiusScales: BorderRadiusScale[] = ['xs', 'sm', 'base', 'round']

export function getBorderRadiusToken(scale: BorderRadiusScale) {
  return borderRadiusScaleMap[scale].token
}

export function getBorderRadiusValue(scale: BorderRadiusScale) {
  return borderRadiusScaleMap[scale].value
}

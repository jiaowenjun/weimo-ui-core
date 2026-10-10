import './font-size.css'

export const fontSizeScaleMap = {
  '2xs': {
    label: '极小字号',
    token: '--font-size-2xs',
    value: '10px',
    className: 'font-size--2xs',
    description: '密集数据单元、极窄状态标记和热力图辅助文字使用的最小字号。',
    uiUsage: 'Heatmap cell、Pressable state chip',
    bijiUsage: '继承 ui/styles/tokens.css，暂无稳定业务使用',
  },
  xs: {
    label: '辅助字号',
    token: '--font-size-xs',
    value: '12px',
    className: 'font-size--xs',
    description: '说明、快捷键、提示和较弱的状态信息使用的辅助字号。',
    uiUsage: 'Menu helper、Tooltip、ImageUploader description、Markdown inline code',
    bijiUsage: 'form help/error、workspace memo detail meta',
  },
  sm: {
    label: '紧凑字号',
    token: '--font-size-sm',
    value: '13px',
    className: 'font-size--sm',
    description: '小型控件、标签、列表元信息和菜单项的紧凑阅读字号。',
    uiUsage: 'CardTopBar、CapsuleButton、TagPicker、Table、Markdown meta',
    bijiUsage: 'side bar label、RefCard、form label、auth secondary text',
  },
  md: {
    label: '控件字号',
    token: '--font-size-md',
    value: '14px',
    className: 'font-size--md',
    description: '标准控件、表格和中级 Markdown 标题使用的字号。',
    uiUsage: 'Button、Tabs、Table、Markdown h2/h3',
    bijiUsage: 'auth base text',
  },
  base: {
    label: '正文字号',
    token: '--font-size-base',
    value: '16px',
    className: 'font-size--base',
    description: '笔记正文、输入正文和主要内容区默认使用的阅读字号。',
    uiUsage: 'Card、Md、TagBread、ImageUploader title、TagTree',
    bijiUsage: 'app root、memo body、form input、side bar title',
  },
  lg: {
    label: '强调字号',
    token: '--font-size-lg',
    value: '17px',
    className: 'font-size--lg',
    description: '弹层标题和关键操作标题使用的轻强调字号。',
    uiUsage: 'ActionDialog title、Dialog title',
    bijiUsage: '继承 ui/styles/tokens.css，暂无稳定业务使用',
  },
  xl: {
    label: '大字号',
    token: '--font-size-xl',
    value: '18px',
    className: 'font-size--xl',
    description: '需要比默认正文更醒目的阅读内容和局部标题使用。',
    uiUsage: '开放给业务侧的强调阅读场景',
    bijiUsage: '继承 ui/styles/tokens.css，暂无稳定业务使用',
  },
  stat: {
    label: '统计字号',
    token: '--font-size-stat',
    value: '28px',
    className: 'font-size--stat',
    description: '统计组件和展示型标题中的核心数值，作为最大字号档位。',
    uiUsage: 'StatGroup value、coss Card frame title',
    bijiUsage: 'side bar day count',
  },
} as const

export type FontSizeScale = keyof typeof fontSizeScaleMap

export const fontSizeScales = Object.keys(fontSizeScaleMap) as FontSizeScale[]

export function getFontSizeClassName(scale: FontSizeScale) {
  return fontSizeScaleMap[scale].className
}

export function getFontSizeToken(scale: FontSizeScale) {
  return fontSizeScaleMap[scale].token
}

export function getFontSizeValue(scale: FontSizeScale) {
  return fontSizeScaleMap[scale].value
}

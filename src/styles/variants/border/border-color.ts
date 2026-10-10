import './border-color.css'

export const borderColorToneMap = {
  disable: {
    label: '禁用边框',
    token: '--color-border-disabled',
    value: {
      light: 'hsl(0 0% 92%)',
      dark: 'hsl(0 0% 24%)',
    },
    className: 'border-color--disable',
    description: '禁用控件边界，用于保留轮廓但降低可操作暗示。',
    uiUsage: 'FrostedIconButton disabled outline、disabled control boundary',
    bijiUsage: '继承 shared 禁用边框语义',
  },
  divider: {
    label: '分隔边框',
    token: '--color-border-divider',
    value: {
      light: 'hsl(0 0% 88%)',
      dark: 'hsl(0 0% 28%)',
    },
    className: 'border-color--divider',
    description: '低对比内部分隔线，用于内容结构线、树形 guide line 和非交互辅助线。',
    uiUsage: 'TagTree guide line、Menu separator、Coss Card/Dialog/Command/Table divider、Markdown inline code/table outer/table cell/hr divider',
    bijiUsage: '继承 shared 内部分隔线',
  },
  default: {
    label: '默认边框',
    token: '--color-border',
    value: {
      light: 'hsl(0 0% 90%)',
      dark: 'hsl(0 0% 20%)',
    },
    className: 'border-color--default',
    description: '默认 surface 外框和控件边界，用于区分容器与页面背景。',
    uiUsage: 'Card/SideBar/docs preview surface、MdEditor、Coss button outline、Markdown pre/image border、FrostedSurface border',
    bijiUsage: 'Form controls、Auth shell、memo-list state、RefCard',
  },
  emphasis: {
    label: '强调边框',
    token: '--color-border-emphasis',
    value: {
      light: 'hsl(0 0% 68%)',
      dark: 'hsl(0 0% 50%)',
    },
    className: 'border-color--emphasis',
    description: '中性增强边界，用于 hover、focus-within 和被动可交互轮廓。',
    uiUsage: 'PopupSurface dark stroke、neutral hover boundary、Coss Button neutral hover、ImageUploader dashed base',
    bijiUsage: 'Form controls hover',
  },
  accent: {
    label: '高亮边框',
    token: '--color-border-accent',
    value: {
      light: 'hsl(0 0% 35%)',
      dark: 'hsl(0 0% 75%)',
    },
    className: 'border-color--accent',
    description: '意图高亮边界，用于主动作、选中态、键盘焦点和输入 focus。',
    uiUsage: 'primary action/selected/keyboard focus、Coss Button default/focus、ImageUploader hover、MdEditor selected node',
    bijiUsage: 'Form controls accent/focus outline',
  },
  danger: {
    label: '危险边框',
    token: '--color-border-danger',
    value: {
      light: 'hsl(4 77% 40%)',
      dark: 'hsl(7 100% 74%)',
    },
    className: 'border-color--danger',
    description: '错误、校验失败和破坏性状态的风险边界。',
    uiUsage: 'MdEditor error border',
    bijiUsage: 'Auth error border',
  },
} as const

// 磨砂材质（FrostedSurface 家族）的描边 token 镜像。token 名沿袭 --frosted-surface-*
// 前缀（玻璃材质时代命名），现仅磨砂材质消费；--frosted-surface-border 随主题翻转，
// 是采样插值接管前的回退描边色。值镜像 tokens.css，改动须两处同步。
export const frostedSurfaceBorderColorMap = {
  default: {
    token: '--frosted-surface-border',
    value: {
      light: 'hsl(0 0% 80%)',
      dark: 'hsl(0 0% 38%)',
    },
  },
} as const

export type BorderColorTone = keyof typeof borderColorToneMap

export const borderColorTones = Object.keys(borderColorToneMap) as BorderColorTone[]

export function getBorderColorClassName(tone: BorderColorTone) {
  return borderColorToneMap[tone].className
}

export function getBorderColorToken(tone: BorderColorTone) {
  return borderColorToneMap[tone].token
}

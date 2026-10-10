import './bg-color.css'

export const bgColorToneMap = {
  page: {
    label: '页面底色',
    token: '--color-bg-page',
    value: {
      light: 'hsl(40 16% 96%)',
      dark: 'hsl(0 0% 7%)',
    },
    className: 'bg-color--page',
    description: '应用根背景、Markdown 表格区域和页面级留白。',
    uiUsage: 'body、Markdown table、Coss table',
    bijiUsage: 'body、app-shell 页面底色',
  },
  card: {
    label: '卡片底色',
    token: '--color-bg-card',
    value: {
      light: 'hsl(0 0% 100%)',
      dark: 'hsl(0 0% 12%)',
    },
    className: 'bg-color--card',
    description: '卡片、弹层、表单和主要内容容器的基础底色。',
    uiUsage: 'Card、Dialog、Menu popup、Tooltip、SideBar',
    bijiUsage: 'RefCard、Auth shell、Form controls',
  },
  raised: {
    label: '抬升底色',
    token: '--color-bg-raised',
    value: {
      light: 'hsl(40 10% 93%)',
      dark: 'hsl(0 0% 17%)',
    },
    className: 'bg-color--raised',
    description: '比卡片更弱的抬升面，用于输入区、激活态和骨架动画。',
    uiUsage: 'MdEditor toolbar、Tabs active、Markdown code',
    bijiUsage: 'memo-list skeleton、继承 shared MdEditor',
  },
  primary: {
    label: '主动作填充',
    token: '--color-bg-primary',
    value: {
      light: 'hsl(0 0% 15%)',
      dark: 'hsl(0 0% 96%)',
    },
    className: 'bg-color--primary',
    description: '主按钮和确认动作使用的最高层级填充色。',
    uiUsage: 'Coss Button default',
    bijiUsage: 'Form controls primary button',
  },
  hover: {
    label: '通用 hover',
    token: '--color-bg-hover',
    value: {
      light: 'hsl(40 12% 90%)',
      dark: 'hsl(0 0% 21%)',
    },
    className: 'bg-color--hover',
    description: '普通列表项、chip、菜单项、数学节点和轻量按钮的 hover 底色。',
    uiUsage: 'CapsuleButton、TagPicker option、Command item、Markdown math',
    bijiUsage: 'WorkspaceFilterBar close、Form controls hover',
  },
  'hover-on-hover': {
    label: '叠加 hover',
    token: '--color-bg-nested-hover',
    value: {
      light: 'hsl(40 12% 84%)',
      dark: 'hsl(0 0% 28%)',
    },
    className: 'bg-color--hover-on-hover',
    description: '已处于 hover 底色上的内部按钮再次 hover 时使用，保留嵌套反馈层级。',
    uiUsage: 'TagTreeRow toggle、TagTreeRow menu trigger',
    bijiUsage: '通过 shared TagTreeRow 继承',
  },
  selected: {
    label: '选中底色',
    token: '--color-bg-selected',
    value: {
      light: 'hsl(40 10% 94%)',
      dark: 'hsl(0 0% 15%)',
    },
    className: 'bg-color--selected',
    description: '组件内部轻量选中态和低强度状态面。',
    uiUsage: 'TagTree selected row',
    bijiUsage: '继承 ui/styles/tokens.css，暂无独立覆盖',
  },
} as const

export type BgColorTone = keyof typeof bgColorToneMap

export const bgColorTones = Object.keys(bgColorToneMap) as BgColorTone[]

export function getBgColorClassName(tone: BgColorTone) {
  return bgColorToneMap[tone].className
}

export function getBgColorToken(tone: BgColorTone) {
  return bgColorToneMap[tone].token
}

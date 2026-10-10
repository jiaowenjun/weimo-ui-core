import './text-color.css'

export const textColorToneMap = {
  primary: {
    label: '主文字',
    token: '--color-text-primary',
    value: {
      light: 'hsl(0 0% 9%)',
      dark: 'hsl(0 0% 98%)',
    },
    className: 'text-color--primary',
    description: '正文、卡片内容和默认阅读文本',
  },
  secondary: {
    label: '次级文字',
    token: '--color-text-secondary',
    value: {
      light: 'hsl(0 0% 28%)',
      dark: 'hsl(0 0% 64%)',
    },
    className: 'text-color--secondary',
    description: '说明、辅助信息和引用内容',
  },
  subtle: {
    label: '弱次级文字',
    token: '--color-text-subtle',
    value: {
      light: 'hsl(0 0% 48%)',
      dark: 'hsl(0 0% 49%)',
    },
    className: 'text-color--subtle',
    description: '分隔符、前缀和更轻的辅助标记',
  },
  placeholder: {
    label: '占位文字',
    token: '--color-text-placeholder',
    value: {
      light: 'hsl(0 0% 74%)',
      dark: 'hsl(0 0% 35%)',
    },
    className: 'text-color--placeholder',
    description: '输入占位、空状态提示和非主动作图标',
  },
  disable: {
    label: '禁用文字',
    token: '--color-text-disabled',
    value: {
      light: 'hsl(0 0% 56%)',
      dark: 'hsl(0 0% 42%)',
    },
    className: 'text-color--disable',
    description: '禁用控件、不可用动作和弱化交互提示',
  },
  danger: {
    label: '危险文字',
    token: '--color-text-danger',
    value: {
      light: 'hsl(4 77% 40%)',
      dark: 'hsl(7 100% 74%)',
    },
    className: 'text-color--danger',
    description: '破坏性操作、校验失败和风险提示',
  },
  inherit: {
    label: '继承文字',
    token: 'inherit',
    value: {
      light: 'inherit',
      dark: 'inherit',
    },
    className: 'text-color--inherit',
    description: '让子元素继承调用方或父容器的文字色',
  },
} as const

export type TextColorTone = keyof typeof textColorToneMap

export const textColorTones = Object.keys(textColorToneMap) as TextColorTone[]

export function getTextColorClassName(tone: TextColorTone) {
  return textColorToneMap[tone].className
}

export function getTextColorToken(tone: TextColorTone) {
  return textColorToneMap[tone].token
}

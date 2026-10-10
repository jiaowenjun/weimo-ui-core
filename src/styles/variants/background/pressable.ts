import {
  bgColorToneMap,
  getBgColorClassName,
  getBgColorToken,
  type BgColorTone,
} from './bg-color'

type PressableBgColorTone = Extract<
  BgColorTone,
  | 'hover'
>

export const pressableToneMap = {
  feedback: {
    label: '反馈背景',
    bgColorTone: 'hover',
    token: bgColorToneMap['hover'].token,
    value: bgColorToneMap['hover'].value,
    className: getBgColorClassName('hover'),
    description: 'Ghost 图标按钮、列表项和轻量 app 控件共用的 hover/active 反馈背景。',
    uiUsage: 'GhostIconButton、TagPicker option、TagTree row、CapsuleButton',
    bijiUsage: '继承 shared TagPicker、TagTree、GhostIconButton；app-local controls 复用 --color-bg-hover 语义，具体值可由 app 覆盖',
  },
} satisfies Record<string, {
  label: string
  bgColorTone: PressableBgColorTone
  token: string
  value: { light: string; dark: string }
  className: string
  description: string
  uiUsage: string
  bijiUsage: string
}>

export type PressableTone = keyof typeof pressableToneMap

export const pressableTones = Object.keys(pressableToneMap) as PressableTone[]

export function getPressableClassName(tone: PressableTone) {
  return pressableToneMap[tone].className
}

export function getPressableToken(tone: PressableTone) {
  return getBgColorToken(pressableToneMap[tone].bgColorTone)
}

export function getPressableBgColorTone(tone: PressableTone) {
  return pressableToneMap[tone].bgColorTone
}

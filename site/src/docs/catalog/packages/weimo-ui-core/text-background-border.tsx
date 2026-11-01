import {
  fontSizeScales,
  getFontSizeClassName,
  getFontSizeToken,
  getFontSizeValue,
} from 'weimo-ui-core/components/font-size'
import {
  getTextColorClassName,
  getTextColorToken,
  textColorToneMap,
  textColorTones,
} from 'weimo-ui-core/components/text-color'
import {
  bgBlurTones,
  getBgBlurBlurToken,
  getBgBlurBlurValue,
  getBgBlurClassName,
} from 'weimo-ui-core/components/bg-blur'
import {
  bgColorToneMap,
  getBgColorClassName,
  getBgColorToken,
  type BgColorTone,
} from 'weimo-ui-core/components/bg-color'
import {
  borderColorToneMap,
  frostedSurfaceBorderColorMap,
  getBorderColorClassName,
  getBorderColorToken,
} from 'weimo-ui-core/components/border-color'
import {
  borderRadiusScales,
  getBorderRadiusToken,
  getBorderRadiusValue,
} from 'weimo-ui-core/components/border-radius'
import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import {
  FrostedPreviewCard,
  frostedBackgroundGrayMidpoint,
} from 'weimo-ui-core/components/frosted-preview-card'
import {
  FrostedSurface,
  useFrostedSurfaceBackgroundToneRef,
} from 'weimo-ui-core/components/frosted-surface'
import {
  frostedSurfaceBorderAnchorMap,
} from 'weimo-ui-core/components/frosted-surface-model'
import type { ComponentDefinition } from '../../component-docs'
import { useIsDarkTheme } from '../../../previews/token-preview-color'

// —— 文字 ——

const previewTextColorTones = textColorTones.filter((tone) => tone !== 'inherit')

const textColorToneOrder = [
  'primary',
  'secondary',
  'subtle',
  'disable',
  'placeholder',
  'danger',
] as const

const fontFamilyTokens = [
  {
    label: '无衬线字体',
    token: '--font-sans',
    value: 'Segoe UI',
    className: 'typography-preview__sample--font-sans',
  },
  {
    label: '等宽字体',
    token: '--font-mono',
    value: 'SFMono-Regular',
    className: 'typography-preview__sample--font-mono',
  },
] as const

// Docs definitions intentionally colocate preview components with exported page metadata.
function FontPreview() {
  const orderedTextColorTones = textColorToneOrder.filter((tone) =>
    previewTextColorTones.includes(tone),
  )

  return (
    <>
      <ComponentPreviewCard
        items={orderedTextColorTones.map((tone) => ({
          darkValue: textColorToneMap[tone].value.dark,
          token: getTextColorToken(tone),
          value: textColorToneMap[tone].value.light,
        }))}
        label="字色"
      >
        <div aria-hidden="true" className="text-color-preview__samples">
          {orderedTextColorTones.map((tone) => (
            <p className={`text-color-preview__sample ${getTextColorClassName(tone)}`} key={tone}>
              Aa
            </p>
          ))}
        </div>
      </ComponentPreviewCard>

      <ComponentPreviewCard
        items={fontSizeScales.map((scale) => ({
          token: getFontSizeToken(scale),
          value: getFontSizeValue(scale),
        }))}
        label="字号"
      >
        <div aria-hidden="true" className="font-size-preview__samples">
          {fontSizeScales.map((scale) => (
            <p
              className={`font-size-preview__sample ${getFontSizeClassName(scale)}${
                getFontSizeToken(scale) === '--font-size-base'
                  ? ' font-size-preview__sample--base'
                  : ''
              }`}
              key={scale}
            >
              Aa
            </p>
          ))}
        </div>
      </ComponentPreviewCard>

      <ComponentPreviewCard
        items={fontFamilyTokens.map((font) => ({
          token: font.token,
          value: font.value,
        }))}
        label="字体"
      >
        <div aria-hidden="true" className="typography-preview__samples">
          {fontFamilyTokens.map((font) => (
            <div className={`typography-preview__sample ${font.className}`} key={font.token}>
              Aa 0123 汉字
            </div>
          ))}
        </div>
      </ComponentPreviewCard>
    </>
  )
}

// —— 背景 ——

// 合并 swatch 卡固定语义顺序,不做亮度排序;唯一例外:亮主题下 card 与 page 互换,
// 让色块亮度序列在两主题下都单调(亮 card 100%→page 96%→…,暗 page 7%→card 12%→…)。
const bgColorSwatchTones = [
  'page',
  'card',
  'selected',
  'raised',
  'hover',
  'hover-on-hover',
  'primary',
] as const satisfies readonly BgColorTone[]

function BgColorPreview() {
  const isDark = useIsDarkTheme()
  const swatchTones = isDark
    ? bgColorSwatchTones
    : [bgColorSwatchTones[1], bgColorSwatchTones[0], ...bgColorSwatchTones.slice(2)]

  return (
    <>
      <ComponentPreviewCard
        items={swatchTones.map((tone) => {
          const item = bgColorToneMap[tone]

          return {
            darkValue: item.value.dark,
            token: getBgColorToken(tone),
            value: item.value.light,
          }
        })}
        label="背景色"
      >
        <div className="bg-color-preview__swatch-canvas">
          <div aria-hidden="true" className="bg-color-preview__swatch-group">
            {swatchTones.map((tone) => (
              <span
                className={`bg-color-preview__swatch ${getBgColorClassName(tone)}`}
                key={tone}
              />
            ))}
          </div>
        </div>
      </ComponentPreviewCard>

      <FrostedPreviewCard
        initialGray={frostedBackgroundGrayMidpoint}
        items={bgBlurTones.map((tone) => ({
          token: getBgBlurBlurToken(tone),
          value: getBgBlurBlurValue(tone),
        }))}
        label="背景模糊度"
      >
        <div className="bg-blur-pair">
          {bgBlurTones.map((tone) => (
            <span
              aria-hidden="true"
              className={`bg-blur-pair__surface ${getBgBlurClassName(tone)}`}
              key={tone}
            />
          ))}
        </div>
      </FrostedPreviewCard>
    </>
  )
}

// —— 边框 ——

const borderColorToneOrder = [
  'default',
  'disable',
  'divider',
  'emphasis',
  'accent',
  'danger',
] as const

// 磨砂边框插值锚点展示顺序：沿感知亮度轴从纯黑背景到纯白背景（暗段→亮段）。
const frostedBorderAnchorOrder = [
  'darkStart',
  'darkEnd',
  'lightStart',
  'lightEnd',
] as const satisfies readonly (keyof typeof frostedSurfaceBorderAnchorMap)[]

// 卡片行序：插值四锚点沿感知亮度轴在前，主题回退殿后；四锚点方片为画布上方静态示例，
// 主题回退的活体示例=画布内方形磨砂材质（边框色随灰度采样插值动态变化）。
const frostedBorderAnchorTokens = frostedBorderAnchorOrder.map(
  (anchor) => frostedSurfaceBorderAnchorMap[anchor].token,
)

// --frosted-surface-border 行的色值实时跟随画布内磨砂瓦片：透明探针 wrapper 与瓦片同
// 矩形采样（采样排除探针自身子树，读到的正是画布条纹，与瓦片内部插值同源）；采样
// 前或采样失败回退 token 主题值。
function FrostedBorderColorPreview() {
  const { backgroundStyle, setElementRef } =
    useFrostedSurfaceBackgroundToneRef<HTMLDivElement>(true)
  const liveBorderColor = (
    backgroundStyle as
      | ({ '--frosted-surface-border'?: string } & typeof backgroundStyle)
      | undefined
  )?.['--frosted-surface-border'] ?? null

  return (
    <FrostedPreviewCard
      aboveCanvas={
        <div aria-hidden="true" className="frosted-border-preview__row">
          {frostedBorderAnchorTokens.map((token) => (
            <div
              className="frosted-border-preview__sample"
              key={token}
              style={{ borderColor: `var(${token})` }}
            />
          ))}
        </div>
      }
      className="frosted-border-preview"
      items={[
        ...frostedBorderAnchorOrder.map((anchor) => ({
          token: frostedSurfaceBorderAnchorMap[anchor].token,
          value: frostedSurfaceBorderAnchorMap[anchor].value,
        })),
        {
          darkValue: liveBorderColor ?? frostedSurfaceBorderColorMap.default.value.dark,
          token: frostedSurfaceBorderColorMap.default.token,
          value: liveBorderColor ?? frostedSurfaceBorderColorMap.default.value.light,
        },
      ]}
      label="磨砂材质边框色"
    >
      <div className="frosted-border-preview__probe" ref={setElementRef}>
        <FrostedSurface aria-hidden="true" bordered className="frosted-border-preview__tile" />
      </div>
    </FrostedPreviewCard>
  )
}

function BorderColorPreview() {
  return (
    <>
      <ComponentPreviewCard
        items={borderRadiusScales.map((scale) => ({
          token: getBorderRadiusToken(scale),
          value: getBorderRadiusValue(scale),
        }))}
        label="圆角"
      >
        <div aria-hidden="true" className="border-radius-preview__samples">
          {borderRadiusScales.map((scale) => (
            <div
              className="border-radius-preview__sample"
              key={scale}
              style={{ borderRadius: `var(${getBorderRadiusToken(scale)})` }}
            />
          ))}
        </div>
      </ComponentPreviewCard>

      <ComponentPreviewCard
        items={borderColorToneOrder.map((tone) => ({
          darkValue: borderColorToneMap[tone].value.dark,
          token: getBorderColorToken(tone),
          value: borderColorToneMap[tone].value.light,
        }))}
        label="边框色"
      >
        <div aria-hidden="true" className="border-color-preview__samples">
          {borderColorToneOrder.map((tone) => (
            <div
              className={`border-color-preview__sample ${getBorderColorClassName(tone)}`}
              key={tone}
            />
          ))}
        </div>
      </ComponentPreviewCard>

      <FrostedBorderColorPreview />
    </>
  )
}

export const textBackgroundBorderDefinition = {
  id: 'text-background-border',
  status: 'Ready',
  frame: 'plain',
  preview: () => (
    <>
      <FontPreview />
      <BgColorPreview />
      <BorderColorPreview />
    </>
  ),
} satisfies ComponentDefinition

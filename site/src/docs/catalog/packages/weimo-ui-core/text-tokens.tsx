import {
  fontSizeScaleMap,
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
import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import type { ComponentDefinition } from '../../component-docs'

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

export const textTokensDefinition = {
  id: 'text-tokens',
  status: 'Ready',
  frame: 'plain',
  searchAliases: fontSizeScales.flatMap((scale) => {
    const item = fontSizeScaleMap[scale]

    return ['FontSize', '文字', '字体', '字号', scale, item.label, item.token, item.description, item.uiUsage, item.bijiUsage]
  }).concat(
    previewTextColorTones.flatMap((tone) => {
      const item = textColorToneMap[tone]

      return ['TextColor', '字色', tone, item.label, item.token, item.description]
    }),
  ).concat(
    fontFamilyTokens.flatMap((font) => ['FontFamily', '字体', '字型', font.token, font.label]),
  ),
  preview: () => <FontPreview />,
} satisfies ComponentDefinition

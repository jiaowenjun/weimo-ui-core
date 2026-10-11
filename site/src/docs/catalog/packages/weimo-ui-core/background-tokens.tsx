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
import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import {
  FrostedPreviewCard,
  frostedBackgroundGrayMidpoint,
} from 'weimo-ui-core/components/frosted-preview-card'
import type { ComponentDefinition } from '../../component-docs'
import { useIsDarkTheme } from '../../../previews/token-preview-color'

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

// Docs definitions intentionally colocate preview components with exported page metadata.
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

export const backgroundTokensDefinition = {
  id: 'background-tokens',
  status: 'Ready',
  frame: 'plain',
  preview: () => <BgColorPreview />,
} satisfies ComponentDefinition

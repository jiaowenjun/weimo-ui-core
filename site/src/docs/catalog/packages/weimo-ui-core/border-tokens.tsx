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
  FrostedSurface,
  useFrostedSurfaceBackgroundToneRef,
} from 'weimo-ui-core/components/frosted-surface'
import {
  frostedSurfaceBorderAnchorMap,
} from 'weimo-ui-core/components/frosted-surface-model'
import { GlassPreviewCard } from 'weimo-ui-core/components/glass-preview-card'
import type { ComponentDefinition } from '../../component-docs'

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
    <GlassPreviewCard
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
    </GlassPreviewCard>
  )
}

// Docs definitions intentionally colocate preview components with exported page metadata.
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

export const borderTokensDefinition = {
  id: 'border-tokens',
  status: 'Ready',
  frame: 'plain',
  preview: () => <BorderColorPreview />,
} satisfies ComponentDefinition

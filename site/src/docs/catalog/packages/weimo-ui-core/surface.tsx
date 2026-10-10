import { CardSurface } from 'weimo-ui-core/components/card-surface'
import { FrostedSurface } from 'weimo-ui-core/components/frosted-surface'
import { PopupSurface } from 'weimo-ui-core/components/popup-surface'
import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import type { ComponentDefinition } from '../../component-docs'
import { GlassPreviewCard } from 'weimo-ui-core/components/glass-preview-card'

function CardSurfacePreview() {
  return (
    <ComponentPreviewCard align="center" label="卡片材质">
      <div aria-hidden="true" className="card-surface-preview">
        <CardSurface className="card-surface-preview__tile">
          <span className="card-surface-preview__title">Card Surface</span>
          <span className="card-surface-preview__meta">亮主题细微阴影，暗主题边框描边</span>
        </CardSurface>
      </div>
    </ComponentPreviewCard>
  )
}

function PopupSurfacePreview() {
  return (
    <ComponentPreviewCard align="center" label="浮层材质">
      <div className="popup-surface-preview">
        <PopupSurface className="popup-surface-preview__tile">
          <span className="popup-surface-preview__title">Modal Surface</span>
          <span className="popup-surface-preview__meta">亮主题抬升投影，暗主题边框描边</span>
        </PopupSurface>
      </div>
    </ComponentPreviewCard>
  )
}

function FrostedSurfacePreview() {
  return (
    <GlassPreviewCard label="磨砂材质">
      <FrostedSurface bordered className="frosted-surface-preview__tile">
        <span className="frosted-surface-preview__title">Frosted Surface</span>
        <span className="frosted-surface-preview__meta">前景色随背景亮度自适应明暗</span>
      </FrostedSurface>
    </GlassPreviewCard>
  )
}

// Docs definitions intentionally colocate preview components with exported page metadata.
function SurfaceDemo() {
  return (
    <>
      <CardSurfacePreview />
      <PopupSurfacePreview />
      <FrostedSurfacePreview />
    </>
  )
}

export const surfaceDefinition = {
  id: 'surface',
  summary: '静态卡片、亮度自适应磨砂玻璃层与抬升浮层的材质总览',
  status: 'Preview',
  frame: 'plain',
  searchAliases: [
    'Surface',
    'CardSurface',
    'FrostedSurface',
    'PopupSurface',
    '材质',
    '卡片材质',
    '磨砂材质',
    '无边框',
    '浮层材质',
    '--color-text-primary',
    '--color-border',
    '--radius',
    '--color-bg-card',
    '--shadow-card',
  ],
  preview: () => <SurfaceDemo />,
} satisfies ComponentDefinition

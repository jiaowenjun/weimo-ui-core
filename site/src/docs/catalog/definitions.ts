import { textBackgroundBorderDefinition } from './packages/weimo-ui-core/text-background-border'
import { surfaceDefinition } from './packages/weimo-ui-core/surface'
import { baseCardDefinition } from './packages/weimo-ui-core/base-card'
import { componentPreviewCardDefinition } from './packages/weimo-ui-core/component-preview-card'
import { buttonDefinition } from './packages/weimo-ui-core/button'
import { capsuleButtonDefinition } from './packages/weimo-ui-core/capsule-button'
import { labeledSwitchDefinition } from './packages/weimo-ui-core/labeled-switch'
import { sliderDefinition } from './packages/weimo-ui-core/slider'
import { magicNumberDefinition } from './packages/weimo-ui-core/magic-number'
import { menuDefinition } from './packages/weimo-ui-core/menu'
import { actionDialogDefinition } from './packages/weimo-ui-core/action-dialog'
import { barDefinition } from './packages/weimo-ui-core/bar'
import { sidebarDefinition } from './packages/weimo-ui-core/sidebar'
import type { ComponentId } from './manifest'
import type { ComponentDefinition } from './types'

export const componentDefinitionsById = {
  'text-background-border': textBackgroundBorderDefinition,
  surface: surfaceDefinition,
  'base-card': baseCardDefinition,
  'component-preview-card': componentPreviewCardDefinition,
  button: buttonDefinition,
  'capsule-button': capsuleButtonDefinition,
  'labeled-switch': labeledSwitchDefinition,
  slider: sliderDefinition,
  'magic-number': magicNumberDefinition,
  menu: menuDefinition,
  'action-dialog': actionDialogDefinition,
  bar: barDefinition,
  sidebar: sidebarDefinition,
} satisfies Record<ComponentId, ComponentDefinition>

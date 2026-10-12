import { textTokensDefinition } from './packages/weimo-ui-core/text-tokens'
import { backgroundTokensDefinition } from './packages/weimo-ui-core/background-tokens'
import { borderTokensDefinition } from './packages/weimo-ui-core/border-tokens'
import { surfaceDefinition } from './packages/weimo-ui-core/surface'
import { baseCardDefinition } from './packages/weimo-ui-core/base-card'
import { fullscreenCardDefinition } from './packages/weimo-ui-core/fullscreen-card'
import { componentPreviewCardDefinition } from './packages/weimo-ui-core/component-preview-card'
import { buttonDefinition } from './packages/weimo-ui-core/button'
import { capsuleButtonDefinition } from './packages/weimo-ui-core/capsule-button'
import { labeledSwitchDefinition } from './packages/weimo-ui-core/labeled-switch'
import { sliderDefinition } from './packages/weimo-ui-core/slider'
import { menuDefinition } from './packages/weimo-ui-core/menu'
import { actionDialogDefinition } from './packages/weimo-ui-core/action-dialog'
import { barDefinition } from './packages/weimo-ui-core/bar'
import { sidebarDefinition } from './packages/weimo-ui-core/sidebar'
import type { ComponentId } from './manifest'
import type { ComponentDefinition } from './types'

export const componentDefinitionsById = {
  'text-tokens': textTokensDefinition,
  'background-tokens': backgroundTokensDefinition,
  'border-tokens': borderTokensDefinition,
  surface: surfaceDefinition,
  'base-card': baseCardDefinition,
  'fullscreen-card': fullscreenCardDefinition,
  'component-preview-card': componentPreviewCardDefinition,
  button: buttonDefinition,
  'capsule-button': capsuleButtonDefinition,
  'labeled-switch': labeledSwitchDefinition,
  slider: sliderDefinition,
  menu: menuDefinition,
  'action-dialog': actionDialogDefinition,
  bar: barDefinition,
  sidebar: sidebarDefinition,
} satisfies Record<ComponentId, ComponentDefinition>

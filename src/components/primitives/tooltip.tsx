import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'

import { getPopupSurfaceClassName } from 'weimo-ui-core/components/popup-surface'
import { cn } from 'weimo-ui-core/lib/utils'

import './tooltip.css'

type WithStringClassName<T> = Omit<T, 'className'> & {
  className?: string
}

type TooltipPopupPositionerProps = Pick<
  BaseTooltip.Positioner.Props,
  | 'align'
  | 'alignOffset'
  | 'anchor'
  | 'collisionAvoidance'
  | 'collisionBoundary'
  | 'collisionPadding'
  | 'disableAnchorTracking'
  | 'positionMethod'
  | 'side'
  | 'sideOffset'
  | 'sticky'
>

export type TooltipProviderProps = BaseTooltip.Provider.Props

export function TooltipProvider(props: TooltipProviderProps) {
  return <BaseTooltip.Provider {...props} />
}

export type TooltipProps<Payload = unknown> = BaseTooltip.Root.Props<Payload>

export function Tooltip<Payload = unknown>(props: TooltipProps<Payload>) {
  return <BaseTooltip.Root {...props} />
}

export type TooltipTriggerProps<Payload = unknown> = WithStringClassName<
  BaseTooltip.Trigger.Props<Payload>
>

export function TooltipTrigger<Payload = unknown>({
  className,
  ...props
}: TooltipTriggerProps<Payload>) {
  return (
    <BaseTooltip.Trigger
      className={cn('coss-tooltip__trigger', className)}
      data-slot="tooltip-trigger"
      {...props}
    />
  )
}

export type TooltipPopupProps = WithStringClassName<BaseTooltip.Popup.Props> &
  TooltipPopupPositionerProps & {
    portalProps?: BaseTooltip.Portal.Props
  }

export function TooltipPopup({
  align = 'center',
  alignOffset,
  anchor,
  className,
  collisionAvoidance,
  collisionBoundary,
  collisionPadding,
  disableAnchorTracking,
  portalProps,
  positionMethod,
  side = 'top',
  sideOffset = 6,
  sticky,
  ...props
}: TooltipPopupProps) {
  return (
    <BaseTooltip.Portal {...portalProps}>
      <BaseTooltip.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="coss-tooltip__positioner"
        collisionAvoidance={collisionAvoidance}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
        data-slot="tooltip-positioner"
        disableAnchorTracking={disableAnchorTracking}
        positionMethod={positionMethod}
        side={side}
        sideOffset={sideOffset}
        sticky={sticky}
      >
        <BaseTooltip.Popup
          className={getPopupSurfaceClassName('tooltip', 'coss-tooltip__popup', className)}
          data-slot="tooltip-popup"
          {...props}
        />
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  )
}

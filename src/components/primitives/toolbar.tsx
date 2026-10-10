import { Toolbar as ToolbarPrimitive } from '@base-ui/react/toolbar'
import type { ReactElement } from 'react'

import { cn } from 'weimo-ui-core/lib/utils'

export function Toolbar({
  className,
  ...props
}: ToolbarPrimitive.Root.Props): ReactElement {
  return (
    <ToolbarPrimitive.Root
      className={cn('coss-toolbar', className)}
      data-slot="toolbar"
      {...props}
    />
  )
}

export function ToolbarButton({
  className,
  ...props
}: ToolbarPrimitive.Button.Props): ReactElement {
  return (
    <ToolbarPrimitive.Button
      className={cn(className)}
      data-slot="toolbar-button"
      {...props}
    />
  )
}

export function ToolbarLink({
  className,
  ...props
}: ToolbarPrimitive.Link.Props): ReactElement {
  return (
    <ToolbarPrimitive.Link
      className={cn(className)}
      data-slot="toolbar-link"
      {...props}
    />
  )
}

export function ToolbarInput({
  className,
  ...props
}: ToolbarPrimitive.Input.Props): ReactElement {
  return (
    <ToolbarPrimitive.Input
      className={cn(className)}
      data-slot="toolbar-input"
      {...props}
    />
  )
}

export function ToolbarGroup({
  className,
  ...props
}: ToolbarPrimitive.Group.Props): ReactElement {
  return (
    <ToolbarPrimitive.Group
      className={cn('coss-toolbar__group', className)}
      data-slot="toolbar-group"
      {...props}
    />
  )
}

export function ToolbarSeparator({
  className,
  ...props
}: ToolbarPrimitive.Separator.Props): ReactElement {
  return (
    <ToolbarPrimitive.Separator
      className={cn('coss-toolbar__separator', className)}
      data-slot="toolbar-separator"
      {...props}
    />
  )
}

export { ToolbarPrimitive }

import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import type { ComponentPropsWithoutRef } from 'react'

import { getPopupSurfaceClassName } from 'weimo-ui-core/components/popup-surface'
import { cn } from 'weimo-ui-core/lib/utils'

import './dialog.css'

type WithStringClassName<T> = Omit<T, 'className'> & {
  className?: string
}

export type DialogProps = BaseDialog.Root.Props

export function Dialog(props: DialogProps) {
  return <BaseDialog.Root {...props} />
}

export type DialogTriggerProps = WithStringClassName<BaseDialog.Trigger.Props>

export function DialogTrigger({ className, ...props }: DialogTriggerProps) {
  return (
    <BaseDialog.Trigger
      className={cn('coss-dialog__trigger', className)}
      data-slot="dialog-trigger"
      {...props}
    />
  )
}

export type DialogCloseProps = WithStringClassName<BaseDialog.Close.Props>

export function DialogClose({ className, ...props }: DialogCloseProps) {
  return (
    <BaseDialog.Close
      className={cn('coss-dialog__close', className)}
      data-slot="dialog-close"
      {...props}
    />
  )
}

export type DialogPopupProps = WithStringClassName<BaseDialog.Popup.Props> & {
  portalProps?: BaseDialog.Portal.Props
}

export function DialogPopup({
  children,
  className,
  portalProps,
  ...props
}: DialogPopupProps) {
  return (
    <BaseDialog.Portal {...portalProps}>
      <BaseDialog.Backdrop className="coss-dialog__backdrop" />
      <BaseDialog.Viewport className="coss-dialog__viewport">
        <BaseDialog.Popup
          className={getPopupSurfaceClassName('modal', 'coss-dialog__popup', className)}
          data-slot="dialog-popup"
          {...props}
        >
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  )
}

export type DialogHeaderProps = ComponentPropsWithoutRef<'div'>

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      className={cn('coss-dialog__header', className)}
      data-slot="dialog-header"
      {...props}
    />
  )
}

export type DialogTitleProps = WithStringClassName<BaseDialog.Title.Props>

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <BaseDialog.Title
      className={cn('coss-dialog__title', className)}
      data-slot="dialog-title"
      {...props}
    />
  )
}

export type DialogDescriptionProps = WithStringClassName<
  BaseDialog.Description.Props
>

export function DialogDescription({
  className,
  ...props
}: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      className={cn('coss-dialog__description', className)}
      data-slot="dialog-description"
      {...props}
    />
  )
}

export type DialogPanelProps = ComponentPropsWithoutRef<'div'>

export function DialogPanel({ className, ...props }: DialogPanelProps) {
  return (
    <div
      className={cn('coss-dialog__panel', className)}
      data-slot="dialog-panel"
      {...props}
    />
  )
}

export type DialogFooterProps = ComponentPropsWithoutRef<'div'>

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      className={cn('coss-dialog__footer', className)}
      data-slot="dialog-footer"
      {...props}
    />
  )
}

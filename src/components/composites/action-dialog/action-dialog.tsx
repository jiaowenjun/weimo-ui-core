import { X } from 'lucide-react'
import type { ReactNode } from 'react'

import { BottomBar } from 'weimo-ui-core/components/bottom-bar'
import {
  Dialog,
  DialogClose,
  DialogPopup,
  DialogTitle,
  type DialogPopupProps,
  type DialogProps,
} from 'weimo-ui-core/components/coss/dialog'
import { FloatBar } from 'weimo-ui-core/components/float-bar'
import { FrostedIconButton } from 'weimo-ui-core/components/frosted-icon-button'
import { cn } from 'weimo-ui-core/lib/utils'

import './action-dialog.css'

export type ActionDialogProps = DialogProps & {
  bottomBarClassName?: string
  bottomBarFrameClassName?: string
  bottomBarLabel?: string
  bottomBarLeftSlot?: ReactNode
  bottomBarLeftSlotClassName?: string
  bottomBarRightSlot?: ReactNode
  bottomBarRightSlotClassName?: string
  children: ReactNode
  className?: string
  closeLabel?: string
  floatBarClassName?: string
  floatBarFrameClassName?: string
  popupProps?: Omit<DialogPopupProps, 'children' | 'className'>
  showCloseButton?: boolean
  title: ReactNode
  titleClassName?: string
  toolbarLabel?: string
  toolbarRightSlot?: ReactNode
}

export function ActionDialog({
  bottomBarClassName,
  bottomBarFrameClassName,
  bottomBarLabel = '对话框底部操作栏',
  bottomBarLeftSlot,
  bottomBarLeftSlotClassName,
  bottomBarRightSlot,
  bottomBarRightSlotClassName,
  children,
  className,
  closeLabel = '关闭对话框',
  floatBarClassName,
  floatBarFrameClassName,
  popupProps,
  showCloseButton = true,
  title,
  titleClassName,
  toolbarLabel = '对话框工具栏',
  toolbarRightSlot,
  ...dialogProps
}: ActionDialogProps) {
  const showBottomBar = Boolean(bottomBarLeftSlot || bottomBarRightSlot)

  return (
    <Dialog {...dialogProps}>
      <DialogPopup
        {...popupProps}
        className={cn('action-dialog', className)}
      >
        <FloatBar
          aria-label={toolbarLabel}
          className={cn('action-dialog__bar', floatBarClassName)}
          frameClassName={floatBarFrameClassName}
          centerSlot={
            <DialogTitle
              className={cn('action-dialog__title', titleClassName)}
            >
              {title}
            </DialogTitle>
          }
          rightSlot={
            <div className="action-dialog__actions">
              {toolbarRightSlot}
              {showCloseButton ? (
                <DialogClose
                  aria-label={closeLabel}
                  render={<FrostedIconButton />}
                  type="button"
                >
                  <X />
                </DialogClose>
              ) : null}
            </div>
          }
        />
        {children}
        {showBottomBar ? (
          <BottomBar
            aria-label={bottomBarLabel}
            className={cn('action-dialog__bottom-bar', bottomBarClassName)}
            frameClassName={bottomBarFrameClassName}
            leftSlot={bottomBarLeftSlot}
            leftSlotClassName={bottomBarLeftSlotClassName}
            rightSlot={bottomBarRightSlot}
            rightSlotClassName={bottomBarRightSlotClassName}
          />
        ) : null}
      </DialogPopup>
    </Dialog>
  )
}

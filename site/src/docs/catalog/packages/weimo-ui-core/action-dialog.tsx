import { Check } from 'lucide-react'
import { useState } from 'react'

import { ActionDialog } from 'weimo-ui-core/components/action-dialog'
import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import { DialogPanel } from 'weimo-ui-core/components/coss/dialog'
import { FrostedIconButton } from 'weimo-ui-core/components/frosted-icon-button'
import { TextButton } from 'weimo-ui-core/components/text-button'
import type { ComponentDefinition } from '../../component-docs'

function ActionDialogDemo({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <ComponentPreviewCard label="操作对话框">
      <div className="internal-dialog-preview">
        <TextButton onClick={() => setOpen(true)} type="button">
          打开内部对话框
        </TextButton>
        <ActionDialog
          bottomBarRightSlot={
            <FrostedIconButton aria-label="保存">
              <Check />
            </FrostedIconButton>
          }
          onOpenChange={setOpen}
          open={open}
          title="内部操作"
        >
          <DialogPanel className="internal-dialog-preview__panel">
            <p>用于组合顶部 FloatBar、内容面板和可选底部操作栏。</p>
          </DialogPanel>
        </ActionDialog>
      </div>
    </ComponentPreviewCard>
  )
}

export const actionDialogDefinition = {
  id: 'action-dialog',
  summary: '内部操作对话框骨架，组合 FloatBar 标题栏、右侧工具按钮、关闭按钮和可选 BottomBar',
  status: 'Ready',
  frame: 'plain',
  searchAliases: ['ActionDialog'],
  preview: () => <ActionDialogDemo />,
} satisfies ComponentDefinition

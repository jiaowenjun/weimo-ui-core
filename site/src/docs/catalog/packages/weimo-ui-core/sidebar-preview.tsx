import { useState } from 'react'
import { Drawer } from '@base-ui/react/drawer'
import { Menu, X } from 'lucide-react'

import { FrostedIconButton } from 'weimo-ui-core/components/frosted-icon-button'

export function SideBarDrawerPreview() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const closeDrawer = () => setDrawerOpen(false)

  return (
    <>
      <div className="sidebar-preview__trigger">
        <FrostedIconButton
          aria-label="打开抽屉侧边栏"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu />
        </FrostedIconButton>
        <span className="sidebar-preview__trigger-label">抽屉侧边栏</span>
      </div>
      <Drawer.Root
        modal
        onOpenChange={(isOpen) => {
          if (!isOpen) closeDrawer()
        }}
        open={drawerOpen}
        swipeDirection="left"
      >
        <Drawer.Portal>
          <Drawer.Backdrop className="weimo-sidebar-drawer__backdrop" />
          <Drawer.Viewport className="weimo-sidebar-drawer__viewport">
            <Drawer.Popup className="weimo-sidebar-drawer__stage">
              <Drawer.Title className="sr-only">抽屉侧边栏</Drawer.Title>
              <div
                aria-label="抽屉侧边栏"
                className="weimo-sidebar weimo-sidebar--drawer"
                data-sidebar-variant="drawer"
              >
                <div className="weimo-sidebar__drawer-action">
                  <FrostedIconButton
                    aria-label="关闭抽屉侧边栏示例"
                    onClick={closeDrawer}
                  >
                    <X />
                  </FrostedIconButton>
                </div>
                <strong className="sidebar-preview__drawer-title">
                  抽屉侧边栏
                </strong>
              </div>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}

import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import { Drawer } from '@base-ui/react/drawer'

import { getCardSurfaceClassName } from 'weimo-ui-core/components/card-surface'
import { getFrostedSurfaceClassName } from 'weimo-ui-core/components/frosted-surface-model'
import { cn } from 'weimo-ui-core/lib/utils'

import 'weimo-ui-core/styles/frosted-surface.css'
import './sidebar.css'

type SideBarPanelPropsBase = Omit<
  ComponentPropsWithoutRef<'div'>,
  'aria-label' | 'children' | 'className' | 'id'
>

export type SideBarProps = SideBarPanelPropsBase & {
  ariaLabel?: string
  children?: ReactNode
  closeButtonLabel?: string
  drawerAction?: ReactNode
  onClose: () => void
  open?: boolean
  showCloseButton?: boolean
  className?: string
}

type SideBarVariant = 'normal' | 'drawer'
type SideBarPanelProps = ComponentPropsWithoutRef<'div'> & {
  variant: SideBarVariant
}

const wideMediaQuery = '(min-width: 700px)'

function getWideViewportSnapshot() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return window.matchMedia(wideMediaQuery).matches
}

function useWideViewport() {
  const [isWideViewport, setIsWideViewport] = useState(getWideViewportSnapshot)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined
    }

    const media = window.matchMedia(wideMediaQuery)
    const updateViewport = () => setIsWideViewport(media.matches)

    updateViewport()
    media.addEventListener('change', updateViewport)

    return () => media.removeEventListener('change', updateViewport)
  }, [])

  return isWideViewport
}

const SideBarPanel = forwardRef<HTMLDivElement, SideBarPanelProps>(
  function SideBarPanel({ className, children, variant, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-sidebar-variant={variant}
        {...props}
        className={cn('weimo-sidebar', className)}
      >
        {children}
      </div>
    )
  },
)

function SideBarNormal({
  ariaLabel,
  children,
  className,
  role,
  ...props
}: ComponentPropsWithoutRef<'div'> & {
  ariaLabel: string
  children?: ReactNode
}) {
  return (
    <div className="weimo-sidebar-shell">
      <div className="weimo-sidebar-shell__frame">
        <div className="weimo-sidebar-shell__bleed">
          <SideBarPanel
            aria-label={ariaLabel}
            className={getCardSurfaceClassName('weimo-sidebar--normal', className)}
            role={role ?? 'complementary'}
            variant="normal"
            {...props}
          >
            {children}
          </SideBarPanel>
        </div>
      </div>
    </div>
  )
}

function SideBarDrawer({
  ariaLabel,
  children,
  className,
  closeButtonLabel = '关闭侧边栏',
  drawerAction,
  onClose,
  open,
  showCloseButton = false,
  ...props
}: SideBarProps & { ariaLabel: string }) {
  return (
    <Drawer.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose()
      }}
      modal
      swipeDirection="left"
    >
      <Drawer.Portal>
        <Drawer.Backdrop className="weimo-sidebar-drawer__backdrop" />
        <Drawer.Viewport className="weimo-sidebar-drawer__viewport">
          <Drawer.Popup className="weimo-sidebar-drawer__stage">
            <Drawer.Title className="sr-only">{ariaLabel}</Drawer.Title>
            <SideBarPanel
              className={cn('weimo-sidebar--drawer', className)}
              variant="drawer"
              {...props}
            >
              {drawerAction ? (
                <div className="weimo-sidebar__drawer-action">{drawerAction}</div>
              ) : showCloseButton ? (
                <div className="weimo-sidebar__drawer-action">
                  <button
                    aria-label={closeButtonLabel}
                    className={getFrostedSurfaceClassName('weimo-sidebar__close-button')}
                    onClick={onClose}
                    type="button"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              ) : null}
              {children}
            </SideBarPanel>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export function SideBar({
  ariaLabel = '侧边栏',
  children,
  className,
  closeButtonLabel,
  drawerAction,
  onClose,
  open = false,
  showCloseButton = false,
  ...props
}: SideBarProps) {
  const isWideViewport = useWideViewport()

  useEffect(() => {
    if (isWideViewport) {
      onClose()
    }
  }, [isWideViewport, onClose])

  if (isWideViewport) {
    return (
      <SideBarNormal ariaLabel={ariaLabel} className={className} {...props}>
        {children}
      </SideBarNormal>
    )
  }

  return (
    <SideBarDrawer
      ariaLabel={ariaLabel}
      className={className}
      closeButtonLabel={closeButtonLabel}
      drawerAction={drawerAction}
      onClose={onClose}
      open={open}
      showCloseButton={showCloseButton}
      {...props}
    >
      {children}
    </SideBarDrawer>
  )
}

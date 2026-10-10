import { Tabs as BaseTabs } from '@base-ui/react/tabs'

import { cn } from 'weimo-ui-core/lib/utils'

import './tabs.css'

export function Tabs({ className, ...props }: BaseTabs.Root.Props) {
  return (
    <BaseTabs.Root
      className={cn('coss-tabs', className)}
      data-slot="tabs"
      {...props}
    />
  )
}

export function TabsList({ className, ...props }: BaseTabs.List.Props) {
  return (
    <BaseTabs.List
      className={cn('coss-tabs__list', className)}
      data-slot="tabs-list"
      {...props}
    />
  )
}

export function TabsTab({ className, ...props }: BaseTabs.Tab.Props) {
  return (
    <BaseTabs.Tab
      className={cn('coss-tabs__tab', className)}
      data-slot="tabs-tab"
      {...props}
    />
  )
}

export function TabsPanel({ className, ...props }: BaseTabs.Panel.Props) {
  return (
    <BaseTabs.Panel
      className={cn('coss-tabs__panel', className)}
      data-slot="tabs-panel"
      {...props}
    />
  )
}

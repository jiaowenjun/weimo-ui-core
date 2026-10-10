import { Switch as BaseSwitch } from '@base-ui/react/switch'

import { cn } from 'weimo-ui-core/lib/utils'

import './switch.css'

export function Switch({ className, ...props }: BaseSwitch.Root.Props) {
  return (
    <BaseSwitch.Root
      className={cn('coss-switch', className)}
      data-slot="switch"
      {...props}
    >
      <BaseSwitch.Thumb
        className="coss-switch__thumb"
        data-slot="switch-thumb"
      />
    </BaseSwitch.Root>
  )
}

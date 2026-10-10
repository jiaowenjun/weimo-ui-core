import type { ClassValue } from 'clsx'

import { cn } from 'weimo-ui-core/lib/utils'

export type CapsuleFrameMaterial = 'solid' | 'frosted'

export type CapsuleFrameOptions = {
  material?: CapsuleFrameMaterial
  interactive?: boolean
}

export function getCapsuleFrameClassName(...className: ClassValue[]) {
  return cn('capsule-frame', className)
}

export function getCapsuleFrameAttributes({
  material = 'solid',
  interactive = false,
}: CapsuleFrameOptions = {}) {
  return {
    'data-material': material,
    'data-interactive': interactive ? 'true' : undefined,
  }
}

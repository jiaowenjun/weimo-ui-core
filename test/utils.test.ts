import { describe, expect, it } from 'vitest'

import { cn } from '../src/lib/utils'

describe('cn', () => {
  it('merges conditional classes and resolves Tailwind conflicts', () => {
    expect(cn('px-2 text-sm', false && 'hidden', ['px-4', 'font-medium'])).toBe(
      'text-sm px-4 font-medium',
    )
  })
})

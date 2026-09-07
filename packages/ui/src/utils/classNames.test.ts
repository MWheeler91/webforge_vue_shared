import { describe, expect, it } from 'vitest'
import { cn } from './classNames.ts'

describe('cn', () => {
  it('preserves ordered class names and omits falsy conditional values', () => {
    expect(cn('ui-card', false, null, 'ui-card--surface', undefined, '')).toBe(
      'ui-card ui-card--surface',
    )
  })
})

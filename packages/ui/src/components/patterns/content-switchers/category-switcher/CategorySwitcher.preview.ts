import type { CategorySwitcherProps } from './CategorySwitcher.types'

export const categorySwitcherPreview = {
  heading: { text: 'category' },
  items: { keyed: {}, grouped: {}, items: [{ id: 'one', label: 'One', heading: { text: 'One' } }] },
} satisfies CategorySwitcherProps

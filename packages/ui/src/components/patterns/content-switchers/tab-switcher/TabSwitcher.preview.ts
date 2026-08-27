import type { TabSwitcherProps } from './TabSwitcher.types'

export const tabSwitcherPreview = {
  heading: { text: 'tabs' },
  items: { keyed: {}, grouped: {}, items: [{ id: 'one', label: 'One', heading: { text: 'One' } }] },
} satisfies TabSwitcherProps

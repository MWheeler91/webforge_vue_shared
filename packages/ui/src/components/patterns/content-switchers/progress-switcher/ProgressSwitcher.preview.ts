import type { ProgressSwitcherProps } from './ProgressSwitcher.types'

export const progressSwitcherPreview = {
  heading: { text: 'progress' },
  items: { keyed: {}, grouped: {}, items: [{ id: 'one', label: 'One', heading: { text: 'One' } }] },
} satisfies ProgressSwitcherProps

import type { SegmentedSwitcherProps } from './SegmentedSwitcher.types'

export const segmentedSwitcherPreview = {
  heading: { text: 'segmented' },
  items: { keyed: {}, grouped: {}, items: [{ id: 'one', label: 'One', heading: { text: 'One' } }] },
} satisfies SegmentedSwitcherProps

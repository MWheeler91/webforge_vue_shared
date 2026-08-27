import type { UiGridProps } from './grid.types'

export interface UiGridPreviewCase {
  key: string
  label: string
  props: UiGridProps
  items: string[]
}

const items = (count: number) => Array.from({ length: count }, (_, index) => `Item ${index + 1}`)

export const uiGridPreview: UiGridPreviewCase[] = [
  { key: 'one', label: 'One item', props: {}, items: items(1) },
  { key: 'two', label: 'Two items', props: {}, items: items(2) },
  { key: 'three', label: 'Three items', props: {}, items: items(3) },
  { key: 'four', label: 'Four items', props: {}, items: items(4) },
  { key: 'eight', label: 'Eight items', props: {}, items: items(8) },
  { key: 'uneven', label: 'Uneven final row', props: { maxColumns: 4 }, items: items(7) },
  {
    key: 'equal-height',
    label: 'Equal-height rows',
    props: { equalHeight: true },
    items: ['Short', 'A taller item with additional preview content', 'Medium item'],
  },
  {
    key: 'natural-height',
    label: 'Natural row heights',
    props: { equalHeight: false, align: 'start' },
    items: ['Short', 'A taller item with additional preview content', 'Medium item'],
  },
]

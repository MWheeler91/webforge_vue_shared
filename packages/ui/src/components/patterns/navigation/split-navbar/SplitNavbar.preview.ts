import type { SplitNavbarProps } from './SplitNavbar.types'

export const splitNavbarPreview = {
  brand: { label: 'split' },
  links: { keyed: {}, grouped: {}, items: [{ label: 'Overview', href: '#overview' }] },
  actions: { keyed: {}, grouped: {}, items: [] },
} satisfies SplitNavbarProps

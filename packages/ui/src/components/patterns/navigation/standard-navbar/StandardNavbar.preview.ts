import type { StandardNavbarProps } from './StandardNavbar.types'

export const standardNavbarPreview = {
  brand: { label: 'standard' },
  links: { keyed: {}, grouped: {}, items: [{ label: 'Overview', href: '#overview' }] },
  actions: { keyed: {}, grouped: {}, items: [] },
} satisfies StandardNavbarProps

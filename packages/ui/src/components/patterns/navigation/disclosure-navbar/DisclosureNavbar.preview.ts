import type { DisclosureNavbarProps } from './DisclosureNavbar.types'

export const disclosureNavbarPreview = {
  brand: { label: 'disclosure' },
  links: { keyed: {}, grouped: {}, items: [{ label: 'Overview', href: '#overview' }] },
  actions: { keyed: {}, grouped: {}, items: [] },
} satisfies DisclosureNavbarProps

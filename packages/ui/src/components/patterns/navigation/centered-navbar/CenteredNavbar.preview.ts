import type { CenteredNavbarProps } from './CenteredNavbar.types'

export const centeredNavbarPreview = {
  brand: { label: 'centered' },
  links: { keyed: {}, grouped: {}, items: [{ label: 'Overview', href: '#overview' }] },
  actions: { keyed: {}, grouped: {}, items: [] },
} satisfies CenteredNavbarProps

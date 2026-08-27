import type { SidebarNavigationProps } from './SidebarNavigation.types'

export const sidebarNavigationPreview = {
  brand: { label: 'sidebar' },
  links: { keyed: {}, grouped: {}, items: [{ label: 'Overview', href: '#overview' }] },
  actions: { keyed: {}, grouped: {}, items: [] },
} satisfies SidebarNavigationProps

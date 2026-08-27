import type { BreadcrumbTrailProps } from './BreadcrumbTrail.types'

export const breadcrumbTrailPreview = {
  breadcrumbs: {
    keyed: {},
    grouped: {},
    items: [{ label: 'Home', href: '/' }, { label: 'breadcrumb' }],
  },
  heading: { text: 'breadcrumb' },
} satisfies BreadcrumbTrailProps

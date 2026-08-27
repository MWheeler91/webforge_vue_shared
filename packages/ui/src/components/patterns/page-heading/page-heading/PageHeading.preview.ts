import type { PageHeadingProps } from './PageHeading.types'

export const pageHeadingPreview = {
  breadcrumbs: {
    keyed: {},
    grouped: {},
    items: [{ label: 'Home', href: '/' }, { label: 'pageHeading' }],
  },
  heading: { text: 'pageHeading' },
} satisfies PageHeadingProps

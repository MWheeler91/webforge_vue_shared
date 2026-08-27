import type { FeaturedMediaGalleryProps } from './FeaturedMediaGallery.types'

export const featuredMediaGalleryPreview = {
  heading: { text: 'featured' },
  items: {
    keyed: {},
    grouped: {},
    items: [{ media: { src: 'https://placehold.co/960x540', alt: '' } }],
  },
} satisfies FeaturedMediaGalleryProps

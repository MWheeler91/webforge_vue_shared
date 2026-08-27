import type { VideoGalleryProps } from './VideoGallery.types'

export const videoGalleryPreview = {
  heading: { text: 'video' },
  items: {
    keyed: {},
    grouped: {},
    items: [{ media: { src: 'https://placehold.co/960x540', alt: '' } }],
  },
} satisfies VideoGalleryProps

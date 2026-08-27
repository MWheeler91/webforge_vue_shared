import type { MediaGalleryProps } from './MediaGallery.types'

export const mediaGalleryPreview = {
  heading: { text: 'media' },
  items: {
    keyed: {},
    grouped: {},
    items: [{ media: { src: 'https://placehold.co/960x540', alt: '' } }],
  },
} satisfies MediaGalleryProps

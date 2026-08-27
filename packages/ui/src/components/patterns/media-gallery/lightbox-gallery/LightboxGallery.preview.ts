import type { LightboxGalleryProps } from './LightboxGallery.types'

export const lightboxGalleryPreview = {
  heading: { text: 'lightbox' },
  items: {
    keyed: {},
    grouped: {},
    items: [{ media: { src: 'https://placehold.co/960x540', alt: '' } }],
  },
} satisfies LightboxGalleryProps

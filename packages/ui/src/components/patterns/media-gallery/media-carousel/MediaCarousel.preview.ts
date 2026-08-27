import type { MediaCarouselProps } from './MediaCarousel.types'

export const mediaCarouselPreview = {
  heading: { text: 'carousel' },
  items: {
    keyed: {},
    grouped: {},
    items: [{ media: { src: 'https://placehold.co/960x540', alt: '' } }],
  },
} satisfies MediaCarouselProps

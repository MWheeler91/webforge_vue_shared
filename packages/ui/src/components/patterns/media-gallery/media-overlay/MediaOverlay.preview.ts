import type { MediaOverlayProps } from './MediaOverlay.types'

export const mediaOverlayPreview = {
  heading: { text: 'overlay' },
  items: {
    keyed: {},
    grouped: {},
    items: [{ media: { src: 'https://placehold.co/960x540', alt: '' } }],
  },
} satisfies MediaOverlayProps

import type { MediaComparisonProps } from './MediaComparison.types'

export const mediaComparisonPreview = {
  heading: { text: 'comparison' },
  items: {
    keyed: {},
    grouped: {},
    items: [{ media: { src: 'https://placehold.co/960x540', alt: '' } }],
  },
} satisfies MediaComparisonProps

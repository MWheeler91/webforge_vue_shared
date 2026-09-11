import type { MediaComparisonProps } from './MediaComparison.types'

export const mediaComparisonPreview = {
  heading: { text: 'comparison' },
  before: { media: { src: 'https://placehold.co/960x540', alt: 'Before' } },
  after: { media: { src: 'https://placehold.co/960x540', alt: 'After' } },
} satisfies MediaComparisonProps

import { describe, expect, it } from 'vitest'
import type { MediaCardProps } from './MediaCard.types.ts'

describe('MediaCardProps', () => {
  it('requires one title and one media payload without exposing collection props', () => {
    const props = {
      title: 'A visual item',
      media: { src: '/visual.jpg' },
    } satisfies MediaCardProps

    expect(props.media.src).toBe('/visual.jpg')
  })

  const invalidCollectionProps: MediaCardProps = {
    title: 'A visual item',
    media: { src: '/visual.jpg' },
    // @ts-expect-error MediaCard must not accept a collection of sibling media items.
    items: [],
  }

  void invalidCollectionProps
})

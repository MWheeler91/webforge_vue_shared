import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FeaturedMediaGallery from './featured-media-gallery/FeaturedMediaGallery.vue'
import LightboxGallery from './lightbox-gallery/LightboxGallery.vue'
import MediaCarousel from './media-carousel/MediaCarousel.vue'
import MediaComparison from './media-comparison/MediaComparison.vue'
import MediaGallery from './media-gallery/MediaGallery.vue'
import MediaOverlay from './media-overlay/MediaOverlay.vue'

describe('Ui media gallery patterns', () => {
  const empty = { keyed: {}, grouped: {}, items: [] }
  const item = { media: { src: '/image.jpg', alt: 'Image' }, heading: { text: 'Image title' } }

  it('accepts direct standardized binding and omits an empty gallery region', () => {
    const emptyGallery = mount(MediaGallery, { props: { items: empty } })
    const gallery = mount(MediaGallery, {
      props: {
        heading: { text: 'Gallery' },
        items: { ...empty, items: [item] },
        layout: 'masonry',
      },
    })
    expect(emptyGallery.find('.ui-media-gallery__items').exists()).toBe(false)
    expect(gallery.classes()).toContain('ui-media-gallery--masonry')
  })

  it('renders named and normalized collection media without item identity', () => {
    const featured = mount(FeaturedMediaGallery, {
      props: { featured: item, thumbnails: { ...empty, items: [item] } },
    })
    const comparison = mount(MediaComparison, { props: { before: item, after: item } })
    expect(featured.find('.ui-featured-media-gallery__featured').exists()).toBe(true)
    expect(comparison.find('input[type="range"]').exists()).toBe(true)
  })

  it('supports carousel controls and lightbox interaction', async () => {
    const carousel = mount(MediaCarousel, {
      props: { slides: { ...empty, items: [item, { ...item, heading: { text: 'Second' } }] } },
    })
    const lightbox = mount(LightboxGallery, { props: { items: { ...empty, items: [item] } } })
    await carousel.findAll('button')[1]!.trigger('click')
    await lightbox.find('button').trigger('click')
    expect(carousel.text()).toContain('Second')
    expect(lightbox.find('[role="dialog"]').exists()).toBe(true)
  })

  it('does not render an empty overlay action wrapper', () => {
    const overlay = mount(MediaOverlay, { props: { media: item.media, buttons: empty } })
    expect(overlay.find('.ui-media-overlay__actions').exists()).toBe(false)
  })
})

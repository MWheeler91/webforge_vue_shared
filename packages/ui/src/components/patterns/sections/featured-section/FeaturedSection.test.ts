import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FeaturedSection from './FeaturedSection.vue'

describe('FeaturedSection with MediaCard', () => {
  it('delegates normalized nested media cards to UiCardRenderer', () => {
    const wrapper = mount(FeaturedSection, {
      props: {
        section: {
          key: 'stories',
          componentKey: 'featured-section',
          config: {},
          elements: { text: { title: [{ text: 'Stories' }] } },
          cards: {
            grouped: {
              stories: [{
                key: 'story-1',
                componentKey: 'media-card',
                config: { layout: 'framed' },
                elements: {
                  text: { title: [{ text: 'A story' }], body: [{ text: 'Copy' }] },
                  images: { hero: [{ image_url: '/story.jpg', alt_text: 'Story' }] },
                  buttons: { btn: [{ text: 'Read', href: '/story' }] },
                },
              }],
            },
          },
        },
      },
    })

    expect(wrapper.get('.ui-media-card--layout-framed')).toBeTruthy()
    expect(wrapper.get('.ui-card__title').text()).toBe('A story')
    expect(wrapper.get('.ui-media-card__actions').text()).toContain('Read')
  })
})

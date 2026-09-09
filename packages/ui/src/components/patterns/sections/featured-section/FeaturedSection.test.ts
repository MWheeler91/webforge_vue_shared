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

describe('FeaturedSection with QuoteCard', () => {
  it('drives a normalized quote card from UiSectionData through UiCardRenderer', () => {
    const wrapper = mount(FeaturedSection, {
      props: {
        section: {
          key: 'voices',
          componentKey: 'featured-section',
          config: {},
          elements: { text: { title: [{ text: 'Voices' }] } },
          cards: {
            grouped: {
              voices: [
                {
                  key: 'voice-1',
                  componentKey: 'quote-card',
                  config: { layout: 'stacked' },
                  elements: {
                    text: {
                      quote: [{ text: 'The section made the right information easy to find.' }],
                      author: [{ text: 'Jordan Lee, Operations lead' }],
                    },
                    images: { avatar: [{ image_url: '/jordan.jpg', alt_text: 'Jordan Lee' }] },
                  },
                },
                {
                  key: 'voice-2',
                  componentKey: 'quote-card',
                  config: {},
                  elements: { text: { author: [{ text: 'No quote here' }] } },
                },
              ],
            },
          },
        },
      },
    })

    const cards = wrapper.findAll('.ui-quote-card')
    // The second card has no quotation and must not render.
    expect(cards).toHaveLength(1)
    expect(cards[0]!.classes()).toContain('ui-quote-card--layout-stacked')
    expect(wrapper.get('blockquote.ui-quote-card__quote').text()).toBe(
      'The section made the right information easy to find.',
    )
    expect(wrapper.get('.ui-quote-card__author').text()).toBe('Jordan Lee, Operations lead')
    expect(wrapper.get('.ui-quote-card__avatar').attributes('alt')).toBe('Jordan Lee')
    expect(wrapper.get('.ui-quote-card .ui-card').element.tagName).toBe('ARTICLE')
  })
})

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

describe('FeaturedSection with PricingCard', () => {
  it('drives a normalized pricing card from UiSectionData through UiCardRenderer', () => {
    const wrapper = mount(FeaturedSection, {
      props: {
        section: {
          key: 'plans',
          componentKey: 'featured-section',
          config: {},
          elements: { text: { title: [{ text: 'Plans' }] } },
          cards: {
            grouped: {
              plans: [
                {
                  key: 'plan-1',
                  componentKey: 'pricing-card',
                  config: { layout: 'default', featured: true },
                  elements: {
                    text: {
                      title: [{ text: 'Growth' }],
                      price: [{ text: '$29/mo' }],
                      items: [{ text: '10 GB storage' }],
                    },
                    buttons: { btn: [{ text: 'Choose plan', href: '/signup' }] },
                  },
                },
              ],
            },
          },
        },
      },
    })

    const card = wrapper.get('.ui-pricing-card')
    expect(card.classes()).toContain('ui-pricing-card--featured')
    expect(wrapper.get('.ui-card__title').text()).toBe('Growth')
    expect(wrapper.get('.ui-pricing-card__price').text()).toBe('$29/mo')
    expect(wrapper.get('.ui-pricing-card__actions').text()).toContain('Choose plan')
  })
})

describe('FeaturedSection with StatCard', () => {
  it('drives a normalized stat card from UiSectionData through UiCardRenderer', () => {
    const wrapper = mount(FeaturedSection, {
      props: {
        section: {
          key: 'numbers',
          componentKey: 'featured-section',
          config: {},
          elements: { text: { title: [{ text: 'By the numbers' }] } },
          cards: {
            grouped: {
              numbers: [
                {
                  key: 'stat-1',
                  componentKey: 'stat-card',
                  config: { layout: 'default' },
                  elements: {
                    text: { title: [{ text: 'Uptime' }], value: [{ text: '99.98%' }] },
                  },
                },
              ],
            },
          },
        },
      },
    })

    expect(wrapper.get('.ui-stat-card__value').text()).toBe('99.98%')
    expect(wrapper.get('.ui-card__title').text()).toBe('Uptime')
  })
})

describe('FeaturedSection with ProfileCard', () => {
  it('drives a normalized profile card from UiSectionData through UiCardRenderer', () => {
    const wrapper = mount(FeaturedSection, {
      props: {
        section: {
          key: 'team',
          componentKey: 'featured-section',
          config: {},
          elements: { text: { title: [{ text: 'Team' }] } },
          cards: {
            grouped: {
              team: [
                {
                  key: 'person-1',
                  componentKey: 'profile-card',
                  config: { layout: 'portrait-top' },
                  elements: {
                    text: { title: [{ text: 'Devon Park' }], subheading: [{ text: 'Founder' }] },
                    images: { avatar: [{ image_url: '/devon.jpg', alt_text: 'Devon Park' }] },
                  },
                },
              ],
            },
          },
        },
      },
    })

    expect(wrapper.get('.ui-card__title').text()).toBe('Devon Park')
    expect(wrapper.get('.ui-card__subtitle').text()).toBe('Founder')
    expect(wrapper.get('.ui-profile-card__avatar').attributes('alt')).toBe('Devon Park')
  })
})

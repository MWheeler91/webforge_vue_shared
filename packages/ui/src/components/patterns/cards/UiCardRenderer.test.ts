import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FeatureCard from './feature-card/FeatureCard.vue'
import TextListCard from './text-list-card/TextListCard.vue'
import MediaCard from './media-card/MediaCard.vue'
import QuoteCard from './quote-card/QuoteCard.vue'
import UiCardRenderer from './UiCardRenderer.vue'

describe('UiCardRenderer', () => {
  it('normalizes a media card contract from API-shaped buckets', () => {
    const wrapper = mount(UiCardRenderer, {
      props: {
        card: {
          componentKey: 'media-card',
          config: { layout: 'immersive', variant: 'outline', padding: 'lg', as: 'section' },
          interactive: true,
          elements: {
            text: {
              title: [{ text: 'Normalized story', as: 'h3', emphasis: 'prominent' }],
              body: [{ text: 'Body copy' }],
              caption: [{ text: 'Explicit caption' }],
              credit: [{ text: 'Studio North' }],
            },
            images: { hero: [{ image_url: '/story.jpg', alt_text: 'Story image', caption: 'Image caption fallback' }] },
            buttons: { btn: [{ text: 'Open story', href: '/story', config: { variant: 'secondary' } }] },
          },
        },
      },
    })

    const card = wrapper.findComponent(MediaCard)
    expect(card.props('layout')).toBe('immersive')
    expect(card.props('media')).toEqual({ src: '/story.jpg', alt: 'Story image' })
    expect(card.props('actions')).toEqual([{ label: 'Open story', href: '/story', variant: 'secondary' }])
    expect(card.props('caption')).toEqual({ text: 'Explicit caption' })
    expect(card.props('credit')).toEqual({ text: 'Studio North' })
    expect(wrapper.get('.ui-media-card').classes()).toContain('ui-media-card--layout-immersive')
    expect(wrapper.get('.ui-card').classes()).toEqual(expect.arrayContaining(['ui-card--variant-outline', 'ui-card--padding-lg', 'ui-card--interactive']))
  })

  it('omits an API media card when its required hero media is absent', () => {
    const wrapper = mount(UiCardRenderer, {
      props: { card: { componentKey: 'media-card', config: {}, elements: { text: { title: [{ text: 'Invalid' }] } } } },
    })
    expect(wrapper.find('.ui-media-card').exists()).toBe(false)
  })

  it('uses image caption only when the explicit caption key is absent', () => {
    const wrapper = mount(UiCardRenderer, {
      props: {
        card: {
          componentKey: 'media-card',
          config: {},
          elements: {
            text: { title: [{ text: 'Caption fallback' }] },
            images: { hero: [{ image_url: '/story.jpg', caption: 'Image-level caption' }] },
          },
        },
      },
    })

    expect(wrapper.findComponent(MediaCard).props('caption')).toEqual({ text: 'Image-level caption' })
  })

  it('normalizes a quote card contract and maps the avatar image bucket', () => {
    const wrapper = mount(UiCardRenderer, {
      props: {
        card: {
          componentKey: 'quote-card',
          config: { layout: 'stacked', variant: 'muted', padding: 'lg', as: 'section' },
          interactive: true,
          elements: {
            text: {
              quote: [{ text: 'It reshaped our workflow.', as: 'p', emphasis: 'prominent' }],
              author: [{ text: 'Jordan Lee, Operations lead', as: 'span' }],
              title: [{ text: 'Ignored — quote cards have no title' }],
            },
            images: { avatar: [{ image_url: '/jordan.jpg', alt_text: 'Jordan Lee' }] },
          },
        },
      },
    })

    const card = wrapper.findComponent(QuoteCard)
    expect(card.props('layout')).toBe('stacked')
    expect(card.props('quote')).toEqual({ text: 'It reshaped our workflow.', as: 'p', emphasis: 'prominent' })
    expect(card.props('author')).toEqual({ text: 'Jordan Lee, Operations lead', as: 'span' })
    expect(card.props('avatar')).toEqual({ src: '/jordan.jpg', alt: 'Jordan Lee' })
    expect(card.props('as')).toBeUndefined()
    expect(card.props('title')).toBeUndefined()
    expect(wrapper.get('.ui-quote-card').classes()).toContain('ui-quote-card--layout-stacked')
    expect(wrapper.get('.ui-card').element.tagName).toBe('ARTICLE')
    expect(wrapper.get('.ui-card').classes()).toEqual(
      expect.arrayContaining(['ui-card--variant-muted', 'ui-card--padding-lg', 'ui-card--interactive']),
    )
    expect(wrapper.text()).not.toContain('Ignored')
  })

  it('omits an API quote card when its quotation is absent', () => {
    const wrapper = mount(UiCardRenderer, {
      props: {
        card: {
          componentKey: 'quote-card',
          config: {},
          elements: { text: { author: [{ text: 'Only an author' }] } },
        },
      },
    })
    expect(wrapper.find('.ui-quote-card').exists()).toBe(false)
  })

  it('falls back to the default quote layout for an unknown layout value', () => {
    const wrapper = mount(UiCardRenderer, {
      props: {
        card: {
          componentKey: 'quote-card',
          config: { layout: 'nonsense' },
          elements: { text: { quote: [{ text: 'A quote' }] } },
        },
      },
    })
    expect(wrapper.findComponent(QuoteCard).props('layout')).toBe('default')
  })

  it('maps the quote-card clamp config to a numeric prop and ignores invalid values', () => {
    const clamped = mount(UiCardRenderer, {
      props: {
        card: {
          componentKey: 'quote-card',
          config: { clamp: '4' },
          elements: { text: { quote: [{ text: 'A quote' }] } },
        },
      },
    })
    expect(clamped.findComponent(QuoteCard).props('clamp')).toBe(4)

    for (const clamp of ['none', '', '9', undefined]) {
      const wrapper = mount(UiCardRenderer, {
        props: {
          card: {
            componentKey: 'quote-card',
            config: { clamp },
            elements: { text: { quote: [{ text: 'A quote' }] } },
          },
        },
      })
      expect(wrapper.findComponent(QuoteCard).props('clamp')).toBeNull()
    }
  })

  it('normalizes a grouped API card into FeatureCard props', () => {
    const wrapper = mount(UiCardRenderer, {
      props: {
        card: {
          key: 'card',
          componentKey: 'feature-card',
          config: {
            as: 'div',
            layout: 'split',
            media_aspect: 'square',
            padding: 'md',
            variant: 'muted',
            interactive: false,
          },
          interactive: true,
          elements: {
            text: {
              eyebrow: [{ text: 'In development', as: 'span', emphasis: 'compact' }],
              title: [
                { text: 'Practical software', as: 'h2', emphasis: 'prominent' },
                { text: 'Ignored extra scalar', as: 'h4', emphasis: 'compact' },
              ],
              body: [{ text: 'Built around real operating needs.', as: 'p', emphasis: 'standard' }],
            },
            badges: {
              badge: [{ text: 'New', config: { variant: 'info', tone: 'soft' } }],
            },
            images: {
              hero: [{ image_url: '/hero.png', alt_text: 'A product preview' }],
            },
            buttons: {
              btn: [
                { text: 'Learn more', href: '/learn', config: { as: 'a', variant: 'primary' } },
              ],
            },
          },
        },
      },
    })

    expect(wrapper.find('.ui-feature-card').exists()).toBe(true)
    expect(wrapper.find('.ui-feature-card--layout-split').exists()).toBe(true)
    expect(wrapper.find('img[src="/hero.png"]').exists()).toBe(true)
    expect(wrapper.find('.ui-badge').text()).toBe('New')
    expect(wrapper.find('.ui-btn').text()).toBe('Learn more')
    expect(wrapper.get('.ui-card').classes()).toContain('ui-card--interactive')

    const featureCard = wrapper.findComponent(FeatureCard)
    expect(featureCard.props('title')).toEqual({
      text: 'Practical software',
      as: 'h2',
      emphasis: 'prominent',
    })
    expect(wrapper.get('.ui-card__title').element.tagName).toBe('H2')
    expect(wrapper.get('.ui-card__title').attributes('data-emphasis')).toBe('prominent')
    expect(wrapper.text()).not.toContain('Ignored extra scalar')
  })

  it('preserves top-level divider for a supported card pattern', () => {
    const wrapper = mount(UiCardRenderer, {
      props: {
        card: {
          componentKey: 'text-card',
          divider: true,
          config: { divider: false },
          elements: {
            text: {
              title: [{ text: 'Divided content', as: 'h3', emphasis: 'standard' }],
              footer: [{ text: 'Footer content', as: 'p', emphasis: 'compact' }],
            },
          },
        },
      },
    })

    expect(wrapper.find('.ui-card__divider').exists()).toBe(true)
    expect(wrapper.text()).toContain('Divided content')
    expect(wrapper.text()).toContain('Footer content')
  })

  it('preserves configuration independently for grouped text records', () => {
    const wrapper = mount(UiCardRenderer, {
      props: {
        card: {
          componentKey: 'text-list-card',
          config: { layout: 'bulleted' },
          elements: {
            text: {
              title: [{ text: 'Configured list', as: 'h3', emphasis: 'standard' }],
              list: [
                { text: 'First item', as: 'p', emphasis: 'compact' },
                { text: 'Second item', as: 'h4', emphasis: 'prominent' },
              ],
            },
          },
        },
      },
    })

    const textListCard = wrapper.findComponent(TextListCard)
    expect(textListCard.props('items')).toEqual([
      { text: 'First item', as: 'p', emphasis: 'compact' },
      { text: 'Second item', as: 'h4', emphasis: 'prominent' },
    ])

    const items = wrapper.findAll('.text-list-card__item-title')
    expect(items.map((item) => item.text())).toEqual(['First item', 'Second item'])
    expect(items.map((item) => item.element.tagName)).toEqual(['P', 'H4'])
    expect(items.map((item) => item.attributes('data-emphasis'))).toEqual(['compact', 'prominent'])
  })
})

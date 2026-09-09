import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import QuoteCard from './QuoteCard.vue'

describe('QuoteCard', () => {

  it('renders the quotation, attribution, and avatar through a figure', () => {
    const wrapper = mount(QuoteCard, {
      props: {
        quote: { text: 'This changed how our team works.', emphasis: 'prominent' },
        author: 'Jordan Lee, Operations lead',
        avatar: { src: '/jordan.jpg', alt: 'Portrait of Jordan Lee' },
      },
    })

    expect(wrapper.get('.ui-quote-card').classes()).toContain('ui-quote-card--layout-default')
    expect(wrapper.get('figure.ui-quote-card__figure')).toBeTruthy()
    const quote = wrapper.get('blockquote.ui-quote-card__quote')
    expect(quote.text()).toBe('This changed how our team works.')
    expect(quote.attributes('data-emphasis')).toBe('prominent')
    expect(wrapper.get('figcaption .ui-quote-card__author').text()).toBe('Jordan Lee, Operations lead')
    expect(wrapper.get('.ui-quote-card__avatar').attributes('alt')).toBe('Portrait of Jordan Lee')
  })

  it('fixes the root element to article and forwards BaseCard props and attrs', () => {
    const wrapper = mount(QuoteCard, {
      props: {
        quote: 'A short quote.',
        variant: 'outline',
        padding: 'lg',
        interactive: true,
        unstyled: true,
      },
      attrs: { 'data-test': 'quote-card' },
    })

    const card = wrapper.get('.ui-card-unstyled')
    expect(card.element.tagName).toBe('ARTICLE')
    expect(card.classes()).toContain('ui-card--interactive')
    expect(wrapper.get('[data-test="quote-card"]')).toBeTruthy()
  })

  it('emits the layout modifier class for every supported layout', () => {
    for (const layout of ['default', 'lead', 'stacked', 'compact'] as const) {
      const wrapper = mount(QuoteCard, { props: { quote: 'Q', layout } })
      expect(wrapper.get('.ui-quote-card').classes()).toContain(`ui-quote-card--layout-${layout}`)
    }
  })

  it('degrades when optional content is missing', () => {
    const noAvatar = mount(QuoteCard, { props: { quote: 'Q', author: 'A' } })
    expect(noAvatar.find('.ui-quote-card__avatar').exists()).toBe(false)
    expect(noAvatar.find('.ui-quote-card__author').text()).toBe('A')

    const quoteOnly = mount(QuoteCard, { props: { quote: 'Just the quote' } })
    expect(quoteOnly.find('figcaption').exists()).toBe(false)
    expect(quoteOnly.get('blockquote').text()).toBe('Just the quote')

    const empty = mount(QuoteCard, { props: {} })
    expect(empty.find('.ui-quote-card__figure').exists()).toBe(false)
    expect(empty.get('.ui-quote-card').classes()).toContain('ui-quote-card')
  })

  describe('clamp', () => {
    // jsdom does no layout, so force the blockquote's measured overflow.
    function forceOverflow(el: Element, overflow: boolean) {
      Object.defineProperty(el, 'scrollHeight', { configurable: true, value: overflow ? 240 : 100 })
      Object.defineProperty(el, 'clientHeight', { configurable: true, value: 100 })
    }

    it('applies the clamp class and line-count variable when clamp is set', () => {
      const q = mount(QuoteCard, { props: { quote: 'A quote', clamp: 4 } }).get('.ui-quote-card__quote')
      expect(q.classes()).toContain('ui-quote-card__quote--clamped')
      expect(q.attributes('style')).toContain('--ui-quote-card-lines: 4')
    })

    it('shows no toggle without clamp, or when the clamped text fits', async () => {
      expect(
        mount(QuoteCard, { props: { quote: 'Short' } }).find('.ui-quote-card__toggle').exists(),
      ).toBe(false)

      const fits = mount(QuoteCard, { props: { quote: 'Short' } })
      forceOverflow(fits.get('.ui-quote-card__quote').element, false)
      await fits.setProps({ clamp: 3 })
      await flushPromises()
      expect(fits.find('.ui-quote-card__toggle').exists()).toBe(false)
    })

    it('reveals a Show more toggle when the clamped quote overflows and expands on click', async () => {
      const wrapper = mount(QuoteCard, { props: { quote: 'A long quote. '.repeat(20) } })
      forceOverflow(wrapper.get('.ui-quote-card__quote').element, true)
      await wrapper.setProps({ clamp: 3 })
      await flushPromises()

      const toggle = wrapper.get('.ui-quote-card__toggle')
      expect(toggle.text()).toBe('Show more')
      expect(toggle.attributes('aria-expanded')).toBe('false')
      expect(toggle.attributes('aria-controls')).toBe(
        wrapper.get('.ui-quote-card__quote').attributes('id'),
      )
      expect(wrapper.get('.ui-quote-card__quote').classes()).toContain('ui-quote-card__quote--clamped')

      await toggle.trigger('click')

      const openToggle = wrapper.get('.ui-quote-card__toggle')
      expect(openToggle.text()).toBe('Show less')
      expect(openToggle.attributes('aria-expanded')).toBe('true')
      expect(wrapper.get('.ui-quote-card__quote').classes()).not.toContain(
        'ui-quote-card__quote--clamped',
      )
    })
  })
})

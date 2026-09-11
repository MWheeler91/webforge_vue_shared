import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PricingCard from './PricingCard.vue'

describe('PricingCard', () => {
  it('renders label, title, price, body, and feature list', () => {
    const wrapper = mount(PricingCard, {
      props: {
        label: { text: 'Most popular' },
        title: 'Growth',
        price: '$29/mo',
        body: 'For growing teams that need more headroom.',
        items: [
          { title: '10 GB storage' },
          { title: 'Priority support', description: 'Average response under 2 hours' },
        ],
      },
    })

    expect(wrapper.get('.ui-badge__content').text()).toBe('Most popular')
    expect(wrapper.get('.ui-card__title').text()).toBe('Growth')
    expect(wrapper.get('.ui-pricing-card__price').text()).toBe('$29/mo')
    expect(wrapper.get('.ui-card__subtitle').text()).toBe(
      'For growing teams that need more headroom.',
    )
    const items = wrapper.findAll('.ui-pricing-card__items li')
    expect(items).toHaveLength(2)
    expect(items[1]!.text()).toContain('Priority support')
    expect(items[1]!.text()).toContain('Average response under 2 hours')
  })

  it('renders a numeric price and grouped actions', () => {
    const wrapper = mount(PricingCard, {
      props: {
        title: 'Starter',
        price: 0,
        actions: [{ label: 'Get started', href: '/signup' }],
      },
    })

    expect(wrapper.get('.ui-pricing-card__price').text()).toBe('0')
    expect(wrapper.get('.ui-pricing-card__actions').text()).toBe('Get started')
  })

  it('hides the feature list in the compact layout even when items are supplied', () => {
    const wrapper = mount(PricingCard, {
      props: {
        title: 'Starter',
        price: '$5/mo',
        layout: 'compact',
        items: [{ title: '1 GB storage' }],
      },
    })

    expect(wrapper.find('.ui-pricing-card__items').exists()).toBe(false)
  })

  it('applies the featured modifier class only when featured is true', () => {
    const featured = mount(PricingCard, { props: { title: 'Growth', featured: true } })
    expect(featured.get('.ui-pricing-card').classes()).toContain('ui-pricing-card--featured')

    const notFeatured = mount(PricingCard, { props: { title: 'Growth' } })
    expect(notFeatured.get('.ui-pricing-card').classes()).not.toContain('ui-pricing-card--featured')
  })

  it('emits the layout modifier class for every supported layout', () => {
    for (const layout of ['default', 'horizontal', 'compact'] as const) {
      const wrapper = mount(PricingCard, { props: { title: 'Plan', layout } })
      expect(wrapper.get('.ui-pricing-card').classes()).toContain(`ui-pricing-card--layout-${layout}`)
    }
  })

  it('forwards BaseCard surface props and fallthrough attrs', () => {
    const wrapper = mount(PricingCard, {
      props: { title: 'Growth', variant: 'outline', padding: 'lg', interactive: true },
      attrs: { 'data-test': 'pricing-card' },
    })

    const card = wrapper.get('.ui-card')
    expect(card.classes()).toContain('ui-card--variant-outline')
    expect(card.classes()).toContain('ui-card--padding-lg')
    expect(card.classes()).toContain('ui-card--interactive')
    expect(wrapper.get('[data-test="pricing-card"]')).toBeTruthy()
  })

  it('degrades when optional content is missing, without reserving a divider or feature list', () => {
    const priceOnly = mount(PricingCard, { props: { title: 'Starter', price: 'Free' } })
    expect(priceOnly.find('.ui-card__divider').exists()).toBe(false)
    expect(priceOnly.find('.ui-pricing-card__items').exists()).toBe(false)
    expect(priceOnly.find('.ui-pricing-card__actions').exists()).toBe(false)

    const empty = mount(PricingCard, { props: {} })
    expect(empty.find('.ui-pricing-card__content').exists()).toBe(false)
  })
})

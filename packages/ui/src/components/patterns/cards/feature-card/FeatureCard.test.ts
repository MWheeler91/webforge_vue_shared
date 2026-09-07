import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Icon } from '@iconify/vue'
import FeatureCard from './FeatureCard.vue'

const collection = <T,>(items: T[]) => ({ keyed: {}, grouped: {}, items })

describe('FeatureCard', () => {
  it('renders scalar and grouped content through the production card primitives', () => {
    const wrapper = mount(FeatureCard, {
      props: {
        icon: 'lucide:sparkles',
        eyebrow: 'Capability',
        title: 'Reliable delivery',
        body: 'Supporting feature copy.',
        badges: collection([{ text: 'Included', variant: 'success', tone: 'soft' }]),
        actions: collection([{ label: 'Explore', href: '/explore' }]),
      },
    })

    expect(wrapper.get('.ui-feature-card')).toBeTruthy()
    expect(wrapper.get('.ui-card__title').text()).toBe('Reliable delivery')
    expect(wrapper.findComponent(Icon).props('icon')).toBe('lucide:sparkles')
    expect(wrapper.findAll('.ui-badge')).toHaveLength(1)
    expect(wrapper.get('.ui-feature-card__meta .ui-badge').exists()).toBe(true)
    expect(wrapper.get('.ui-btn').text()).toContain('Explore')
    expect(wrapper.get('.ui-card').classes()).toContain('ui-card--variant-surface')
  })

  it('forwards BaseCard props and changes internal composition for split media', () => {
    const wrapper = mount(FeatureCard, {
      props: {
        layout: 'split',
        variant: 'outline',
        padding: 'lg',
        interactive: true,
        media: { src: '/feature.jpg', alt: 'Feature example' },
        mediaAspect: 'square',
      },
      attrs: { 'data-test': 'feature-card' },
    })

    expect(wrapper.get('.ui-feature-card').classes()).toContain('ui-feature-card--layout-split')
    expect(wrapper.get('.ui-card').classes()).toEqual(expect.arrayContaining([
      'ui-card--variant-outline',
      'ui-card--padding-lg',
      'ui-card--interactive',
    ]))
    expect(wrapper.get('[data-test="feature-card"]')).toBeTruthy()
    expect(wrapper.get('img').attributes('alt')).toBe('Feature example')
    expect(wrapper.get('.ui-feature-card').classes()).toContain('ui-feature-card--media-square')
  })

  it('falls back to stacked composition when split has no media', () => {
    const wrapper = mount(FeatureCard, { props: { layout: 'split', title: 'Text only' } })

    expect(wrapper.get('.ui-feature-card').classes()).toContain('ui-feature-card--layout-stacked')
    expect(wrapper.get('.ui-feature-card').classes()).not.toContain('ui-feature-card--layout-split')
  })
})

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import StatCard from './StatCard.vue'

describe('StatCard', () => {
  it('renders value, label, title, body, and footer', () => {
    const wrapper = mount(StatCard, {
      props: {
        label: { text: 'Uptime' },
        value: '99.98%',
        title: 'Average across all regions',
        body: 'Measured over the trailing 90 days.',
        footer: 'Updated hourly',
      },
    })

    expect(wrapper.get('.ui-stat-card__value').text()).toBe('99.98%')
    expect(wrapper.get('.ui-badge__content').text()).toBe('Uptime')
    expect(wrapper.get('.ui-card__title').text()).toBe('Average across all regions')
    expect(wrapper.get('.ui-card__subtitle').text()).toBe('Measured over the trailing 90 days.')
    expect(wrapper.get('.ui-stat-card__footer').text()).toBe('Updated hourly')
  })

  it('renders a numeric value', () => {
    const wrapper = mount(StatCard, { props: { title: 'Customers', value: 1280 } })
    expect(wrapper.get('.ui-stat-card__value').text()).toBe('1280')
  })

  it('emits the layout modifier class for every supported layout', () => {
    for (const layout of ['default', 'horizontal'] as const) {
      const wrapper = mount(StatCard, { props: { title: 'Metric', layout } })
      expect(wrapper.get('.ui-stat-card').classes()).toContain(`ui-stat-card--layout-${layout}`)
    }
  })

  it('forwards BaseCard surface props and fallthrough attrs', () => {
    const wrapper = mount(StatCard, {
      props: { title: 'Metric', variant: 'muted', padding: 'sm', interactive: true },
      attrs: { 'data-test': 'stat-card' },
    })

    const card = wrapper.get('.ui-card')
    expect(card.classes()).toContain('ui-card--variant-muted')
    expect(card.classes()).toContain('ui-card--padding-sm')
    expect(card.classes()).toContain('ui-card--interactive')
    expect(wrapper.get('[data-test="stat-card"]')).toBeTruthy()
  })

  it('degrades when optional content is missing, without reserving space for it', () => {
    const valueOnly = mount(StatCard, { props: { value: '42' } })
    expect(valueOnly.find('.ui-stat-card__copy').exists()).toBe(false)
    expect(valueOnly.find('.ui-stat-card__footer').exists()).toBe(false)

    const empty = mount(StatCard, { props: {} })
    expect(empty.find('.ui-stat-card__content').exists()).toBe(false)
  })
})

import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TextCard from './TextCard.vue'

describe('TextCard', () => {
  it('renders eyebrow, title, body, divider, and footer', () => {
    const wrapper = mount(TextCard, {
      props: {
        eyebrow: 'Service',
        title: 'Plain card',
        body: 'Supporting copy for this card.',
        divider: true,
        footer: 'Updated today',
      },
    })

    expect(wrapper.get('.ui-text-card__eyebrow').text()).toBe('Service')
    expect(wrapper.get('.ui-card__title').text()).toBe('Plain card')
    expect(wrapper.get('p.text-secondary').text()).toBe('Supporting copy for this card.')
    expect(wrapper.find('.ui-card__divider').exists()).toBe(true)
    expect(wrapper.get('.ui-card__footer').text()).toBe('Updated today')
  })

  it('degrades when optional content is missing, without reserving space for it', () => {
    const wrapper = mount(TextCard, { props: { title: 'Only a title' } })

    expect(wrapper.find('.ui-text-card__eyebrow').exists()).toBe(false)
    expect(wrapper.find('p.text-secondary').exists()).toBe(false)
    expect(wrapper.find('.ui-card__divider').exists()).toBe(false)
    expect(wrapper.find('.ui-card__footer').exists()).toBe(false)

    const empty = mount(TextCard, { props: {} })
    expect(empty.find('.ui-card__title').exists()).toBe(false)
  })

  it('forwards BaseCard surface props and fallthrough attrs', () => {
    const wrapper = mount(TextCard, {
      props: { title: 'Metric', variant: 'muted', padding: 'sm', interactive: true },
      attrs: { 'data-test': 'text-card' },
    })

    const card = wrapper.get('.ui-card')
    expect(card.classes()).toContain('ui-card--variant-muted')
    expect(card.classes()).toContain('ui-card--padding-sm')
    expect(card.classes()).toContain('ui-card--interactive')
    expect(wrapper.get('[data-test="text-card"]')).toBeTruthy()
  })

  it('forwards the inherited unstyled prop to BaseCard', () => {
    const wrapper = mount(TextCard, {
      props: { title: 'Plain card', unstyled: true },
      attrs: { class: 'consumer-card' },
    })

    const card = wrapper.get('.ui-card-unstyled')
    expect(card.exists()).toBe(true)
    expect(card.classes()).toContain('consumer-card')
    expect(wrapper.get('.ui-text-card').exists()).toBe(true)
  })

  it('renders each text field with its own semantic element and emphasis', () => {
    const wrapper = mount(TextCard, {
      props: {
        eyebrow: { text: 'Label', as: 'span', emphasis: 'compact' },
        title: { text: 'Heading', as: 'h2' },
        body: { text: 'Body copy', as: 'span' },
      },
    })

    const eyebrow = wrapper.get('.ui-text-card__eyebrow')
    expect(eyebrow.element.tagName).toBe('SPAN')
    expect(eyebrow.attributes('data-emphasis')).toBe('compact')
    expect(wrapper.get('.ui-card__title').element.tagName).toBe('H2')
    expect(wrapper.get('span.text-secondary').text()).toBe('Body copy')
  })
})

import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TextCard from './TextCard.vue'

describe('TextCard', () => {
  it('forwards the inherited unstyled prop to BaseCard', () => {
    const wrapper = mount(TextCard, {
      props: { title: 'Plain card', unstyled: true },
      attrs: { class: 'consumer-card' },
    })

    const card = wrapper.get('.ui-card-unstyled')
    expect(card.exists()).toBe(true)
    expect(wrapper.find('.ui-card').exists()).toBe(false)
    expect(card.classes()).toEqual(expect.arrayContaining(['ui-text-card', 'consumer-card']))
  })
})

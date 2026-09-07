import { describe, expect, expectTypeOf, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TextListCard from './TextListCard.vue'
import type { TextListCardLayout } from './TextListCard.types.ts'

describe('TextListCard', () => {
  it('forwards the inherited unstyled prop to BaseCard', () => {
    const wrapper = mount(TextListCard, {
      props: { items: ['One item'], unstyled: true },
      attrs: { class: 'consumer-card' },
    })

    const card = wrapper.get('.ui-card-unstyled')
    expect(card.exists()).toBe(true)
    expect(wrapper.find('.ui-card').exists()).toBe(false)
    expect(card.classes()).toEqual(expect.arrayContaining(['ui-text-list-card', 'consumer-card']))
  })

  it('uses its explicit layout vocabulary and defaults to bulleted', () => {
    expectTypeOf<TextListCardLayout>().toEqualTypeOf<'bulleted' | 'divided'>()

    const defaultLayout = mount(TextListCard, { props: { items: ['Default item'] } })
    const dividedLayout = mount(TextListCard, { props: { items: ['Divided item'], layout: 'divided' } })
    const untrustedLayout = mount(TextListCard, {
      props: { items: ['Fallback item'], layout: 'unsupported' as never },
    })

    expect(defaultLayout.get('.text-list-card__items').classes()).toContain(
      'text-list-card__items--bulleted',
    )
    expect(dividedLayout.get('.text-list-card__items').classes()).not.toContain(
      'text-list-card__items--bulleted',
    )
    expect(untrustedLayout.get('.text-list-card__items').classes()).toContain(
      'text-list-card__items--bulleted',
    )
  })
})

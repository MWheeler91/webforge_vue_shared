import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from './BaseButton.vue'

describe('BaseButton label wrapping', () => {
  it('keeps labels on one line by default', () => {
    const wrapper = mount(BaseButton, { slots: { default: 'Contact us' } })

    expect(wrapper.get('.ui-btn').classes()).toContain('ui-btn--label-wrap-nowrap')
  })

  it('exposes an allowlisted wrapping state for constrained labels', () => {
    const wrapper = mount(BaseButton, {
      props: { labelWrap: 'wrap' },
      slots: { default: 'A deliberately longer action label' },
    })

    expect(wrapper.get('.ui-btn').classes()).toContain('ui-btn--label-wrap-wrap')
  })
})

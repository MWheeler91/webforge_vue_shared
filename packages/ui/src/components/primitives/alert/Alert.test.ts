import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseAlert from './BaseAlert.vue'

describe('Alert', () => {
  it('uses assertive alert semantics for errors', () => {
    const wrapper = mount(BaseAlert, { props: { variant: 'error' }, slots: { default: 'Problem' } })
    expect(wrapper.attributes('role')).toBe('alert')
    expect(wrapper.attributes('aria-live')).toBe('assertive')
  })
})

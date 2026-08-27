import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Calendar from './Calendar.vue'

describe('Calendar', () => {
  it('renders a localized month grid and updates an uncontrolled value', async () => {
    const wrapper = mount(Calendar, {
      props: { defaultMonth: '2026-07-01', defaultValue: null },
    })

    expect(wrapper.get('[role="grid"]').attributes('aria-label')).toBe('Calendar')
    expect(wrapper.findAll('[role="gridcell"]')).toHaveLength(42)

    await wrapper.get('[data-date="2026-07-24"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(new Date(2026, 6, 24))
  })

  it('does not select unavailable dates and supports arrow-key navigation', async () => {
    const wrapper = mount(Calendar, {
      attachTo: document.body,
      props: { defaultMonth: '2026-07-01', min: '2026-07-10' },
    })
    const unavailable = wrapper.get('[data-date="2026-07-09"]')

    expect(unavailable.attributes('disabled')).toBeDefined()
    await unavailable.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    const day = wrapper.get('[data-date="2026-07-24"]')
    await day.trigger('keydown', { key: 'ArrowRight' })
    expect(document.activeElement).toBe(wrapper.get('[data-date="2026-07-25"]').element)
    wrapper.unmount()
  })
})

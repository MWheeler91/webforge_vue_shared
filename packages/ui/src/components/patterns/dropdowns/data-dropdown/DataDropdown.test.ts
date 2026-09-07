import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseDropdown from '../../../primitives/dropdown/BaseDropdown.vue'
import DataDropdown from './DataDropdown.vue'

async function choose(wrapper: ReturnType<typeof mount>, text: string) {
  await wrapper.get('.ui-dropdown__trigger').trigger('click')
  await wrapper.findAll('.ui-dropdown__item').find((item) => item.text() === text)?.trigger('click')
}

describe('DataDropdown', () => {
  it.each([
    { label: 'Classic Sans', value: 'classic-sans' },
    { label: 'Low', value: 1 },
    { label: 100, value: 'alpha' },
    { label: 10, value: 1 },
  ])('preserves independent label/value types', async ({ label, value }) => {
    const wrapper = mount(DataDropdown, {
      props: {
        items: [{ label, value }],
        getLabel: (item: { label: typeof label }) => item.label,
        getValue: (item: { value: typeof value }) => item.value,
      },
    })

    await choose(wrapper, String(label))
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([value])
  })

  it('formats Date labels without changing the selected value', async () => {
    const wrapper = mount(DataDropdown, {
      props: {
        items: [{ date: new Date('2026-01-01'), version: 4 }],
        getLabel: (item: { date: Date }) => item.date,
        getValue: (item: { version: number }) => item.version,
        formatLabel: (date: Date) => date.toISOString().slice(0, 10),
      },
    })

    expect(wrapper.find('.ui-dropdown__item').exists()).toBe(true)
    await choose(wrapper, '2026-01-01')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([4])
  })

  it('uses the first default and lets an explicit model win', () => {
    const items = [
      { name: 'Classic Sans', key: 'classic-sans', is_default: false },
      { name: 'Editorial', key: 'editorial', is_default: true },
    ]
    const wrapper = mount(DataDropdown, {
      props: {
        items,
        getLabel: (item) => item.name,
        getValue: (item) => item.key,
        isDefault: (item) => item.is_default,
      },
    })
    expect(wrapper.get('.ui-dropdown__trigger').text()).toBe('Editorial')

    const controlled = mount(DataDropdown, {
      props: {
        modelValue: 'classic-sans',
        items,
        getLabel: (item) => item.name,
        getValue: (item) => item.key,
        isDefault: (item) => item.is_default,
      },
    })
    expect(controlled.get('.ui-dropdown__trigger').text()).toBe('Classic Sans')
  })

  it('resolves multiple defaults deterministically in source order', () => {
    const wrapper = mount(DataDropdown, {
      props: {
        items: [
          { name: 'First', key: 'first', is_default: true },
          { name: 'Second', key: 'second', is_default: true },
        ],
        getLabel: (item) => item.name,
        getValue: (item) => item.key,
        isDefault: (item) => item.is_default,
      },
    })
    expect(wrapper.get('.ui-dropdown__trigger').text()).toBe('First')
  })

  it('is safe for empty collections and does not mutate consumer objects', () => {
    const items: { name: string; key: string }[] = []
    const wrapper = mount(DataDropdown, {
      attrs: { 'data-test': 'data-dropdown' },
      props: { items, getLabel: (item) => item.name, getValue: (item) => item.key },
    })
    expect(wrapper.get('.ui-data-dropdown').attributes('data-test')).toBe('data-dropdown')
    expect(wrapper.get('.ui-data-dropdown__empty').text()).toBe('No options available')

    const item = { name: 'One', key: 'one' }
    const before = { ...item }
    mount(DataDropdown, {
      props: { items: [item], getLabel: (entry) => entry.name, getValue: (entry) => entry.key },
    })
    expect(item).toEqual(before)
  })

  it('reconciles an uncontrolled selection when items change', async () => {
    const wrapper = mount(DataDropdown, {
      props: {
        items: [
          { name: 'One', key: 'one' },
          { name: 'Two', key: 'two' },
        ],
        getLabel: (item) => item.name,
        getValue: (item) => item.key,
        isDefault: (item) => 'is_default' in item && item.is_default === true,
      },
    })
    await choose(wrapper, 'Two')
    await wrapper.setProps({ items: [{ name: 'Fallback', key: 'fallback', is_default: true }] })
    expect(wrapper.get('.ui-dropdown__trigger').text()).toBe('Fallback')
  })

  it('composes the existing dropdown primitive', () => {
    const wrapper = mount(DataDropdown, {
      props: { items: [], getLabel: () => 'x', getValue: () => 'x' },
    })
    expect(wrapper.findComponent(BaseDropdown).exists()).toBe(true)
  })

  it('does not select disabled options', async () => {
    const wrapper = mount(DataDropdown, {
      props: {
        items: [
          { name: 'Available', key: 'available', disabled: false },
          { name: 'Unavailable', key: 'unavailable', disabled: true },
        ],
        getLabel: (item) => item.name,
        getValue: (item) => item.key,
        isDisabled: (item) => item.disabled,
      },
    })
    await wrapper.get('.ui-dropdown__trigger').trigger('click')
    await wrapper.findAll('.ui-dropdown__item')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('supports a full-width container mode', () => {
    const wrapper = mount(DataDropdown, {
      props: { items: [], getLabel: () => 'x', getValue: () => 'x', fullWidth: true },
    })
    expect(wrapper.get('.ui-data-dropdown').classes()).toContain('ui-data-dropdown--full-width')
  })
})

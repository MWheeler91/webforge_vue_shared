import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { uiGridPreview } from './UiGrid.preview.ts'
import UiGrid from './UiGrid.vue'

describe('UiGrid', () => {
  it('renders semantic markup and content-driven grid constraints', () => {
    const wrapper = mount(UiGrid, {
      props: { as: 'ul', minItemWidth: '18rem', maxColumns: 3 },
      slots: { default: '<li>One</li><li>Two</li>' },
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.findAll('li')).toHaveLength(2)
    expect(wrapper.attributes('style')).toContain('--ui-grid-min-item-width: 18rem')
    expect(wrapper.attributes('style')).toContain('--ui-grid-max-columns: 3')
    expect(wrapper.attributes('role')).toBeUndefined()
  })

  it('generates spacing and alignment classes from allowlisted props', () => {
    const wrapper = mount(UiGrid, {
      props: { gap: 'sm', rowGap: 'xl', align: 'center', justify: 'end' },
    })

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'ui-grid--gap-sm',
        'ui-grid--row-gap-xl',
        'ui-grid--align-center',
        'ui-grid--justify-end',
      ]),
    )
  })

  it('exposes equal-row and dense-flow behavior without wrapping slot content', () => {
    const wrapper = mount(UiGrid, {
      props: { equalHeight: true, dense: true },
      slots: { default: '<article>One</article><article>Two</article><article>Three</article>' },
    })

    expect(wrapper.classes()).toContain('ui-grid--equal-height')
    expect(wrapper.classes()).toContain('ui-grid--dense')
    expect(wrapper.findAll(':scope > article')).toHaveLength(3)
  })

  it('normalizes unsafe dimensions and bounds maximum columns', () => {
    const wrapper = mount(UiGrid, {
      props: { minItemWidth: 'calc(100% - 1rem)', maxColumns: 30 },
    })

    expect(wrapper.attributes('style')).toContain('--ui-grid-min-item-width: 280px')
    expect(wrapper.attributes('style')).toContain('--ui-grid-max-columns: 12')
  })

  it('keeps representative collection states in preview coverage', () => {
    expect(uiGridPreview.map((preview) => preview.key)).toEqual([
      'one',
      'two',
      'three',
      'four',
      'eight',
      'uneven',
      'equal-height',
      'natural-height',
    ])
  })
})

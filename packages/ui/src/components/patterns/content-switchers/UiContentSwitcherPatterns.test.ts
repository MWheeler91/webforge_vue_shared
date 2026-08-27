import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AccordionSwitcher from './accordion-switcher/AccordionSwitcher.vue'
import CategorySwitcher from './category-switcher/CategorySwitcher.vue'
import ProgressSwitcher from './progress-switcher/ProgressSwitcher.vue'
import SegmentedSwitcher from './segmented-switcher/SegmentedSwitcher.vue'
import TabSwitcher from './tab-switcher/TabSwitcher.vue'

describe('Ui content switcher patterns', () => {
  const empty = { keyed: {}, grouped: {}, items: [] }
  const items = [
    { id: 'one', label: 'One', heading: { text: 'First' }, body: { text: 'First body' } },
    { id: 'two', label: 'Two', heading: { text: 'Second' } },
  ]

  it('accepts direct standardized binding and omits empty controls', () => {
    const emptyTabs = mount(TabSwitcher, { props: { items: empty } })
    const tabs = mount(TabSwitcher, {
      props: { layout: 'vertical', defaultActiveId: 'one', items: { ...empty, items } },
    })
    expect(emptyTabs.find('[role="tablist"]').exists()).toBe(false)
    expect(tabs.classes()).toContain('ui-tab-switcher--vertical')
  })

  it('reuses accessible tab and accordion primitives', () => {
    const tabs = mount(TabSwitcher, {
      props: { defaultActiveId: 'one', items: { ...empty, items } },
    })
    const accordion = mount(AccordionSwitcher, {
      props: { defaultActiveId: 'one', items: { ...empty, items } },
    })
    expect(tabs.find('[role="tablist"]').exists()).toBe(true)
    expect(accordion.find('.ui-accordion').exists()).toBe(true)
  })

  it('supports progress, segmented, and category selection without payload keys', async () => {
    const progress = mount(ProgressSwitcher, {
      props: { items: { ...empty, items: [{ ...items[0]!, status: 'active' }] } },
    })
    const segmented = mount(SegmentedSwitcher, {
      props: { defaultActiveId: 'one', items: { ...empty, items } },
    })
    const category = mount(CategorySwitcher, {
      props: { defaultActiveId: 'one', items: { ...empty, items } },
    })
    await segmented.findAll('button')[1]!.trigger('click')
    expect(progress.find('.ui-progress-switcher__item--active').exists()).toBe(true)
    expect(segmented.text()).toContain('Second')
    expect(category.find('[role="tabpanel"]').exists()).toBe(true)
  })
})

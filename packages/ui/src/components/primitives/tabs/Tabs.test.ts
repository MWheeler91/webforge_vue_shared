import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseTabs from './BaseTabs.vue'
import TabList from './TabList.vue'
import TabPanel from './TabPanel.vue'
import TabTrigger from './TabTrigger.vue'

describe('Tabs', () => {
  it('moves selection with arrow keys', async () => {
    const wrapper = mount({
      components: { BaseTabs, TabList, TabTrigger, TabPanel },
      template:
        '<BaseTabs default-value="one"><TabList><TabTrigger value="one">One</TabTrigger><TabTrigger value="two">Two</TabTrigger></TabList><TabPanel value="one">First</TabPanel><TabPanel value="two">Second</TabPanel></BaseTabs>',
    })
    const tabs = wrapper.findAll('[role="tab"]')
    await tabs[0]!.trigger('keydown', { key: 'ArrowRight' })
    expect(tabs[1]!.attributes('aria-selected')).toBe('true')
  })
})

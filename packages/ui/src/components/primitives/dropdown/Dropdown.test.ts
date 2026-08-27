import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseDropdown from './BaseDropdown.vue'
import DropdownItem from './DropdownItem.vue'
import DropdownMenu from './DropdownMenu.vue'
import DropdownTrigger from './DropdownTrigger.vue'

describe('Dropdown', () => {
  it('supports keyboard movement between menu items', async () => {
    const host = document.createElement('div')
    document.body.append(host)
    const wrapper = mount({
      attachTo: host,
      components: { BaseDropdown, DropdownTrigger, DropdownMenu, DropdownItem },
      template:
        '<BaseDropdown default-open><DropdownTrigger>Actions</DropdownTrigger><DropdownMenu><DropdownItem>One</DropdownItem><DropdownItem>Two</DropdownItem></DropdownMenu></BaseDropdown>',
    })
    const items = wrapper.findAll('[role="menuitem"]')
    expect(items).toHaveLength(2)
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      bubbles: true,
      cancelable: true,
    })
    wrapper.get('[role="menu"]').element.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(true)
    wrapper.unmount()
    host.remove()
  })
})

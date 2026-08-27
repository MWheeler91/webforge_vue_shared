import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CenteredNavbar from './centered-navbar/CenteredNavbar.vue'
import DisclosureNavbar from './disclosure-navbar/DisclosureNavbar.vue'
import SidebarNavigation from './sidebar-navigation/SidebarNavigation.vue'
import StandardNavbar from './standard-navbar/StandardNavbar.vue'

describe('Ui navbar patterns', () => {
  const empty = { keyed: {}, grouped: {}, items: [] }

  it('accepts direct standardized binding without identity fields', () => {
    const wrapper = mount(StandardNavbar, {
      props: {
        brand: { label: 'Northstar' },
        links: { ...empty, items: [{ label: 'Work', href: '/work' }] },
        actions: empty,
      },
    })
    expect(wrapper.text()).toContain('Northstar')
    expect(wrapper.text()).toContain('Work')
  })

  it('renders centered link regions only when supplied', () => {
    const wrapper = mount(CenteredNavbar, {
      props: { leadingLinks: { ...empty, items: [{ label: 'Shop' }] }, trailingLinks: empty },
    })
    expect(wrapper.text()).toContain('Shop')
    expect(wrapper.findAll('.ui-navbar-nav')).toHaveLength(1)
  })

  it('renders disclosure menus and sidebar groups from collections', () => {
    const disclosure = mount(DisclosureNavbar, {
      props: {
        menus: {
          ...empty,
          items: [{ label: 'Products', links: { ...empty, items: [{ label: 'Overview' }] } }],
        },
      },
    })
    const sidebar = mount(SidebarNavigation, {
      props: {
        links: {
          keyed: {},
          grouped: { Workspace: [{ label: 'Settings' }] },
          items: [{ label: 'Home' }],
        },
      },
    })
    expect(disclosure.find('details').exists()).toBe(true)
    expect(sidebar.text()).toContain('Workspace')
  })
})

import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import NavbarLink from './NavbarLink.vue'

describe('NavbarLink', () => {
  it('lets Vue Router generate the href when an internal destination is supplied', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: '<div />' } },
        { path: '/services', component: { template: '<div />' } },
      ],
    })
    await router.push('/')
    await router.isReady()

    const wrapper = mount(NavbarLink, {
      props: { to: { path: '/services', query: { fixture: 'dense' } } },
      slots: { default: 'Services' },
      global: { plugins: [router] },
    })

    expect(wrapper.get('a').attributes('href')).toBe('/services?fixture=dense')
  })

  it('preserves ordinary href navigation when no router destination is supplied', () => {
    const wrapper = mount(NavbarLink, {
      props: { href: 'tel:+15550123' },
      slots: { default: 'Call' },
    })

    expect(wrapper.get('a').attributes('href')).toBe('tel:+15550123')
  })
})

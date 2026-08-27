import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppFooter from './app-footer/AppFooter.vue'
import ColumnsFooter from './columns-footer/ColumnsFooter.vue'
import LegalFooter from './legal-footer/LegalFooter.vue'
import MinimalFooter from './minimal-footer/MinimalFooter.vue'
import NewsletterFooter from './newsletter-footer/NewsletterFooter.vue'
import PromoFooter from './promo-footer/PromoFooter.vue'

describe('Ui footer patterns', () => {
  const empty = { keyed: {}, grouped: {}, items: [] }

  it('accepts standardized direct bindings without identity fields', () => {
    const wrapper = mount(MinimalFooter, {
      props: {
        brand: { label: 'Northstar' },
        links: { ...empty, items: [{ label: 'About', href: '/about' }] },
        legalText: '© 2026',
      },
    })
    expect(wrapper.text()).toContain('Northstar')
    expect(wrapper.text()).toContain('About')
  })

  it('omits optional regions for empty and null payloads', () => {
    const newsletter = mount(NewsletterFooter, {
      props: { heading: null, body: null, buttons: empty, links: empty },
    })
    const app = mount(AppFooter, { props: { status: null, meta: null, links: empty } })
    expect(newsletter.find('.ui-newsletter-footer').exists()).toBe(false)
    expect(newsletter.find('form').exists()).toBe(false)
    expect(app.find('.ui-app-footer').exists()).toBe(false)
  })

  it('renders normalized collections in their semantic positions', () => {
    const columns = mount(ColumnsFooter, {
      props: {
        columns: {
          ...empty,
          items: [
            {
              heading: { text: 'Product' },
              links: { ...empty, items: [{ label: 'Overview', href: '/overview' }] },
            },
          ],
        },
      },
    })
    const legal = mount(LegalFooter, {
      props: {
        legalLinks: { ...empty, items: [{ label: 'Privacy', href: '/privacy' }] },
        socialLinks: empty,
      },
    })
    expect(columns.find('.ui-columns-footer__columns').exists()).toBe(true)
    expect(legal.text()).toContain('Privacy')
  })

  it('keeps promotional footer content within one footer landmark', () => {
    const wrapper = mount(PromoFooter, {
      props: {
        heading: { text: 'Start now' },
        columns: {
          ...empty,
          items: [{ links: { ...empty, items: [{ label: 'Learn', href: '/learn' }] } }],
        },
      },
    })
    expect(wrapper.findAll('footer')).toHaveLength(1)
    expect(wrapper.text()).toContain('Learn')
  })
})

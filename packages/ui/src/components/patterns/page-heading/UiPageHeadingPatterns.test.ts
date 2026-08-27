import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BreadcrumbTrail from './breadcrumb-trail/BreadcrumbTrail.vue'
import PageHeading from './page-heading/PageHeading.vue'

describe('Ui page-heading patterns', () => {
  const empty = { keyed: {}, grouped: {}, items: [] }

  it('binds normalized breadcrumbs directly and marks the terminal entry current', () => {
    const wrapper = mount(BreadcrumbTrail, {
      props: {
        breadcrumbs: { ...empty, items: [{ label: 'Home', href: '/' }, { label: 'Current' }] },
      },
    })
    expect(wrapper.find('[aria-current="page"]').text()).toBe('Current')
  })

  it('renders only supplied page-heading regions', () => {
    const wrapper = mount(PageHeading, {
      props: { layout: 'media', heading: { text: 'Page title' }, buttons: empty },
    })
    expect(wrapper.text()).toContain('Page title')
    expect(wrapper.find('.ui-page-heading__actions').exists()).toBe(false)
  })
})

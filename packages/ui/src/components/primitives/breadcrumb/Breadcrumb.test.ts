import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseBreadcrumb from './BaseBreadcrumb.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'

describe('Breadcrumb', () => {
  it('marks the terminal item as the current page', () => {
    const wrapper = mount({
      components: { BaseBreadcrumb, BreadcrumbItem },
      template: '<BaseBreadcrumb><BreadcrumbItem current>Library</BreadcrumbItem></BaseBreadcrumb>',
    })
    expect(wrapper.get('[aria-current="page"]').text()).toBe('Library')
  })
})

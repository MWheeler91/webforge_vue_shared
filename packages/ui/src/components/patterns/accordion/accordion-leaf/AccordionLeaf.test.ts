import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseAccordion from '../../../primitives/accordion/BaseAccordion.vue'
import AccordionLeaf from './AccordionLeaf.vue'

describe('AccordionLeaf', () => {
  it('renders the title as the trigger and the body as the panel', () => {
    const wrapper = mount(
      { components: { BaseAccordion, AccordionLeaf }, template: `<BaseAccordion><AccordionLeaf value="a" title="A question?" body="An answer." /></BaseAccordion>` },
    )
    expect(wrapper.get('.ui-accordion-leaf__trigger').text()).toContain('A question?')
    expect(wrapper.get('.ui-accordion__panel-content').text()).toBe('An answer.')
  })

  it('defaults to the plusMinus indicator when there is no enclosing AccordionPattern', () => {
    const wrapper = mount(
      { components: { BaseAccordion, AccordionLeaf }, template: `<BaseAccordion><AccordionLeaf value="a" title="A question?" body="An answer." /></BaseAccordion>` },
    )
    expect(wrapper.get('.ui-accordion-leaf__indicator--plus-minus').text()).toBe('+')
  })

  it('renders no panel when body is empty', () => {
    const wrapper = mount(
      { components: { BaseAccordion, AccordionLeaf }, template: `<BaseAccordion><AccordionLeaf value="a" title="A question?" /></BaseAccordion>` },
    )
    expect(wrapper.find('.ui-accordion__panel').exists()).toBe(false)
  })

  it('starts closed by default', () => {
    const wrapper = mount(
      { components: { BaseAccordion, AccordionLeaf }, template: `<BaseAccordion><AccordionLeaf value="a" title="A question?" body="An answer." /></BaseAccordion>` },
    )
    expect(wrapper.find('.ui-accordion__item--open').exists()).toBe(false)
  })

  it('starts open when defaultOpen is set', async () => {
    const wrapper = mount(
      {
        components: { BaseAccordion, AccordionLeaf },
        template: `<BaseAccordion multiple><AccordionLeaf value="a" title="One?" body="First." /><AccordionLeaf value="b" title="Two?" body="Second." default-open /></BaseAccordion>`,
      },
    )
    await wrapper.vm.$nextTick()
    const open = wrapper.findAll('.ui-accordion__item--open')
    expect(open).toHaveLength(1)
    expect(open[0]!.text()).toContain('Two?')
  })
})

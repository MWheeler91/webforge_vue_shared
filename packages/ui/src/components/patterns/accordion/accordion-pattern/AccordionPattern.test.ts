import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AccordionPattern from './AccordionPattern.vue'
import AccordionLeaf from '../accordion-leaf/AccordionLeaf.vue'

const components = { AccordionPattern, AccordionLeaf }

describe('AccordionPattern', () => {
  it('defaults to the surface variant', () => {
    const wrapper = mount({
      components,
      template: `<AccordionPattern><AccordionLeaf value="a" title="One?" body="First." /></AccordionPattern>`,
    })
    expect(wrapper.get('.ui-accordion-pattern--variant-surface')).toBeTruthy()
  })

  it('forwards a non-default variant', () => {
    const wrapper = mount({
      components,
      template: `<AccordionPattern variant="ghost"><AccordionLeaf value="a" title="One?" body="First." /></AccordionPattern>`,
    })
    expect(wrapper.get('.ui-accordion-pattern--variant-ghost')).toBeTruthy()
  })

  it('defaults to slide animation and lets more than one panel stay open', async () => {
    const wrapper = mount({
      components,
      template: `<AccordionPattern><AccordionLeaf value="a" title="One?" body="First." /><AccordionLeaf value="b" title="Two?" body="Second." /></AccordionPattern>`,
    })
    expect(wrapper.get('.ui-accordion--animation-slide')).toBeTruthy()
    const triggers = wrapper.findAll('.ui-accordion__trigger')
    for (const trigger of triggers) await trigger.trigger('click')
    expect(wrapper.findAll('.ui-accordion__item--open')).toHaveLength(2)
  })

  it('closes the previous panel when openMode is single', async () => {
    const wrapper = mount({
      components,
      template: `<AccordionPattern open-mode="single"><AccordionLeaf value="a" title="One?" body="First." /><AccordionLeaf value="b" title="Two?" body="Second." /></AccordionPattern>`,
    })
    const triggers = wrapper.findAll('.ui-accordion__trigger')
    await triggers[0]!.trigger('click')
    await triggers[1]!.trigger('click')
    expect(wrapper.findAll('.ui-accordion__item--open')).toHaveLength(1)
  })

  it('forwards a non-default animation to BaseAccordion', () => {
    const wrapper = mount({
      components,
      template: `<AccordionPattern animation="none"><AccordionLeaf value="a" title="One?" body="First." /></AccordionPattern>`,
    })
    expect(wrapper.get('.ui-accordion--animation-none')).toBeTruthy()
  })

  it('provides its indicator to nested AccordionLeaf items', () => {
    const wrapper = mount({
      components,
      template: `<AccordionPattern indicator="chevron"><AccordionLeaf value="a" title="One?" body="First." /></AccordionPattern>`,
    })
    expect(wrapper.find('.ui-accordion-leaf__indicator--chevron').exists()).toBe(true)
  })

  it('lets a leaf override the injected indicator', () => {
    const wrapper = mount({
      components,
      template: `<AccordionPattern indicator="chevron"><AccordionLeaf value="a" title="One?" body="First." indicator="none" /></AccordionPattern>`,
    })
    expect(wrapper.find('.ui-accordion-leaf__indicator').exists()).toBe(false)
  })
})

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseAccordion from './BaseAccordion.vue'
import AccordionItem from './AccordionItem.vue'
import AccordionPanel from './AccordionPanel.vue'
import AccordionTrigger from './AccordionTrigger.vue'
describe('Accordion', () => {
  it('opens an item', async () => {
    const wrapper = mount({
      components: { BaseAccordion, AccordionItem, AccordionTrigger, AccordionPanel },
      template:
        '<BaseAccordion><AccordionItem value="one"><AccordionTrigger>One</AccordionTrigger><AccordionPanel>Content</AccordionPanel></AccordionItem></BaseAccordion>',
    })
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('button').attributes('aria-expanded')).toBe('true')
  })

  it('supports opt-in slide animation while preserving the open state', async () => {
    const wrapper = mount({
      components: { BaseAccordion, AccordionItem, AccordionTrigger, AccordionPanel },
      template:
        '<BaseAccordion animation="slide"><AccordionItem value="one"><AccordionTrigger>One</AccordionTrigger><AccordionPanel>Content</AccordionPanel></AccordionItem></BaseAccordion>',
    })

    const panel = wrapper.get('.ui-accordion__panel')
    expect(panel.classes()).toContain('ui-accordion__panel--animation-slide')
    expect(panel.attributes('aria-hidden')).toBe('true')

    await wrapper.get('button').trigger('click')

    expect(wrapper.get('.ui-accordion__item').classes()).toContain('ui-accordion__item--open')
    expect(panel.classes()).toContain('ui-accordion__panel--open')
    expect(panel.attributes('aria-hidden')).toBeUndefined()
  })

  it('supports a borderless surface while retaining item dividers', () => {
    const wrapper = mount(BaseAccordion, { props: { borderless: true } })

    expect(wrapper.classes()).toContain('ui-accordion--borderless')
  })

})

import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { resetUiConfig, setUiConfig } from '../../../config/ui.runtime.ts'
import BaseAccordion from './BaseAccordion.vue'
import AccordionItem from './AccordionItem.vue'
import AccordionPanel from './AccordionPanel.vue'
import AccordionTrigger from './AccordionTrigger.vue'
describe('Accordion', () => {
  afterEach(() => resetUiConfig())

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

  it('uses the resolved accordion motion modifier without changing slide open/close semantics', async () => {
    setUiConfig({ accordion: { motion: 'reduced' } })
    const wrapper = mount({
      components: { BaseAccordion, AccordionItem, AccordionTrigger, AccordionPanel },
      template:
        '<BaseAccordion animation="slide"><AccordionItem value="one"><AccordionTrigger>One</AccordionTrigger><AccordionPanel>Content</AccordionPanel></AccordionItem></BaseAccordion>',
    })

    expect(wrapper.get('.ui-accordion').classes()).toContain('ui-accordion--motion-reduced')
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('button').attributes('aria-expanded')).toBe('true')
  })

})

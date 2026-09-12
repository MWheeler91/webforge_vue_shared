import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FaqSection from './FaqSection.vue'
import type { UiSectionComponentCollection, UiSectionData } from '../../../primitives/section/section.types.ts'

function faqItem(
  key: string,
  question: string,
  answer?: string,
  config: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    key,
    componentKey: 'accordion-leaf',
    config,
    elements: {
      text: {
        title: [{ text: question }],
        ...(answer !== undefined ? { body: [{ text: answer }] } : {}),
      },
    },
  }
}

function accordionConfig(config: Record<string, unknown> = {}): Record<string, unknown> {
  return { key: 'accordion', componentKey: 'accordion', config }
}

function sectionWith(
  items: Record<string, unknown>[],
  options: { accordionConfig?: Record<string, unknown> } = {},
): UiSectionData {
  const components: UiSectionComponentCollection = { item: items as never }
  if (options.accordionConfig) components.accordion = [accordionConfig(options.accordionConfig)] as never
  return {
    key: 'faqs',
    componentKey: 'faq-section',
    config: {},
    elements: { text: { title: [{ text: 'Frequently asked questions' }] } },
    components,
  }
}

describe('FaqSection', () => {
  it('renders the section header from section elements', () => {
    const wrapper = mount(FaqSection, {
      props: { section: sectionWith([faqItem('q1', 'Do you offer refunds?', 'Yes, within 30 days.')]) },
    })
    expect(wrapper.get('.ui-faq-section__header').text()).toContain('Frequently asked questions')
  })

  it('renders one accordion leaf per item component, question as the trigger and answer as the panel', () => {
    const wrapper = mount(FaqSection, {
      props: {
        section: sectionWith([
          faqItem('q1', 'Do you offer refunds?', 'Yes, within 30 days.'),
          faqItem('q2', 'Is support included?', 'Yes, on every plan.'),
        ]),
      },
    })
    expect(wrapper.findAll('.ui-accordion-leaf__trigger .ui-text').map((n) => n.text())).toEqual([
      'Do you offer refunds?',
      'Is support included?',
    ])
    expect(wrapper.findAll('.ui-accordion__panel-content').map((n) => n.text())).toEqual([
      'Yes, within 30 days.',
      'Yes, on every plan.',
    ])
  })

  it('allows more than one panel open at once by default and flips the +/- indicator', async () => {
    const wrapper = mount(FaqSection, {
      props: {
        section: sectionWith([
          faqItem('q1', 'One?', 'First answer.'),
          faqItem('q2', 'Two?', 'Second answer.'),
        ]),
      },
    })
    expect(wrapper.findAll('.ui-accordion-leaf__indicator').map((n) => n.text())).toEqual(['+', '+'])
    const triggers = wrapper.findAll('.ui-accordion__trigger')
    for (const trigger of triggers) await trigger.trigger('click')
    expect(wrapper.findAll('.ui-accordion__item--open')).toHaveLength(2)
    expect(wrapper.findAll('.ui-accordion-leaf__indicator').map((n) => n.text())).toEqual(['−', '−'])
  })

  it('reads openMode, indicator, animation and variant from the accordion component placement, not the section', async () => {
    const wrapper = mount(FaqSection, {
      props: {
        variant: 'inverse',
        section: sectionWith(
          [faqItem('q1', 'One?', 'First answer.'), faqItem('q2', 'Two?', 'Second answer.')],
          { accordionConfig: { openMode: 'single', indicator: 'chevron', animation: 'none', variant: 'outline' } },
        ),
      },
    })
    expect(wrapper.get('.ui-accordion--animation-none')).toBeTruthy()
    expect(wrapper.get('.ui-accordion-pattern--variant-outline')).toBeTruthy()
    expect(wrapper.findAll('.ui-accordion-leaf__indicator--chevron')).toHaveLength(2)
    const triggers = wrapper.findAll('.ui-accordion__trigger')
    await triggers[0]!.trigger('click')
    await triggers[1]!.trigger('click')
    expect(wrapper.findAll('.ui-accordion__item--open')).toHaveLength(1)
  })

  it('starts an item open when its config initialState is the string "open"', async () => {
    const wrapper = mount(FaqSection, {
      props: {
        section: sectionWith([
          faqItem('q1', 'One?', 'First answer.'),
          faqItem('q2', 'Two?', 'Second answer.', { initialState: 'open' }),
        ]),
      },
    })
    await wrapper.vm.$nextTick()
    const open = wrapper.findAll('.ui-accordion__item--open')
    expect(open).toHaveLength(1)
    expect(open[0]!.text()).toContain('Two?')
  })

  it('skips items with no question', () => {
    const wrapper = mount(FaqSection, {
      props: {
        section: sectionWith([
          faqItem('q1', 'A real question?', 'An answer.'),
          { key: 'q2', componentKey: 'accordion-leaf', config: {}, elements: { text: { body: [{ text: 'No question' }] } } },
        ]),
      },
    })
    expect(wrapper.findAll('.ui-accordion__trigger')).toHaveLength(1)
  })

  it('renders nothing when there are no items', () => {
    const wrapper = mount(FaqSection, { props: { section: sectionWith([]) } })
    expect(wrapper.find('.ui-faq-section__accordion').exists()).toBe(false)
  })
})

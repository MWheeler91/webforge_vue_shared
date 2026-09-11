import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CtaSection from './CtaSection.vue'
import type { UiSectionData } from '../../../primitives/section/section.types.ts'

function ctaSection(extra: Partial<UiSectionData> = {}): UiSectionData {
  return {
    key: 'cta',
    componentKey: 'cta-section',
    config: {},
    elements: {
      text: {
        eyebrow: [{ text: 'Ready when you are' }],
        title: [{ text: 'Put your whole team on one schedule' }],
        body: [{ text: 'Set up takes an afternoon, not a quarter.' }],
      },
      buttons: {
        primary: [{ text: 'Start free trial', href: '/signup', variant: 'primary' }],
      },
    },
    ...extra,
  }
}

describe('CtaSection', () => {
  it('renders the header and actions from section elements', () => {
    const wrapper = mount(CtaSection, { props: { section: ctaSection() } })
    expect(wrapper.text()).toContain('Ready when you are')
    expect(wrapper.get('.ui-section-header__title').text()).toBe(
      'Put your whole team on one schedule',
    )
    expect(wrapper.findAll('.cta-section__actions .ui-btn')).toHaveLength(1)
  })

  it('defaults to the banner layout', () => {
    const wrapper = mount(CtaSection, { props: { section: ctaSection() } })
    expect(wrapper.get('.cta-section').classes()).toContain('cta-section--layout-banner')
  })

  it('applies the requested layout modifier', () => {
    for (const layout of ['banner', 'centered', 'panel'] as const) {
      const wrapper = mount(CtaSection, { props: { section: ctaSection(), layout } })
      expect(wrapper.get('.cta-section').classes()).toContain(`cta-section--layout-${layout}`)
    }
  })

  it('renders nothing for the header when no text elements are present', () => {
    const section = ctaSection({ elements: { buttons: { primary: [{ text: 'Go', href: '/x' }] } } })
    const wrapper = mount(CtaSection, { props: { section } })
    expect(wrapper.find('.ui-section-header').exists()).toBe(false)
    expect(wrapper.findAll('.cta-section__actions .ui-btn')).toHaveLength(1)
  })

  it('forwards the section variant to BaseSection', () => {
    const wrapper = mount(CtaSection, { props: { section: ctaSection(), variant: 'brand' } })
    expect(wrapper.get('.cta-section').classes()).toContain('ui-section--variant-brand')
  })
})

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TrustStripSection from './TrustStripSection.vue'
import type { UiSectionData } from '../../../primitives/section/section.types.ts'

function card(index: number) {
  return {
    key: `stat-${index}`,
    componentKey: 'stat-card',
    config: {},
    elements: {
      text: {
        value: [{ text: `${index}00%` }],
        title: [{ text: `Stat ${index}` }],
        body: [{ text: `Detail ${index}` }],
      },
    },
  }
}

function trustStripSection(cardCount: number, extra: Partial<UiSectionData> = {}): UiSectionData {
  return {
    key: 'trust-strip',
    componentKey: 'trust-strip-section',
    config: {},
    elements: {},
    components: { card: Array.from({ length: cardCount }, (_, i) => card(i + 1)) },
    ...extra,
  }
}

describe('TrustStripSection', () => {
  it('renders one stat card per nested card node', () => {
    const wrapper = mount(TrustStripSection, { props: { section: trustStripSection(4) } })
    expect(wrapper.findAll('.ui-stat-card')).toHaveLength(4)
    expect(wrapper.text()).toContain('Stat 1')
    expect(wrapper.text()).toContain('Detail 1')
  })

  it('caps at 8 cards regardless of layout and discards the rest', () => {
    const wrapper = mount(TrustStripSection, { props: { section: trustStripSection(9) } })
    expect(wrapper.findAll('.ui-stat-card')).toHaveLength(8)
  })

  it('marks itself "many" only once more than 4 cards are present, gating the 8-column tier', () => {
    const four = mount(TrustStripSection, { props: { section: trustStripSection(4) } })
    expect(four.get('.trust-strip-section').classes()).not.toContain('trust-strip-section--many')

    const eight = mount(TrustStripSection, { props: { section: trustStripSection(8) } })
    expect(eight.get('.trust-strip-section').classes()).toContain('trust-strip-section--many')
  })

  it('renders no section header when no eyebrow/title/body is supplied', () => {
    const wrapper = mount(TrustStripSection, { props: { section: trustStripSection(4) } })
    expect(wrapper.find('.trust-strip-section__header').exists()).toBe(false)
  })

  it('renders a section header when title text is supplied', () => {
    const section = trustStripSection(4, { elements: { text: { title: [{ text: 'Why teams choose us' }] } } })
    const wrapper = mount(TrustStripSection, { props: { section } })
    expect(wrapper.get('.trust-strip-section__header').text()).toContain('Why teams choose us')
  })

  it('ignores each card\'s own componentKey and never dispatches through the card registry', () => {
    const section = trustStripSection(1)
    section.components!.card![0].componentKey = 'feature-card'
    const wrapper = mount(TrustStripSection, { props: { section } })
    expect(wrapper.findAll('.ui-stat-card')).toHaveLength(1)
  })

  it('defaults to the compact layout, a tight card padding, and dividers on', () => {
    const wrapper = mount(TrustStripSection, { props: { section: trustStripSection(4) } })
    expect(wrapper.get('.trust-strip-section').classes()).toContain('trust-strip-section--layout-compact')
    expect(wrapper.get('.trust-strip-section').classes()).toContain('trust-strip-section--divider')
    expect(wrapper.get('.ui-stat-card__card').classes()).toContain('ui-card--padding-sm')
  })

  it('omits the divider class when divider is false', () => {
    const wrapper = mount(TrustStripSection, { props: { section: trustStripSection(4), divider: false } })
    expect(wrapper.get('.trust-strip-section').classes()).not.toContain('trust-strip-section--divider')
  })

  it('switches to a roomier card padding in the grid layout', () => {
    const wrapper = mount(TrustStripSection, { props: { section: trustStripSection(4), layout: 'grid' } })
    expect(wrapper.get('.trust-strip-section').classes()).toContain('trust-strip-section--layout-grid')
    expect(wrapper.get('.ui-stat-card__card').classes()).toContain('ui-card--padding-lg')
  })

  it("renders a card's title as a plain p tag with prominent emphasis when its data says so", () => {
    const section = trustStripSection(1)
    section.components!.card![0].elements!.text!.title = [
      { text: 'Stat 1', as: 'p', emphasis: 'prominent' },
    ]
    const wrapper = mount(TrustStripSection, { props: { section } })
    const title = wrapper.get('.ui-stat-card p[data-emphasis="prominent"]')
    expect(title.text()).toBe('Stat 1')
  })

  it('renders each card as a direct child of the grid, not nested inside StatCard, so the divider CSS positions correctly', () => {
    const wrapper = mount(TrustStripSection, { props: { section: trustStripSection(4) } })
    const grid = wrapper.get('.trust-strip-section__grid')
    const directChildren = grid.element.children
    expect(directChildren).toHaveLength(4)
    for (const child of Array.from(directChildren)) {
      expect(child.classList.contains('trust-strip-section__item')).toBe(true)
    }
  })
})

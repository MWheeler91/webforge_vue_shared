import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import TestimonialSection from './TestimonialSection.vue'
import type { UiSectionData } from '../../../primitives/section/section.types.ts'

function quoteCard(key: string, quote: string, author?: string): Record<string, unknown> {
  return {
    key,
    componentKey: 'quote-card',
    config: {},
    elements: {
      text: {
        quote: [{ text: quote }],
        ...(author ? { author: [{ text: author }] } : {}),
      },
    },
  }
}

function sectionWith(cards: Record<string, unknown>[], extra: Partial<UiSectionData> = {}): UiSectionData {
  return {
    key: 'voices',
    componentKey: 'testimonial-section',
    config: {},
    elements: { text: { title: [{ text: 'What people say' }] } },
    cards: { items: cards as never },
    ...extra,
  }
}

// jsdom does no layout, so the grid's ResizeObserver never fires and clientWidth
// is 0. Pin a width so the even-grid resolution can be exercised.
function stubGridWidth(px: number) {
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(px)
}

function stubReducedMotion(matches: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
  vi.useRealTimers()
})

describe('TestimonialSection', () => {
  it('renders the section header from section elements', () => {
    const wrapper = mount(TestimonialSection, {
      props: { section: sectionWith([quoteCard('q1', 'A clear, useful system.', 'Jordan Lee')]) },
    })
    expect(wrapper.get('.ui-testimonial-section--layout-grid')).toBeTruthy()
    expect(wrapper.get('.ui-testimonial-section__header').text()).toContain('What people say')
  })

  it('drives nested quote cards from UiSectionData through UiCardRenderer', () => {
    const wrapper = mount(TestimonialSection, {
      props: {
        section: sectionWith([
          quoteCard('q1', 'The information was easy to find.', 'Jordan Lee'),
          quoteCard('q2', 'Practical at every step.', 'Sam Rivera'),
        ]),
      },
    })
    const quotes = wrapper.findAll('.ui-testimonial-section__grid blockquote.ui-quote-card__quote')
    expect(quotes.map((node) => node.text())).toEqual([
      'The information was easy to find.',
      'Practical at every step.',
    ])
  })

  it('renders only the cards that have a quotation', () => {
    const wrapper = mount(TestimonialSection, {
      props: {
        section: sectionWith([
          quoteCard('q1', 'A small system with a noticeable impact.', 'Taylor Morgan'),
          { key: 'q2', componentKey: 'quote-card', config: {}, elements: { text: { author: [{ text: 'No quote' }] } } },
        ]),
      },
    })
    expect(wrapper.findAll('.ui-quote-card')).toHaveLength(1)
  })

  it('maps density to the target card width custom property', () => {
    const wrapper = mount(TestimonialSection, {
      props: { section: sectionWith([quoteCard('q1', 'Spacious quote.')]), density: 'spacious' },
    })
    const viewport = wrapper.get('.ui-testimonial-section__viewport').element as HTMLElement
    expect(viewport.style.getPropertyValue('--ui-testimonial-card-min')).toBe('30rem')
    expect(wrapper.get('.ui-testimonial-section--density-spacious')).toBeTruthy()
  })

  describe('grid layout — balanced rectangle', () => {
    async function shape(count: number, width: number) {
      stubGridWidth(width)
      const cards = Array.from({ length: count }, (_, index) =>
        quoteCard(`q${index}`, `Quote number ${index + 1}.`),
      )
      const wrapper = mount(TestimonialSection, { props: { section: sectionWith(cards) } })
      await wrapper.vm.$nextTick()
      const grid = wrapper.get('.ui-testimonial-section__grid').element as HTMLElement
      return {
        cols: grid.style.getPropertyValue('--ui-testimonial-cols'),
        rendered: wrapper.findAll('.ui-testimonial-section__grid .ui-quote-card').length,
      }
    }

    it('keeps every card for one to four quotes, stepping columns to a divisor', async () => {
      // width fits ~4 columns (22rem card + gap)
      expect(await shape(3, 1700)).toEqual({ cols: '3', rendered: 3 })
      expect(await shape(4, 1700)).toEqual({ cols: '4', rendered: 4 })
      // width fits only 3 columns: 4 quotes become a 2 x 2 block, still all shown
      expect(await shape(4, 1200)).toEqual({ cols: '2', rendered: 4 })
    })

    it('drops a ragged final row for five or more quotes', async () => {
      expect(await shape(5, 1700)).toEqual({ cols: '4', rendered: 4 })
      expect(await shape(6, 1700)).toEqual({ cols: '3', rendered: 6 })
      expect(await shape(7, 1700)).toEqual({ cols: '3', rendered: 6 })
      expect(await shape(8, 1700)).toEqual({ cols: '4', rendered: 8 })
    })

    it('never renders more than twelve cards', async () => {
      expect((await shape(20, 2600)).rendered).toBeLessThanOrEqual(12)
    })

    it('re-resolves the column count for a narrower container', async () => {
      // eight quotes where only two columns fit -> 2 x 4, all shown
      expect(await shape(8, 900)).toEqual({ cols: '2', rendered: 8 })
    })
  })

  describe('marquee layout', () => {
    it('duplicates the track and hides the second copy from assistive tech', () => {
      const cards = [
        quoteCard('q1', 'First voice.'),
        quoteCard('q2', 'Second voice.'),
        quoteCard('q3', 'Third voice.'),
      ]
      const wrapper = mount(TestimonialSection, {
        props: { section: sectionWith(cards), layout: 'marquee' },
      })
      expect(wrapper.get('.ui-testimonial-section__track')).toBeTruthy()
      // two identical groups (the second hidden from assistive tech) for a seamless loop
      const groups = wrapper.findAll('.ui-testimonial-section__group')
      expect(groups).toHaveLength(2)
      expect(groups[1]!.attributes('aria-hidden')).toBe('true')
      expect(wrapper.findAll('.ui-testimonial-section__marquee .ui-testimonial-section__slide')).toHaveLength(6)
    })

    it('scales the scroll duration with the number of quotes', () => {
      const wrapper = mount(TestimonialSection, {
        props: {
          section: sectionWith(
            Array.from({ length: 8 }, (_, index) => quoteCard(`q${index}`, `Voice ${index}.`)),
          ),
          layout: 'marquee',
        },
      })
      const marquee = wrapper.get('.ui-testimonial-section__marquee').element as HTMLElement
      // 8 quotes x 7s per card
      expect(marquee.style.getPropertyValue('--ui-testimonial-marquee-duration')).toBe('56s')
    })

    it('falls back to a static strip when the viewer prefers reduced motion', async () => {
      stubReducedMotion(true)
      const wrapper = mount(TestimonialSection, {
        props: { section: sectionWith([quoteCard('q1', 'Reduced motion voice.')]), layout: 'marquee' },
      })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.ui-testimonial-section__track').exists()).toBe(false)
      expect(wrapper.get('.ui-testimonial-section__strip')).toBeTruthy()
    })
  })

  describe('fade layout', () => {
    const fourCards = () => [
      quoteCard('q1', 'One.'),
      quoteCard('q2', 'Two.'),
      quoteCard('q3', 'Three.'),
      quoteCard('q4', 'Four.'),
    ]

    it('shows one page at a time and advances on the interval', async () => {
      vi.useFakeTimers()
      const wrapper = mount(TestimonialSection, {
        props: { section: sectionWith(fourCards()), layout: 'fade', density: 'standard' },
      })
      await wrapper.vm.$nextTick()
      expect(wrapper.get('.ui-testimonial-section__fade')).toBeTruthy()
      expect(wrapper.findAll('.ui-testimonial-section__page blockquote').map((n) => n.text())).toEqual(['One.', 'Two.'])

      vi.advanceTimersByTime(4000)
      await wrapper.vm.$nextTick()
      expect(wrapper.findAll('.ui-testimonial-section__page blockquote').map((n) => n.text())).toEqual(['Three.', 'Four.'])
    })

    it('degrades to a static grid with reduced motion', async () => {
      stubReducedMotion(true)
      const wrapper = mount(TestimonialSection, {
        props: { section: sectionWith(fourCards()), layout: 'fade' },
      })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.ui-testimonial-section__fade').exists()).toBe(false)
      expect(wrapper.findAll('.ui-testimonial-section__grid .ui-quote-card')).toHaveLength(4)
    })

    it('degrades to a static grid when there is only a single page', async () => {
      const wrapper = mount(TestimonialSection, {
        props: { section: sectionWith([quoteCard('q1', 'Only one.')]), layout: 'fade', density: 'standard' },
      })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.ui-testimonial-section__fade').exists()).toBe(false)
      expect(wrapper.get('.ui-testimonial-section__grid')).toBeTruthy()
    })
  })
})

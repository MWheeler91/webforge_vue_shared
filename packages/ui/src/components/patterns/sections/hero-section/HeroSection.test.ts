import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import HeroSection from './HeroSection.vue'
import type { UiSectionData } from '../../../primitives/section/section.types.ts'

function heroSection(extra: Partial<UiSectionData> = {}): UiSectionData {
  return {
    key: 'hero',
    componentKey: 'hero-section',
    config: {},
    elements: {
      text: {
        eyebrow: [{ text: 'Field service software' }],
        title: [{ text: 'Every job, on the same page' }],
        body: [{ text: 'Dispatch, schedule and invoice from one place.' }],
        footnote: [{ text: 'No card required.' }],
      },
      buttons: {
        primary: [{ text: 'Start free', href: '/signup', variant: 'primary' }],
        secondary: [{ text: 'Book a demo', href: '/demo', variant: 'secondary' }],
      },
      images: {
        hero: [{ image_url: 'https://webforge.mwheelertech.com/media/placeholder.png', alt_text: 'A crew at work' }],
      },
    },
    ...extra,
  }
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
})

describe('HeroSection', () => {
  it('renders the title as an h1 with the eyebrow, lede, actions and footnote', () => {
    const wrapper = mount(HeroSection, { props: { section: heroSection() } })
    expect(wrapper.get('h1').text()).toBe('Every job, on the same page')
    expect(wrapper.text()).toContain('Field service software')
    expect(wrapper.text()).toContain('Dispatch, schedule and invoice')
    expect(wrapper.text()).toContain('No card required.')
    expect(wrapper.findAll('.hero-section__actions .ui-btn')).toHaveLength(2)
  })

  it('defaults to the centered layout and forces centre alignment there', () => {
    const wrapper = mount(HeroSection, { props: { section: heroSection() } })
    expect(wrapper.get('.hero-section').classes()).toContain('hero-section--layout-centered')
    expect(wrapper.get('.hero-section').classes()).toContain('hero-section--align-center')
    expect(wrapper.find('.hero-section__figure').exists()).toBe(false)
  })

  it('shows the image only in the split layout', () => {
    const centered = mount(HeroSection, { props: { section: heroSection(), layout: 'centered' } })
    expect(centered.find('.hero-section__figure').exists()).toBe(false)

    const split = mount(HeroSection, { props: { section: heroSection(), layout: 'split' } })
    expect(split.get('.hero-section__figure img').attributes('src')).toContain('placeholder.png')
  })

  it('falls back to centred behaviour when split has no image', () => {
    const section = heroSection({ elements: { text: { title: [{ text: 'No media here' }] } } })
    const wrapper = mount(HeroSection, { props: { section, layout: 'split' } })
    expect(wrapper.find('.hero-section__figure').exists()).toBe(false)
  })

  it('resolves minHeight to screen for spotlight and honours an explicit override', () => {
    const auto = mount(HeroSection, { props: { section: heroSection(), layout: 'spotlight' } })
    expect(auto.get('.hero-section').classes()).toContain('hero-section--minh-screen')

    const explicit = mount(HeroSection, {
      props: { section: heroSection(), layout: 'spotlight', minHeight: 'lg' },
    })
    expect(explicit.get('.hero-section').classes()).toContain('hero-section--minh-lg')
  })

  it('renders a video backdrop in spotlight when config.videoUrl is set', () => {
    stubReducedMotion(false)
    const section = heroSection({ config: { videoUrl: 'https://cdn.example.com/hero.mp4' } })
    const wrapper = mount(HeroSection, { props: { section, layout: 'spotlight' } })
    expect(wrapper.get('.hero-section__backdrop video source').attributes('src')).toBe(
      'https://cdn.example.com/hero.mp4',
    )
  })

  it('swaps the spotlight video for the poster still under reduced motion', async () => {
    stubReducedMotion(true)
    const section = heroSection({
      config: { videoUrl: 'https://cdn.example.com/hero.mp4' },
    })
    const wrapper = mount(HeroSection, { props: { section, layout: 'spotlight' } })
    await flushPromises()
    expect(wrapper.find('.hero-section__backdrop video').exists()).toBe(false)
    expect(wrapper.get('.hero-section__backdrop img').attributes('src')).toContain('placeholder.png')
  })

  it('forwards the section variant to BaseSection', () => {
    const wrapper = mount(HeroSection, { props: { section: heroSection(), variant: 'inverse' } })
    expect(wrapper.get('.hero-section').classes()).toContain('ui-section--variant-inverse')
  })
})

import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { resetUiConfig, setUiConfig } from '../../../config/ui.runtime.ts'
import { locationMapPreview } from './LocationMap.preview.ts'
import LocationMap from './LocationMap.vue'

afterEach(() => resetUiConfig())

const location = {
  latitude: 36.1627,
  longitude: -86.7816,
  address: 'Nashville, Tennessee',
  title: 'Nashville office',
}

describe('LocationMap', () => {
  it('renders an accessible provider embed for valid coordinates', () => {
    setUiConfig({ global: { pack: 'glass' } })
    const wrapper = mount(LocationMap, { props: { location } })
    const iframe = wrapper.get('iframe')

    expect(wrapper.classes()).toContain('ui-location-map--pack-glass')
    expect(wrapper.classes()).toContain('ui-location-map--ratio-16-9')
    expect(wrapper.attributes('role')).toBe('group')
    expect(wrapper.attributes('aria-label')).toBe('Nashville office')
    expect(iframe.attributes('title')).toBe('Nashville office')
    expect(iframe.attributes('loading')).toBe('lazy')
    expect(iframe.attributes('src')).toContain('openstreetmap.org/export/embed.html')
    expect(iframe.attributes('src')).toContain('marker=36.1627%2C-86.7816')
  })

  it('renders a useful fallback when coordinates are incomplete', () => {
    const wrapper = mount(LocationMap, {
      props: { location: { address: '100 Main Street', title: 'Main office' } },
    })

    expect(wrapper.find('iframe').exists()).toBe(false)
    expect(wrapper.get('.ui-location-map__fallback').text()).toContain('Main office')
    expect(wrapper.get('.ui-location-map__fallback').text()).toContain('100 Main Street')
    expect(wrapper.attributes('aria-label')).toBe('Main office')
  })

  it('renders nothing when the location is not visible', () => {
    const wrapper = mount(LocationMap, {
      props: { location: { ...location, isVisible: false } },
    })

    expect(wrapper.find('.ui-location-map').exists()).toBe(false)
    expect(wrapper.find('iframe').exists()).toBe(false)
  })

  it('renders an optional safe external directions link', () => {
    const wrapper = mount(LocationMap, {
      props: {
        location: { ...location, directionsUrl: 'https://example.com/directions' },
        directionsLabel: 'Plan your route',
      },
    })
    const link = wrapper.get('.ui-location-map__directions')

    expect(link.text()).toBe('Plan your route')
    expect(link.attributes('href')).toBe('https://example.com/directions')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
  })

  it('supports alternate responsive aspect ratios and fallback slots', () => {
    const wrapper = mount(LocationMap, {
      props: { location: {}, aspectRatio: 'square' },
      slots: { fallback: '<span data-custom-fallback>Contact us for directions.</span>' },
    })

    expect(wrapper.classes()).toContain('ui-location-map--ratio-square')
    expect(wrapper.get('[data-custom-fallback]').text()).toBe('Contact us for directions.')
  })

  it('does not render unsafe directions protocols', () => {
    const wrapper = mount(LocationMap, {
      props: { location: { ...location, directionsUrl: 'javascript:alert(1)' } },
    })

    expect(wrapper.find('.ui-location-map__directions').exists()).toBe(false)
  })

  it('keeps visibility, optional fields, directions, and aspect ratios in preview coverage', () => {
    expect(locationMapPreview.map((preview) => preview.key)).toEqual([
      'standard',
      'hidden',
      'minimal',
      'directions',
      'square',
      'wide',
    ])
  })
})

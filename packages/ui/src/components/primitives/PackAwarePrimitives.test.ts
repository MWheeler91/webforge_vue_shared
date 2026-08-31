import { mount, RouterLinkStub } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { resetUiConfig, setUiConfig } from '../../config/ui.runtime.ts'
import BaseAccordion from './accordion/BaseAccordion.vue'
import BaseAlert from './alert/BaseAlert.vue'
import BaseBreadcrumb from './breadcrumb/BaseBreadcrumb.vue'
import BaseDropdown from './dropdown/BaseDropdown.vue'
import BaseTable from './table/BaseTable.vue'
import BaseTabs from './tabs/BaseTabs.vue'
import BaseNavbar from './navigation/BaseNavbar.vue'
import LocationMap from './location-map/LocationMap.vue'
import CenteredNavbar from '../patterns/navigation/centered-navbar/CenteredNavbar.vue'

afterEach(() => resetUiConfig())

describe('pack-aware primitive roots', () => {
  it('uses the complete shared UI-pack configuration across visual composite families', () => {
    setUiConfig({ global: { pack: 'chaos' } })

    expect(mount(BaseTabs).classes()).toContain('ui-tabs--pack-chaos')
    expect(mount(BaseAccordion).classes()).toContain('ui-accordion--pack-chaos')
    expect(mount(BaseDropdown).classes()).toContain('ui-dropdown--pack-chaos')
    expect(mount(BaseTable).classes()).toContain('ui-table-wrap--pack-chaos')
    expect(mount(BaseAlert).classes()).toContain('ui-alert--pack-chaos')
    expect(mount(BaseBreadcrumb).classes()).toContain('ui-breadcrumb--pack-chaos')
    expect(
      mount(LocationMap, { props: { location: { latitude: 0, longitude: 0 } } }).classes(),
    ).toContain('ui-location-map--pack-chaos')
  })

  it('emits the Fantasy pack hook across composite families', () => {
    setUiConfig({ global: { pack: 'fantasy' } })

    expect(mount(BaseTabs).classes()).toContain('ui-tabs--pack-fantasy')
    expect(mount(BaseAccordion).classes()).toContain('ui-accordion--pack-fantasy')
    expect(mount(BaseDropdown).classes()).toContain('ui-dropdown--pack-fantasy')
    expect(mount(BaseTable).classes()).toContain('ui-table-wrap--pack-fantasy')
    expect(mount(BaseAlert).classes()).toContain('ui-alert--pack-fantasy')
    expect(mount(BaseBreadcrumb).classes()).toContain('ui-breadcrumb--pack-fantasy')
    expect(
      mount(LocationMap, { props: { location: { latitude: 0, longitude: 0 } } }).classes(),
    ).toContain('ui-location-map--pack-fantasy')
  })

  it('lets navbar inherit the global pack while keeping transparent as a surface variant', () => {
    setUiConfig({ global: { pack: 'editorial' } })

    const wrapper = mount(BaseNavbar, { props: { variant: 'transparent' } })

    expect(wrapper.classes()).toContain('ui-navbar--pack-editorial')
    expect(wrapper.classes()).toContain('ui-navbar--variant-transparent')
  })

  it('applies the shared section container width to the navbar inner shell', () => {
    const wrapper = mount(BaseNavbar, { props: { containerWidth: 'lg' } })

    expect(wrapper.classes()).toContain('ui-navbar--width-lg')
  })

  it('resolves accordion pack, radius, density, motion, and animation classes', () => {
    setUiConfig({
      global: { pack: 'editorial', radius: 'square', density: 'spacious' },
      accordion: { motion: 'expressive' },
    })

    const wrapper = mount(BaseAccordion, { props: { animation: 'slide' } })

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'ui-accordion--pack-editorial',
        'ui-accordion--radius-square',
        'ui-accordion--density-spacious',
        'ui-accordion--motion-expressive',
        'ui-accordion--animation-slide',
      ]),
    )
  })

  it('preserves router destinations in composed navbar layouts', () => {
    const wrapper = mount(CenteredNavbar, {
      props: {
        brand: { label: 'Example', href: '/' },
        links: { keyed: {}, grouped: {}, items: [{ label: 'Work', to: '/work' }] },
      },
      global: { stubs: { RouterLink: RouterLinkStub } },
    })

    expect(wrapper.findComponent(RouterLinkStub).props('to')).toBe('/work')
  })
})

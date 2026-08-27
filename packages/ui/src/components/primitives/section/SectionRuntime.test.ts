import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { resetUiConfig, setUiConfig } from '../../../config/ui.runtime.ts'
import BaseSection from './BaseSection.vue'
import SectionBody from './SectionBody.vue'
import SectionDivider from './SectionDivider.vue'
import SectionFooter from './SectionFooter.vue'
import SectionHeader from './SectionHeader.vue'

describe('section runtime classes', () => {
  afterEach(() => resetUiConfig())

  it('exposes the resolved pack and density on every visual section primitive', () => {
    setUiConfig({ section: { pack: 'paper', density: 'spacious' } })

    expect(mount(BaseSection).classes()).toEqual(
      expect.arrayContaining(['ui-section--pack-paper', 'ui-section--density-spacious']),
    )
    expect(mount(SectionHeader).classes()).toEqual(
      expect.arrayContaining([
        'ui-section-header--pack-paper',
        'ui-section-header--density-spacious',
      ]),
    )
    expect(mount(SectionBody).classes()).toEqual(
      expect.arrayContaining(['ui-section-body--pack-paper', 'ui-section-body--density-spacious']),
    )
    expect(mount(SectionFooter).classes()).toEqual(
      expect.arrayContaining([
        'ui-section-footer--pack-paper',
        'ui-section-footer--density-spacious',
      ]),
    )
    expect(mount(SectionDivider).classes()).toEqual(
      expect.arrayContaining([
        'ui-section-divider--pack-paper',
        'ui-section-divider--density-spacious',
      ]),
    )
  })

  it('reacts when the playground changes the active pack', async () => {
    const wrapper = mount(SectionHeader, { props: { title: 'Pack preview' } })

    expect(wrapper.classes()).toContain('ui-section-header--pack-default')

    setUiConfig({ global: { pack: 'neon' } })
    await nextTick()

    expect(wrapper.classes()).toContain('ui-section-header--pack-neon')
    expect(wrapper.get('.ui-section-header__title').classes()).toContain(
      'ui-section-header__title--emphasis-standard',
    )
  })

  it('keeps heading semantics independent from visual emphasis', () => {
    const prominent = mount(SectionHeader, {
      props: { title: 'Primary section', titleAs: 'h2', emphasis: 'prominent' },
    })
    const compact = mount(SectionHeader, {
      props: { title: 'Supporting section', titleAs: 'h2', emphasis: 'compact' },
    })

    expect(prominent.get('h2').classes()).toContain('ui-section-header__title--emphasis-prominent')
    expect(compact.get('h2').classes()).toContain('ui-section-header__title--emphasis-compact')
  })

  it('inherits title wrapping by default and allows an explicit instance override', () => {
    const inherited = mount(SectionHeader, { props: { title: 'Pack-controlled title' } })
    const normal = mount(SectionHeader, {
      props: { title: 'Instance-controlled title', titleWrap: 'normal' },
    })

    expect(inherited.get('h2').attributes('style')).toBeUndefined()
    expect(normal.get('h2').attributes('style')).toContain('--section-title-wrap: normal')
  })
})

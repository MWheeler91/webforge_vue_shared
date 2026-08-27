import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DefinitionList from './definition-list/DefinitionList.vue'
import FeatureList from './feature-list/FeatureList.vue'
import LinkList from './link-list/LinkList.vue'
import Timeline from './timeline/Timeline.vue'

describe('Ui list patterns', () => {
  const empty = { keyed: {}, grouped: {}, items: [] }
  const item = { heading: { text: 'Item' }, body: { text: 'Details' } }

  it('accepts direct normalized binding without item identities', () => {
    const list = mount(FeatureList, {
      props: { layout: 'check', items: { ...empty, items: [item] } },
    })
    expect(list.classes()).toContain('ui-feature-list--check')
    expect(list.text()).toContain('Item')
  })

  it('omits empty collection regions and preserves semantic lists', () => {
    const links = mount(LinkList, { props: { items: empty } })
    const definitions = mount(DefinitionList, {
      props: { items: { ...empty, items: [{ label: 'Term', value: 'Value' }] } },
    })
    const timeline = mount(Timeline, {
      props: { items: { ...empty, items: [{ ...item, date: 'Today' }] } },
    })
    expect(links.find('nav').exists()).toBe(false)
    expect(definitions.find('dl').exists()).toBe(true)
    expect(timeline.find('time').text()).toBe('Today')
  })
})

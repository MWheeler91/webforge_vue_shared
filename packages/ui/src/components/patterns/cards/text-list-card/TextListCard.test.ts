import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Icon } from '@iconify/vue'
import TextListCard from './TextListCard.vue'

describe('TextListCard', () => {
  it('renders eyebrow, title, body, items, and footer', () => {
    const wrapper = mount(TextListCard, {
      props: {
        eyebrow: 'Included',
        title: 'What you get',
        body: 'Everything in this plan.',
        items: [{ title: 'First item', description: 'Extra detail' }, 'Second item'],
        footer: 'See full terms',
      },
    })

    expect(wrapper.get('.ui-text-list-card__eyebrow').text()).toBe('Included')
    expect(wrapper.get('.ui-card__title').text()).toBe('What you get')
    expect(wrapper.get('p.text-secondary').text()).toBe('Everything in this plan.')
    const items = wrapper.findAll('.ui-text-list-card__items li')
    expect(items).toHaveLength(2)
    expect(items[0]!.get('.ui-text-list-card__item-title').text()).toBe('First item')
    expect(items[0]!.get('.ui-text-list-card__item-description').text()).toBe('Extra detail')
    expect(items[1]!.get('.ui-text-list-card__item-title').text()).toBe('Second item')
    expect(wrapper.get('.ui-card__footer').text()).toBe('See full terms')
  })

  it('degrades when optional content is missing, without reserving space for it', () => {
    const wrapper = mount(TextListCard, { props: { title: 'Only a title' } })

    expect(wrapper.find('.ui-text-list-card__eyebrow').exists()).toBe(false)
    expect(wrapper.find('p.text-secondary').exists()).toBe(false)
    expect(wrapper.find('.ui-text-list-card__items').exists()).toBe(false)
    expect(wrapper.find('.ui-card__footer').exists()).toBe(false)
  })

  it('defaults to list layout with a default bullet marker', () => {
    const wrapper = mount(TextListCard, { props: { items: ['One'] } })

    const items = wrapper.get('.ui-text-list-card__items')
    expect(items.classes()).toContain('ui-text-list-card__items--list')
    expect(items.classes()).not.toContain('ui-text-list-card__items--columns-2')
    expect(wrapper.get('.ui-text-list-card__marker').text()).toBe('•')
  })

  it('falls back to list for any unrecognized layout value', () => {
    const wrapper = mount(TextListCard, {
      props: { items: ['One'], layout: 'unsupported' as never },
    })

    expect(wrapper.get('.ui-text-list-card__items').classes()).toContain('ui-text-list-card__items--list')
  })

  it('divided layout suppresses the default marker but keeps an explicit one', () => {
    const withoutMarker = mount(TextListCard, { props: { items: ['One'], layout: 'divided' } })
    expect(withoutMarker.find('.ui-text-list-card__marker').exists()).toBe(false)
    expect(withoutMarker.get('.ui-text-list-card__items').classes()).toContain(
      'ui-text-list-card__items--divided',
    )

    const withNumbered = mount(TextListCard, {
      props: { items: ['One', 'Two'], layout: 'divided', marker: 'numbered' },
    })
    const markers = withNumbered.findAll('.ui-text-list-card__marker')
    expect(markers.map((m) => m.text())).toEqual(['1', '2'])

    const withIcon = mount(TextListCard, {
      props: { items: ['One'], layout: 'divided', marker: 'mdi:plus' },
    })
    expect(withIcon.findComponent(Icon).props('icon')).toBe('mdi:plus')
  })

  it('renders any non-reserved marker value as an Iconify icon', () => {
    const wrapper = mount(TextListCard, { props: { items: ['One'], marker: 'mdi:check' } })
    expect(wrapper.findComponent(Icon).props('icon')).toBe('mdi:check')
  })

  it('renders sequential numbers for the numbered marker', () => {
    const wrapper = mount(TextListCard, {
      props: { items: ['One', 'Two', 'Three'], marker: 'numbered' },
    })
    const markers = wrapper.findAll('.ui-text-list-card__marker')
    expect(markers.map((m) => m.text())).toEqual(['1', '2', '3'])
  })

  it('renders sequential roman numerals for the roman marker', () => {
    const wrapper = mount(TextListCard, {
      props: { items: ['One', 'Two', 'Three', 'Four'], marker: 'roman' },
    })
    const markers = wrapper.findAll('.ui-text-list-card__marker')
    expect(markers.map((m) => m.text())).toEqual(['i', 'ii', 'iii', 'iv'])
  })

  it('marker: none always hides the marker, even in list layout', () => {
    const list = mount(TextListCard, { props: { items: ['One'], marker: 'none' } })
    expect(list.find('.ui-text-list-card__marker').exists()).toBe(false)

    const divided = mount(TextListCard, {
      props: { items: ['One'], layout: 'divided', marker: 'none' },
    })
    expect(divided.find('.ui-text-list-card__marker').exists()).toBe(false)
  })

  it('adds a little space between the item list and the footer', () => {
    const wrapper = mount(TextListCard, { props: { items: ['One'], footer: 'See full terms' } })
    const footer = wrapper.get('.ui-card__footer')
    expect(footer.element.previousElementSibling?.classList.contains('ui-text-list-card__items')).toBe(true)
  })

  it('applies the columns prop and collapses to one column in a narrow container', () => {
    const wrapper = mount(TextListCard, { props: { items: ['One', 'Two'], columns: 2 } })
    expect(wrapper.get('.ui-text-list-card__items').classes()).toContain(
      'ui-text-list-card__items--columns-2',
    )
  })

  it('forwards BaseCard surface props and fallthrough attrs', () => {
    const wrapper = mount(TextListCard, {
      props: { items: ['One'], variant: 'muted', padding: 'sm', interactive: true },
      attrs: { 'data-test': 'text-list-card' },
    })

    const card = wrapper.get('.ui-card')
    expect(card.classes()).toContain('ui-card--variant-muted')
    expect(card.classes()).toContain('ui-card--padding-sm')
    expect(card.classes()).toContain('ui-card--interactive')
    expect(wrapper.get('[data-test="text-list-card"]')).toBeTruthy()
  })

  it('forwards the inherited unstyled prop to BaseCard', () => {
    const wrapper = mount(TextListCard, {
      props: { items: ['One item'], unstyled: true },
      attrs: { class: 'consumer-card' },
    })

    const card = wrapper.get('.ui-card-unstyled')
    expect(card.exists()).toBe(true)
    expect(card.classes()).toContain('consumer-card')
    expect(wrapper.get('.ui-text-list-card').exists()).toBe(true)
  })
})

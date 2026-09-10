import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MenuCard from './MenuCard.vue'
import type { MenuItem } from './MenuCard.types.ts'

const base: MenuItem = {
  name: 'Cast-iron half chicken',
  description: 'Schmaltz potatoes, charred lemon, salsa verde, grilled broccolini.',
  price: 27,
  tags: ['Signature', 'Gluten-free'],
}

describe('MenuCard', () => {
  it('renders the name, formatted price, tags, and description', () => {
    const wrapper = mount(MenuCard, { props: { item: base } })

    expect(wrapper.get('.ui-menu-card').classes()).toContain('ui-menu-card--layout-inline')
    expect(wrapper.get('.ui-menu-card__name').text()).toBe('Cast-iron half chicken')
    expect(wrapper.get('.ui-menu-card__name').element.tagName).toBe('H3')
    expect(wrapper.get('.ui-menu-card__price').text()).toBe('$27.00')
    expect(wrapper.get('.ui-menu-card__description').text()).toContain('salsa verde')
    expect(wrapper.findAll('.ui-menu-card__tag').map((tag) => tag.text())).toEqual([
      'Signature',
      'Gluten-free',
    ])
  })

  it('renders nothing without a usable name', () => {
    expect(mount(MenuCard, { props: { item: { name: '   ' } } }).find('.ui-menu-card').exists()).toBe(false)
    expect(
      mount(MenuCard, { props: { item: { name: '', price: 9 } } }).find('.ui-menu-card').exists(),
    ).toBe(false)
  })

  it('emits the layout modifier class for every supported layout', () => {
    const layouts = [
      'inline',
      'stacked',
      'compact',
      'media-left',
      'media-right',
      'media-top',
      'spotlight',
    ] as const
    for (const layout of layouts) {
      const wrapper = mount(MenuCard, {
        props: { item: { ...base, image: { src: '/dish.jpg', alt: 'Dish' } }, layout },
      })
      expect(wrapper.get('.ui-menu-card').classes()).toContain(`ui-menu-card--layout-${layout}`)
    }
  })

  it('media-right falls back to inline without a photo, like media-left', () => {
    expect(
      mount(MenuCard, { props: { item: base, layout: 'media-right' } })
        .get('.ui-menu-card')
        .classes(),
    ).toContain('ui-menu-card--layout-inline')
  })

  it('formats a numeric price with the currency and passes a string price through unchanged', () => {
    const euro = mount(MenuCard, { props: { item: { ...base, price: 12 }, currency: 'EUR' } })
    expect(euro.get('.ui-menu-card__price').text()).toBe(
      new Intl.NumberFormat(undefined, { style: 'currency', currency: 'EUR' }).format(12),
    )

    const stringPrice = mount(MenuCard, { props: { item: { ...base, price: '18 / 32' } } })
    expect(stringPrice.get('.ui-menu-card__price').text()).toBe('18 / 32')

    const noPrice = mount(MenuCard, { props: { item: { ...base, price: null } } })
    expect(noPrice.find('.ui-menu-card__prices').exists()).toBe(false)
  })

  it('shows a struck original price and the sale price when the item is discounted', () => {
    const wrapper = mount(MenuCard, { props: { item: { ...base, price: 27, salePrice: 19 } } })

    expect(wrapper.get('.ui-menu-card').classes()).toContain('ui-menu-card--on-sale')
    expect(wrapper.get('.ui-menu-card__price-was').element.tagName).toBe('S')
    expect(wrapper.get('.ui-menu-card__price-was').text()).toBe('$27.00')
    expect(wrapper.get('.ui-menu-card__price--sale').text()).toBe('$19.00')

    // No struck price when there is nothing to discount from.
    const saleOnly = mount(MenuCard, { props: { item: { ...base, price: null, salePrice: 19 } } })
    expect(saleOnly.find('.ui-menu-card__price-was').exists()).toBe(false)
    expect(saleOnly.get('.ui-menu-card__price').text()).toBe('$19.00')
    expect(saleOnly.get('.ui-menu-card').classes()).not.toContain('ui-menu-card--on-sale')
  })

  it('hides the description in the compact layout even when one is provided', () => {
    const wrapper = mount(MenuCard, { props: { item: base, layout: 'compact' } })

    expect(wrapper.find('.ui-menu-card__description').exists()).toBe(false)
    expect(wrapper.get('.ui-menu-card__name').text()).toBe('Cast-iron half chicken')
  })

  it('shows the photo for a media layout and falls back to a text arrangement when it is missing', () => {
    const withImage = mount(MenuCard, {
      props: {
        item: { ...base, image: { src: '/chicken.jpg', alt: 'Chicken' } },
        layout: 'media-top',
      },
    })
    expect(withImage.get('.ui-menu-card').classes()).toContain('ui-menu-card--has-image')
    expect(withImage.get('.ui-menu-card__media img').attributes('src')).toBe('/chicken.jpg')

    const noImageTop = mount(MenuCard, { props: { item: base, layout: 'media-top' } })
    expect(noImageTop.find('.ui-menu-card__media').exists()).toBe(false)
    expect(noImageTop.get('.ui-menu-card').classes()).toContain('ui-menu-card--layout-stacked')

    const noImageLeft = mount(MenuCard, { props: { item: base, layout: 'media-left' } })
    expect(noImageLeft.get('.ui-menu-card').classes()).toContain('ui-menu-card--layout-inline')
  })

  it('renders the flag, keeps an article root, reflects padding, and forwards surface props and attrs', () => {
    const wrapper = mount(MenuCard, {
      props: {
        item: { ...base, flag: 'Chef’s cut' },
        variant: 'outline',
        padding: 'lg',
        interactive: true,
      },
      attrs: { 'data-test': 'menu-card' },
    })

    expect(wrapper.get('.ui-menu-card__flag').text()).toBe('Chef’s cut')
    expect(wrapper.get('.ui-menu-card').classes()).toContain('ui-menu-card--pad-lg')
    const card = wrapper.get('.ui-menu-card__card')
    expect(card.element.tagName).toBe('ARTICLE')
    expect(card.classes()).toEqual(
      expect.arrayContaining(['ui-card--variant-outline', 'ui-card--interactive']),
    )
    expect(wrapper.get('[data-test="menu-card"]')).toBeTruthy()

    expect(mount(MenuCard, { props: { item: base } }).find('.ui-menu-card__flag').exists()).toBe(false)
  })

  it('degrades to just a name', () => {
    const wrapper = mount(MenuCard, { props: { item: { name: 'Fisherman’s board' } } })

    expect(wrapper.get('.ui-menu-card__name').text()).toBe('Fisherman’s board')
    expect(wrapper.find('.ui-menu-card__prices').exists()).toBe(false)
    expect(wrapper.find('.ui-menu-card__description').exists()).toBe(false)
    expect(wrapper.find('.ui-menu-card__tags').exists()).toBe(false)
  })
})

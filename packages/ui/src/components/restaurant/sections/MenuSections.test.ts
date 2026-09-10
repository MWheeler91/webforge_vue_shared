import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TabbedMenuSection from './TabbedMenuSection.vue'
import FeaturedMenuSection from './FeaturedMenuSection.vue'
import FullMenuSection from './FullMenuSection.vue'
import MenuBoardSection from './MenuBoardSection.vue'
import type { MenuData, MenuItem } from '../restaurant.types.ts'

const menu: MenuData = {
  categories: [
    {
      key: 'starters',
      label: 'Starters',
      subline: 'From 5 pm',
      items: [
        { name: 'Charred shishito peppers', price: 9, tags: ['Vegetarian'] },
        { name: 'Duck-fat croquettes', price: 14 },
      ],
    },
    {
      key: 'plates',
      label: 'Plates',
      items: [
        { name: 'Cast-iron half chicken', price: 27, salePrice: 22 },
        { name: 'Market fish', price: 'Market price' },
      ],
    },
  ],
  footnote: 'Prices in USD. Tell us about allergies before ordering.',
}

const featured: MenuItem[] = [
  { name: 'Cast-iron half chicken', description: 'Schmaltz potatoes.', price: 27, image: { src: '/a.jpg', alt: 'a' } },
  { name: 'Seared steelhead trout', description: 'Brown-butter leeks.', price: 29, image: { src: '/b.jpg', alt: 'b' } },
  { name: 'Rigatoni alla vodka', description: 'Calabrian chile.', price: 21, image: { src: '/c.jpg', alt: 'c' } },
]

describe('TabbedMenuSection', () => {
  const visiblePanel = (wrapper: ReturnType<typeof mount>) =>
    wrapper.findAll('[role="tabpanel"]').find((panel) => panel.isVisible())!

  it('renders a tab per category and shows the first category by default', () => {
    const wrapper = mount(TabbedMenuSection, {
      props: { menu, heading: { title: 'From our fire' } },
    })

    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs.map((tab) => tab.text())).toEqual(['Starters', 'Plates'])

    expect(visiblePanel(wrapper).text()).toContain('Charred shishito peppers')
    expect(visiblePanel(wrapper).text()).toContain('From 5 pm')
    expect(wrapper.get('.ui-tabbed-menu-section__footnote').text()).toContain('Prices in USD')
  })

  it('switches the visible menu list when another tab is selected', async () => {
    const wrapper = mount(TabbedMenuSection, { props: { menu } })

    await wrapper.findAll('[role="tab"]')[1]!.trigger('click')

    expect(visiblePanel(wrapper).text()).toContain('Cast-iron half chicken')
    expect(visiblePanel(wrapper).text()).not.toContain('Charred shishito peppers')
  })

  it('passes the item layout through to every MenuCard', () => {
    const wrapper = mount(TabbedMenuSection, { props: { menu, itemLayout: 'stacked' } })
    expect(wrapper.findAll('.ui-menu-card--layout-stacked').length).toBeGreaterThan(0)
  })
})

describe('FeaturedMenuSection', () => {
  it('grid layout renders each item as a media-top card', () => {
    const wrapper = mount(FeaturedMenuSection, { props: { items: featured, layout: 'grid' } })
    expect(wrapper.findAll('.ui-menu-card--layout-media-top')).toHaveLength(3)
    expect(wrapper.get('.ui-featured-menu-section__body--grid')).toBeTruthy()
  })

  it('alternating layout alternates media-left and media-right', () => {
    const wrapper = mount(FeaturedMenuSection, { props: { items: featured, layout: 'alternating' } })
    const cards = wrapper.findAll('.ui-menu-card')
    expect(cards[0]!.classes()).toContain('ui-menu-card--layout-media-left')
    expect(cards[1]!.classes()).toContain('ui-menu-card--layout-media-right')
    expect(cards[2]!.classes()).toContain('ui-menu-card--layout-media-left')
  })
})

describe('FullMenuSection', () => {
  it('renders every category as a labelled block with all its items', () => {
    const wrapper = mount(FullMenuSection, {
      props: { menu, heading: { title: 'The full menu' } },
    })

    const titles = wrapper.findAll('.ui-full-menu-section__category-title').map((t) => t.text())
    expect(titles).toEqual(['Starters', 'Plates'])
    expect(wrapper.text()).toContain('Charred shishito peppers')
    expect(wrapper.text()).toContain('Market price')
    expect(wrapper.findAll('.ui-menu-card')).toHaveLength(4)
    expect(wrapper.get('.ui-full-menu-section__footnote').text()).toContain('allergies')
  })

  it('honours the single-column option', () => {
    const wrapper = mount(FullMenuSection, { props: { menu, columns: 1 } })
    expect(wrapper.findAll('.ui-full-menu-section__list--single').length).toBe(2)
  })
})

describe('MenuBoardSection', () => {
  const boardMenu: MenuData = {
    categories: [
      { key: 'small-plates', label: 'Small plates', presentation: 'grid', items: menu.categories[0]!.items },
      { key: 'mains', label: 'Mains', presentation: 'grid', items: menu.categories[1]!.items },
      { key: 'wine', label: 'Wine', presentation: 'list', items: [{ name: 'House red', price: 11 }] },
      { key: 'beer', label: 'Beer', presentation: 'list', items: [{ name: 'Pilsner', price: 7 }] },
      { key: 'specials', label: 'Specials', presentation: 'list', items: [{ name: 'Boilermaker', price: 12 }] },
    ],
  }

  it('renders each grid category as its own centred block', () => {
    const wrapper = mount(MenuBoardSection, { props: { menu: boardMenu } })
    const gridBlocks = wrapper.findAll('[data-menu-board-block="grid"]')
    expect(gridBlocks).toHaveLength(2)
    expect(gridBlocks[0]!.get('.ui-menu-board-section__block-title').text()).toBe('Small plates')
    expect(gridBlocks[0]!.findAll('.ui-menu-board-section__grid .ui-menu-card').length).toBe(
      menu.categories[0]!.items.length,
    )
  })

  it('renders grid categories with a media layout when asked', () => {
    const withImages = menu.categories[0]!.items.map((item) => ({
      ...item,
      image: { src: '/x.jpg', alt: 'x' },
    }))
    const wrapper = mount(MenuBoardSection, {
      props: {
        menu: { categories: [{ key: 'g', label: 'G', presentation: 'grid', items: withImages }] },
        gridItemLayout: 'media-top',
      },
    })
    expect(wrapper.findAll('.ui-menu-card--layout-media-top').length).toBe(withImages.length)
  })

  it('collapses consecutive list categories into one side-by-side block', () => {
    const wrapper = mount(MenuBoardSection, { props: { menu: boardMenu } })
    const listBlocks = wrapper.findAll('[data-menu-board-block="list"]')
    expect(listBlocks).toHaveLength(1)
    expect(
      listBlocks[0]!.findAll('.ui-menu-board-section__list-column .ui-menu-board-section__block-title')
        .map((t) => t.text()),
    ).toEqual(['Wine', 'Beer', 'Specials'])
  })
})

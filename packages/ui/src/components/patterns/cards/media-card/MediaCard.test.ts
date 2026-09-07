import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MediaCard from './MediaCard.vue'

const collection = <T,>(items: T[]) => ({ keyed: {}, grouped: {}, items })

describe('MediaCard', () => {
  it('renders scalar content, media, caption, and grouped actions', () => {
    const wrapper = mount(MediaCard, {
      props: {
        title: { text: 'A considered space', as: 'h2' },
        body: 'Supporting narrative.',
        caption: 'Photography by Studio North.',
        credit: 'Studio North',
        media: { src: '/space.jpg', alt: 'A bright interior' },
        actions: collection([{ label: 'Read story', href: '/story' }, { label: 'Contact', href: '/contact' }]),
      },
    })

    expect(wrapper.get('.ui-media-card')).toBeTruthy()
    expect(wrapper.get('.ui-card__title').element.tagName).toBe('H2')
    expect(wrapper.get('img').attributes('alt')).toBe('A bright interior')
    expect(wrapper.get('.ui-media-card__caption').text()).toContain('Photography')
    expect(wrapper.findAll('.ui-btn')).toHaveLength(2)
  })

  it('forwards all BaseCard props and fallthrough attrs', () => {
    const wrapper = mount(MediaCard, {
      props: { as: 'section', variant: 'outline', padding: 'lg', interactive: true, unstyled: true, title: 'Required title', media: { src: '/required.jpg' } },
      attrs: { 'data-test': 'media-card' },
    })

    expect(wrapper.get('.ui-card-unstyled').element.tagName).toBe('SECTION')
    expect(wrapper.get('.ui-card-unstyled').classes()).toContain('ui-card--interactive')
    expect(wrapper.get('[data-test="media-card"]')).toBeTruthy()
  })

  it('requires media and renders the two media presentation layouts', () => {
    const framed = mount(MediaCard, { props: { title: 'Framed', media: { src: '/a.jpg' } } })
    const immersive = mount(MediaCard, { props: { title: 'Immersive', media: { src: '/a.jpg' }, layout: 'immersive' } })

    expect(framed.get('.ui-media-card').classes()).toContain('ui-media-card--layout-framed')
    expect(immersive.get('.ui-media-card').classes()).toContain('ui-media-card--layout-immersive')
    expect(framed.find('.ui-media-card__media').exists()).toBe(true)
  })
})

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProfileCard from './ProfileCard.vue'

describe('ProfileCard', () => {
  it('renders avatar, name, role, and bio', () => {
    const wrapper = mount(ProfileCard, {
      props: {
        avatar: { src: '/maya.jpg', alt: 'Portrait of Maya Chen' },
        title: 'Maya Chen',
        subheading: 'Support lead',
        body: 'Answers the hard tickets and writes most of the help docs.',
      },
    })

    expect(wrapper.get('.ui-profile-card__avatar').attributes('src')).toBe('/maya.jpg')
    expect(wrapper.get('.ui-card__title').text()).toBe('Maya Chen')
    const subtitles = wrapper.findAll('.ui-card__subtitle')
    expect(subtitles[0]!.text()).toBe('Support lead')
    expect(subtitles[1]!.text()).toBe(
      'Answers the hard tickets and writes most of the help docs.',
    )
  })

  it('renders grouped actions', () => {
    const wrapper = mount(ProfileCard, {
      props: {
        title: 'Devon Park',
        actions: [{ label: 'Contact', href: '/contact/devon' }],
      },
    })

    expect(wrapper.get('.ui-profile-card__actions').text()).toBe('Contact')
  })

  it('hides the bio in the compact layout even when body is supplied', () => {
    const wrapper = mount(ProfileCard, {
      props: { title: 'Priya Nair', subheading: 'Founder', body: 'A long bio.', layout: 'compact' },
    })

    expect(wrapper.findAll('.ui-card__subtitle')).toHaveLength(1)
    expect(wrapper.get('.ui-card__subtitle').text()).toBe('Founder')
  })

  it('emits the layout modifier class for every supported layout', () => {
    for (const layout of ['portrait-top', 'portrait-left', 'compact'] as const) {
      const wrapper = mount(ProfileCard, { props: { title: 'Name', layout } })
      expect(wrapper.get('.ui-profile-card').classes()).toContain(`ui-profile-card--layout-${layout}`)
    }
  })

  it('forwards BaseCard surface props and fallthrough attrs', () => {
    const wrapper = mount(ProfileCard, {
      props: { title: 'Name', variant: 'ghost', padding: 'lg', interactive: true },
      attrs: { 'data-test': 'profile-card' },
    })

    const card = wrapper.get('.ui-card')
    expect(card.classes()).toContain('ui-card--variant-ghost')
    expect(card.classes()).toContain('ui-card--padding-lg')
    expect(card.classes()).toContain('ui-card--interactive')
    expect(wrapper.get('[data-test="profile-card"]')).toBeTruthy()
  })

  it('degrades when optional content is missing, without reserving space for it', () => {
    const nameOnly = mount(ProfileCard, { props: { title: 'Ava Thompson' } })
    expect(nameOnly.find('.ui-profile-card__avatar').exists()).toBe(false)
    expect(nameOnly.find('.ui-card__subtitle').exists()).toBe(false)
    expect(nameOnly.find('.ui-profile-card__actions').exists()).toBe(false)

    const empty = mount(ProfileCard, { props: {} })
    expect(empty.find('.ui-profile-card__content').exists()).toBe(false)
  })
})

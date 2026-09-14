import { describe, expect, it } from 'vitest'
import { toUiSectionData, type PageSection, type PageTextElement } from './PagePayload'

const textElement = (
  text: string,
  heading: PageTextElement['config']['heading'],
  emphasis: PageTextElement['config']['emphasis'],
  hasHtml = false,
): PageTextElement => ({
  text,
  config: { heading, emphasis },
  has_html: hasHtml,
  meta_data: { source: 'django-only' },
})

describe('toUiSectionData', () => {
  it('transfers top-level card behavior and normalizes card text payloads', () => {
    const section: PageSection = {
      key: 'features',
      name: 'Features',
      component_key: 'featured-section',
      variant: 'default',
      config: {},
      meta_data: null,
      elements: { text: {}, badges: {}, buttons: {}, images: {} },
      components: {
        card: [
          {
            key: 'primary',
            component_key: 'text-list-card',
            component_type: 'card',
            config: { layout: 'bulleted', interactive: 'true', divider: 'true', link_as: 'router-link' },
            meta_data: null,
            elements: {
              text: {
                title: [textElement('Configured title', 'h2', 'prominent', true)],
                list: [
                  textElement('First item', 'p', 'compact'),
                  textElement('Second item', 'h4', 'standard'),
                ],
                destination: [textElement('/features', 'p', 'standard')],
              },
              badges: {},
              buttons: {},
              images: {},
            },
          },
        ],
      },
    }

    const card = toUiSectionData(section).components?.card?.[0]

    expect(card).toMatchObject({
      interactive: true,
      divider: true,
      to: '/features',
      href: null,
      elements: {
        text: {
          title: [{ text: 'Configured title', as: 'h2', emphasis: 'prominent' }],
          list: [
            { text: 'First item', as: 'p', emphasis: 'compact' },
            { text: 'Second item', as: 'h4', emphasis: 'standard' },
          ],
        },
      },
    })
    expect(card?.elements?.text?.title?.[0]).not.toHaveProperty('has_html')
    expect(card?.elements?.text?.title?.[0]).not.toHaveProperty('meta_data')
  })

  it('never resolves card-specific config for a non-card component, even under a "card"-named slot', () => {
    const section: PageSection = {
      key: 'services',
      name: 'Services',
      component_key: 'generic-section',
      variant: 'default',
      config: {},
      meta_data: null,
      elements: { text: {}, badges: {}, buttons: {}, images: {} },
      components: {
        // A generic-section can put non-card items under a "card"-named slot -
        // the slot key is not a reliable family signal.
        card: [
          {
            key: 'card',
            component_key: 'accordion-leaf',
            component_type: 'accordion',
            config: { divider: 'true', interactive: 'true', link_as: 'a' },
            meta_data: null,
            elements: { text: {}, badges: {}, buttons: {}, images: {} },
          },
        ],
      },
    }

    const node = toUiSectionData(section).components?.card?.[0]
    expect(node?.componentType).toBe('accordion')
    expect(node?.divider).toBeUndefined()
    expect(node?.interactive).toBeUndefined()
    expect(node?.href).toBeUndefined()
    expect(node?.to).toBeUndefined()
  })

  it('normalizes a real featured-section payload shape end to end', () => {
    const section: PageSection = {
      key: 'fit_together',
      name: 'How the pieces fit together',
      component_key: 'featured-section',
      variant: 'inverse',
      config: { layout: 'split', variant: 'inverse' },
      meta_data: {},
      elements: {
        text: {
          title: [textElement('A stronger foundation for the work behind the business.', 'h2', 'standard')],
        },
        badges: {},
        buttons: {},
        images: {},
      },
      components: {
        card: [
          {
            key: 'card',
            name: null,
            component_key: 'text-card',
            component_type: 'card',
            config: {
              as: 'div',
              layout: 'simple',
              divider: 'false',
              link_as: null,
              padding: 'md',
              variant: 'muted',
              interactive: 'false',
              media_aspect: 'landscape',
            },
            meta_data: {},
            elements: {
              text: { title: [textElement('Look professional', 'h3', 'standard')] },
              badges: {},
              buttons: {},
              images: {},
            },
          },
        ],
      },
    }

    const data = toUiSectionData(section)
    expect(data.componentKey).toBe('featured-section')
    expect(data.components?.card).toHaveLength(1)
    const card = data.components!.card![0]!
    expect(card.componentKey).toBe('text-card')
    expect(card.interactive).toBe(false)
    expect(card.divider).toBe(false)
    expect(card.href).toBeNull()
    expect(card.to).toBeNull()
    expect(card.elements?.text?.title?.[0]).toEqual({ text: 'Look professional', as: 'h3', emphasis: 'standard' })
  })
})

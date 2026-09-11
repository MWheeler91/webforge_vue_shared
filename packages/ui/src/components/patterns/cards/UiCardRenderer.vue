<template>
  <component
    v-if="isValidMediaCard && isValidQuoteCard && isValidPricingCard && isValidStatCard && isValidProfileCard"
    :is="cardComponent"
    v-bind="cardProps"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type {
  CardAction,
  CardAs,
  CardPadding,
  CardVariant,
  UiBadgePayload,
  UiMediaPayload,
  UiTextPayload,
} from '../../primitives/card/card.types.ts'
import { resolveCardComponent } from './card.registry.ts'
import type { QuoteCardClamp, QuoteCardLayout } from './quote-card/QuoteCard.types.ts'
import type { PricingCardLayout } from './pricing-card/PricingCard.types.ts'
import type { StatCardLayout } from './stat-card/StatCard.types.ts'
import type { ProfileCardLayout } from './profile-card/ProfileCard.types.ts'
import type { UiSectionCardData } from '../../primitives/section/section.types.ts'

const props = defineProps<{ card: UiSectionCardData }>()

type ElementValue = {
  text?: string | null
  image_url?: string | null
  alt_text?: string | null
  caption?: string | null
  href?: string | null
  vue_route?: string | null
  config?: Record<string, unknown>
}

type CardElements = {
  text?: Record<string, UiTextPayload[]>
  badges?: Record<string, ElementValue[]>
  buttons?: Record<string, ElementValue[]>
  images?: Record<string, ElementValue[]>
}

const elements = computed(() => (props.card.elements ?? {}) as CardElements)

function collectionItems(group?: Record<string, ElementValue[]>): ElementValue[] {
  return Object.values(group ?? {}).flat()
}

function scalarText(key: string): UiTextPayload | null {
  return elements.value.text?.[key]?.[0] ?? null
}

function groupedText(key: string): UiTextPayload[] {
  return elements.value.text?.[key]?.filter((item) => typeof item.text === 'string') ?? []
}

function elementConfig(item: ElementValue): Record<string, unknown> {
  return item.config ?? {}
}

function normalizeBadges(): UiBadgePayload[] {
  return collectionItems(elements.value.badges).flatMap((badge) => {
    if (!badge.text) return []
    const config = elementConfig(badge)
    return [
      {
        text: badge.text,
        variant: config.variant as UiBadgePayload['variant'] | undefined,
        tone: config.tone as UiBadgePayload['tone'] | undefined,
        size: config.size as UiBadgePayload['size'] | undefined,
        leading: config.leading as UiBadgePayload['leading'] | undefined,
      },
    ]
  })
}

function normalizeActions(): CardAction[] {
  return collectionItems(elements.value.buttons).flatMap((button) => {
    if (!button.text) return []
    const config = elementConfig(button)
    return [
      {
        label: button.text,
        as: config.as as CardAction['as'] | undefined,
        type: config.html_type as CardAction['type'] | undefined,
        href: (button.href as string | null | undefined) ?? undefined,
        to: (button.vue_route as string | null | undefined) ?? undefined,
        width: config.width as CardAction['width'] | undefined,
        variant: config.variant as CardAction['variant'] | undefined,
        size: config.size as CardAction['size'] | undefined,
      },
    ]
  })
}

function normalizeImage(key: string): UiMediaPayload | null {
  const image = elements.value.images?.[key]?.[0]
  if (!image?.image_url) return null
  return { src: image.image_url, alt: image.alt_text ?? undefined }
}

function normalizeMedia(): UiMediaPayload | null {
  return normalizeImage('hero')
}

function normalizeCaption(): UiTextPayload | null {
  const explicitCaption = scalarText('caption')
  if (explicitCaption) return explicitCaption
  const imageCaption = elements.value.images?.hero?.[0]?.caption
  return imageCaption ? { text: imageCaption } : null
}

const config = computed(() => props.card.config ?? {})
const layout = computed(() => String(config.value.layout ?? 'simple'))
const cardComponent = computed(() => resolveCardComponent(props.card.componentKey, layout.value))
const isFeatureCard = computed(() => props.card.componentKey === 'feature-card')
const isMediaCard = computed(() => props.card.componentKey === 'media-card')
const isValidMediaCard = computed(() =>
  !isMediaCard.value || Boolean(normalizeMedia() && scalarText('title')?.text?.trim()),
)
const isQuoteCard = computed(() => props.card.componentKey === 'quote-card')
const isValidQuoteCard = computed(
  () => !isQuoteCard.value || Boolean(scalarText('quote')?.text?.trim()),
)
const QUOTE_CARD_LAYOUTS = ['default', 'lead', 'stacked', 'compact'] as const
const quoteLayout = computed<QuoteCardLayout>(() =>
  (QUOTE_CARD_LAYOUTS as readonly string[]).includes(layout.value)
    ? (layout.value as QuoteCardLayout)
    : 'default',
)
const QUOTE_CARD_CLAMP = ['3', '4', '5'] as const
const quoteClamp = computed<QuoteCardClamp | null>(() => {
  const raw = String(config.value.clamp ?? '')
  return (QUOTE_CARD_CLAMP as readonly string[]).includes(raw)
    ? (Number(raw) as QuoteCardClamp)
    : null
})
const isTextListCard = computed(
  () =>
    props.card.componentKey === 'text-list-card' ||
    (props.card.componentKey === 'card' && layout.value === 'bulleted'),
)
const isPricingCard = computed(() => props.card.componentKey === 'pricing-card')
const isValidPricingCard = computed(
  () => !isPricingCard.value || Boolean(scalarText('title')?.text?.trim() || scalarText('price')?.text?.trim()),
)
const PRICING_CARD_LAYOUTS = ['default', 'horizontal', 'compact'] as const
const pricingLayout = computed<PricingCardLayout>(() =>
  (PRICING_CARD_LAYOUTS as readonly string[]).includes(layout.value)
    ? (layout.value as PricingCardLayout)
    : 'default',
)
const isStatCard = computed(() => props.card.componentKey === 'stat-card')
const isValidStatCard = computed(
  () => !isStatCard.value || Boolean(scalarText('title')?.text?.trim() || scalarText('value')?.text?.trim()),
)
const STAT_CARD_LAYOUTS = ['default', 'horizontal'] as const
const statLayout = computed<StatCardLayout>(() =>
  (STAT_CARD_LAYOUTS as readonly string[]).includes(layout.value)
    ? (layout.value as StatCardLayout)
    : 'default',
)
const isProfileCard = computed(() => props.card.componentKey === 'profile-card')
const isValidProfileCard = computed(
  () => !isProfileCard.value || Boolean(scalarText('title')?.text?.trim()),
)
const PROFILE_CARD_LAYOUTS = ['portrait-top', 'portrait-left', 'compact'] as const
const profileLayout = computed<ProfileCardLayout>(() =>
  (PROFILE_CARD_LAYOUTS as readonly string[]).includes(layout.value)
    ? (layout.value as ProfileCardLayout)
    : 'portrait-top',
)

const cardProps = computed(() => ({
  // Dynamic API values are narrowed at the shared renderer boundary.
  ...(isQuoteCard.value ? {} : { as: (config.value.as ?? 'article') as CardAs }),
  variant: (config.value.variant ?? 'surface') as CardVariant,
  padding: (config.value.padding ?? 'md') as CardPadding,
  ...(!isMediaCard.value &&
  !isQuoteCard.value &&
  !isPricingCard.value &&
  !isStatCard.value &&
  !isProfileCard.value
    ? { eyebrow: scalarText('eyebrow') }
    : {}),
  ...(isQuoteCard.value || isPricingCard.value
    ? {}
    : { title: scalarText('title'), body: scalarText('body') }),
  interactive: Boolean(props.card.interactive),
  ...(isQuoteCard.value
    ? {
        layout: quoteLayout.value,
        clamp: quoteClamp.value,
        quote: scalarText('quote'),
        author: scalarText('author'),
        avatar: normalizeImage('avatar'),
      }
    : isFeatureCard.value
      ? {
          unstyled: Boolean(config.value.unstyled),
          icon: scalarText('icon')?.text ?? null,
          layout: layout.value === 'split' ? 'split' : 'stacked',
          mediaAspect: config.value.media_aspect === 'square' ? 'square' : 'auto',
          media: normalizeMedia(),
          badges: normalizeBadges(),
          actions: normalizeActions(),
        }
      : isMediaCard.value
        ? {
            layout: ['framed', 'immersive'].includes(layout.value)
              ? layout.value
              : 'framed',
            media: normalizeMedia(),
            caption: normalizeCaption(),
            credit: scalarText('credit'),
            actions: normalizeActions(),
          }
        : isPricingCard.value
          ? {
              layout: pricingLayout.value,
              featured: Boolean(config.value.featured),
              label: normalizeBadges()[0] ?? null,
              title: scalarText('title'),
              price: scalarText('price')?.text ?? null,
              body: scalarText('body'),
              items: groupedText('items').map((item) => ({ title: item.text })),
              actions: normalizeActions(),
              divider: Boolean(props.card.divider),
            }
          : isStatCard.value
            ? {
                layout: statLayout.value,
                label: normalizeBadges()[0] ?? null,
                value: scalarText('value')?.text ?? null,
                footer: scalarText('footer'),
              }
            : isProfileCard.value
              ? {
                  layout: profileLayout.value,
                  avatar: normalizeImage('avatar'),
                  subheading: scalarText('subheading'),
                  actions: normalizeActions(),
                }
              : {
                  footer: scalarText('footer'),
                }),
  ...(!isFeatureCard.value &&
  !isTextListCard.value &&
  !isMediaCard.value &&
  !isQuoteCard.value &&
  !isPricingCard.value &&
  !isStatCard.value &&
  !isProfileCard.value
    ? { divider: Boolean(props.card.divider) }
    : {}),
  ...(isTextListCard.value
    ? {
        items: groupedText('list'),
        layout: layout.value === 'divided' ? 'divided' : 'list',
        marker: String(config.value.marker ?? 'default'),
        columns: Number(config.value.columns) === 2 ? 2 : 1,
      }
    : {}),
}))
</script>

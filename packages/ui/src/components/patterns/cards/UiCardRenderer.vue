<template>
  <component v-if="isValidMediaCard" :is="cardComponent" v-bind="cardProps" />
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

function normalizeMedia(): UiMediaPayload | null {
  const image = elements.value.images?.hero?.[0]
  if (!image?.image_url) return null
  return { src: image.image_url, alt: image.alt_text ?? undefined }
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
const isTextListCard = computed(
  () =>
    props.card.componentKey === 'text-list-card' ||
    (props.card.componentKey === 'card' && layout.value === 'bulleted'),
)

const cardProps = computed(() => ({
  // Dynamic API values are narrowed at the shared renderer boundary.
  as: (config.value.as ?? 'article') as CardAs,
  variant: (config.value.variant ?? 'surface') as CardVariant,
  padding: (config.value.padding ?? 'md') as CardPadding,
  ...(!isMediaCard.value ? { eyebrow: scalarText('eyebrow') } : {}),
  title: scalarText('title'),
  body: scalarText('body'),
  interactive: Boolean(props.card.interactive),
  ...(isFeatureCard.value
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
    : {
        footer: scalarText('footer'),
      }),
  ...(!isFeatureCard.value && !isTextListCard.value && !isMediaCard.value
    ? { divider: Boolean(props.card.divider) }
    : {}),
  ...(isTextListCard.value ? { items: groupedText('list'), layout: layout.value } : {}),
}))
</script>

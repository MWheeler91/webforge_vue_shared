<template>
  <component :is="cardComponent" v-bind="cardProps" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CardAs, CardPadding, CardVariant } from '../../primitives/card/card.types.ts'
import { resolveCardComponent } from './card.registry.ts'
import type { UiSectionCardData } from '../../primitives/section/section.types.ts'

const props = defineProps<{ card: UiSectionCardData }>()

type ElementValue = { text?: string | null; items?: ElementValue[] }

function elementText(key: string): string | null {
  const elements = props.card.elements as { text?: Record<string, ElementValue[]> } | undefined
  return elements?.text?.[key]?.[0]?.text ?? null
}

const config = computed(() => props.card.config ?? {})
const layout = computed(() => String(config.value.layout ?? 'simple'))
const cardComponent = computed(() => resolveCardComponent(props.card.componentKey, layout.value))
const isTextListCard = computed(() =>
  props.card.componentKey === 'text-list-card' ||
  (props.card.componentKey === 'card' && layout.value === 'bulleted'),
)

const cardProps = computed(() => ({
  // Dynamic API values are narrowed at the shared renderer boundary.
  as: (config.value.as ?? 'article') as CardAs,
  variant: (config.value.variant ?? 'surface') as CardVariant,
  padding: (config.value.padding ?? 'md') as CardPadding,
  eyebrow: elementText('eyebrow'),
  title: elementText('title'),
  body: elementText('body'),
  divider: Boolean(config.value.divider),
  interactive: Boolean(config.value.interactive),
  footer: elementText('footer'),
  ...(isTextListCard.value
    ? { items: (props.card.elements as { text?: { list?: ElementValue[] } } | undefined)?.text?.list?.map((item) => item.text ?? '') ?? [], layout: layout.value }
    : {}),
}))
</script>

<template>
  <div class="ui-text-list-card">
    <BaseCard
      :as="props.as"
      :variant="props.variant"
      :padding="props.padding"
      :interactive="props.interactive"
      :unstyled="props.unstyled"
      v-bind="$attrs"
      class="ui-text-list-card__card"
    >
      <component
        :is="eyebrow?.as ?? 'small'"
        v-if="eyebrow"
        class="ui-text-list-card__eyebrow text-brand"
        :data-emphasis="eyebrow.emphasis"
        >{{ eyebrow.text }}</component
      >
      <CardTitle v-if="title" :as="title.as ?? 'h3'" :data-emphasis="title.emphasis">{{
        title.text
      }}</CardTitle>
      <component
        :is="body.as ?? 'p'"
        v-if="body"
        class="text-secondary"
        :data-emphasis="body.emphasis"
        >{{ body.text }}</component
      >

      <ul
        v-if="normalizedItems.length"
        class="ui-text-list-card__items"
        :class="[`ui-text-list-card__items--${layout}`, columns === 2 && 'ui-text-list-card__items--columns-2']"
      >
        <li v-for="(item, index) in normalizedItems" :key="index">
          <span v-if="markerVisible" class="ui-text-list-card__marker" aria-hidden="true">
            <Icon v-if="markerKind === 'icon'" :icon="props.marker!" />
            <template v-else-if="markerKind === 'numbered'">{{ index + 1 }}</template>
            <template v-else-if="markerKind === 'roman'">{{ toRoman(index + 1) }}</template>
            <template v-else>&bull;</template>
          </span>
          <span class="ui-text-list-card__item-body">
            <component
              :is="item.content.as ?? 'span'"
              class="ui-text-list-card__item-title"
              :data-emphasis="item.content.emphasis"
              >{{ item.content.text }}</component
            >
            <span v-if="item.description" class="ui-text-list-card__item-description">
              {{ item.description }}
            </span>
          </span>
        </li>
      </ul>

      <CardFooter v-if="footer" :data-emphasis="footer.emphasis">{{ footer.text }}</CardFooter>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import BaseCard from '../../../primitives/card/BaseCard.vue'
import CardFooter from '../../../primitives/card/CardFooter.vue'
import CardTitle from '../../../primitives/card/CardTitle.vue'
import { textPayload, type UiTextInput, type UiTextPayload } from '../../../primitives/card/card.types.ts'
import type { TextListCardItem, TextListCardLayout, TextListCardProps } from './TextListCard.types.ts'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TextListCardProps>(), {
  as: 'article',
  variant: 'surface',
  padding: 'md',
  interactive: false,
  unstyled: false,
  eyebrow: null,
  title: null,
  body: null,
  items: () => [],
  footer: null,
  layout: 'list',
  marker: 'default',
  columns: 1,
})

const eyebrow = computed(() => textPayload(props.eyebrow))
const title = computed(() => textPayload(props.title))
const body = computed(() => textPayload(props.body))
const footer = computed(() => textPayload(props.footer))
const layout = computed<TextListCardLayout>(() => (props.layout === 'divided' ? 'divided' : 'list'))
const columns = computed<1 | 2>(() => (props.columns === 2 ? 2 : 1))
const markerKind = computed(() => {
  const marker: string = props.marker ?? 'default'
  if (marker === 'default') return 'default' as const
  if (marker === 'numbered') return 'numbered' as const
  if (marker === 'roman') return 'roman' as const
  if (marker === 'none') return 'none' as const
  return 'icon' as const
})
// 'default' relies on the divider border in `divided` layout instead of a bullet;
// 'none' always hides the marker, including in `list` layout.
const markerVisible = computed(() => {
  if (markerKind.value === 'none') return false
  if (markerKind.value === 'default') return layout.value === 'list'
  return true
})
const ROMAN_NUMERALS: readonly (readonly [number, string])[] = [
  [1000, 'm'], [900, 'cm'], [500, 'd'], [400, 'cd'],
  [100, 'c'], [90, 'xc'], [50, 'l'], [40, 'xl'],
  [10, 'x'], [9, 'ix'], [5, 'v'], [4, 'iv'], [1, 'i'],
]
function toRoman(num: number): string {
  let remaining = num
  let result = ''
  for (const [value, symbol] of ROMAN_NUMERALS) {
    while (remaining >= value) {
      result += symbol
      remaining -= value
    }
  }
  return result
}
const normalizedItems = computed<Array<{ content: UiTextPayload; description?: string }>>(() =>
  props.items.map((item: UiTextInput | TextListCardItem) => {
    if (typeof item === 'string' || 'text' in item) {
      return { content: textPayload(item) as UiTextPayload }
    }
    return { content: { text: item.title }, description: item.description }
  }),
)
</script>

<style scoped>
.ui-text-list-card {
  container-type: inline-size;
  min-width: 0;
  width: 100%;
}

.ui-text-list-card__card {
  min-width: 0;
  width: 100%;
  height: 100%;
}

.ui-text-list-card__eyebrow {
  display: block;
  margin-bottom: 0.5rem;
  font-size: var(--type-body-small-size);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.ui-text-list-card__items {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0 1.5rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.ui-text-list-card__items--columns-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@container (max-width: 24rem) {
  .ui-text-list-card__items--columns-2 {
    grid-template-columns: 1fr;
  }
}

.ui-text-list-card__items li {
  display: flex;
  align-items: baseline;
  gap: 0.625rem;
  min-width: 0;
  padding-block: 0.125rem;
}

.ui-text-list-card__items--divided li {
  padding-block: 0.5rem;
  border-bottom: 1px solid var(--ui-current-border-muted);
}

.ui-text-list-card__items + .ui-card__footer {
  padding-top: 0.5rem;
}

.ui-text-list-card__marker {
  display: inline-flex;
  flex: none;
  align-items: center;
  color: var(--brand);
  font-weight: 700;
  line-height: 1.4;
}

.ui-text-list-card__marker :deep(svg) {
  width: 1em;
  height: 1em;
}

.ui-text-list-card__item-body {
  display: grid;
  gap: 0.25rem;
  min-width: 0;
}

.ui-text-list-card__item-title {
  color: inherit;
  font-weight: 700;
  line-height: 1.4;
}

.ui-text-list-card__item-description {
  color: var(--ui-current-text-secondary);
  font-size: var(--type-body-small-size);
  line-height: var(--type-body-small-line);
}
</style>

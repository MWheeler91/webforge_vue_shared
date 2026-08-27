<template>
  <BaseCard
    :as="props.as"
    :variant="props.variant"
    :padding="props.padding"
    :interactive="props.interactive"
  >
    <small v-if="props.eyebrow" class="text-list-card__eyebrow text-brand">
      {{ props.eyebrow }}
    </small>

    <CardTitle v-if="props.title" as="h3">{{ props.title }}</CardTitle>
    <p v-if="props.body" class="text-secondary">{{ props.body }}</p>

    <ul
      v-if="normalizedItems.length"
      class="text-list-card__items"
      :class="{ 'text-list-card__items--bulleted': props.layout === 'bulleted' }"
    >
      <li v-for="(item, index) in normalizedItems" :key="index">
        <span class="text-list-card__item-title">{{ item.title }}</span>
        <span v-if="item.description" class="text-list-card__item-description">
          {{ item.description }}
        </span>
      </li>
    </ul>

    <CardFooter v-if="props.footer">{{ props.footer }}</CardFooter>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '../../../primitives/card/BaseCard.vue'
import CardFooter from '../../../primitives/card/CardFooter.vue'
import CardTitle from '../../../primitives/card/CardTitle.vue'
import type { TextListCardItem, TextListCardProps } from './TextListCard.types.ts'

const props = withDefaults(defineProps<TextListCardProps>(), {
  as: 'article',
  variant: 'surface',
  padding: 'md',
  items: () => [],
  layout: 'bulleted',
})

const normalizedItems = computed<TextListCardItem[]>(() =>
  props.items.map((item) => (typeof item === 'string' ? { title: item } : item)),
)
</script>

<style scoped>
.text-list-card__eyebrow {
  display: block;
  margin-bottom: 0.5rem;
  font-size: var(--type-body-small-size);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.text-list-card__items {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.text-list-card__items li {
  display: grid;
  gap: 0.25rem;
  min-width: 0;
  padding-block: 0.75rem;
  border-bottom: 1px solid var(--ui-current-border-muted);
}

.text-list-card__item-title {
  color: inherit;
  font-weight: 700;
  line-height: 1.4;
}

.text-list-card__item-description {
  color: var(--ui-current-text-secondary);
  font-size: var(--type-body-small-size);
  line-height: var(--type-body-small-line);
}

.text-list-card__items--bulleted {
  padding-inline-start: 1.25rem;
  list-style: disc;
}

.text-list-card__items--bulleted li {
  display: list-item;
  padding-block: 0.25rem;
  border-bottom: 0;
}

@media (min-width: 561px) {
  .text-list-card__items {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>

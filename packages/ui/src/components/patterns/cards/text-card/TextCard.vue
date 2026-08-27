<template>
  <BaseCard :as="as" :variant="variant" :padding="padding" :interactive="interactive">
    <small v-if="eyebrow" class="text-card__eyebrow text-brand">{{ eyebrow }}</small>
    <CardTitle v-if="title" as="h3">{{ title }}</CardTitle>
    <p v-if="body" class="text-secondary">{{ body }}</p>
    <CardDivider v-if="divider" />
    <CardFooter v-if="footer">{{ footer }}</CardFooter>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '../../../primitives/card/BaseCard.vue'
import CardDivider from '../../../primitives/card/CardDivider.vue'
import CardFooter from '../../../primitives/card/CardFooter.vue'
import CardTitle from '../../../primitives/card/CardTitle.vue'
import type { TextCardProps } from './TextCard.types.ts'

withDefaults(defineProps<TextCardProps>(), {
  as: 'article',
  variant: 'surface',
  padding: 'md',
})
</script>

<style scoped>
.text-card__eyebrow {
  display: block;
  margin-bottom: 0.5rem;
  font-size: var(--type-body-small-size);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
</style>

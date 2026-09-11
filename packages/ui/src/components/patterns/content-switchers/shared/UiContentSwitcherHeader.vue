<template>
  <header v-if="label || eyebrow || heading || body" class="ui-content-switcher-header">
    <BaseBadge v-if="label" v-bind="label">{{ label.text }}</BaseBadge>
    <UiText v-if="eyebrow" :payload="eyebrow" fallback="p" />
    <UiText v-if="heading" :payload="heading" fallback="h2" />
    <UiText v-if="body" :payload="body" fallback="p" />
  </header>
</template>
<script setup lang="ts">
import BaseBadge from '../../../primitives/badge/BaseBadge.vue'
import UiText from '../../../primitives/text/UiText.vue'
import type { UiBadgePayload, UiTextPayload } from '../../../primitives/card/card.types.ts'
defineProps<{
  label?: UiBadgePayload | null
  eyebrow?: UiTextPayload | null
  heading?: UiTextPayload | null
  body?: UiTextPayload | null
}>()
</script>
<style scoped>
.ui-content-switcher-header {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.ui-content-switcher-header > * {
  margin: 0;
}
</style>

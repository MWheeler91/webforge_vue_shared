<template>
  <header v-if="label || eyebrow || heading || body" class="ui-gallery-header">
    <BaseBadge v-if="label" v-bind="label">{{ label.text }}</BaseBadge>
    <p v-if="eyebrow">{{ eyebrow.text }}</p>
    <component :is="heading?.as && heading.as !== 'span' ? heading.as : 'h2'" v-if="heading">{{
      heading.text
    }}</component>
    <p v-if="body">{{ body.text }}</p>
  </header>
</template>
<script setup lang="ts">
import BaseBadge from '../../../primitives/badge/BaseBadge.vue'
import type { SharedMediaGalleryProps } from '../../../primitives/gallery/gallery.types.ts'
defineProps<SharedMediaGalleryProps>()
</script>
<style scoped>
.ui-gallery-header {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.ui-gallery-header > * {
  margin: 0;
}
</style>

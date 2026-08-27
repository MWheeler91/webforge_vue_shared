<template>
  <header v-if="label || eyebrow || heading || body" class="ui-content-switcher-header">
    <BaseBadge v-if="label" v-bind="label">{{ label.text }}</BaseBadge>
    <p v-if="eyebrow">{{ eyebrow.text }}</p>
    <component v-if="heading" :is="heading.as && heading.as !== 'span' ? heading.as : 'h2'">{{
      heading.text
    }}</component>
    <p v-if="body">{{ body.text }}</p>
  </header>
</template>
<script setup lang="ts">
import BaseBadge from '../../../primitives/badge/BaseBadge.vue'
import type { SharedContentSwitcherProps } from '../../../primitives/content-switcher/content-switcher.types.ts'
defineProps<SharedContentSwitcherProps>()
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

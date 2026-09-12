<template>
  <WipSectionShell v-bind="props" class="process-section" data-wip="true"
    ><WipSectionHeader v-bind="props" />
    <p class="process-section__wip-note">WIP: process (numbered feature-card steps) is not implemented yet.</p></WipSectionShell
  >
</template>

<script setup lang="ts">
/**
 * WIP — not implemented.
 *
 * Numbered feature-card steps. Ported from the playground's app-local demo
 * (src/components/demos/sections/process-section/DemoProcessSection.vue)
 * as a starting point for whoever builds this out; card rendering depends
 * on an app-supplied card component registry (see DemoCardRenderer in the
 * playground) that this package does not own, so it's intentionally left
 * unrendered below rather than half-finished.
 *
 * Original numbered grid, for reference:
 *
 *   const items = computed(() => props.cards?.items ?? [])
 *   <UiGrid v-if="items.length" :max-columns="4" gap="md">
 *     <CardRenderer
 *       v-for="(card, index) in items"
 *       :key="card.key ?? index"
 *       :card="card"
 *       :overrides="{ icon: card.props.icon ?? String(index + 1) }"
 *     />
 *   </UiGrid>
 */
import type { ProcessSectionProps } from './ProcessSection.types.ts'
import WipSectionHeader from '../wip-shared/WipSectionHeader.vue'
import WipSectionShell from '../wip-shared/WipSectionShell.vue'

const props = defineProps<ProcessSectionProps>()
</script>

<style scoped>
.process-section__wip-note { margin-top: 1rem; color: var(--text_secondary); font-style: italic; }
</style>

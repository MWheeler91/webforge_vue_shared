<template>
  <WipSectionShell v-bind="props" class="stats-section" data-wip="true"
    ><WipSectionHeader v-bind="props" /><WipSectionActions :buttons="props.buttons" />
    <p class="stats-section__wip-note">WIP: stats (dense metric-card collection) is not implemented yet.</p></WipSectionShell
  >
</template>

<script setup lang="ts">
/**
 * WIP — not implemented.
 *
 * Dense metric-card collection. Ported from the playground's app-local
 * demo (src/components/demos/sections/stats-section/DemoStatsSection.vue)
 * as a starting point for whoever builds this out; card rendering depends
 * on an app-supplied card component registry (see DemoCardRenderer in the
 * playground) that this package does not own, so it's intentionally left
 * unrendered below rather than half-finished.
 *
 * Original two-column layout, for reference:
 *
 *   const items = computed(() => props.cards?.items ?? [])
 *   <div class="stats-section__layout">
 *     <div><SectionHeader v-bind="props" /><SectionActions :buttons="buttons" /></div>
 *     <UiGrid :max-columns="2" gap="md">
 *       <CardRenderer v-for="(card, index) in items" :key="card.key ?? index" :card="card" />
 *     </UiGrid>
 *   </div>
 */
import type { StatsSectionProps } from './StatsSection.types.ts'
import WipSectionActions from '../wip-shared/WipSectionActions.vue'
import WipSectionHeader from '../wip-shared/WipSectionHeader.vue'
import WipSectionShell from '../wip-shared/WipSectionShell.vue'

const props = defineProps<StatsSectionProps>()
</script>

<style scoped>
.stats-section__wip-note { margin-top: 1rem; color: var(--text_secondary); font-style: italic; }
</style>

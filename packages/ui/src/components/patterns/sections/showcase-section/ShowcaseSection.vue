<template>
  <WipSectionShell v-bind="props" class="showcase-section" data-wip="true"
    ><WipSectionHeader v-bind="props" />
    <p class="showcase-section__wip-note">WIP: showcase (one featured card + grouped supporting cards) is not implemented yet.</p></WipSectionShell
  >
</template>

<script setup lang="ts">
/**
 * WIP — not implemented.
 *
 * One featured card plus grouped supporting cards. Ported from the
 * playground's app-local demo
 * (src/components/demos/sections/showcase-section/DemoShowcaseSection.vue)
 * as a starting point for whoever builds this out; card rendering depends
 * on an app-supplied card component registry (see DemoCardRenderer in the
 * playground) that this package does not own, so it's intentionally left
 * unrendered below rather than half-finished.
 *
 * Original featured + supporting layout, for reference:
 *
 *   const featured = computed(() => props.cards?.keyed?.featured)
 *   const supporting = computed(() => props.cards?.grouped?.supporting ?? [])
 *   <div v-if="featured || supporting.length" class="showcase-section__layout">
 *     <CardRenderer v-if="featured" :card="featured" />
 *     <UiGrid v-if="supporting.length" :max-columns="2" gap="md">
 *       <CardRenderer v-for="(card, index) in supporting" :key="card.key ?? index" :card="card" />
 *     </UiGrid>
 *   </div>
 */
import type { ShowcaseSectionProps } from './ShowcaseSection.types.ts'
import WipSectionHeader from '../wip-shared/WipSectionHeader.vue'
import WipSectionShell from '../wip-shared/WipSectionShell.vue'

const props = defineProps<ShowcaseSectionProps>()
</script>

<style scoped>
.showcase-section__wip-note { margin-top: 1rem; color: var(--text_secondary); font-style: italic; }
</style>

<template>
  <WipSectionShell v-bind="props" class="services-section" data-wip="true"
    ><WipSectionHeader v-bind="props" />
    <p class="services-section__wip-note">WIP: services (pricing-card-driven layout) is not implemented yet.</p></WipSectionShell
  >
</template>

<script setup lang="ts">
/**
 * WIP — not implemented.
 *
 * Pricing-card-driven services layout. Ported from the playground's
 * app-local demo (src/components/demos/sections/services-section/DemoServicesSection.vue)
 * as a starting point for whoever builds this out; card rendering depends
 * on an app-supplied card component registry (see DemoCardRenderer in the
 * playground) that this package does not own, so it's intentionally left
 * unrendered below rather than half-finished.
 *
 * Original card grid, for reference:
 *
 *   const items = computed(() => props.cards?.items ?? [])
 *   <UiGrid v-if="items.length" :max-columns="3" gap="lg">
 *     <CardRenderer v-for="(card, index) in items" :key="card.key ?? index" :card="card" />
 *   </UiGrid>
 */
import type { ServicesSectionProps } from './ServicesSection.types.ts'
import WipSectionHeader from '../wip-shared/WipSectionHeader.vue'
import WipSectionShell from '../wip-shared/WipSectionShell.vue'

const props = defineProps<ServicesSectionProps>()
</script>

<style scoped>
.services-section__wip-note { margin-top: 1rem; color: var(--text_secondary); font-style: italic; }
</style>

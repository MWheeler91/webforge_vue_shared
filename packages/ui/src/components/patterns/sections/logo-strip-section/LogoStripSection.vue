<template>
  <WipSectionShell v-bind="props" class="logo-strip-section" data-wip="true"
    ><WipSectionHeader v-if="label || heading" v-bind="props" />
    <p class="logo-strip-section__wip-note">WIP: logo-strip (partner/trust-mark strip) is not implemented yet.</p></WipSectionShell
  >
</template>

<script setup lang="ts">
/**
 * WIP — not implemented.
 *
 * Partner/trust-mark strip. Ported from the playground's app-local demo
 * (src/components/demos/sections/logo-strip-section/DemoLogoStripSection.vue)
 * as a starting point for whoever builds this out; the item row itself is
 * intentionally left unrendered below rather than half-finished.
 *
 * Original item rendering, for reference:
 *
 *   const items = computed(() => collectionItems(props.items))
 *   <div v-if="items.length" class="logo-strip-section__items">
 *     <span v-for="(item, index) in items" :key="index">{{ item.text }}</span>
 *   </div>
 */
import type { LogoStripSectionProps } from './LogoStripSection.types.ts'
import WipSectionHeader from '../wip-shared/WipSectionHeader.vue'
import WipSectionShell from '../wip-shared/WipSectionShell.vue'

const props = defineProps<LogoStripSectionProps>()
</script>

<style scoped>
.logo-strip-section__wip-note { margin-top: 1rem; color: var(--text_secondary); font-style: italic; }
</style>

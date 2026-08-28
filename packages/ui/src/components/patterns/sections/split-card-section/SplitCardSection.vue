<template>
  <BaseSection :id="section.key ?? undefined" :class="sectionClasses" :variant="variant" spacing="xl" width="full"><BaseContainer class="relative" width="xl" padding="lg"><div class="split-card-section__layout"><div class="split-card-section__content"><SectionHeader v-if="eyebrow || title" class="w-full max-w-none !mb-0" :eyebrow="eyebrow?.text ?? undefined"><template #title>{{ title?.text }}</template></SectionHeader><div v-if="body.length" class="split-card-section__body"><p v-for="(paragraph, index) in body" :key="index" class="text-secondary">{{ paragraph.text }}</p></div><div v-if="buttons.length" class="flex flex-wrap gap-3"><BaseButton v-for="button in buttons" :key="button.label" v-bind="button">{{ button.label }}</BaseButton></div></div><div v-if="card" class="split-card-section__card"><UiCardRenderer :card="card" /></div></div></BaseContainer></BaseSection>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { BaseButton, BaseContainer, BaseSection, SectionHeader } from '../../../primitives/index.ts'
import type { CardAction } from '../../../primitives/card/card.types.ts'
import UiCardRenderer from '../../cards/UiCardRenderer.vue'
import { sectionCards, sectionElement, type UiSectionElement } from '../sectionData.ts'
import type { SplitCardSectionProps } from './SplitCardSection.types.ts'
const props = withDefaults(defineProps<SplitCardSectionProps>(), { layout: 'split', placement: 'end', variant: 'default' })
const sectionClasses = computed(() => ['split-card-section', `split-card-section--${props.layout}`, `split-card-section--placement-${props.placement}`])
const eyebrow = computed(() => sectionElement(props.section, 'eyebrow'))
const title = computed(() => sectionElement(props.section, 'title'))
const body = computed(() => ((props.section.elements?.text as Record<string, UiSectionElement[]> | undefined)?.body ?? []))
const card = computed(() => sectionCards(props.section)[0] ?? null)
const buttons = computed<CardAction[]>(() => { const values = props.section.elements?.buttons as Record<string, Array<Record<string, unknown>>> | undefined; return Object.values(values ?? {}).flat().map((button) => ({ label: String(button.text ?? button.label ?? ''), href: button.href as string | undefined, to: button.vue_route as string | undefined, variant: button.variant as CardAction['variant'] | undefined })).filter((button) => button.label) })
</script>
<style scoped>
.split-card-section__layout { display: grid; gap: clamp(1.25rem, 3vw, 3rem); }
.split-card-section__content, .split-card-section__card { min-width: 0; }
.split-card-section__content { display: grid; align-content: center; gap: .75rem; }
.split-card-section__body { display: grid; gap: .75rem; }
.split-card-section__body p { margin: 0; }
.split-card-section--centered .split-card-section__content { justify-items: center; text-align: center; }
@media (min-width: 801px) { .split-card-section--split .split-card-section__layout { grid-template-columns: 1fr 1fr; align-items: center; } .split-card-section--split.split-card-section--placement-start .split-card-section__card { grid-column: 1; grid-row: 1; } .split-card-section--split.split-card-section--placement-start .split-card-section__content { grid-column: 2; grid-row: 1; } .split-card-section--split.split-card-section--placement-end .split-card-section__content { grid-column: 1; grid-row: 1; } .split-card-section--split.split-card-section--placement-end .split-card-section__card { grid-column: 2; grid-row: 1; } }
</style>

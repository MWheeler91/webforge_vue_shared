<template>
  <BaseSection :id="section.key ?? undefined" :class="sectionClasses" :variant="variant" spacing="xl" width="full">
    <BaseContainer width="xl" padding="lg"><div class="split-text-section__layout">
      <SectionHeader v-if="eyebrow || title" class="split-text-section__header w-full max-w-none !mb-0" :eyebrow="eyebrow?.text ?? undefined"><template #title>{{ title?.text }}</template></SectionHeader>
      <div v-if="body.length || footer" class="split-text-section__body"><p v-for="(paragraph, index) in body" :key="index" class="text-secondary">{{ paragraph.text }}</p><strong v-if="footer" class="split-text-section__footer">{{ footer.text }}</strong></div>
    </div></BaseContainer>
  </BaseSection>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { BaseContainer, BaseSection, SectionHeader } from '../../../primitives/index.ts'
import { sectionElement, type UiSectionElement } from '../sectionData.ts'
import type { SplitTextSectionProps } from './SplitTextSection.types.ts'
const props = withDefaults(defineProps<SplitTextSectionProps>(), { layout: 'split', placement: 'start', variant: 'default' })
const sectionClasses = computed(() => ['split-text-section', `split-text-section--${props.layout}`, `split-text-section--placement-${props.placement}`])
const eyebrow = computed(() => sectionElement(props.section, 'eyebrow'))
const title = computed(() => sectionElement(props.section, 'title'))
const footer = computed(() => sectionElement(props.section, 'footer'))
const body = computed(() => ((props.section.elements?.text as Record<string, UiSectionElement[]> | undefined)?.body ?? []))
</script>
<style scoped>
.split-text-section__layout { display: grid; gap: clamp(1.25rem, 3vw, 3rem); }
.split-text-section__body { display: grid; align-content: center; gap: 1rem; }
.split-text-section__body p { margin: 0; }
.split-text-section__footer { display: block; margin-top: .5rem; padding-top: 1rem; border-top: 1px solid var(--ui-current-border-muted); }
@media (min-width: 801px) { .split-text-section--split .split-text-section__layout { grid-template-columns: .9fr 1.1fr; align-items: center; } .split-text-section--split.split-text-section--placement-end .split-text-section__header { grid-column: 2; grid-row: 1; } .split-text-section--split.split-text-section--placement-end .split-text-section__body { grid-column: 1; grid-row: 1; } }
</style>

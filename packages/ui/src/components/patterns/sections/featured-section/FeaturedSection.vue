<template>
  <BaseSection :class="sectionClasses" :variant="variant" spacing="md" width="full">
    <BaseContainer width="xl" padding="lg" :class="['featured-section__container', `featured-section--${layout}`]">
      <div class="featured-section__intro">
        <SectionHeader v-if="eyebrow || title" class="w-full max-w-none !mb-0" :eyebrow="eyebrow?.text ?? undefined" :subtitle="body?.text ?? undefined">
          <template #title>{{ title?.text }}</template>
        </SectionHeader>
      </div>
      <div v-if="cards.length" class="featured-section__cards">
        <UiCardRenderer v-for="(card, index) in cards" :key="card.key ?? index" :card="card" />
      </div>
    </BaseContainer>
  </BaseSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { BaseContainer, BaseSection, SectionHeader } from '../../../primitives/index.ts'
import UiCardRenderer from '../../cards/UiCardRenderer.vue'
import { sectionCards, sectionElement } from '../sectionData.ts'
import type { FeaturedSectionProps } from './FeaturedSection.types.ts'

const props = withDefaults(defineProps<FeaturedSectionProps>(), { layout: 'split', variant: 'default' })
const layout = computed(() => props.layout)
const sectionClasses = computed(() => ['featured-section'])
const eyebrow = computed(() => sectionElement(props.section, 'eyebrow'))
const title = computed(() => sectionElement(props.section, 'title'))
const body = computed(() => sectionElement(props.section, 'body'))
const cards = computed(() => sectionCards(props.section))
</script>

<style scoped>
.featured-section__container { display: grid; gap: 2.5rem; }
.featured-section__intro { display: grid; align-content: center; }
.featured-section__cards { display: grid; gap: 1rem; }
.featured-section--stacked, .featured-section--grid { gap: 2rem; }
.featured-section--stacked { grid-template-columns: 1fr; }
.featured-section--grid { grid-template-columns: 1fr; }
.featured-section--grid .featured-section__intro { grid-column: 1 / -1; }
@media (max-width: 800px) { .featured-section__container { grid-template-columns: 1fr; } }
@media (min-width: 801px) { .featured-section__container { grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); align-items: center; } .featured-section--stacked, .featured-section--grid { grid-template-columns: 1fr; } .featured-section--grid .featured-section__cards { grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); } }
</style>

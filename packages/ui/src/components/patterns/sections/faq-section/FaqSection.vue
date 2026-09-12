<template>
  <BaseSection
    :id="section.key ?? undefined"
    class="ui-faq-section"
    :variant="variant"
    spacing="xl"
    width="full"
  >
    <BaseContainer width="xl" padding="lg">
      <SectionHeader
        v-if="eyebrow || title || body"
        class="ui-faq-section__header w-full max-w-none !mb-0"
        :eyebrow="eyebrow?.text ?? undefined"
        :subtitle="body?.text ?? undefined"
      >
        <template #title>{{ title?.text }}</template>
      </SectionHeader>

      <AccordionPattern
        v-if="items.length"
        class="ui-faq-section__accordion"
        :variant="accordionVariant"
        :open-mode="openMode"
        :indicator="indicator"
        :animation="animation"
      >
        <AccordionLeaf
          v-for="(item, index) in items"
          :key="item.node.key ?? index"
          :value="item.node.key ?? String(index)"
          :title="item.question"
          :body="item.answer"
          :default-open="componentConfigValue<'open' | 'closed'>(item.node, 'initialState', 'closed') === 'open'"
        />
      </AccordionPattern>
    </BaseContainer>
  </BaseSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AccordionLeaf, AccordionPattern } from '../../accordion/index.ts'
import type { AccordionPatternIndicator, AccordionPatternOpenMode } from '../../accordion/index.ts'
import { BaseContainer, BaseSection, SectionHeader } from '../../../primitives/index.ts'
import type { AccordionAnimation } from '../../../primitives/accordion/accordion.types.ts'
import type { CardVariant } from '../../../primitives/card/card.types.ts'
import { cardElement, componentConfigValue, sectionComponent, sectionComponents, sectionElement } from '../sectionData.ts'
import type { FaqSectionProps } from './FaqSection.types.ts'

const props = withDefaults(defineProps<FaqSectionProps>(), {
  variant: 'default',
})

const eyebrow = computed(() => sectionElement(props.section, 'eyebrow'))
const title = computed(() => sectionElement(props.section, 'title'))
const body = computed(() => sectionElement(props.section, 'body'))

// The accordion container is one "accordion" component placement holding its
// own behavior config; the questions are "item" placements sharing that key.
const accordion = computed(() => sectionComponent(props.section, 'accordion'))
const accordionVariant = computed(() =>
  componentConfigValue<CardVariant>(accordion.value, 'variant', 'surface'),
)
const openMode = computed(() =>
  componentConfigValue<AccordionPatternOpenMode>(accordion.value, 'openMode', 'multiple'),
)
const indicator = computed(() =>
  componentConfigValue<AccordionPatternIndicator>(accordion.value, 'indicator', 'plusMinus'),
)
const animation = computed(() =>
  componentConfigValue<AccordionAnimation>(accordion.value, 'animation', 'slide'),
)

// Each FAQ item is an accordion-leaf component: its title is the question, its body the answer.
const items = computed(() =>
  sectionComponents(props.section, 'item')
    .map((node) => ({
      node,
      question: cardElement(node, 'title')?.text ?? '',
      answer: cardElement(node, 'body')?.text ?? '',
    }))
    .filter((item) => item.question),
)
</script>

<style scoped>
.ui-faq-section__accordion {
  margin-top: 2rem;
  max-width: 48rem;
}

.ui-faq-section__header + .ui-faq-section__accordion {
  margin-top: 2.5rem;
}
</style>

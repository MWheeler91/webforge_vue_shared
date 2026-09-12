<template>
  <BaseAccordion
    class="ui-accordion-pattern"
    :class="`ui-accordion-pattern--variant-${variant}`"
    :multiple="openMode === 'multiple'"
    :animation="animation"
  >
    <slot />
  </BaseAccordion>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import BaseAccordion from '../../../primitives/accordion/BaseAccordion.vue'
import { accordionPatternIndicatorKey } from '../accordion.types.ts'
import type { AccordionPatternProps } from './AccordionPattern.types.ts'

const props = withDefaults(defineProps<AccordionPatternProps>(), {
  variant: 'surface',
  openMode: 'multiple',
  indicator: 'plusMinus',
  animation: 'slide',
})

provide(
  accordionPatternIndicatorKey,
  computed(() => props.indicator),
)
</script>

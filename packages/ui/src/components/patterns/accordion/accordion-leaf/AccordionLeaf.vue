<template>
  <AccordionItem :value="value" class="ui-accordion-leaf" v-slot="{ open }">
    <AccordionTrigger class="ui-accordion-leaf__trigger">
      <UiText v-if="title" :payload="title" fallback="span" />
      <span
        v-if="resolvedIndicator === 'plusMinus'"
        class="ui-accordion-leaf__indicator ui-accordion-leaf__indicator--plus-minus"
        aria-hidden="true"
      >{{ open ? '−' : '+' }}</span>
      <span
        v-else-if="resolvedIndicator === 'chevron'"
        class="ui-accordion-leaf__indicator ui-accordion-leaf__indicator--chevron"
        :class="{ 'is-open': open }"
        aria-hidden="true"
      >⌄</span>
    </AccordionTrigger>
    <AccordionPanel v-if="body"><UiText :payload="body" fallback="span" /></AccordionPanel>
  </AccordionItem>
</template>

<script setup lang="ts">
import { computed, inject, onMounted } from 'vue'
import AccordionItem from '../../../primitives/accordion/AccordionItem.vue'
import AccordionPanel from '../../../primitives/accordion/AccordionPanel.vue'
import AccordionTrigger from '../../../primitives/accordion/AccordionTrigger.vue'
import UiText from '../../../primitives/text/UiText.vue'
import { textPayload } from '../../../primitives/card/card.types.ts'
import { accordionContextKey } from '../../../primitives/accordion/accordion.types.ts'
import { accordionPatternIndicatorKey } from '../accordion.types.ts'
import type { AccordionLeafProps } from './AccordionLeaf.types.ts'

const props = withDefaults(defineProps<AccordionLeafProps>(), {
  title: null,
  body: null,
  indicator: null,
  defaultOpen: false,
})

const injectedIndicator = inject(accordionPatternIndicatorKey, computed(() => 'plusMinus' as const))
const resolvedIndicator = computed(() => props.indicator ?? injectedIndicator.value)

const title = computed(() => textPayload(props.title))
const body = computed(() => textPayload(props.body))

// BaseAccordion only knows which values start open through its own
// `defaultValue` prop, which the enclosing AccordionPattern can't pre-fill
// without inspecting slot content - so a leaf that wants to start open just
// opens itself once, through the same accordion context AccordionItem uses.
const accordion = inject(accordionContextKey, null)
onMounted(() => {
  if (props.defaultOpen && accordion && !accordion.openValues.value.includes(props.value)) {
    accordion.toggle(props.value)
  }
})
</script>

<style scoped>
.ui-accordion-leaf__trigger {
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.ui-accordion-leaf__indicator {
  flex: 0 0 auto;
  line-height: 1;
  transition: transform var(--ui-accordion-motion-duration, 280ms) ease;
}

.ui-accordion-leaf__indicator--plus-minus {
  font-size: 1.5rem;
  font-weight: 300;
}

.ui-accordion-leaf__indicator--chevron {
  font-size: 1.25rem;
  transform: rotate(0deg);
}

.ui-accordion-leaf__indicator--chevron.is-open {
  transform: rotate(180deg);
}

@media (prefers-reduced-motion: reduce) {
  .ui-accordion-leaf__indicator {
    transition: none;
  }
}
</style>

<template>
  <div
    class="ui-accordion__panel"
    :class="[
      `ui-accordion__panel--animation-${accordion.animation.value}`,
      item.open.value && 'ui-accordion__panel--open',
    ]"
    :id="panelId"
    role="region"
    :aria-hidden="item.open.value ? undefined : 'true'"
  >
    <div class="ui-accordion__panel-content"><slot /></div>
  </div>
</template>
<script setup lang="ts">
import { inject } from 'vue'
import { accordionContextKey, accordionItemContextKey } from './accordion.types'
const item = inject(accordionItemContextKey)
const accordion = inject(accordionContextKey)
if (!item) throw new Error('AccordionPanel must be inside AccordionItem.')
if (!accordion) throw new Error('AccordionPanel must be inside BaseAccordion.')
const panelId = `ui-accordion-panel-${item.value}`
</script>

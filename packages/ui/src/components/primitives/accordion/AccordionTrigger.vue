<template>
  <button
    class="ui-accordion__trigger"
    type="button"
    :aria-expanded="item.open.value"
    :aria-controls="panelId"
    :disabled="item.disabled.value"
    @click="item.toggle"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
import { inject } from 'vue'
import { accordionItemContextKey } from './accordion.types'
const injected = inject(accordionItemContextKey)
if (!injected) throw new Error('AccordionTrigger must be inside AccordionItem.')
const item = injected
const panelId = `ui-accordion-panel-${item.value}`
</script>

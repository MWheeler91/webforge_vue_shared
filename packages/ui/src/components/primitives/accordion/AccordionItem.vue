<template>
  <section class="ui-accordion__item" :class="{ 'ui-accordion__item--open': open }">
    <slot :open="open" />
  </section>
</template>
<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { accordionContextKey, accordionItemContextKey } from './accordion.types'
const props = defineProps<{ value: string; disabled?: boolean }>()
const injected = inject(accordionContextKey)
if (!injected) throw new Error('AccordionItem must be used inside BaseAccordion.')
const context = injected
const open = computed(() => context.openValues.value.includes(props.value))
provide(accordionItemContextKey, {
  open,
  value: props.value,
  disabled: computed(() => Boolean(props.disabled)),
  toggle: () => !props.disabled && context.toggle(props.value),
})
</script>

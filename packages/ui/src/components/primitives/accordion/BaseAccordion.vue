<template>
  <div v-bind="accordionAttrs" :class="classes"><slot /></div>
</template>
<script setup lang="ts">
import { computed, provide, ref, useAttrs } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import { accordionContextKey } from './accordion.types'
import type { AccordionAnimation } from './accordion.types'
const props = withDefaults(
  defineProps<{
    modelValue?: string[]
    defaultValue?: string[]
    multiple?: boolean
    animation?: AccordionAnimation
    borderless?: boolean
    unstyled?: boolean
  }>(),
  {
    modelValue: undefined,
    defaultValue: () => [],
    multiple: false,
    animation: 'none',
    borderless: false,
    unstyled: false,
  },
)
const emit = defineEmits<{ 'update:modelValue': [value: string[]]; change: [value: string[]] }>()
const uiConfig = useUiConfig()
const attrs = useAttrs()
const externalClass = computed(() => attrs.class as string | undefined)
const accordionAttrs = computed(() => {
  const copiedAttrs = { ...attrs }
  delete copiedAttrs.class
  return copiedAttrs
})
const classes = computed(() => {
  if (props.unstyled) return ['ui-accordion-unstyled', externalClass.value].filter(Boolean).join(' ')

  const accordion = uiConfig.accordion
  return [
    'ui-accordion',
    `ui-accordion--pack-${accordion.pack}`,
    `ui-accordion--radius-${accordion.radius}`,
    `ui-accordion--density-${accordion.density}`,
    accordion.motion && `ui-accordion--motion-${accordion.motion}`,
    `ui-accordion--animation-${props.animation}`,
    props.borderless && 'ui-accordion--borderless',
    externalClass.value,
  ].filter(Boolean).join(' ')
})
const internal = ref([...props.defaultValue])
const openValues = computed(() => props.modelValue ?? internal.value)
function toggle(value: string) {
  const next = openValues.value.includes(value)
    ? openValues.value.filter((item) => item !== value)
    : props.multiple
      ? [...openValues.value, value]
      : [value]
  if (props.modelValue === undefined) internal.value = next
  emit('update:modelValue', next)
  emit('change', next)
}
provide(accordionContextKey, {
  openValues,
  multiple: computed(() => props.multiple),
  animation: computed(() => props.animation),
  toggle,
})
</script>

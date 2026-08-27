<template>
  <div
    class="ui-tabs"
    :class="[`ui-tabs--${orientation}`, `ui-tabs--pack-${uiConfig.global.pack}`]"
    :data-orientation="orientation"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import { tabsContextKey, type TabsOrientation } from './tabs.types'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    defaultValue?: string
    orientation?: TabsOrientation
    disabled?: boolean
  }>(),
  { modelValue: undefined, defaultValue: '', orientation: 'horizontal', disabled: false },
)
const emit = defineEmits<{ 'update:modelValue': [value: string]; change: [value: string] }>()
const uiConfig = useUiConfig()
const internalValue = ref(props.defaultValue)
const activeValue = computed(() => props.modelValue ?? internalValue.value)
const triggers = new Map<string, HTMLButtonElement>()
function select(value: string) {
  if (!props.disabled) {
    if (props.modelValue === undefined) internalValue.value = value
    emit('update:modelValue', value)
    emit('change', value)
  }
}
function moveFocus(value: string, direction: number) {
  const entries = [...triggers.entries()].filter(([, element]) => !element.disabled)
  const index = entries.findIndex(([key]) => key === value)
  const target = entries[(index + direction + entries.length) % entries.length]
  if (target) {
    select(target[0])
    target[1].focus()
  }
}
provide(tabsContextKey, {
  activeValue,
  orientation: computed(() => props.orientation),
  disabled: computed(() => props.disabled),
  registerTrigger: (value, element) => triggers.set(value, element),
  unregisterTrigger: (value) => triggers.delete(value),
  select,
  moveFocus,
})
</script>

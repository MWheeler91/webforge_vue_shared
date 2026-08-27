<template>
  <button
    ref="element"
    class="ui-tabs__trigger"
    :class="{ 'ui-tabs__trigger--active': active }"
    type="button"
    role="tab"
    :id="tabId"
    :aria-selected="active"
    :aria-controls="panelId"
    :tabindex="active ? 0 : -1"
    :disabled="disabled || context.disabled.value"
    @click="context.select(value)"
    @keydown="onKeydown"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { tabsContextKey } from './tabs.types'
const props = withDefaults(defineProps<{ value: string; disabled?: boolean }>(), {
  disabled: false,
})
const injectedContext = inject(tabsContextKey)
if (!injectedContext) throw new Error('TabTrigger must be used inside BaseTabs.')
const context = injectedContext
const element = ref<HTMLButtonElement>()
const active = computed(() => context.activeValue.value === props.value)
const tabId = computed(() => `ui-tab-${props.value}`)
const panelId = computed(() => `ui-tabpanel-${props.value}`)
onMounted(() => {
  if (element.value) context.registerTrigger(props.value, element.value)
})
onBeforeUnmount(() => context.unregisterTrigger(props.value))
function onKeydown(event: KeyboardEvent) {
  const horizontal = context.orientation.value === 'horizontal'
  const delta =
    (horizontal && event.key === 'ArrowRight') || (!horizontal && event.key === 'ArrowDown')
      ? 1
      : (horizontal && event.key === 'ArrowLeft') || (!horizontal && event.key === 'ArrowUp')
        ? -1
        : 0
  if (delta) {
    event.preventDefault()
    context.moveFocus(props.value, delta)
  }
}
</script>

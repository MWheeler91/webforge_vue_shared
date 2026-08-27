<template>
  <button
    ref="element"
    class="ui-dropdown__trigger"
    type="button"
    aria-haspopup="menu"
    :aria-expanded="context.open.value"
    :disabled="context.disabled.value"
    @click="context.toggle"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { dropdownContextKey } from './dropdown.types'
const injected = inject(dropdownContextKey)
if (!injected) throw new Error('DropdownTrigger must be used inside BaseDropdown.')
const context = injected
const element = ref<HTMLButtonElement>()
onMounted(() => {
  context.trigger.value = element.value
})
</script>

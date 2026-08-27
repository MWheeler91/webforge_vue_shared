<template>
  <button
    class="ui-dropdown__item"
    type="button"
    role="menuitem"
    :disabled="disabled"
    @click="select"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
import { inject } from 'vue'
import { dropdownContextKey } from './dropdown.types'
const props = withDefaults(defineProps<{ disabled?: boolean; closeOnSelect?: boolean }>(), {
  disabled: false,
  closeOnSelect: true,
})
const emit = defineEmits<{ select: [] }>()
const injected = inject(dropdownContextKey)
if (!injected) throw new Error('DropdownItem must be used inside BaseDropdown.')
const context = injected
function select() {
  if (!props.disabled) {
    emit('select')
    if (props.closeOnSelect) context.close()
  }
}
</script>

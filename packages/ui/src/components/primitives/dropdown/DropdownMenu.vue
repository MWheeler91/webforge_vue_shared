<template>
  <div
    ref="menu"
    v-show="context.open.value"
    class="ui-dropdown__menu"
    role="menu"
    @keydown="onKeydown"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">
import { inject, ref } from 'vue'
import { dropdownContextKey } from './dropdown.types'
const injected = inject(dropdownContextKey)
if (!injected) throw new Error('DropdownMenu must be used inside BaseDropdown.')
const context = injected
const menu = ref<HTMLElement>()

function onKeydown(event: KeyboardEvent) {
  const items = [
    ...(menu.value?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? []),
  ]
  const index = items.indexOf(document.activeElement as HTMLButtonElement)
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    items[(index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus()
  } else if (event.key === 'Home') {
    event.preventDefault()
    items[0]?.focus()
  } else if (event.key === 'End') {
    event.preventDefault()
    items[items.length - 1]?.focus()
  }
}
</script>

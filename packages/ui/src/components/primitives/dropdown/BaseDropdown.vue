<template>
  <div
    ref="root"
    class="ui-dropdown"
    :class="`ui-dropdown--pack-${uiConfig.global.pack}`"
    @keydown.esc.prevent="close(true)"
  ><slot /></div>
</template>
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import { dropdownContextKey } from './dropdown.types'
const props = withDefaults(
  defineProps<{ modelValue?: boolean; defaultOpen?: boolean; disabled?: boolean }>(),
  { modelValue: undefined, defaultOpen: false, disabled: false },
)
const emit = defineEmits<{ 'update:modelValue': [value: boolean]; open: []; close: [] }>()
const uiConfig = useUiConfig()
const root = ref<HTMLElement>()
const trigger = ref<HTMLElement>()
const internal = ref(props.defaultOpen)
const open = computed(() => props.modelValue ?? internal.value)
function setOpen(value: boolean) {
  if (props.disabled) return
  if (props.modelValue === undefined) internal.value = value
  emit('update:modelValue', value)
  if (value) emit('open')
  else emit('close')
}
function close(restoreFocus = false) {
  if (open.value) setOpen(false)
  if (restoreFocus) trigger.value?.focus()
}
function toggle() {
  setOpen(!open.value)
}
function onDocumentPointer(event: PointerEvent) {
  if (root.value && !root.value.contains(event.target as Node)) close()
}
onMounted(() => document.addEventListener('pointerdown', onDocumentPointer))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onDocumentPointer))
provide(dropdownContextKey, {
  open,
  disabled: computed(() => props.disabled),
  trigger,
  close,
  toggle,
})
</script>

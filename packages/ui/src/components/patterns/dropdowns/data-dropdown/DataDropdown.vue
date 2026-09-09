<template>
  <div v-bind="rootAttrs" :class="rootClass">
    <BaseDropdown :disabled="disabled">
      <DropdownTrigger :class="triggerClass">{{ selectedText ?? placeholder }}</DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          v-for="option in normalizedOptions"
          :key="optionIndex(option)"
          :disabled="option.disabled"
          @select="select(option.value)"
        >
          {{ option.text }}
        </DropdownItem>
        <span v-if="!normalizedOptions.length" class="ui-data-dropdown__empty">
          {{ emptyText }}
        </span>
      </DropdownMenu>
    </BaseDropdown>
  </div>
</template>

<script setup lang="ts" generic="TItem, TLabel = string | number | Date, TValue = unknown">
import { computed, shallowRef, useAttrs, watch } from 'vue'
import BaseDropdown from '../../../primitives/dropdown/BaseDropdown.vue'
import DropdownItem from '../../../primitives/dropdown/DropdownItem.vue'
import DropdownMenu from '../../../primitives/dropdown/DropdownMenu.vue'
import DropdownTrigger from '../../../primitives/dropdown/DropdownTrigger.vue'
import { cn } from '../../../../utils/classNames.ts'
import type { DataDropdownOption } from './DataDropdown.types.ts'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    items: TItem[]
    getLabel: (item: TItem) => TLabel
    getValue: (item: TItem) => TValue | undefined
    modelValue?: TValue
    isDefault?: (item: TItem) => boolean
    isDisabled?: (item: TItem) => boolean
    formatLabel?: (label: TLabel, item: TItem) => string | undefined
    isEqual?: (a: TValue, b: TValue) => boolean
    disabled?: boolean
    placeholder?: string
    emptyText?: string
    fullWidth?: boolean
    triggerClass?: string
  }>(),
  {
    modelValue: undefined,
    isDefault: undefined,
    isDisabled: undefined,
    formatLabel: undefined,
    isEqual: Object.is,
    disabled: false,
    placeholder: 'Select an option',
    emptyText: 'No options available',
    fullWidth: false,
    triggerClass: undefined,
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: TValue | undefined] }>()
const attrs = useAttrs()
const internalValue = shallowRef<TValue | undefined>(undefined)

const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})
const rootClass = computed(() => cn(
  'ui-data-dropdown',
  props.fullWidth && 'ui-data-dropdown--full-width',
  attrs.class as string | undefined,
))
const triggerClass = computed(() => props.triggerClass)

function labelText(label: TLabel, item: TItem): string | undefined {
  if (props.formatLabel) return props.formatLabel(label, item)
  if (typeof label === 'string') return label || undefined
  if (typeof label === 'number') return Number.isFinite(label) ? String(label) : undefined
  if (label instanceof Date) return Number.isNaN(label.getTime()) ? undefined : label.toLocaleDateString()
  return undefined
}

const normalizedOptions = computed<DataDropdownOption<TItem, TLabel, TValue>[]>(() => {
  const options: DataDropdownOption<TItem, TLabel, TValue>[] = []
  for (const item of props.items) {
    const value = props.getValue(item)
    if (value === undefined) continue
    const label = props.getLabel(item)
    const text = labelText(label, item)
    if (text === undefined) continue
    options.push({
      item,
      label,
      value,
      text,
      disabled: props.isDisabled?.(item) ?? false,
    })
  }
  return options
})

const hasControlledValue = computed(() => props.modelValue !== undefined)
const selectedValue = computed(() =>
  hasControlledValue.value ? props.modelValue : internalValue.value,
)
const selectedOption = computed(() =>
  normalizedOptions.value.find((option) => selectedValue.value !== undefined && props.isEqual(option.value, selectedValue.value)),
)
const selectedText = computed(() => selectedOption.value?.text)

function optionIndex(option: DataDropdownOption<TItem, TLabel, TValue>) {
  return normalizedOptions.value.indexOf(option)
}

function defaultValue() {
  const option = normalizedOptions.value.find((candidate) => props.isDefault?.(candidate.item))
  return option?.value
}

function reconcile(emitChange: boolean) {
  if (hasControlledValue.value) return
  const current = internalValue.value
  if (current !== undefined && normalizedOptions.value.some((option) => props.isEqual(option.value, current))) return

  const next = defaultValue()
  internalValue.value = next
  if (emitChange && next !== current) emit('update:modelValue', next)
}

watch([normalizedOptions, () => props.modelValue], () => reconcile(true), { immediate: true })

function select(value: TValue) {
  if (props.disabled) return
  internalValue.value = value
  emit('update:modelValue', value)
}
</script>

<style scoped>
.ui-data-dropdown {
  display: inline-block;
}

.ui-data-dropdown--full-width,
.ui-data-dropdown--full-width :deep(.ui-dropdown),
.ui-data-dropdown--full-width :deep(.ui-dropdown__trigger) {
  display: block;
  width: 100%;
}

/* The trigger shows a single selected label; keep it to one line like a native select. */
.ui-data-dropdown :deep(.ui-dropdown__trigger) {
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-data-dropdown :deep(.ui-dropdown__menu) {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  max-height: 16rem;
  overflow-y: auto;
  overflow-x: hidden;
}

.ui-data-dropdown :deep(.ui-dropdown__item) {
  white-space: normal;
  overflow-wrap: anywhere;
}

.ui-data-dropdown__empty {
  display: block;
  padding: 0.5rem 0.75rem;
  color: var(--text_muted);
  white-space: nowrap;
}
</style>

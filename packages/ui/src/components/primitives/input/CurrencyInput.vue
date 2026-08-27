<template>
  <BaseInput
    v-bind="inputAttrs"
    :id="id"
    :name="name"
    :model-value="displayValue"
    type="text"
    inputmode="decimal"
    :variant="variant"
    :size="size"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :aria-invalid="ariaInvalid"
    :aria-describedby="ariaDescribedby"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :full-width="fullWidth"
    :unstyled="unstyled"
    @update:model-value="handleUpdate"
    @input="emit('input', $event)"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="emit('change', $event)"
  >
    <template #leading>
      <slot name="leading">
        <span class="ui-input-prefix">{{ symbol }}</span>
      </slot>
    </template>

    <template v-if="$slots.trailing" #trailing>
      <slot name="trailing" />
    </template>
  </BaseInput>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue'
import BaseInput from './BaseInput.vue'
import type { InputSize, InputVariant } from './input.types.ts'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  modelValue?: number | null
  id?: string
  name?: string
  variant?: InputVariant
  size?: InputSize
  placeholder?: string
  autocomplete?: string
  symbol?: string
  decimals?: number
  ariaInvalid?: boolean | 'true' | 'false' | 'grammar' | 'spelling'
  ariaDescribedby?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  fullWidth?: boolean
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  id: undefined,
  name: undefined,
  variant: 'default',
  size: 'md',
  placeholder: '0.00',
  autocomplete: 'off',
  symbol: '$',
  decimals: 2,
  ariaInvalid: undefined,
  ariaDescribedby: undefined,
  disabled: false,
  readonly: false,
  required: false,
  fullWidth: false,
  unstyled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
  input: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  change: [event: Event]
}>()

const attrs = useAttrs()
const focused = ref(false)
const localValue = ref('')

watch(
  () => props.modelValue,
  () => {
    if (!focused.value) {
      localValue.value = formatValue(props.modelValue)
    }
  },
  { immediate: true },
)

const inputAttrs = computed(() => {
  const { class: _class, type: _type, value: _value, inputmode: _inputmode, ...rest } = attrs

  return rest
})

const displayValue = computed(() => {
  return localValue.value
})

function parseValue(value: string) {
  const cleaned = value.replace(/[^\d.-]/g, '')

  if (!cleaned || cleaned === '-' || cleaned === '.') {
    return null
  }

  const parsed = Number(cleaned)

  return Number.isNaN(parsed) ? null : parsed
}

function formatValue(value: number | string | null | undefined) {
  if (value == null || value === '') return ''

  const numericValue = Number(value)

  if (Number.isNaN(numericValue)) return ''

  return numericValue.toFixed(2)
}

function handleUpdate(value: string) {
  localValue.value = value
  emit('update:modelValue', parseValue(value))
}

function handleFocus(event: FocusEvent) {
  focused.value = true
  localValue.value =
    props.modelValue === null || props.modelValue === undefined ? '' : String(props.modelValue)

  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  focused.value = false
  localValue.value = formatValue(props.modelValue)

  emit('blur', event)
}
</script>

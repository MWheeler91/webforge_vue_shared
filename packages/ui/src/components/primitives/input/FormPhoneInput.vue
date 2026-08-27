<template>
  <FormInput
    v-bind="$attrs"
    :model-value="displayValue"
    :id="id"
    :name="name"
    :label="label"
    type="tel"
    inputmode="numeric"
    :autocomplete="autocomplete"
    :placeholder="placeholder"
    :error="error"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :full-width="fullWidth"
    :variant="variant"
    :size="size"
    @update:model-value="handleInput"
    @input="handleNativeInput"
    @keydown="handleKeydown"
  />
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import FormInput from './FormInput.vue'
import type { InputSize, InputVariant } from './input.types.ts'
import { phoneDigits } from '../../../utils/formatPhone'

defineOptions({ inheritAttrs: false })

interface Props {
  modelValue?: string
  id?: string
  name?: string
  label?: string
  placeholder?: string
  autocomplete?: string
  error?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  fullWidth?: boolean
  variant?: InputVariant
  size?: InputSize
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  id: undefined,
  name: undefined,
  label: '',
  placeholder: '(123) 555-1234',
  autocomplete: 'tel',
  error: '',
  disabled: false,
  readonly: false,
  required: false,
  fullWidth: false,
  variant: 'default',
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const digits = ref(phoneDigits(props.modelValue))

watch(
  () => props.modelValue,
  (value) => {
    digits.value = phoneDigits(value)
  },
)

const displayValue = computed(() => {
  if (!digits.value) return ''

  const area = digits.value.slice(0, 3).padEnd(3, '_')
  const prefix = digits.value.slice(3, 6).padEnd(3, '_')
  const line = digits.value.slice(6, 10).padEnd(4, '_')

  return `(${area}) ${prefix}-${line}`
})

function handleInput(value: string) {
  digits.value = phoneDigits(value)
  emit('update:modelValue', digits.value)
}

function handleNativeInput(event: Event) {
  const input = event.target as HTMLInputElement
  const cursor = input.selectionStart ?? input.value.length
  const digitIndex = phoneDigits(input.value.slice(0, cursor)).length

  digits.value = phoneDigits(input.value)
  emit('update:modelValue', digits.value)
  input.value = displayValue.value

  nextTick(() => {
    input.value = displayValue.value
    setCaret(input, digitIndex)
  })
}

function handleKeydown(event: KeyboardEvent) {
  const input = event.target as HTMLInputElement
  const start = input.selectionStart ?? 0
  const end = input.selectionEnd ?? start
  const selectedDigits = phoneDigits(input.value.slice(start, end)).length

  if (event.key.length === 1 && !/^\d$/.test(event.key) && !event.ctrlKey && !event.metaKey) {
    event.preventDefault()
    return
  }

  if (/^\d$/.test(event.key) && digits.value.length - selectedDigits >= 10) {
    event.preventDefault()
    return
  }

  if (event.key !== 'Backspace' && event.key !== 'Delete') return

  event.preventDefault()
  const firstSelectedDigit = phoneDigits(input.value.slice(0, start)).length

  if (selectedDigits > 0) {
    digits.value =
      digits.value.slice(0, firstSelectedDigit) +
      digits.value.slice(firstSelectedDigit + selectedDigits)
  } else {
    digits.value = digits.value.slice(0, -1)
  }

  emit('update:modelValue', digits.value)

  nextTick(() => setCaret(input, selectedDigits > 0 ? firstSelectedDigit : digits.value.length))
}

function setCaret(input: HTMLInputElement, digitIndex: number) {
  const slots = [...displayValue.value].reduce<number[]>((positions, character, index) => {
    if (character === '_' || /\d/.test(character)) positions.push(index)
    return positions
  }, [])

  const position = digitIndex >= slots.length ? displayValue.value.length : (slots[digitIndex] ?? 0)
  input.setSelectionRange(position, position)
}
</script>

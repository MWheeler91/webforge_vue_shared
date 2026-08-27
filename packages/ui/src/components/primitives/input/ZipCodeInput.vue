<template>
  <BaseInput
    v-bind="inputAttrs"
    :id="id"
    :name="name"
    :model-value="displayValue"
    type="text"
    inputmode="numeric"
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
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
    @change="emit('change', $event)"
  >
    <template v-if="$slots.leading" #leading>
      <slot name="leading" />
    </template>

    <template v-if="$slots.trailing" #trailing>
      <slot name="trailing" />
    </template>
  </BaseInput>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import BaseInput from './BaseInput.vue'
import type { InputSize, InputVariant } from './input.types.ts'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  modelValue?: string
  id?: string
  name?: string
  variant?: InputVariant
  size?: InputSize
  placeholder?: string
  autocomplete?: string
  ariaInvalid?: boolean | 'true' | 'false' | 'grammar' | 'spelling'
  ariaDescribedby?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  fullWidth?: boolean
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  id: undefined,
  name: undefined,
  variant: 'default',
  size: 'md',
  placeholder: '12345',
  autocomplete: 'postal-code',
  ariaInvalid: undefined,
  ariaDescribedby: undefined,
  disabled: false,
  readonly: false,
  required: false,
  fullWidth: false,
  unstyled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  change: [event: Event]
}>()

const attrs = useAttrs()

const inputAttrs = computed(() => {
  const {
    class: _class,
    type: _type,
    value: _value,
    inputmode: _inputmode,
    autocomplete: _autocomplete,
    ...rest
  } = attrs

  return rest
})

const displayValue = computed(() => {
  return formatZip(props.modelValue)
})

function digitsOnly(value: string) {
  return value.replace(/\D/g, '').slice(0, 9)
}

function formatZip(value?: string) {
  const digits = digitsOnly(value ?? '')

  if (digits.length <= 5) {
    return digits
  }

  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}

function handleUpdate(value: string) {
  emit('update:modelValue', digitsOnly(value))
}
</script>

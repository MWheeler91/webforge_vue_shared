<template>
  <BaseInput
    v-bind="inputAttrs"
    :id="id"
    :name="name"
    :model-value="displayValue"
    type="number"
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
    :min="min"
    :max="max"
    :step="step"
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
  modelValue?: number | null
  id?: string
  name?: string
  variant?: InputVariant
  size?: InputSize
  placeholder?: string
  autocomplete?: string
  min?: number
  max?: number
  step?: number | string
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
  placeholder: '',
  autocomplete: 'off',
  min: undefined,
  max: undefined,
  step: undefined,
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

const inputAttrs = computed(() => {
  const {
    class: _class,
    type: _type,
    value: _value,
    inputmode: _inputmode,
    min: _min,
    max: _max,
    step: _step,
    ...rest
  } = attrs

  return rest
})

const displayValue = computed(() => {
  return props.modelValue ?? ''
})

function handleUpdate(value: string) {
  if (value === '') {
    emit('update:modelValue', null)
    return
  }

  const parsed = Number(value)

  emit('update:modelValue', Number.isNaN(parsed) ? null : parsed)
}
</script>

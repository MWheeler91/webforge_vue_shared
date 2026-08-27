<template>
  <BaseInput
    v-bind="inputAttrs"
    :id="id"
    :name="name"
    :model-value="modelValue"
    type="email"
    inputmode="email"
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
    @blur="handleBlur"
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
  normalizeOnBlur?: boolean
  lowercaseOnBlur?: boolean
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
  placeholder: 'you@example.com',
  autocomplete: 'email',
  normalizeOnBlur: true,
  lowercaseOnBlur: true,
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

function handleUpdate(value: string) {
  emit('update:modelValue', value)
}

function handleBlur(event: FocusEvent) {
  if (props.normalizeOnBlur) {
    let value = props.modelValue.trim()

    if (props.lowercaseOnBlur) {
      value = value.toLowerCase()
    }

    emit('update:modelValue', value)
  }

  emit('blur', event)
}
</script>

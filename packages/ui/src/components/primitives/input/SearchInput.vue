<template>
  <BaseInput
    v-bind="inputAttrs"
    :id="id"
    :name="name"
    :model-value="modelValue"
    type="search"
    inputmode="search"
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
    <template #leading>
      <slot name="leading">
        <span class="ui-input-icon" aria-hidden="true"> ⌕ </span>
      </slot>
    </template>

    <template #trailing>
      <slot name="trailing">
        <button
          v-if="clearable && modelValue"
          type="button"
          class="ui-input-action"
          :disabled="disabled || readonly"
          :aria-label="clearLabel"
          @click="clear"
        >
          ×
        </button>
      </slot>
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
  clearable?: boolean
  clearLabel?: string
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
  placeholder: 'Search...',
  autocomplete: 'off',
  clearable: true,
  clearLabel: 'Clear search',
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
  clear: []
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

function clear() {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

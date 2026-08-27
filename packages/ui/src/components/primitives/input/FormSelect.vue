<template>
  <div :class="fieldClasses">
    <label v-if="label" :for="resolvedId" class="ui-form-input__label">
      {{ label }}
      <span v-if="required" class="ui-form-input__required" aria-hidden="true">*</span>
    </label>

    <BaseSelect
      v-bind="controlAttrs"
      :id="resolvedId"
      :model-value="modelValue"
      :name="name"
      :options="options"
      :variant="error ? 'error' : variant"
      :size="size"
      :placeholder="placeholder"
      :placeholder-disabled="placeholderDisabled"
      :multiple="multiple"
      :aria-invalid="error ? 'true' : ariaInvalid"
      :aria-describedby="describedBy"
      :disabled="disabled"
      :required="required"
      :full-width="fullWidth"
      :unstyled="unstyled"
      @update:model-value="emit('update:modelValue', $event)"
      @change="emit('change', $event)"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    >
      <slot />
    </BaseSelect>

    <p v-if="error" :id="errorId" class="ui-form-input__error" role="alert">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'
import BaseSelect from './BaseSelect.vue'
import type { InputSize, InputVariant, SelectOption } from './input.types.ts'

defineOptions({ inheritAttrs: false })

interface Props {
  modelValue?: string | number | Array<string | number>
  id?: string
  name?: string
  label?: string
  options?: SelectOption[]
  variant?: InputVariant
  size?: InputSize
  placeholder?: string
  placeholderDisabled?: boolean
  multiple?: boolean
  ariaInvalid?: boolean | 'true' | 'false' | 'grammar' | 'spelling'
  ariaDescribedby?: string
  error?: string
  disabled?: boolean
  required?: boolean
  fullWidth?: boolean
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  id: undefined,
  name: undefined,
  label: '',
  options: () => [],
  variant: 'default',
  size: 'md',
  placeholder: '',
  placeholderDisabled: true,
  multiple: false,
  ariaInvalid: undefined,
  ariaDescribedby: undefined,
  error: '',
  disabled: false,
  required: false,
  fullWidth: false,
  unstyled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()
const generatedId = useId()
const resolvedId = computed(() => props.id ?? `form-select-${generatedId}`)
const errorId = computed(() => `${resolvedId.value}-error`)
const describedBy = computed(() => {
  return (
    [props.ariaDescribedby, props.error ? errorId.value : null].filter(Boolean).join(' ') ||
    undefined
  )
})

const controlAttrs = computed(() => {
  const { class: _class, ...nativeAttrs } = attrs
  return nativeAttrs
})

const fieldClasses = computed(() => [
  'ui-form-input',
  props.fullWidth && 'ui-form-input--full-width',
  attrs.class,
])
</script>

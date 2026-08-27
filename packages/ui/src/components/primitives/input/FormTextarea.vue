<template>
  <div :class="fieldClasses">
    <label v-if="label" :for="resolvedId" class="ui-form-input__label">
      {{ label }}
      <span v-if="required" class="ui-form-input__required" aria-hidden="true">*</span>
    </label>

    <BaseTextarea
      v-bind="controlAttrs"
      :id="resolvedId"
      :model-value="modelValue"
      :name="name"
      :variant="error ? 'error' : variant"
      :size="size"
      :placeholder="placeholder"
      :rows="rows"
      :maxlength="maxlength"
      :resize="resize"
      :aria-invalid="error ? 'true' : ariaInvalid"
      :aria-describedby="describedBy"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :full-width="fullWidth"
      :unstyled="unstyled"
      @update:model-value="emit('update:modelValue', $event)"
      @input="emit('input', $event)"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      @change="emit('change', $event)"
    />

    <p v-if="error" :id="errorId" class="ui-form-input__error" role="alert">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'
import BaseTextarea from './BaseTextarea.vue'
import type { InputSize, InputVariant, TextareaResize } from './input.types.ts'

defineOptions({ inheritAttrs: false })

interface Props {
  modelValue?: string
  id?: string
  name?: string
  label?: string
  variant?: InputVariant
  size?: InputSize
  placeholder?: string
  rows?: number
  maxlength?: number
  resize?: TextareaResize
  ariaInvalid?: boolean | 'true' | 'false' | 'grammar' | 'spelling'
  ariaDescribedby?: string
  error?: string
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
  label: '',
  variant: 'default',
  size: 'md',
  placeholder: '',
  rows: 4,
  maxlength: undefined,
  resize: 'vertical',
  ariaInvalid: undefined,
  ariaDescribedby: undefined,
  error: '',
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
const generatedId = useId()
const resolvedId = computed(() => props.id ?? `form-textarea-${generatedId}`)
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

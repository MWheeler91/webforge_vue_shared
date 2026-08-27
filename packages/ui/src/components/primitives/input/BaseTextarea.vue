<template>
  <textarea
    v-bind="textareaAttrs"
    :id="id"
    :name="name"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :rows="rows"
    :maxlength="maxlength"
    :aria-invalid="normalizedAriaInvalid"
    :aria-describedby="ariaDescribedby"
    :class="classes"
    @input="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import type {
  InputVariant,
  InputSize,
  TextareaResize,
} from './input.types'

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
  rows?: number
  maxlength?: number
  resize?: TextareaResize
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
  placeholder: '',
  rows: 4,
  maxlength: undefined,
  resize: 'vertical',
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
const uiConfig = useUiConfig()

const textareaAttrs = computed(() => {
  const {
    class: _class,
    id: _id,
    name: _name,
    value: _value,
    placeholder: _placeholder,
    disabled: _disabled,
    readonly: _readonly,
    required: _required,
    rows: _rows,
    maxlength: _maxlength,
    'aria-invalid': _ariaInvalid,
    'aria-describedby': _ariaDescribedby,
    ...rest
  } = attrs

  return rest
})

const normalizedAriaInvalid = computed(() => {
  if (props.ariaInvalid === undefined) return undefined
  if (props.ariaInvalid === false) return undefined
  if (props.ariaInvalid === true) return 'true'

  return props.ariaInvalid
})

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const classes = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn(
      'ui-textarea-unstyled',
      props.disabled && 'ui-textarea--disabled',
      props.readonly && 'ui-textarea--readonly',
      props.fullWidth && 'ui-textarea--full-width',
      externalClass,
    )
  }

  const input = uiConfig.input

  return cn(
    'ui-textarea',

    `ui-textarea--pack-${input.pack}`,
    `ui-textarea--radius-${input.radius}`,
    `ui-textarea--density-${input.density}`,

    `ui-textarea--variant-${props.variant}`,
    `ui-textarea--size-${props.size}`,
    `ui-textarea--resize-${props.resize}`,

    props.disabled && 'ui-textarea--disabled',
    props.readonly && 'ui-textarea--readonly',
    props.fullWidth && 'ui-textarea--full-width',

    externalClass,
  )
})

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement

  emit('update:modelValue', target.value)
  emit('input', event)
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
}

function handleChange(event: Event) {
  emit('change', event)
}
</script>
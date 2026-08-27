<template>
  <label :class="switchClasses">
    <span class="ui-switch__control-wrap">
      <input
        v-bind="switchAttrs"
        :id="id"
        :name="name"
        type="checkbox"
        role="switch"
        :checked="modelValue"
        :value="value"
        :disabled="disabled"
        :required="required"
        :aria-checked="modelValue ? 'true' : 'false'"
        :aria-invalid="normalizedAriaInvalid"
        :aria-describedby="ariaDescribedby"
        class="ui-switch__input"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <span class="ui-switch__track" aria-hidden="true">
        <span class="ui-switch__thumb" />
      </span>
    </span>

    <span v-if="$slots.default || label || description" class="ui-switch__content">
      <span class="ui-switch__label">
        <slot>{{ label }}</slot>
      </span>

      <span v-if="description" class="ui-switch__description">
        {{ description }}
      </span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import type { InputVariant, InputSize } from './input.types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  modelValue?: boolean
  id?: string
  name?: string
  value?: string | number | boolean
  label?: string
  description?: string
  variant?: InputVariant
  size?: InputSize
  ariaInvalid?: boolean | 'true' | 'false' | 'grammar' | 'spelling'
  ariaDescribedby?: string
  disabled?: boolean
  required?: boolean
  fullWidth?: boolean
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  id: undefined,
  name: undefined,
  value: undefined,
  label: '',
  description: '',
  variant: 'default',
  size: 'md',
  ariaInvalid: undefined,
  ariaDescribedby: undefined,
  disabled: false,
  required: false,
  fullWidth: false,
  unstyled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()
const uiConfig = useUiConfig()

const switchAttrs = computed(() => {
  const {
    class: _class,
    id: _id,
    name: _name,
    type: _type,
    role: _role,
    checked: _checked,
    value: _value,
    disabled: _disabled,
    required: _required,
    'aria-checked': _ariaChecked,
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

const switchClasses = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn(
      'ui-switch-unstyled',
      props.modelValue && 'ui-switch--checked',
      props.disabled && 'ui-switch--disabled',
      props.fullWidth && 'ui-switch--full-width',
      externalClass,
    )
  }

  const input = uiConfig.input

  return cn(
    'ui-switch',

    `ui-switch--pack-${input.pack}`,
    `ui-switch--radius-${input.radius}`,
    `ui-switch--density-${input.density}`,

    `ui-switch--variant-${props.variant}`,
    `ui-switch--size-${props.size}`,

    props.modelValue && 'ui-switch--checked',
    props.disabled && 'ui-switch--disabled',
    props.fullWidth && 'ui-switch--full-width',

    externalClass,
  )
})

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement

  emit('update:modelValue', target.checked)
  emit('change', event)
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
}
</script>

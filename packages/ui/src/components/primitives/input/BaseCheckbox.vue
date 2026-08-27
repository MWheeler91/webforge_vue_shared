<template>
  <label
    :class="wrapperClasses"
  >
    <span class="ui-checkbox__control-wrap">
      <input
        v-bind="checkboxAttrs"
        ref="inputRef"
        :id="id"
        :name="name"
        type="checkbox"
        :checked="modelValue"
        :value="value"
        :disabled="disabled"
        :required="required"
        :aria-invalid="normalizedAriaInvalid"
        :aria-describedby="ariaDescribedby"
        :class="inputClasses"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <span
        class="ui-checkbox__control"
        aria-hidden="true"
      >
        <span class="ui-checkbox__check">
          <slot name="checkmark">
            ✓
          </slot>
        </span>

        <span class="ui-checkbox__indeterminate">
          <slot name="indeterminate">
            —
          </slot>
        </span>
      </span>
    </span>

    <span
      v-if="$slots.default || label"
      class="ui-checkbox__content"
    >
      <span class="ui-checkbox__label">
        <slot>{{ label }}</slot>
      </span>

      <span
        v-if="description"
        class="ui-checkbox__description"
      >
        {{ description }}
      </span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, watch } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import type {
  InputVariant,
  InputSize,
} from './input.types'

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
  indeterminate?: boolean
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
  indeterminate: false,
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
const inputRef = ref<HTMLInputElement | null>(null)

const checkboxAttrs = computed(() => {
  const {
    class: _class,
    id: _id,
    name: _name,
    type: _type,
    checked: _checked,
    value: _value,
    disabled: _disabled,
    required: _required,
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

const wrapperClasses = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn(
      'ui-checkbox-unstyled',
      props.disabled && 'ui-checkbox--disabled',
      props.fullWidth && 'ui-checkbox--full-width',
      externalClass,
    )
  }

  const input = uiConfig.input

  return cn(
    'ui-checkbox',

    `ui-checkbox--pack-${input.pack}`,
    `ui-checkbox--radius-${input.radius}`,
    `ui-checkbox--density-${input.density}`,

    `ui-checkbox--variant-${props.variant}`,
    `ui-checkbox--size-${props.size}`,

    props.indeterminate && 'ui-checkbox--indeterminate',
    props.modelValue && 'ui-checkbox--checked',
    props.disabled && 'ui-checkbox--disabled',
    props.fullWidth && 'ui-checkbox--full-width',

    externalClass,
  )
})

const inputClasses = computed(() => {
  return cn(
    'ui-checkbox__input',
  )
})

function syncIndeterminate() {
  if (inputRef.value) {
    inputRef.value.indeterminate = props.indeterminate
  }
}

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

onMounted(syncIndeterminate)

watch(
  () => props.indeterminate,
  syncIndeterminate,
)
</script>
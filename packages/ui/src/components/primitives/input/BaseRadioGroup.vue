<template>
  <fieldset
    :id="id"
    :class="groupClasses"
    :aria-invalid="normalizedAriaInvalid"
    :aria-describedby="ariaDescribedby"
    :disabled="disabled"
  >
    <legend
      v-if="label"
      class="ui-radio-group__legend"
    >
      {{ label }}
      <span
        v-if="required"
        class="ui-radio-group__required"
        aria-hidden="true"
      >
        *
      </span>
    </legend>

    <p
      v-if="description"
      class="ui-radio-group__description"
    >
      {{ description }}
    </p>

    <div class="ui-radio-group__items">
      <slot />
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { computed, provide, useAttrs } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import type {
  InputVariant,
  InputSize,
  RadioGroupOrientation,
  RadioValue,
} from './input.types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  modelValue?: RadioValue
  id?: string
  name?: string
  label?: string
  description?: string
  variant?: InputVariant
  size?: InputSize
  orientation?: RadioGroupOrientation
  ariaInvalid?: boolean | 'true' | 'false' | 'grammar' | 'spelling'
  ariaDescribedby?: string
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
  description: '',
  variant: 'default',
  size: 'md',
  orientation: 'vertical',
  ariaInvalid: undefined,
  ariaDescribedby: undefined,
  disabled: false,
  required: false,
  fullWidth: false,
  unstyled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: RadioValue]
  change: [value: RadioValue]
}>()

const attrs = useAttrs()
const uiConfig = useUiConfig()

const normalizedAriaInvalid = computed(() => {
  if (props.ariaInvalid === undefined) return undefined
  if (props.ariaInvalid === false) return undefined
  if (props.ariaInvalid === true) return 'true'

  return props.ariaInvalid
})

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const groupClasses = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn(
      'ui-radio-group-unstyled',
      props.disabled && 'ui-radio-group--disabled',
      props.fullWidth && 'ui-radio-group--full-width',
      externalClass,
    )
  }

  const input = uiConfig.input

  return cn(
    'ui-radio-group',

    `ui-radio-group--pack-${input.pack}`,
    `ui-radio-group--radius-${input.radius}`,
    `ui-radio-group--density-${input.density}`,

    `ui-radio-group--variant-${props.variant}`,
    `ui-radio-group--size-${props.size}`,
    `ui-radio-group--orientation-${props.orientation}`,

    props.disabled && 'ui-radio-group--disabled',
    props.required && 'ui-radio-group--required',
    props.fullWidth && 'ui-radio-group--full-width',

    externalClass,
  )
})

function updateValue(value: RadioValue) {
  if (props.disabled) return

  emit('update:modelValue', value)
  emit('change', value)
}

provide('uiRadioGroup', {
  modelValue: computed(() => props.modelValue),
  name: computed(() => props.name),
  variant: computed(() => props.variant),
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
  required: computed(() => props.required),
  unstyled: computed(() => props.unstyled),
  updateValue,
})
</script>
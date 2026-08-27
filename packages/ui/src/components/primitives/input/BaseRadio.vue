<template>
  <label :class="radioClasses">
    <span class="ui-radio__control-wrap">
      <input
        v-bind="radioAttrs"
        :id="id"
        :name="resolvedName"
        type="radio"
        :value="value"
        :checked="checked"
        :disabled="resolvedDisabled"
        :required="resolvedRequired"
        :aria-invalid="normalizedAriaInvalid"
        :aria-describedby="ariaDescribedby"
        class="ui-radio__input"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <span
        class="ui-radio__control"
        aria-hidden="true"
      >
        <span class="ui-radio__dot" />
      </span>
    </span>

    <span
      v-if="$slots.default || label || description"
      class="ui-radio__content"
    >
      <span class="ui-radio__label">
        <slot>{{ label }}</slot>
      </span>

      <span
        v-if="description"
        class="ui-radio__description"
      >
        {{ description }}
      </span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import type {
  InputVariant,
  InputSize,
  RadioValue,
} from './input.types'

defineOptions({
  inheritAttrs: false,
})

interface RadioGroupContext {
  modelValue: { value: RadioValue }
  name: { value?: string }
  variant: { value: InputVariant }
  size: { value: InputSize }
  disabled: { value: boolean }
  required: { value: boolean }
  unstyled: { value: boolean }
  updateValue: (value: RadioValue) => void
}

interface Props {
  modelValue?: RadioValue
  id?: string
  name?: string
  value: RadioValue
  label?: string
  description?: string
  variant?: InputVariant
  size?: InputSize
  ariaInvalid?: boolean | 'true' | 'false' | 'grammar' | 'spelling'
  ariaDescribedby?: string
  disabled?: boolean
  required?: boolean
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  id: undefined,
  name: undefined,
  label: '',
  description: '',
  variant: undefined,
  size: undefined,
  ariaInvalid: undefined,
  ariaDescribedby: undefined,
  disabled: false,
  required: false,
  unstyled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: RadioValue]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()
const uiConfig = useUiConfig()

const group = inject<RadioGroupContext | null>('uiRadioGroup', null)

const resolvedModelValue = computed(() => {
  return group ? group.modelValue.value : props.modelValue
})

const resolvedName = computed(() => {
  return props.name ?? group?.name.value
})

const resolvedVariant = computed(() => {
  return props.variant ?? group?.variant.value ?? 'default'
})

const resolvedSize = computed(() => {
  return props.size ?? group?.size.value ?? 'md'
})

const resolvedDisabled = computed(() => {
  return props.disabled || group?.disabled.value || false
})

const resolvedRequired = computed(() => {
  return props.required || group?.required.value || false
})

const resolvedUnstyled = computed(() => {
  return props.unstyled || group?.unstyled.value || false
})

const checked = computed(() => {
  return resolvedModelValue.value === props.value
})

const radioAttrs = computed(() => {
  const {
    class: _class,
    id: _id,
    name: _name,
    type: _type,
    value: _value,
    checked: _checked,
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

const radioClasses = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (resolvedUnstyled.value) {
    return cn(
      'ui-radio-unstyled',
      checked.value && 'ui-radio--checked',
      resolvedDisabled.value && 'ui-radio--disabled',
      externalClass,
    )
  }

  const input = uiConfig.input

  return cn(
    'ui-radio',

    `ui-radio--pack-${input.pack}`,
    `ui-radio--radius-${input.radius}`,
    `ui-radio--density-${input.density}`,

    `ui-radio--variant-${resolvedVariant.value}`,
    `ui-radio--size-${resolvedSize.value}`,

    checked.value && 'ui-radio--checked',
    resolvedDisabled.value && 'ui-radio--disabled',

    externalClass,
  )
})

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement

  if (!target.checked) return

  if (group) {
    group.updateValue(props.value)
  } else {
    emit('update:modelValue', props.value)
  }

  emit('change', event)
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
}
</script>
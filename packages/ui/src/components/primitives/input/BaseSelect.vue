<template>
  <div
    v-if="hasChrome"
    :class="shellClasses"
  >
    <span
      v-if="$slots.leading"
      class="ui-select__leading"
    >
      <slot name="leading" />
    </span>

    <select
      v-bind="selectAttrs"
      :id="id"
      :name="name"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :multiple="multiple"
      :aria-invalid="normalizedAriaInvalid"
      :aria-describedby="ariaDescribedby"
      :class="selectClasses"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <option
        v-if="placeholder"
        value=""
        :disabled="placeholderDisabled"
      >
        {{ placeholder }}
      </option>

      <slot>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </slot>
    </select>

    <span
      v-if="$slots.trailing"
      class="ui-select__trailing"
    >
      <slot name="trailing" />
    </span>
  </div>

  <select
    v-else
    v-bind="selectAttrs"
    :id="id"
    :name="name"
    :value="modelValue"
    :disabled="disabled"
    :required="required"
    :multiple="multiple"
    :aria-invalid="normalizedAriaInvalid"
    :aria-describedby="ariaDescribedby"
    :class="selectClasses"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <option
      v-if="placeholder"
      value=""
      :disabled="placeholderDisabled"
    >
      {{ placeholder }}
    </option>

    <slot>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </slot>
  </select>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import type {
  InputVariant,
  InputSize,
  SelectOption,
} from './input.types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  modelValue?: string | number | Array<string | number>
  id?: string
  name?: string
  options?: SelectOption[]
  variant?: InputVariant
  size?: InputSize
  placeholder?: string
  placeholderDisabled?: boolean
  multiple?: boolean
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
  options: () => [],
  variant: 'default',
  size: 'md',
  placeholder: '',
  placeholderDisabled: true,
  multiple: false,
  ariaInvalid: undefined,
  ariaDescribedby: undefined,
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
const slots = useSlots()
const uiConfig = useUiConfig()

const hasChrome = computed(() => {
  return !!slots.leading || !!slots.trailing
})

const selectAttrs = computed(() => {
  const {
    class: _class,
    id: _id,
    name: _name,
    value: _value,
    disabled: _disabled,
    required: _required,
    multiple: _multiple,
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

const shellClasses = computed(() => {
  const input = uiConfig.input

  if (props.unstyled) {
    return cn(
      'ui-select-shell-unstyled',
      props.disabled && 'ui-select-shell--disabled',
      props.fullWidth && 'ui-select-shell--full-width',
    )
  }

  return cn(
    'ui-select-shell',

    `ui-select-shell--pack-${input.pack}`,
    `ui-select-shell--radius-${input.radius}`,
    `ui-select-shell--density-${input.density}`,

    `ui-select-shell--variant-${props.variant}`,
    `ui-select-shell--size-${props.size}`,

    props.disabled && 'ui-select-shell--disabled',
    props.fullWidth && 'ui-select-shell--full-width',
  )
})

const selectClasses = computed(() => {
  const externalClass = attrs.class as string | undefined
  const input = uiConfig.input

  if (props.unstyled) {
    return cn(
      'ui-select-unstyled',
      hasChrome.value && 'ui-select--in-shell',
      props.disabled && 'ui-select--disabled',
      props.fullWidth && 'ui-select--full-width',
      externalClass,
    )
  }

  return cn(
    'ui-select',

    !hasChrome.value && `ui-select--pack-${input.pack}`,
    !hasChrome.value && `ui-select--radius-${input.radius}`,
    !hasChrome.value && `ui-select--density-${input.density}`,

    `ui-select--variant-${props.variant}`,
    `ui-select--size-${props.size}`,

    hasChrome.value && 'ui-select--in-shell',

    props.multiple && 'ui-select--multiple',
    props.disabled && 'ui-select--disabled',
    props.fullWidth && 'ui-select--full-width',

    externalClass,
  )
})

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement

  if (props.multiple) {
    const values = Array.from(target.selectedOptions).map((option) => option.value)

    emit('update:modelValue', values)
  } else {
    emit('update:modelValue', target.value)
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
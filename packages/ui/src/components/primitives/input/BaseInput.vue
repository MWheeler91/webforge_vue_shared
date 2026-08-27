<template>
  <!-- Shell mode: used when leading/trailing slots exist -->
  <div
    v-if="hasShell"
    :class="shellClasses"
  >
    <span
      v-if="hasLeading"
      class="ui-input__leading"
    >
      <slot name="leading" />
    </span>

    <input
      v-bind="inputAttrs"
      :id="id"
      :name="name"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :aria-invalid="ariaInvalid"
      :aria-describedby="ariaDescribedby"
      :class="inputClasses"
      @input="handleInput"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      @change="emit('change', $event)"
    />

    <span
      v-if="hasTrailing"
      class="ui-input__trailing"
    >
      <slot name="trailing" />
    </span>
  </div>

  <!-- Normal mode: plain input -->
  <input
    v-else
    v-bind="inputAttrs"
    :id="id"
    :name="name"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :aria-invalid="ariaInvalid"
    :aria-describedby="ariaDescribedby"
    :class="inputClasses"
    @input="handleInput"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
    @change="emit('change', $event)"
  />
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import type { InputVariant, InputSize, InputType } from './input.types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  modelValue?: string | number
  id?: string
  name?: string
  type?: InputType
  variant?: InputVariant
  size?: InputSize
  placeholder?: string
  autocomplete?: string
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
  type: 'text',
  variant: 'default',
  size: 'md',
  placeholder: '',
  autocomplete: undefined,
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
const slots = useSlots()
const uiConfig = useUiConfig()

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const hasLeading = computed(() => Boolean(slots.leading))
const hasTrailing = computed(() => Boolean(slots.trailing))
const hasShell = computed(() => hasLeading.value || hasTrailing.value)

const inputAttrs = computed(() => {
  const {
    class: _class,
    type: _type,
    value: _value,
    ...rest
  } = attrs

  return rest
})

const externalClass = computed(() => attrs.class as string | undefined)

const inputClasses = computed(() => {
  const input = uiConfig.input

  if (props.unstyled) {
    return cn(
      'ui-input-unstyled',
      props.fullWidth && 'ui-input--full-width',
      props.disabled && 'ui-input--disabled',
      externalClass.value,
    )
  }

  /*
    Shell mode:
    The shell owns the visual box.
    The inner input only owns text/input behavior and sizing.
  */
  if (hasShell.value) {
    return cn(
      'ui-input',
      'ui-input--in-shell',
      `ui-input--size-${props.size}`,

      props.disabled && 'ui-input--disabled',
      props.readonly && 'ui-input--readonly',
    )
  }

  /*
    Normal mode:
    The input itself owns the visual box.
    Pack CSS owns border/shadow/glow/motion/focus behavior.
  */
  return cn(
    'ui-input',

    `ui-input--pack-${input.pack}`,
    `ui-input--radius-${input.radius}`,
    `ui-input--density-${input.density}`,

    `ui-input--variant-${props.variant}`,
    `ui-input--size-${props.size}`,

    props.fullWidth && 'ui-input--full-width',
    props.disabled && 'ui-input--disabled',
    props.readonly && 'ui-input--readonly',

    externalClass.value,
  )
})

const shellClasses = computed(() => {
  const input = uiConfig.input

  if (props.unstyled) {
    return cn(
      'ui-input-shell-unstyled',
      props.fullWidth && 'ui-input-shell--full-width',
      props.disabled && 'ui-input-shell--disabled',
      externalClass.value,
    )
  }

  return cn(
    'ui-input-shell',

    `ui-input-shell--pack-${input.pack}`,
    `ui-input-shell--radius-${input.radius}`,
    `ui-input-shell--density-${input.density}`,

    `ui-input-shell--variant-${props.variant}`,
    `ui-input-shell--size-${props.size}`,

    props.fullWidth && 'ui-input-shell--full-width',
    props.disabled && 'ui-input-shell--disabled',
    props.readonly && 'ui-input-shell--readonly',

    externalClass.value,
  )
})

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement

  emit('update:modelValue', target.value)
  emit('input', event)
}
</script>
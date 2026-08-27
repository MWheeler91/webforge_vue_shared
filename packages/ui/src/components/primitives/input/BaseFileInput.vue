<template>
  <label :class="wrapperClasses">
    <input
      v-bind="fileAttrs"
      :id="id"
      :name="name"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      :required="required"
      :aria-invalid="normalizedAriaInvalid"
      :aria-describedby="ariaDescribedby"
      class="ui-file-input__native"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <span class="ui-file-input__control">
      <span
        v-if="$slots.leading"
        class="ui-file-input__leading"
      >
        <slot name="leading" />
      </span>

      <span class="ui-file-input__text">
        <span class="ui-file-input__label">
          {{ buttonText }}
        </span>

        <span
          v-if="displayText"
          class="ui-file-input__filename"
        >
          {{ displayText }}
        </span>
      </span>

      <span
        v-if="$slots.trailing"
        class="ui-file-input__trailing"
      >
        <slot name="trailing" />
      </span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import type {
  InputVariant,
  InputSize,
} from './input.types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  id?: string
  name?: string
  accept?: string
  multiple?: boolean
  variant?: InputVariant
  size?: InputSize
  buttonText?: string
  placeholder?: string
  ariaInvalid?: boolean | 'true' | 'false' | 'grammar' | 'spelling'
  ariaDescribedby?: string
  disabled?: boolean
  required?: boolean
  fullWidth?: boolean
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  name: undefined,
  accept: undefined,
  multiple: false,
  variant: 'default',
  size: 'md',
  buttonText: 'Choose file',
  placeholder: 'No file selected',
  ariaInvalid: undefined,
  ariaDescribedby: undefined,
  disabled: false,
  required: false,
  fullWidth: false,
  unstyled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: File | File[] | null]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()
const uiConfig = useUiConfig()

const selectedFiles = ref<File[]>([])

const fileAttrs = computed(() => {
  const {
    class: _class,
    id: _id,
    name: _name,
    type: _type,
    accept: _accept,
    multiple: _multiple,
    disabled: _disabled,
    required: _required,
    value: _value,
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

const displayText = computed(() => {
  if (!selectedFiles.value.length) {
    return props.placeholder
  }

  if (selectedFiles.value.length === 1) {
    return selectedFiles.value[0]?.name ?? props.placeholder
  }

  return `${selectedFiles.value.length} files selected`
})

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const wrapperClasses = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn(
      'ui-file-input-unstyled',
      props.disabled && 'ui-file-input--disabled',
      props.fullWidth && 'ui-file-input--full-width',
      externalClass,
    )
  }

  const input = uiConfig.input

  return cn(
    'ui-file-input',

    `ui-file-input--pack-${input.pack}`,
    `ui-file-input--radius-${input.radius}`,
    `ui-file-input--density-${input.density}`,

    `ui-file-input--variant-${props.variant}`,
    `ui-file-input--size-${props.size}`,

    props.disabled && 'ui-file-input--disabled',
    props.fullWidth && 'ui-file-input--full-width',

    externalClass,
  )
})

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files ?? [])

  selectedFiles.value = files

  if (props.multiple) {
    emit('update:modelValue', files)
  } else {
    emit('update:modelValue', files[0] ?? null)
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
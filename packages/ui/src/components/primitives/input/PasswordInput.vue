<template>
  <BaseInput
    v-bind="inputAttrs"
    :id="id"
    :name="name"
    :model-value="modelValue"
    :type="visible ? 'text' : 'password'"
    :variant="variant"
    :size="size"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :aria-invalid="ariaInvalid"
    :aria-describedby="ariaDescribedby"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :full-width="fullWidth"
    :unstyled="unstyled"
    @update:model-value="handleUpdate"
    @input="emit('input', $event)"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
    @change="emit('change', $event)"
  >
    <template v-if="$slots.leading" #leading>
      <slot name="leading" />
    </template>

    <template #trailing>
      <slot name="trailing">
        <button
          type="button"
          class="ui-input-action"
          :disabled="disabled || readonly"
          :aria-label="visible ? hideLabel : showLabel"
          @click="toggleVisible"
        >
          {{ visible ? hideLabel : showLabel }}
        </button>
      </slot>
    </template>
  </BaseInput>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import BaseInput from './BaseInput.vue'
import type { InputSize, InputVariant } from './input.types.ts'

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
  autocomplete?: 'current-password' | 'new-password' | 'off'
  ariaInvalid?: boolean | 'true' | 'false' | 'grammar' | 'spelling'
  ariaDescribedby?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  fullWidth?: boolean
  unstyled?: boolean
  showLabel?: string
  hideLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  id: undefined,
  name: undefined,
  variant: 'default',
  size: 'md',
  placeholder: '',
  autocomplete: 'current-password',
  ariaInvalid: undefined,
  ariaDescribedby: undefined,
  disabled: false,
  readonly: false,
  required: false,
  fullWidth: false,
  unstyled: false,
  showLabel: 'Show',
  hideLabel: 'Hide',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  change: [event: Event]
}>()

const attrs = useAttrs()
const visible = ref(false)

const inputAttrs = computed(() => {
  const { class: _class, type: _type, value: _value, ...rest } = attrs

  return rest
})

function toggleVisible() {
  visible.value = !visible.value
}

function handleUpdate(value: string) {
  emit('update:modelValue', value)
}
</script>

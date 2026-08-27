<template>
  <div v-bind="toastAttrs" :class="classes" role="status" aria-live="polite">
    <div v-if="resolvedIcon" class="ui-toast__icon" aria-hidden="true">
      <slot name="icon">
        {{ resolvedIcon }}
      </slot>
    </div>

    <div class="ui-toast__content">
      <div v-if="title" class="ui-toast__title">
        {{ title }}
      </div>

      <div v-if="message" class="ui-toast__message">
        {{ message }}
      </div>

      <slot />
    </div>

    <button
      v-if="dismissible"
      type="button"
      class="ui-toast__dismiss"
      aria-label="Dismiss notification"
      @click="emit('dismiss')"
    >
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import type { ToastPack, ToastVariant } from './toast.types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  pack?: ToastPack | null
  variant?: ToastVariant
  title?: string
  message?: string
  dismissible?: boolean
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pack: undefined,
  variant: 'default',
  title: '',
  message: '',
  dismissible: true,
  unstyled: false,
})

const emit = defineEmits<{
  dismiss: []
}>()

const attrs = useAttrs()
const uiConfig = useUiConfig()

const toastAttrs = computed(() => {
  const { class: _class, ...rest } = attrs

  return rest
})

const resolvedPack = computed(() => {
  return props.pack ?? uiConfig.toast?.pack ?? uiConfig.global.pack
})

const resolvedIcon = computed(() => {
  switch (props.variant) {
    case 'info':
      return 'i'
    case 'success':
      return '✓'
    case 'warning':
      return '!'
    case 'error':
      return '!'
    default:
      return ''
  }
})

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const classes = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn('ui-toast-unstyled', externalClass)
  }

  return cn(
    'ui-toast',
    `ui-toast--pack-${resolvedPack.value}`,
    `ui-toast--variant-${props.variant}`,
    externalClass,
  )
})
</script>

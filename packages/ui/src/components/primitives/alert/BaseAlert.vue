<template>
  <div
    class="ui-alert"
    :class="[`ui-alert--${variant}`, `ui-alert--pack-${uiConfig.global.pack}`]"
    :role="variant === 'error' ? 'alert' : 'status'"
    :aria-live="variant === 'error' ? 'assertive' : 'polite'"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">
import { useUiConfig } from '../../../config/ui.runtime'
import type { AlertVariant } from './alert.types'
withDefaults(defineProps<{ variant?: AlertVariant }>(), { variant: 'info' })
const uiConfig = useUiConfig()
</script>

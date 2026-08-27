<template>
  <Teleport to="body">
    <div :class="classes">
      <TransitionGroup name="ui-toast">
        <BaseToast
          v-for="toast in toasts"
          :key="toast.id"
          :variant="toast.variant"
          :title="toast.title"
          :message="toast.message"
          :dismissible="toast.dismissible"
          @dismiss="remove(toast.id)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import BaseToast from './BaseToast.vue'
import { useToast } from './toast.runtime.ts'
import type { ToastPosition } from './toast.types.ts'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  position?: ToastPosition
  maxWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
  maxWidth: '24rem',
})

const attrs = useAttrs()
const { toasts, remove } = useToast()

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const classes = computed(() => {
  const externalClass = attrs.class as string | undefined

  return cn('ui-toast-viewport', `ui-toast-viewport--${props.position}`, externalClass)
})
</script>

<style scoped>
.ui-toast-viewport {
  --toast-max-width: v-bind(maxWidth);
}
</style>

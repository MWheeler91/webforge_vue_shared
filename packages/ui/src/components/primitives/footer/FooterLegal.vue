<template>
  <div v-bind="legalAttrs" :class="classes">
    <slot>{{ text }}</slot>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  text?: string
  align?: 'start' | 'center' | 'end'
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  align: 'start',
  unstyled: false,
})

const attrs = useAttrs()

const legalAttrs = computed(() => {
  const { class: _class, ...rest } = attrs

  return rest
})

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const classes = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn('ui-footer-legal-unstyled', externalClass)
  }

  return cn('ui-footer-legal', `ui-footer-legal--align-${props.align}`, externalClass)
})
</script>

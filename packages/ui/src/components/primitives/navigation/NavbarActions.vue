<template>
  <component :is="as" v-bind="actionsAttrs" :class="classes">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  as?: string
  align?: 'start' | 'center' | 'end'
  gap?: 'sm' | 'md' | 'lg'
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  align: 'end',
  gap: 'sm',
  unstyled: false,
})

const attrs = useAttrs()

const actionsAttrs = computed(() => {
  const { class: _class, ...rest } = attrs

  return rest
})

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const classes = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn('ui-navbar-actions-unstyled', externalClass)
  }

  return cn(
    'ui-navbar-actions',
    `ui-navbar-actions--align-${props.align}`,
    `ui-navbar-actions--gap-${props.gap}`,
    externalClass,
  )
})
</script>

<template>
  <component :is="as" v-bind="navAttrs" :class="classes">
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
  orientation?: 'horizontal' | 'vertical'
  gap?: 'sm' | 'md' | 'lg'
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  orientation: 'horizontal',
  gap: 'md',
  unstyled: false,
})

const attrs = useAttrs()

const navAttrs = computed(() => {
  const { class: _class, ...rest } = attrs

  return rest
})

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const classes = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn('ui-navbar-nav-unstyled', externalClass)
  }

  return cn(
    'ui-navbar-nav',
    `ui-navbar-nav--${props.orientation}`,
    `ui-navbar-nav--gap-${props.gap}`,
    externalClass,
  )
})
</script>

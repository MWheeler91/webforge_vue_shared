<template>
  <component :is="as" v-bind="containerAttrs" :class="classes">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { ContainerWidth, ContainerPadding } from './container.types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  as?: string
  width?: ContainerWidth
  padding?: ContainerPadding
  center?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  width: 'xl',
  padding: 'md',
  center: true,
  fullWidth: false,
  fullHeight: false,
  unstyled: false,
})

const attrs = useAttrs()

const containerAttrs = computed(() => {
  const rest = { ...attrs }
  delete rest.class

  return rest
})

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const classes = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn(
      'ui-container-unstyled',
      props.fullWidth && 'ui-container--full-width',
      props.fullHeight && 'ui-container--full-height',
      externalClass,
    )
  }

  return cn(
    'ui-container',

    `ui-container--width-${props.width}`,
    `ui-container--padding-${props.padding}`,

    props.center && 'ui-container--center',
    props.fullWidth && 'ui-container--full-width',
    props.fullHeight && 'ui-container--full-height',

    externalClass,
  )
})
</script>

<template>
  <!-- Structural card only. Whole-card navigation belongs in CardLink. -->
  <component :is="as" v-bind="cardAttrs" :class="classes">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { cn } from '../../../utils/classNames.ts'
import { computed, useAttrs } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import type { BaseCardProps } from './card.types'

defineOptions({
  // Fallthrough attrs are applied manually so class can be merged cleanly.
  inheritAttrs: false,
})

const props = withDefaults(defineProps<BaseCardProps>(), {
  as: 'article',
  variant: 'surface',
  padding: 'md',
  interactive: false,
  unstyled: false,
})

const attrs = useAttrs()
const uiConfig = useUiConfig()


// External class is merged into the computed class string.
const externalClass = computed(() => attrs.class as string | undefined)

// Copy fallthrough attrs, but remove class because classes are merged below.
const cardAttrs = computed(() => {
  const copiedAttrs = { ...attrs }

  delete copiedAttrs.class

  return copiedAttrs
})

const classes = computed(() => {
  if (props.unstyled) {
    return cn('ui-card-unstyled', props.interactive && 'ui-card--interactive', externalClass.value)
  }

  const card = uiConfig.card

  return cn(
    'ui-card',

    // Runtime UI config.
    `ui-card--pack-${card.pack}`,
    `ui-card--radius-${card.radius}`,
    `ui-card--density-${card.density}`,
    card.motion && `ui-card--motion-${card.motion}`,

    // Component props.
    `ui-card--variant-${props.variant}`,
    `ui-card--padding-${props.padding}`,

    // Visual-only affordance.
    props.interactive && 'ui-card--interactive',

    externalClass.value,
  )
})
</script>

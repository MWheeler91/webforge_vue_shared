<template>
  <span
    v-bind="badgeAttrs"
    :class="classes"
  >
    <span
      v-if="leading === 'dot'"
      class="ui-badge__dot"
      aria-hidden="true"
    />

    <span class="ui-badge__content">
      <slot />
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import type {
  BadgeVariant,
  BadgeTone,
  BadgeSize,
  BadgeLeading,
} from './badge.types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  variant?: BadgeVariant
  tone?: BadgeTone
  size?: BadgeSize
  leading?: BadgeLeading
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'brand',
  tone: 'soft',
  size: 'md',
  leading: 'none',
  unstyled: false,
})

const attrs = useAttrs()
const uiConfig = useUiConfig()

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const badgeAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

const classes = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn(
      'ui-badge-unstyled',
      externalClass,
    )
  }

  const badge = uiConfig.badge

  return cn(
    'ui-badge',

    `ui-badge--pack-${badge.pack}`,
    `ui-badge--radius-${badge.radius}`,
    `ui-badge--density-${badge.density}`,

    `ui-badge--variant-${props.variant}`,
    `ui-badge--tone-${props.tone}`,
    `ui-badge--size-${props.size}`,

    props.leading === 'dot' && 'ui-badge--leading-dot',

    externalClass,
  )
})
</script>
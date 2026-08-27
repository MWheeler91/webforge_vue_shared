<template>
  <!-- Whole-card navigation. Do not place buttons/links inside this component. -->
  <component :is="componentTag" v-bind="resolvedAttrs" :class="classes" @click="handleClick">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, resolveComponent, useAttrs } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import type { BaseCardLinkProps, CardLinkAs } from './card.types'

defineOptions({
  // Fallthrough attrs are applied manually so class can be merged cleanly.
  inheritAttrs: false,
})

const props = withDefaults(defineProps<BaseCardLinkProps>(), {
  as: 'a',
  variant: 'surface',
  padding: 'md',
  disabled: false,
  unstyled: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const attrs = useAttrs()
const uiConfig = useUiConfig()

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

// Allow `to` to infer RouterLink when as is left as the default.
const resolvedAs = computed<CardLinkAs>(() => {
  if (props.as !== 'a') {
    return props.as
  }

  if (props.to) {
    return 'router-link'
  }

  return 'a'
})

const isAnchor = computed(() => resolvedAs.value === 'a')
const isRouterLink = computed(() => resolvedAs.value === 'router-link')

const componentTag = computed(() => {
  if (isRouterLink.value) {
    return resolveComponent('RouterLink')
  }

  return 'a'
})

// Apply safe defaults for new-tab links.
const resolvedRel = computed(() => {
  if (props.rel) {
    return props.rel
  }

  if (props.target === '_blank') {
    return 'noopener noreferrer'
  }

  return undefined
})

// External class is merged into the computed class string.
const externalClass = computed(() => attrs.class as string | undefined)

// Copy fallthrough attrs, but remove class because classes are merged below.
const baseAttrs = computed(() => {
  const copiedAttrs = { ...attrs }

  delete copiedAttrs.class

  return copiedAttrs
})

const resolvedAttrs = computed(() => {
  if (isAnchor.value) {
    return {
      ...baseAttrs.value,
      href: props.disabled ? undefined : props.href,
      target: props.target,
      rel: resolvedRel.value,
      'aria-disabled': props.disabled ? 'true' : undefined,
      tabindex: props.disabled ? -1 : undefined,
    }
  }

  return {
    ...baseAttrs.value,
    to: props.to,
    'aria-disabled': props.disabled ? 'true' : undefined,
    tabindex: props.disabled ? -1 : undefined,
  }
})

const classes = computed(() => {
  if (props.unstyled) {
    return cn(
      'ui-card-unstyled',
      'ui-card--link',
      'ui-card--interactive',
      props.disabled && 'ui-card--disabled',
      externalClass.value,
    )
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

    // Link card state.
    'ui-card--link',
    'ui-card--interactive',
    props.disabled && 'ui-card--disabled',

    externalClass.value,
  )
})

// Disabled links need explicit navigation blocking.
function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  emit('click', event)
}
</script>

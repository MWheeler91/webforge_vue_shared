<template>
  <!-- Dynamic root: button, anchor, or RouterLink -->
  <component
    :is="componentTag"
    v-bind="resolvedAttrs"
    :class="classes"
    :aria-busy="loading ? 'true' : undefined"
    @click="handleClick"
  >
    <!-- Decorative loading spinner -->
    <span v-if="loading" class="ui-btn__spinner" aria-hidden="true">
      <svg class="ui-btn__spinner-icon" viewBox="0 0 24 24" fill="none">
        <circle
          class="ui-btn__spinner-track"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="ui-btn__spinner-fill"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
    </span>

    <!-- Keep content in place while loading so button width does not shift -->
    <span :class="{ 'ui-btn__content--loading': loading }">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, resolveComponent, useAttrs } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import type {
  ButtonVariant,
  ButtonSize,
  ButtonWidth,
  ButtonHtmlType,
  ButtonAs,
  ButtonLabelWrap,
} from './button.types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  as?: ButtonAs
  type?: ButtonHtmlType
  href?: string
  to?: string | Record<string, unknown>
  target?: string
  rel?: string

  width?: ButtonWidth
  labelWrap?: ButtonLabelWrap
  variant?: ButtonVariant
  size?: ButtonSize

  loading?: boolean
  disabled?: boolean

  fullWidth?: boolean
  iconOnly?: boolean
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'primary',
  size: 'md',
  width: 'auto',
  labelWrap: 'nowrap',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
  iconOnly: false,
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

const isDisabled = computed(() => props.disabled || props.loading)

const resolvedAs = computed<ButtonAs>(() => {
  if (props.as !== 'button') return props.as
  if (props.to) return 'router-link'
  if (props.href) return 'a'

  return 'button'
})

const isButton = computed(() => resolvedAs.value === 'button')
const isAnchor = computed(() => resolvedAs.value === 'a')
const isRouterLink = computed(() => resolvedAs.value === 'router-link')
const isNavigation = computed(() => isAnchor.value || isRouterLink.value)

const componentTag = computed(() => {
  if (isRouterLink.value) return resolveComponent('RouterLink')
  if (isAnchor.value) return 'a'

  return 'button'
})

const resolvedRel = computed(() => {
  if (props.rel) return props.rel
  if (props.target === '_blank') return 'noopener noreferrer'

  return undefined
})

const externalClass = computed(() => attrs.class as string | undefined)

const classes = computed(() => {
  if (props.unstyled) {
    return cn(
      'ui-btn-reset',
      props.loading && 'ui-btn--loading',
      isDisabled.value && 'ui-btn--disabled',
      isNavigation.value && 'ui-btn--link',
      externalClass.value,
    )
  }

  const button = uiConfig.button

  return cn(
    'ui-btn',

    // Runtime UI config.
    // Pack CSS owns border, shadow, glow, motion, and focus.
    `ui-btn--pack-${button.pack}`,
    `ui-btn--radius-${button.radius}`,
    `ui-btn--density-${button.density}`,
    
    button.motion && `ui-btn--motion-${button.motion}`,

    // Component props.
    `ui-btn--variant-${props.variant}`,
    `ui-btn--size-${props.size}`,
    `ui-btn--width-${props.fullWidth ? 'full' : props.width}`,
    `ui-btn--label-wrap-${props.labelWrap}`,

    props.iconOnly && 'ui-btn--icon-only',
    props.loading && 'ui-btn--loading',
    isDisabled.value && 'ui-btn--disabled',
    isNavigation.value && 'ui-btn--link',

    externalClass.value,
  )
})

const baseAttrs = computed(() => {
  const copiedAttrs = { ...attrs }

  delete copiedAttrs.class

  return copiedAttrs
})

const resolvedAttrs = computed(() => {
  if (isButton.value) {
    return {
      ...baseAttrs.value,
      type: props.type,
      disabled: isDisabled.value,
    }
  }

  if (isAnchor.value) {
    return {
      ...baseAttrs.value,
      href: isDisabled.value ? undefined : props.href,
      target: props.target,
      rel: resolvedRel.value,
      'aria-disabled': isDisabled.value ? 'true' : undefined,
      tabindex: isDisabled.value ? -1 : undefined,
    }
  }

  return {
    ...baseAttrs.value,
    to: props.to,
    'aria-disabled': isDisabled.value ? 'true' : undefined,
    tabindex: isDisabled.value ? -1 : undefined,
  }
})

function handleClick(event: MouseEvent) {
  if (isDisabled.value) {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  emit('click', event)
}
</script>

<template>
  <component
    :is="componentTag"
    v-bind="resolvedLinkAttrs"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :aria-current="active ? 'page' : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    :class="classes"
  >
    <slot>{{ label }}</slot>
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { RouterLink } from 'vue-router'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  label?: string
  href?: string
  to?: string | Record<string, unknown>
  active?: boolean
  external?: boolean
  disabled?: boolean
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  href: '#',
  to: undefined,
  active: false,
  external: false,
  disabled: false,
  unstyled: false,
})

const attrs = useAttrs()

// Internal destinations use Vue Router so parent demo state remains mounted.
const componentTag = computed(() => (props.disabled ? 'span' : props.to ? RouterLink : 'a'))

// Do not forward an empty href to RouterLink; it overrides the anchor destination RouterLink owns.
const destinationAttrs = computed(() => {
  if (props.disabled) return {}
  return props.to ? { to: props.to } : { href: props.href }
})

const linkAttrs = computed(() => {
  const rest = { ...attrs }
  delete rest.class
  delete rest.href
  delete rest.target
  delete rest.rel
  return rest
})

const resolvedLinkAttrs = computed(() => ({
  ...linkAttrs.value,
  ...destinationAttrs.value,
}))

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const classes = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn(
      'ui-navbar-link-unstyled',
      props.active && 'ui-navbar-link--active',
      props.disabled && 'ui-navbar-link--disabled',
      externalClass,
    )
  }

  return cn(
    'ui-navbar-link',
    props.active && 'ui-navbar-link--active',
    props.disabled && 'ui-navbar-link--disabled',
    externalClass,
  )
})
</script>

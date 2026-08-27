<template>
  <component
    :is="disabled ? 'span' : 'a'"
    v-bind="linkAttrs"
    :href="disabled ? undefined : href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    :class="classes"
  >
    <slot>{{ label }}</slot>
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  label?: string
  href?: string
  external?: boolean
  disabled?: boolean
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  href: '#',
  external: false,
  disabled: false,
  unstyled: false,
})

const attrs = useAttrs()

const linkAttrs = computed(() => {
  const { class: _class, href: _href, target: _target, rel: _rel, ...rest } = attrs

  return rest
})

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const classes = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn(
      'ui-footer-link-unstyled',
      props.disabled && 'ui-footer-link--disabled',
      externalClass,
    )
  }

  return cn('ui-footer-link', props.disabled && 'ui-footer-link--disabled', externalClass)
})
</script>

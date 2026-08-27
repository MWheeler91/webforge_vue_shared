<template>
  <component :is="componentTag" v-bind="brandAttrs" :href="href" :class="classes">
    <slot>
      <img v-if="image" class="ui-navbar-brand__image" :src="image" :alt="resolvedImageAlt" />

      <span v-if="label && showLabel" class="ui-navbar-brand__label">
        {{ label }}
      </span>
    </slot>
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { NavbarBrandImagePosition } from './navigation.types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  label?: string
  href?: string
  image?: string
  imageAlt?: string
  showLabel?: boolean
  imagePosition?: NavbarBrandImagePosition
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  href: undefined,
  image: undefined,
  imageAlt: undefined,
  showLabel: true,
  imagePosition: 'left',
  unstyled: false,
})

const attrs = useAttrs()

const componentTag = computed(() => {
  return props.href ? 'a' : 'div'
})

const brandAttrs = computed(() => {
  const { class: _class, href: _href, ...rest } = attrs

  return rest
})

const resolvedImageAlt = computed(() => {
  if (!props.image) return undefined

  if (props.showLabel && props.label) {
    return ''
  }

  return props.imageAlt ?? props.label ?? ''
})

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const classes = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn('ui-navbar-brand-unstyled', externalClass)
  }

  return cn(
    'ui-navbar-brand',
    `ui-navbar-brand--image-${props.imagePosition}`,
    props.href && 'ui-navbar-brand--link',
    externalClass,
  )
})
</script>

<template>
  <component :is="componentTag" v-bind="brandAttrs" :href="href" :class="classes">
    <slot>
      <span class="ui-footer-brand__main">
        <img v-if="image" class="ui-footer-brand__image" :src="image" :alt="resolvedImageAlt" />

        <span v-if="label && showLabel" class="ui-footer-brand__label">
          {{ label }}
        </span>
      </span>

      <span v-if="description" class="ui-footer-brand__description">
        {{ description }}
      </span>
    </slot>
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
  image?: string
  imageAlt?: string
  description?: string
  showLabel?: boolean
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  href: undefined,
  image: undefined,
  imageAlt: undefined,
  description: '',
  showLabel: true,
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
    return cn('ui-footer-brand-unstyled', externalClass)
  }

  return cn('ui-footer-brand', props.href && 'ui-footer-brand--link', externalClass)
})
</script>

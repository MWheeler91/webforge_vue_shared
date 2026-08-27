<template>
  <section v-bind="sectionAttrs" :class="classes">
    <h3 v-if="title" class="ui-footer-section__title">
      {{ title }}
    </h3>

    <slot />
  </section>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  title?: string
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  unstyled: false,
})

const attrs = useAttrs()

const sectionAttrs = computed(() => {
  const { class: _class, ...rest } = attrs

  return rest
})

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const classes = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn('ui-footer-section-unstyled', externalClass)
  }

  return cn('ui-footer-section', externalClass)
})
</script>

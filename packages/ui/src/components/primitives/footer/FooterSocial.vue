<template>
  <nav v-bind="socialAttrs" :class="classes" aria-label="Social links">
    <a
      v-for="item in items"
      :key="item.href"
      class="ui-footer-social__link"
      :href="item.href"
      :target="(item.external ?? true) ? '_blank' : undefined"
      :rel="(item.external ?? true) ? 'noopener noreferrer' : undefined"
      :aria-label="item.label"
    >
      <Icon
        v-if="item.icon"
        class="ui-footer-social__icon"
        :icon="item.icon"
        aria-hidden="true"
      />

      <span v-else class="ui-footer-social__text">
        {{ item.label }}
      </span>
    </a>
  </nav>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon } from '@iconify/vue'
import type { FooterSocialItem } from './footer.types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  items?: FooterSocialItem[]
  gap?: 'sm' | 'md' | 'lg'
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  gap: 'sm',
  unstyled: false,
})

const attrs = useAttrs()

const socialAttrs = computed(() => {
  const { class: _class, ...rest } = attrs

  return rest
})

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const classes = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn('ui-footer-social-unstyled', externalClass)
  }

  return cn('ui-footer-social', `ui-footer-social--gap-${props.gap}`, externalClass)
})
</script>

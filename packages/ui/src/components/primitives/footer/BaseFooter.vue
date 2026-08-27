<template>
  <component :is="as" v-bind="footerAttrs" :class="classes">
    <div class="ui-footer__inner">
      <slot />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import type { FooterLayout, FooterPack, FooterSize, FooterVariant } from './footer.types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  as?: string
  pack?: FooterPack | null
  variant?: FooterVariant
  size?: FooterSize
  layout?: FooterLayout
  fullWidth?: boolean
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'footer',
  pack: undefined,
  variant: 'surface',
  size: 'md',
  layout: 'simple',
  fullWidth: false,
  unstyled: false,
})

const attrs = useAttrs()
const uiConfig = useUiConfig()

const footerAttrs = computed(() => {
  const { class: _class, ...rest } = attrs

  return rest
})

const resolvedPack = computed(() => {
  return props.pack ?? uiConfig.footer?.pack ?? uiConfig.global.pack
})

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const classes = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn('ui-footer-unstyled', props.fullWidth && 'ui-footer--full-width', externalClass)
  }

  return cn(
    'ui-footer',

    `ui-footer--pack-${resolvedPack.value}`,
    `ui-footer--variant-${props.variant}`,
    `ui-footer--size-${props.size}`,
    `ui-footer--layout-${props.layout}`,

    props.fullWidth && 'ui-footer--full-width',

    externalClass,
  )
})
</script>

<template>
  <section v-bind="sectionAttrs" :class="classes">
    <div v-if="!unstyled" class="ui-section__inner">
      <slot />
    </div>

    <slot v-else />
  </section>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import type { SectionAlign, SectionSpacing, SectionVariant, SectionWidth } from './section.types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  variant?: SectionVariant
  width?: SectionWidth
  spacing?: SectionSpacing
  align?: SectionAlign
  unstyled?: boolean
  // Section pattern props are forwarded through the shell; cards are rendered
  // by the pattern and must not become DOM attributes on the base section.
  cards?: unknown
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  width: 'xl',
  spacing: 'lg',
  align: 'left',
  unstyled: false,
})

const attrs = useAttrs()
const uiConfig = useUiConfig()

const sectionAttrs = computed(() => {
  const rest = { ...attrs }
  delete rest.class
  return rest
})

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const classes = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn('ui-section-unstyled', externalClass)
  }

  const section = uiConfig.section

  return cn(
    'ui-section',

    `ui-section--pack-${section.pack}`,
    `ui-section--density-${section.density}`,
    `ui-section--variant-${props.variant}`,
    `ui-section--width-${props.width}`,
    `ui-section--spacing-${props.spacing}`,
    `ui-section--align-${props.align}`,

    externalClass,
  )
})
</script>

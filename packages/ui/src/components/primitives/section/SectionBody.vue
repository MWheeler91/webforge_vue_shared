<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import type { SectionGap, SectionGrid, SectionLayout } from './section.types'

interface Props {
  layout?: SectionLayout
  grid?: SectionGrid
  gap?: SectionGap
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'default',
  grid: 'auto',
  gap: 'md',
})
const uiConfig = useUiConfig()

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const classes = computed(() => {
  const section = uiConfig.section

  return cn(
    'ui-section-body',
    `ui-section-body--pack-${section.pack}`,
    `ui-section-body--density-${section.density}`,
    `ui-section-body--layout-${props.layout}`,
    `ui-section-body--grid-${props.grid}`,
    `ui-section-body--gap-${props.gap}`,
  )
})
</script>

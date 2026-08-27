<template>
  <footer :class="classes">
    <slot />
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import type { SectionAlign } from './section.types'

interface Props {
  align?: 'inherit' | SectionAlign
}

const props = withDefaults(defineProps<Props>(), {
  align: 'inherit',
})
const uiConfig = useUiConfig()

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const classes = computed(() => {
  const section = uiConfig.section

  return cn(
    'ui-section-footer',
    `ui-section-footer--pack-${section.pack}`,
    `ui-section-footer--density-${section.density}`,
    props.align !== 'inherit' && `ui-section-footer--align-${props.align}`,
  )
})
</script>

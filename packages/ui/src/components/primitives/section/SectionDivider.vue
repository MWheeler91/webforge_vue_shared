<template>
  <div :class="classes" role="separator" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'

const uiConfig = useUiConfig()

const classes = computed(() => {
  const section = uiConfig.section

  return [
    'ui-section-divider',
    `ui-section-divider--pack-${section.pack}`,
    `ui-section-divider--density-${section.density}`,
  ]
})
</script>

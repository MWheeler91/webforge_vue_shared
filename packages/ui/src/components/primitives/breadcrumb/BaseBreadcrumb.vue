<template>
  <nav
    class="ui-breadcrumb"
    :class="`ui-breadcrumb--pack-${uiConfig.global.pack}`"
    aria-label="Breadcrumb"
  >
    <ol class="ui-breadcrumb__list">
      <slot />
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { useUiConfig } from '../../../config/ui.runtime'

const uiConfig = useUiConfig()
</script>

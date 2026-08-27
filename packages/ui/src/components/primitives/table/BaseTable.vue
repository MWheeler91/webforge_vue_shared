<template>
  <div class="ui-table-wrap" :class="`ui-table-wrap--pack-${uiConfig.global.pack}`">
    <table class="ui-table">
      <slot />
    </table>
  </div>
</template>

<script setup lang="ts">
import { useUiConfig } from '../../../config/ui.runtime'

const uiConfig = useUiConfig()
</script>

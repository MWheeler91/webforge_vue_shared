<template>
  <div class="ui-tabs__list" role="tablist" :aria-orientation="context.orientation.value">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { inject } from 'vue'
import { tabsContextKey } from './tabs.types'
const injectedContext = inject(tabsContextKey)
if (!injectedContext) throw new Error('TabList must be used inside BaseTabs.')
const context = injectedContext
</script>

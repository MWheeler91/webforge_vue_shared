<template>
  <div
    v-show="active"
    class="ui-tabs__panel"
    role="tabpanel"
    :id="panelId"
    :aria-labelledby="tabId"
    tabindex="0"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">
import { computed, inject } from 'vue'
import { tabsContextKey } from './tabs.types'
const props = defineProps<{ value: string }>()
const injectedContext = inject(tabsContextKey)
if (!injectedContext) throw new Error('TabPanel must be used inside BaseTabs.')
const context = injectedContext
const active = computed(() => context.activeValue.value === props.value)
const tabId = computed(() => `ui-tab-${props.value}`)
const panelId = computed(() => `ui-tabpanel-${props.value}`)
</script>

<template>
  <UiFooterShell v-bind="props"
    ><div v-if="status || hasLinks || meta" class="ui-app-footer">
      <span v-if="status">{{ status.text }}</span
      ><UiFooterLinks :links="links" orientation="horizontal" /><span v-if="meta">{{
        meta.text
      }}</span>
    </div></UiFooterShell
  >
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { SharedFooterProps } from '../../../primitives/footer/footer.types.ts'
import UiFooterLinks from '../shared/UiFooterLinks.vue'
import UiFooterShell from '../shared/UiFooterShell.vue'
const props = defineProps<SharedFooterProps>()
const hasLinks = computed(() => collectionItems(props.links).length)
</script>
<style scoped>
.ui-app-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.875rem;
}
</style>

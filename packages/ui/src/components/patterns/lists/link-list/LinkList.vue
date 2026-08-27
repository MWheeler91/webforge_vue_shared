<template>
  <nav
    v-if="items.length"
    :id="listId ?? undefined"
    class="ui-link-list"
    :aria-label="ariaLabel ?? 'Related links'"
  >
    <a v-for="(item, index) in items" :key="item.id ?? index" :href="item.href ?? undefined"
      ><span>{{ item.label ?? item.heading?.text }}</span
      ><span aria-hidden="true">→</span></a
    >
  </nav>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { collectionItems } from '../../../primitives/card/card.types'
import type { SharedListProps } from '../../../primitives/list/list.types'
const props = defineProps<SharedListProps>()
const items = computed(() => collectionItems(props.items))
</script>
<style scoped>
.ui-link-list {
  display: grid;
  border: 1px solid var(--border_default);
}
.ui-link-list a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 4rem;
  padding: 1rem;
}
.ui-link-list a + a {
  border-top: 1px solid var(--border_default);
}
</style>

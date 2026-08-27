<template>
  <dl
    v-if="items.length"
    :id="listId ?? undefined"
    class="ui-definition-list"
    :aria-label="ariaLabel ?? undefined"
  >
    <div v-for="(item, index) in items" :key="item.id ?? index">
      <dt>{{ item.label ?? item.heading?.text }}</dt>
      <dd>{{ item.body?.text ?? item.value }}</dd>
    </div>
  </dl>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { collectionItems } from '../../../primitives/card/card.types'
import type { SharedListProps } from '../../../primitives/list/list.types'
const props = defineProps<SharedListProps>()
const items = computed(() => collectionItems(props.items))
</script>
<style scoped>
.ui-definition-list {
  border: 1px solid var(--border_default);
}
.ui-definition-list > div {
  display: grid;
  grid-template-columns: minmax(10rem, 0.7fr) 2fr;
  gap: 1rem;
  padding: 1rem;
}
.ui-definition-list > div + div {
  border-top: 1px solid var(--border_default);
}
.ui-definition-list dd {
  margin: 0;
}
@media (max-width: 560px) {
  .ui-definition-list > div {
    grid-template-columns: 1fr;
  }
}
</style>

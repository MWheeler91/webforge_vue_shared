<template>
  <section
    v-if="items.length"
    :id="listId ?? undefined"
    class="ui-comparison-list"
    :aria-label="ariaLabel ?? undefined"
  >
    <article
      v-for="(item, index) in items"
      :key="item.id ?? index"
      :class="{ featured: item.status === 'featured' }"
    >
      <BaseBadge v-if="item.label" :text="item.label">{{ item.label }}</BaseBadge>
      <h3 v-if="item.heading">{{ item.heading.text }}</h3>
      <p v-if="item.body">{{ item.body.text }}</p>
      <BaseButton v-if="item.action" v-bind="item.action">{{ item.action.label }}</BaseButton>
      <ul v-if="item.meta?.length">
        <li v-for="(feature, featureIndex) in item.meta" :key="featureIndex">
          ✓ {{ feature.text }}
        </li>
      </ul>
    </article>
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import BaseBadge from '../../../primitives/badge/BaseBadge.vue'
import BaseButton from '../../../primitives/button/BaseButton.vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { SharedListProps } from '../../../primitives/list/list.types.ts'
const props = defineProps<SharedListProps>()
const items = computed(() => collectionItems(props.items))
</script>
<style scoped>
.ui-comparison-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  border: 1px solid var(--border_default);
}
.ui-comparison-list article {
  display: grid;
  align-content: start;
  gap: 1rem;
  padding: 1.5rem;
}
.ui-comparison-list article + article {
  border-left: 1px solid var(--border_default);
}
.ui-comparison-list article.featured {
  background: var(--bg_muted);
}
.ui-comparison-list h3,
.ui-comparison-list p {
  margin: 0;
}
.ui-comparison-list ul {
  display: grid;
  gap: 0.75rem;
  padding: 0;
  list-style: none;
}
@media (max-width: 560px) {
  .ui-comparison-list article + article {
    border-top: 1px solid var(--border_default);
    border-left: 0;
  }
}
</style>

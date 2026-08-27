<template>
  <section
    v-if="items.length"
    :id="listId ?? undefined"
    class="ui-feature-list"
    :class="`ui-feature-list--${safeLayout}`"
    :aria-label="ariaLabel ?? undefined"
  >
    <article v-for="(item, index) in items" :key="item.id ?? index">
      <span class="ui-feature-list__marker">{{
        safeLayout === 'check' ? '✓' : (item.icon ?? index + 1)
      }}</span>
      <div>
        <h3 v-if="item.heading">{{ item.heading.text }}</h3>
        <p v-if="item.body">{{ item.body.text }}</p>
      </div>
    </article>
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { collectionItems } from '../../../primitives/card/card.types'
import type { SharedListProps } from '../../../primitives/list/list.types'
const props = withDefaults(defineProps<SharedListProps>(), { layout: 'icon' })
const items = computed(() => collectionItems(props.items))
const safeLayout = computed(() =>
  ['icon', 'check'].includes(props.layout ?? '') ? props.layout : 'icon',
)
</script>
<style scoped>
.ui-feature-list {
  display: grid;
  gap: 1rem;
}
.ui-feature-list--icon {
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}
.ui-feature-list article {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--border_default);
}
.ui-feature-list__marker {
  display: grid;
  flex: 0 0 auto;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  border: 1px solid var(--border_default);
  border-radius: 50%;
}
.ui-feature-list h3,
.ui-feature-list p {
  margin: 0;
}
.ui-feature-list p {
  margin-top: 0.5rem;
}
</style>

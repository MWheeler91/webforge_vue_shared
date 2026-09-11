<template>
  <ol
    v-if="items.length"
    :id="listId ?? undefined"
    class="ui-timeline"
    :aria-label="ariaLabel ?? 'Timeline'"
  >
    <li v-for="(item, index) in items" :key="item.id ?? index">
      <time v-if="item.date">{{ item.date }}</time>
      <article>
        <UiText v-if="item.heading" :payload="item.heading" fallback="h3" />
        <UiText v-if="item.body" :payload="item.body" fallback="p" />
      </article>
    </li>
  </ol>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import UiText from '../../../primitives/text/UiText.vue'
import { collectionItems } from '../../../primitives/card/card.types'
import type { TimelineProps } from './Timeline.types.ts'

defineOptions({ name: 'TimelinePattern' })

const props = defineProps<TimelineProps>()
const items = computed(() => collectionItems(props.items))
</script>
<style scoped>
.ui-timeline {
  display: grid;
  gap: 1rem;
  padding: 0 0 0 2rem;
  list-style: none;
  border-left: 2px solid var(--border_default);
}
.ui-timeline li {
  position: relative;
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 1rem;
}
.ui-timeline li::before {
  position: absolute;
  top: 0.25rem;
  left: -2.6rem;
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--border_default);
  border-radius: 50%;
  background: var(--bg_surface);
  content: '';
}
.ui-timeline article {
  padding: 1rem;
  border: 1px solid var(--border_default);
}
.ui-timeline h3,
.ui-timeline p {
  margin: 0;
}
.ui-timeline p {
  margin-top: 0.5rem;
}
@media (max-width: 600px) {
  .ui-timeline li {
    grid-template-columns: 1fr;
  }
}
</style>

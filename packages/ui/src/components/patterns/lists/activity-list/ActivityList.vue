<template>
  <ol
    v-if="items.length"
    :id="listId ?? undefined"
    class="ui-activity-list"
    :class="`ui-activity-list--${safeLayout}`"
    :aria-label="ariaLabel ?? undefined"
  >
    <li v-for="(item, index) in items" :key="item.id ?? index">
      <span v-if="safeLayout === 'ranked'" class="ui-activity-list__rank">{{ index + 1 }}</span
      ><img
        v-if="item.avatar ?? item.media"
        :src="(item.avatar ?? item.media)!.src"
        :alt="(item.avatar ?? item.media)!.alt ?? ''"
      /><span v-else-if="item.icon" class="ui-activity-list__icon">{{ item.icon }}</span>
      <div>
        <strong v-if="item.heading">{{ item.heading.text }}</strong>
        <p v-if="item.body">{{ item.body.text }}</p>
        <small v-if="item.meta?.length">{{
          item.meta.map((value) => value.text).join(' · ')
        }}</small>
      </div>
      <time v-if="item.date">{{ item.date }}</time
      ><strong v-if="safeLayout === 'ranked' && item.value !== null">{{ item.value }}</strong>
    </li>
  </ol>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { collectionItems } from '../../../primitives/card/card.types'
import type { SharedListProps } from '../../../primitives/list/list.types'
const props = withDefaults(defineProps<SharedListProps>(), { layout: 'activity' })
const items = computed(() => collectionItems(props.items))
const safeLayout = computed(() =>
  ['activity', 'ranked'].includes(props.layout ?? '') ? props.layout : 'activity',
)
</script>
<style scoped>
.ui-activity-list {
  display: grid;
  padding: 0;
  list-style: none;
  border: 1px solid var(--border_default);
}
.ui-activity-list li {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}
.ui-activity-list li + li {
  border-top: 1px solid var(--border_default);
}
.ui-activity-list img,
.ui-activity-list__icon {
  width: 3rem;
  height: 3rem;
  flex: 0 0 auto;
  object-fit: cover;
  border-radius: 50%;
}
.ui-activity-list__rank {
  font-size: 1.5rem;
}
.ui-activity-list p {
  margin: 0.25rem 0;
}
.ui-activity-list time {
  margin-left: auto;
  white-space: nowrap;
}
</style>

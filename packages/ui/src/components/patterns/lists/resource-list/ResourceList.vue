<template>
  <section
    v-if="items.length"
    :id="listId ?? undefined"
    class="ui-resource-list"
    :class="`ui-resource-list--${safeLayout}`"
    :aria-label="ariaLabel ?? undefined"
  >
    <article v-for="(item, index) in items" :key="item.id ?? index">
      <img v-if="item.media" :src="item.media.src" :alt="item.media.alt ?? ''" /><span
        v-else-if="item.icon"
        class="ui-resource-list__icon"
        >{{ item.icon }}</span
      ><time v-if="safeLayout === 'event' && item.date">{{ item.date }}</time>
      <div>
        <BaseBadge v-if="item.label" :text="item.label">{{ item.label }}</BaseBadge>
        <h3 v-if="item.heading">{{ item.heading.text }}</h3>
        <p v-if="item.body">{{ item.body.text }}</p>
        <small v-if="item.meta?.length">{{
          item.meta.map((value) => value.text).join(' · ')
        }}</small>
      </div>
      <BaseButton v-if="item.action" v-bind="item.action">{{ item.action.label }}</BaseButton>
    </article>
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import BaseBadge from '../../../primitives/badge/BaseBadge.vue'
import BaseButton from '../../../primitives/button/BaseButton.vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { SharedListProps } from '../../../primitives/list/list.types.ts'
const props = withDefaults(defineProps<SharedListProps>(), { layout: 'resource' })
const items = computed(() => collectionItems(props.items))
const safeLayout = computed(() =>
  ['resource', 'article', 'event', 'job'].includes(props.layout ?? '') ? props.layout : 'resource',
)
</script>
<style scoped>
.ui-resource-list {
  display: grid;
  border: 1px solid var(--border_default);
}
.ui-resource-list article {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}
.ui-resource-list article + article {
  border-top: 1px solid var(--border_default);
}
.ui-resource-list img,
.ui-resource-list__icon {
  width: 7rem;
  min-height: 5rem;
  object-fit: cover;
}
.ui-resource-list article > div {
  display: grid;
  flex: 1;
  gap: 0.5rem;
}
.ui-resource-list h3,
.ui-resource-list p {
  margin: 0;
}
.ui-resource-list--article img {
  width: 11rem;
  min-height: 7rem;
}
.ui-resource-list--event time {
  display: grid;
  width: 4.5rem;
  min-height: 4.5rem;
  place-items: center;
  border: 1px solid var(--border_default);
}
@media (max-width: 560px) {
  .ui-resource-list article {
    display: grid;
  }
  .ui-resource-list img {
    width: 100%;
  }
}
</style>

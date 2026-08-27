<template>
  <section
    v-if="items.length"
    :id="listId ?? undefined"
    class="ui-contact-list"
    :aria-label="ariaLabel ?? undefined"
  >
    <article v-for="(item, index) in items" :key="item.id ?? index">
      <img
        v-if="item.avatar ?? item.media"
        :src="(item.avatar ?? item.media)!.src"
        :alt="(item.avatar ?? item.media)!.alt ?? ''"
      />
      <div>
        <h3 v-if="item.heading">{{ item.heading.text }}</h3>
        <span v-if="item.role">{{ item.role.text }}</span
        ><a v-for="(link, linkIndex) in contacts(item)" :key="linkIndex" :href="link.href">{{
          link.label
        }}</a>
      </div>
    </article>
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { collectionItems } from '../../../primitives/card/card.types'
import type { SharedListProps, UiListItemPayload } from '../../../primitives/list/list.types'
const props = defineProps<SharedListProps>()
const items = computed(() => collectionItems(props.items))
function contacts(item: UiListItemPayload) {
  return collectionItems(item.contact)
}
</script>
<style scoped>
.ui-contact-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1rem;
}
.ui-contact-list article {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--border_default);
}
.ui-contact-list img {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
}
.ui-contact-list article > div {
  display: grid;
  align-content: start;
  gap: 0.25rem;
}
.ui-contact-list h3 {
  margin: 0;
}
</style>

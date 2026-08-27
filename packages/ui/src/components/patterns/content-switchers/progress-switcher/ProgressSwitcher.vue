<template>
  <section
    v-if="items.length || heading || body"
    :id="switcherId ?? undefined"
    class="ui-progress-switcher"
    :class="[`ui-progress-switcher--${safeLayout}`]"
    :aria-label="ariaLabel ?? undefined"
  >
    <UiContentSwitcherHeader v-bind="props" />
    <ol v-if="items.length" class="ui-progress-switcher__items">
      <li
        v-for="(item, index) in items"
        :key="id(item, index)"
        :class="`ui-progress-switcher__item--${item.status ?? 'upcoming'}`"
      >
        <span class="ui-progress-switcher__marker">{{
          item.status === 'complete' ? '✓' : index + 1
        }}</span
        ><span
          ><strong>{{ item.label }}</strong
          ><small v-if="item.body">{{ item.body.text }}</small></span
        >
      </li>
    </ol>
    <div
      v-if="activeItem?.heading || activeItem?.body || activeItem?.media"
      class="ui-progress-switcher__content"
    >
      <img v-if="activeItem.media" :src="activeItem.media.src" :alt="activeItem.media.alt ?? ''" />
      <h3 v-if="activeItem.heading">{{ activeItem.heading.text }}</h3>
      <p v-if="activeItem.body">{{ activeItem.body.text }}</p>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type {
  SharedContentSwitcherProps,
  UiSwitcherItemPayload,
} from '../../../primitives/content-switcher/content-switcher.types.ts'
import UiContentSwitcherHeader from '../shared/UiContentSwitcherHeader.vue'
const props = withDefaults(defineProps<SharedContentSwitcherProps>(), { layout: 'stepper' })
const items = computed(() => collectionItems(props.items))
const safeLayout = computed(() =>
  ['stepper', 'progress'].includes(props.layout ?? '') ? props.layout : 'stepper',
)
const activeItem = computed(() => items.value.find((item) => item.status === 'active'))
function id(item: UiSwitcherItemPayload, index: number) {
  return item.id ?? String(index)
}
</script>
<style scoped>
.ui-progress-switcher__items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
  gap: 1rem;
  padding: 0;
  list-style: none;
}
.ui-progress-switcher__item {
  display: flex;
  gap: 0.75rem;
  align-items: start;
}
.ui-progress-switcher__marker {
  display: grid;
  flex: 0 0 auto;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  border: 1px solid var(--border_default);
  border-radius: 50%;
}
.ui-progress-switcher__item--complete .ui-progress-switcher__marker,
.ui-progress-switcher__item--active .ui-progress-switcher__marker {
  background: var(--bg_muted);
}
.ui-progress-switcher__item small {
  display: block;
}
.ui-progress-switcher__content {
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 1rem;
  border: 1px solid var(--border_default);
}
.ui-progress-switcher__content > * {
  margin: 0;
}
.ui-progress-switcher__content img {
  width: 100%;
  max-height: 20rem;
  object-fit: cover;
}
.ui-progress-switcher--progress .ui-progress-switcher__items {
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
}
.ui-progress-switcher--progress .ui-progress-switcher__item {
  padding: 0.75rem;
  border: 1px solid var(--border_default);
}
</style>

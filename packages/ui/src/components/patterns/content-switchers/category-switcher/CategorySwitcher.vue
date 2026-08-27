<template>
  <section
    v-if="items.length || heading || body"
    :id="switcherId ?? undefined"
    class="ui-category-switcher"
    :aria-label="ariaLabel ?? undefined"
  >
    <UiContentSwitcherHeader v-bind="props" />
    <div v-if="items.length" class="ui-category-switcher__controls" role="tablist">
      <button
        v-for="(item, index) in items"
        :key="id(item, index)"
        type="button"
        role="tab"
        :aria-selected="id(item, index) === active"
        :class="{ active: id(item, index) === active }"
        :disabled="item.disabled"
        @click="select(id(item, index))"
      >
        <span v-if="item.icon" class="ui-category-switcher__icon" aria-hidden="true">{{
          item.icon
        }}</span
        ><strong>{{ item.label }}</strong
        ><span aria-hidden="true">→</span>
      </button>
    </div>
    <div v-if="selected" class="ui-category-switcher__content" role="tabpanel">
      <img v-if="selected.media" :src="selected.media.src" :alt="selected.media.alt ?? ''" />
      <div
        v-if="
          selected.heading ||
          selected.body ||
          cardItems(selected).length ||
          buttonItems(selected).length
        "
      >
        <h3 v-if="selected.heading">{{ selected.heading.text }}</h3>
        <p v-if="selected.body">{{ selected.body.text }}</p>
        <UiGrid v-if="cardItems(selected).length" :max-columns="2" gap="md"
          ><TextCard v-for="(card, index) in cardItems(selected)" :key="index" :eyebrow="textValue(card.eyebrow)" :title="textValue(card.title ?? card.heading)" :body="textValue(card.body ?? card.description)"
        /></UiGrid>
        <div v-if="buttonItems(selected).length" class="ui-category-switcher__actions">
          <BaseButton
            v-for="(button, index) in buttonItems(selected)"
            :key="index"
            v-bind="button"
            >{{ button.label }}</BaseButton
          >
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BaseButton from '../../../primitives/button/BaseButton.vue'
import TextCard from '../../cards/text-card/TextCard.vue'
import UiGrid from '../../../primitives/grid/UiGrid.vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type {
  SharedContentSwitcherProps,
  UiSwitcherItemPayload,
} from '../../../primitives/content-switcher/content-switcher.types.ts'
import UiContentSwitcherHeader from '../shared/UiContentSwitcherHeader.vue'
const props = defineProps<SharedContentSwitcherProps>()
const emit = defineEmits<{ (event: 'update:activeId', value: string): void }>()
const items = computed(() => collectionItems(props.items))
const active = ref(props.activeId ?? props.defaultActiveId ?? '')
watch(
  () => props.activeId,
  (value) => {
    if (value !== null && value !== undefined) active.value = value
  },
)
const selected = computed(() => items.value.find((item, index) => id(item, index) === active.value))
function textValue(value: unknown): string | undefined {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && 'text' in value && typeof value.text === 'string') return value.text
  return undefined
}

function id(item: UiSwitcherItemPayload, index: number) {
  return item.id ?? String(index)
}
function cardItems(item: UiSwitcherItemPayload) {
  return collectionItems(item.cards)
}
function buttonItems(item: UiSwitcherItemPayload) {
  return collectionItems(item.buttons)
}
function select(value: string) {
  active.value = value
  emit('update:activeId', value)
}
</script>
<style scoped>
.ui-category-switcher__controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  border: 1px solid var(--border_default);
}
.ui-category-switcher__controls button {
  display: grid;
  align-content: space-between;
  justify-items: start;
  gap: 0.75rem;
  min-height: 9rem;
  padding: 1rem;
  border: 0;
  border-right: 1px solid var(--border_default);
  background: transparent;
  text-align: left;
}
.ui-category-switcher__controls button.active {
  background: var(--bg_muted);
}
.ui-category-switcher__icon {
  display: grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  border: 1px solid var(--border_default);
}
.ui-category-switcher__content {
  display: grid;
  gap: 1.5rem;
  margin-top: 1.5rem;
}
.ui-category-switcher__content > img {
  width: 100%;
  min-height: 14rem;
  object-fit: cover;
}
.ui-category-switcher__content > div {
  display: grid;
  align-content: start;
  gap: 1rem;
}
.ui-category-switcher__content h3,
.ui-category-switcher__content p {
  margin: 0;
}
.ui-category-switcher__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
@media (min-width: 760px) {
  .ui-category-switcher__content {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

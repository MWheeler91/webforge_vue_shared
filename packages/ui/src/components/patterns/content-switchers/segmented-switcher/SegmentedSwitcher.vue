<template>
  <section
    v-if="items.length || heading || body"
    :id="switcherId ?? undefined"
    class="ui-segmented-switcher"
    :aria-label="ariaLabel ?? undefined"
  >
    <UiContentSwitcherHeader v-bind="props" />
    <div
      v-if="items.length"
      class="ui-segmented-switcher__controls"
      role="group"
      :aria-label="ariaLabel ?? heading?.text ?? 'Content options'"
    >
      <button
        v-for="(item, index) in items"
        :key="id(item, index)"
        type="button"
        :class="{ active: id(item, index) === active }"
        :aria-pressed="id(item, index) === active"
        :disabled="item.disabled"
        @click="select(id(item, index))"
      >
        {{ item.label }}
      </button>
    </div>
    <div
      v-if="selected?.heading || selected?.body || selected?.media"
      class="ui-segmented-switcher__content"
    >
      <img v-if="selected.media" :src="selected.media.src" :alt="selected.media.alt ?? ''" />
      <h3 v-if="selected.heading">{{ selected.heading.text }}</h3>
      <p v-if="selected.body">{{ selected.body.text }}</p>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
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
function id(item: UiSwitcherItemPayload, index: number) {
  return item.id ?? String(index)
}
function select(value: string) {
  active.value = value
  emit('update:activeId', value)
}
</script>
<style scoped>
.ui-segmented-switcher__controls {
  display: inline-flex;
  flex-wrap: wrap;
  padding: 0.25rem;
  border: 1px solid var(--border_default);
}
.ui-segmented-switcher__controls button {
  min-height: 2.5rem;
  padding: 0.5rem 1rem;
  border: 0;
  background: transparent;
}
.ui-segmented-switcher__controls button.active {
  background: var(--bg_surface);
  box-shadow: inset 0 0 0 1px var(--border_default);
}
.ui-segmented-switcher__content {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid var(--border_default);
}
.ui-segmented-switcher__content > * {
  margin: 0;
}
.ui-segmented-switcher__content img {
  width: 100%;
  max-height: 20rem;
  object-fit: cover;
}
</style>

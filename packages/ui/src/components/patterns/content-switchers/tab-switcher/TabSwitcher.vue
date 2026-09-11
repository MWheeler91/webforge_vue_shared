<template>
  <section
    v-if="items.length || heading || body"
    :id="switcherId ?? undefined"
    class="ui-tab-switcher"
    :class="[`ui-tab-switcher--${safeLayout}`]"
    :aria-label="resolvedAriaLabel"
  >
    <UiContentSwitcherHeader :label="label" :eyebrow="eyebrow" :heading="heading" :body="body" /><BaseTabs
      v-if="items.length"
      v-model="active"
      :orientation="safeLayout === 'vertical' ? 'vertical' : 'horizontal'"
      ><TabList
        ><TabTrigger
          v-for="(item, index) in items"
          :key="id(item, index)"
          :value="id(item, index)"
          :disabled="item.disabled"
          >{{ item.label }}</TabTrigger
        ></TabList
      ><TabPanel v-for="(item, index) in items" :key="id(item, index)" :value="id(item, index)"
        ><div
          v-if="item.heading || item.body || item.media || hasCards(item)"
          class="ui-tab-switcher__panel"
        >
          <img v-if="item.media" :src="item.media.src" :alt="item.media.alt ?? ''" />
          <div v-if="item.heading || item.body">
            <UiText v-if="item.heading" :payload="item.heading" fallback="h3" />
            <UiText v-if="item.body" :payload="item.body" fallback="p" />
          </div>
          <UiGrid v-if="hasCards(item)" :max-columns="3" gap="md"
            ><TextCard
              v-for="(card, cardIndex) in cardItems(item)"
              :key="cardIndex"
              :eyebrow="textValue(card.eyebrow)" :title="textValue(card.title ?? card.heading)" :body="textValue(card.body ?? card.description)"
          /></UiGrid></div></TabPanel
    ></BaseTabs>
  </section>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BaseTabs from '../../../primitives/tabs/BaseTabs.vue'
import TabList from '../../../primitives/tabs/TabList.vue'
import TabPanel from '../../../primitives/tabs/TabPanel.vue'
import TabTrigger from '../../../primitives/tabs/TabTrigger.vue'
import TextCard from '../../cards/text-card/TextCard.vue'
import UiGrid from '../../../primitives/grid/UiGrid.vue'
import UiText from '../../../primitives/text/UiText.vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { UiSwitcherItemPayload } from '../../../primitives/content-switcher/content-switcher.types.ts'
import type { TabSwitcherProps } from './TabSwitcher.types.ts'
import UiContentSwitcherHeader from '../shared/UiContentSwitcherHeader.vue'
const props = withDefaults(defineProps<TabSwitcherProps>(), { layout: 'tabs' })
const emit = defineEmits<{ (event: 'update:activeId', value: string): void }>()
const items = computed(() => collectionItems(props.items))
/** No ariaLabel content key: derived from visible heading/eyebrow copy rather than database-managed. */
const resolvedAriaLabel = computed(
  () => props.ariaLabel ?? props.heading?.text ?? props.eyebrow?.text ?? 'Content switcher',
)
const active = ref(props.activeId ?? props.defaultActiveId ?? '')
watch(
  () => props.activeId,
  (value) => {
    if (value !== null && value !== undefined) active.value = value
  },
)
watch(active, (value) => emit('update:activeId', value))
const safeLayout = computed(() =>
  ['tabs', 'pill', 'vertical'].includes(props.layout ?? '') ? props.layout : 'tabs',
)
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
function hasCards(item: UiSwitcherItemPayload) {
  return cardItems(item).length > 0
}
</script>
<style scoped>
.ui-tab-switcher--vertical :deep(.ui-tabs) {
  display: grid;
  grid-template-columns: 14rem minmax(0, 1fr);
}
.ui-tab-switcher--vertical :deep(.ui-tabs__list) {
  display: grid;
  align-content: start;
}
.ui-tab-switcher--pill :deep(.ui-tabs__list) {
  gap: 0.5rem;
  padding: 0.35rem;
  border: 1px solid var(--border_default);
  border-radius: 999px;
}
.ui-tab-switcher--pill :deep(.ui-tabs__trigger) {
  border-radius: 999px;
}
.ui-tab-switcher__panel {
  display: grid;
  gap: 1rem;
  padding: 1rem;
}
.ui-tab-switcher__panel > img {
  width: 100%;
  max-height: 24rem;
  object-fit: cover;
}
@media (max-width: 700px) {
  .ui-tab-switcher--vertical :deep(.ui-tabs) {
    grid-template-columns: 1fr;
  }
}
</style>

<template>
  <section
    v-if="items.length || heading || body"
    :id="switcherId ?? undefined"
    class="ui-accordion-switcher"
    :aria-label="resolvedAriaLabel"
  >
    <UiContentSwitcherHeader :label="label" :eyebrow="eyebrow" :heading="heading" :body="body" /><BaseAccordion
      v-if="items.length"
      :default-value="initialOpen"
      :multiple="multiple"
      ><AccordionItem
        v-for="(item, index) in items"
        :key="id(item, index)"
        :value="id(item, index)"
        :disabled="item.disabled"
        ><AccordionTrigger>{{ item.label }}</AccordionTrigger
        ><AccordionPanel v-if="hasPanel(item)"
          ><div class="ui-accordion-switcher__panel">
            <div v-if="item.heading || item.body">
              <UiText v-if="item.heading" :payload="item.heading" fallback="h3" />
              <UiText v-if="item.body" :payload="item.body" fallback="p" />
            </div>
            <img v-if="item.media" :src="item.media.src" :alt="item.media.alt ?? ''" /><UiGrid
              v-if="cardItems(item).length"
              :max-columns="3"
              gap="md"
              ><TextCard
                v-for="(card, cardIndex) in cardItems(item)"
                :key="cardIndex"
                :eyebrow="textValue(card.eyebrow)" :title="textValue(card.title ?? card.heading)" :body="textValue(card.body ?? card.description)" /></UiGrid
            ><BaseAccordion v-if="childItems(item).length" multiple
              ><AccordionItem
                v-for="(child, childIndex) in childItems(item)"
                :key="id(child, childIndex)"
                :value="id(child, childIndex)"
                ><AccordionTrigger>{{ child.label }}</AccordionTrigger
                ><AccordionPanel v-if="child.heading || child.body"
                  ><UiText v-if="child.heading" :payload="child.heading" fallback="h4" />
                  <UiText v-if="child.body" :payload="child.body" fallback="p" /></AccordionPanel
                ></AccordionItem
              ></BaseAccordion
            >
          </div></AccordionPanel
        ></AccordionItem
      ></BaseAccordion
    >
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import BaseAccordion from '../../../primitives/accordion/BaseAccordion.vue'
import AccordionItem from '../../../primitives/accordion/AccordionItem.vue'
import AccordionPanel from '../../../primitives/accordion/AccordionPanel.vue'
import AccordionTrigger from '../../../primitives/accordion/AccordionTrigger.vue'
import TextCard from '../../cards/text-card/TextCard.vue'
import UiGrid from '../../../primitives/grid/UiGrid.vue'
import UiText from '../../../primitives/text/UiText.vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { UiSwitcherItemPayload } from '../../../primitives/content-switcher/content-switcher.types.ts'
import type { AccordionSwitcherProps } from './AccordionSwitcher.types.ts'
import UiContentSwitcherHeader from '../shared/UiContentSwitcherHeader.vue'
const props = withDefaults(defineProps<AccordionSwitcherProps>(), { multiple: false })
const items = computed(() => collectionItems(props.items))
const initialOpen = computed(() => (props.defaultActiveId ? [props.defaultActiveId] : []))
/** No ariaLabel content key: derived from visible heading/eyebrow copy rather than database-managed. */
const resolvedAriaLabel = computed(
  () => props.ariaLabel ?? props.heading?.text ?? props.eyebrow?.text ?? 'Content switcher',
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
function childItems(item: UiSwitcherItemPayload) {
  return collectionItems(item.children)
}
function hasPanel(item: UiSwitcherItemPayload) {
  return Boolean(
    item.heading || item.body || item.media || cardItems(item).length || childItems(item).length,
  )
}
</script>
<style scoped>
.ui-accordion-switcher__panel {
  display: grid;
  gap: 1rem;
  padding: 1rem;
}
.ui-accordion-switcher__panel > img {
  width: 100%;
  max-height: 24rem;
  object-fit: cover;
}
</style>

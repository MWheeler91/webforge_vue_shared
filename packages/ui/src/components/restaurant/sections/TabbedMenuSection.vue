<template>
  <BaseSection class="ui-tabbed-menu-section" :variant="props.variant" spacing="xl" width="full">
    <BaseContainer width="xl" padding="lg" center>
      <SectionHeader
        v-if="hasHeading"
        class="ui-tabbed-menu-section__header"
        :eyebrow="props.heading?.eyebrow ?? undefined"
        :title="props.heading?.title ?? undefined"
        :subtitle="props.heading?.body ?? undefined"
        title-as="h2"
      />

      <BaseTabs v-if="categories.length" v-model="active" class="ui-tabbed-menu-section__tabs">
        <TabList>
          <TabTrigger v-for="category in categories" :key="category.key" :value="category.key">
            {{ category.label }}
          </TabTrigger>
        </TabList>

        <TabPanel
          v-for="category in categories"
          :key="category.key"
          :value="category.key"
          class="ui-tabbed-menu-section__panel"
        >
          <p v-if="category.subline" class="ui-tabbed-menu-section__subline">
            {{ category.subline }}
          </p>
          <ul class="ui-tabbed-menu-section__list">
            <li
              v-for="(item, index) in category.items"
              :key="index"
              class="ui-tabbed-menu-section__item"
            >
              <MenuCard
                :item="item"
                :layout="props.itemLayout"
                :variant="cardVariant"
                :currency="props.currency"
                padding="none"
              />
            </li>
          </ul>
        </TabPanel>
      </BaseTabs>

      <p v-if="props.menu?.footnote" class="ui-tabbed-menu-section__footnote">
        {{ props.menu.footnote }}
      </p>
    </BaseContainer>
  </BaseSection>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BaseContainer from '../../primitives/container/BaseContainer.vue'
import BaseSection from '../../primitives/section/BaseSection.vue'
import SectionHeader from '../../primitives/section/SectionHeader.vue'
import BaseTabs from '../../primitives/tabs/BaseTabs.vue'
import TabList from '../../primitives/tabs/TabList.vue'
import TabTrigger from '../../primitives/tabs/TabTrigger.vue'
import TabPanel from '../../primitives/tabs/TabPanel.vue'
import MenuCard from '../menu-card/MenuCard.vue'
import type { CardVariant, TabbedMenuSectionProps } from '../restaurant.types.ts'

const props = withDefaults(defineProps<TabbedMenuSectionProps>(), {
  itemLayout: 'inline',
  variant: 'default',
  currency: 'USD',
})

// The page API supplies `cardVariant`; a plain menu list defaults to ghost.
const cardVariant = computed<CardVariant>(() => props.cardVariant ?? 'ghost')
const categories = computed(() => props.menu?.categories ?? [])
const hasHeading = computed(
  () => Boolean(props.heading?.eyebrow || props.heading?.title || props.heading?.body),
)

const active = ref('')
watch(
  categories,
  (list) => {
    if (!list.some((category) => category.key === active.value)) {
      active.value = list[0]?.key ?? ''
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.ui-tabbed-menu-section__header {
  margin-bottom: 1.5rem;
}

.ui-tabbed-menu-section__subline {
  margin: 0 0 1rem;
  color: var(--ui-current-text-secondary);
  font-size: var(--type-body-small-size);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.ui-tabbed-menu-section__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.ui-tabbed-menu-section__item {
  break-inside: avoid;
  padding-block: 0.85rem;
  border-top: 1px solid var(--border_default);
}

.ui-tabbed-menu-section__footnote {
  margin: 1.5rem 0 0;
  color: var(--ui-current-text-secondary);
  font-size: var(--type-body-small-size);
  line-height: 1.7;
}

/* Two columns for the item list where there's room. */
@media (min-width: 48rem) {
  .ui-tabbed-menu-section__list {
    columns: 2;
    column-gap: 3.5rem;
  }
}
</style>

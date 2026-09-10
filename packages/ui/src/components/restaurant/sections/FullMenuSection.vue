<template>
  <BaseSection class="ui-full-menu-section" :variant="props.variant" spacing="xl" width="full">
    <BaseContainer width="xl" padding="lg" center>
      <SectionHeader
        v-if="hasHeading"
        class="ui-full-menu-section__header"
        :eyebrow="props.heading?.eyebrow ?? undefined"
        :title="props.heading?.title ?? undefined"
        :subtitle="props.heading?.body ?? undefined"
        title-as="h1"
        emphasis="prominent"
      />

      <div class="ui-full-menu-section__categories">
        <section
          v-for="category in categories"
          :key="category.key"
          class="ui-full-menu-section__category"
        >
          <h2 class="ui-full-menu-section__category-title">{{ category.label }}</h2>
          <p v-if="category.subline" class="ui-full-menu-section__subline">{{ category.subline }}</p>
          <ul
            class="ui-full-menu-section__list"
            :class="{ 'ui-full-menu-section__list--single': props.columns === 1 }"
          >
            <li
              v-for="(item, index) in category.items"
              :key="index"
              class="ui-full-menu-section__item"
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
        </section>
      </div>

      <p v-if="props.menu?.footnote" class="ui-full-menu-section__footnote">
        {{ props.menu.footnote }}
      </p>
    </BaseContainer>
  </BaseSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseContainer from '../../primitives/container/BaseContainer.vue'
import BaseSection from '../../primitives/section/BaseSection.vue'
import SectionHeader from '../../primitives/section/SectionHeader.vue'
import MenuCard from '../menu-card/MenuCard.vue'
import type { CardVariant, FullMenuSectionProps } from '../restaurant.types.ts'

const props = withDefaults(defineProps<FullMenuSectionProps>(), {
  itemLayout: 'inline',
  columns: 2,
  variant: 'default',
  currency: 'USD',
})

// The page API supplies `cardVariant`; a printed-style menu defaults to ghost.
const cardVariant = computed<CardVariant>(() => props.cardVariant ?? 'ghost')
const categories = computed(() => props.menu?.categories ?? [])
const hasHeading = computed(
  () => Boolean(props.heading?.eyebrow || props.heading?.title || props.heading?.body),
)
</script>

<style scoped>
.ui-full-menu-section__header {
  margin-bottom: 2.5rem;
}

.ui-full-menu-section__categories {
  display: grid;
  gap: 3rem;
}

.ui-full-menu-section__category-title {
  margin: 0 0 0.25rem;
  font-family: var(--font-display);
  font-size: var(--type-heading-sm-size);
  line-height: var(--type-heading-sm-line);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.ui-full-menu-section__subline {
  margin: 0 0 0.75rem;
  color: var(--ui-current-text-secondary);
  font-size: var(--type-body-small-size);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.ui-full-menu-section__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.ui-full-menu-section__item {
  break-inside: avoid;
  padding-block: 0.8rem;
  border-top: 1px solid var(--border_default);
}

.ui-full-menu-section__footnote {
  margin: 2.5rem 0 0;
  color: var(--ui-current-text-secondary);
  font-size: var(--type-body-small-size);
  line-height: 1.7;
}

@media (min-width: 48rem) {
  .ui-full-menu-section__list:not(.ui-full-menu-section__list--single) {
    columns: 2;
    column-gap: 3.5rem;
  }
}
</style>

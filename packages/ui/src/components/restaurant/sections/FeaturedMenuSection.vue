<template>
  <BaseSection class="ui-featured-menu-section" :variant="props.variant" spacing="xl" width="full">
    <BaseContainer width="xl" padding="lg" center>
      <SectionHeader
        v-if="hasHeading"
        class="ui-featured-menu-section__header"
        :eyebrow="props.heading?.eyebrow ?? undefined"
        :title="props.heading?.title ?? undefined"
        :subtitle="props.heading?.body ?? undefined"
        title-as="h2"
      />

      <div
        v-if="items.length"
        class="ui-featured-menu-section__body"
        :class="`ui-featured-menu-section__body--${props.layout}`"
      >
        <MenuCard
          v-for="(item, index) in items"
          :key="index"
          :item="item"
          :layout="cardLayout(index)"
          :variant="cardVariant"
          :currency="props.currency"
          :padding="props.layout === 'grid' ? 'md' : 'none'"
        />
      </div>
    </BaseContainer>
  </BaseSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseContainer from '../../primitives/container/BaseContainer.vue'
import BaseSection from '../../primitives/section/BaseSection.vue'
import SectionHeader from '../../primitives/section/SectionHeader.vue'
import MenuCard from '../menu-card/MenuCard.vue'
import type { CardVariant, MenuCardLayout, FeaturedMenuSectionProps } from '../restaurant.types.ts'

const props = withDefaults(defineProps<FeaturedMenuSectionProps>(), {
  layout: 'grid',
  variant: 'default',
  currency: 'USD',
})

const items = computed(() => props.items ?? [])
const hasHeading = computed(
  () => Boolean(props.heading?.eyebrow || props.heading?.title || props.heading?.body),
)
// The page API supplies `cardVariant`; without it a grid gets card chrome and
// the alternating rows stay flat.
const cardVariant = computed<CardVariant>(
  () => props.cardVariant ?? (props.layout === 'grid' ? 'surface' : 'ghost'),
)

function cardLayout(index: number): MenuCardLayout {
  if (props.layout === 'grid') return 'media-top'
  return index % 2 === 0 ? 'media-left' : 'media-right'
}
</script>

<style scoped>
.ui-featured-menu-section__header {
  margin-bottom: 1.5rem;
}

.ui-featured-menu-section__body--grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  gap: 1.5rem;
  align-items: stretch;
}

.ui-featured-menu-section__body--alternating {
  display: grid;
  gap: 0.5rem;
  max-width: 46rem;
  margin-inline: auto;
}

/* Direct children are the MenuCard roots; the row rhythm is the section's. */
.ui-featured-menu-section__body--alternating > * {
  padding-block: 0.9rem;
  border-top: 1px solid var(--border_default);
}
</style>

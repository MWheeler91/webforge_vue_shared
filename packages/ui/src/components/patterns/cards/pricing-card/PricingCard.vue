<template>
  <div :class="classes">
    <BaseCard
      :as="props.as"
      :variant="props.variant"
      :padding="props.padding"
      :interactive="props.interactive"
      :unstyled="props.unstyled"
      v-bind="$attrs"
      class="ui-pricing-card__card"
    >
      <CardBody v-if="hasContent" class="ui-pricing-card__content">
        <div class="ui-pricing-card__summary">
          <div v-if="label || title" class="ui-pricing-card__heading">
            <BaseBadge v-if="label" v-bind="label">{{ label.text }}</BaseBadge>
            <CardTitle v-if="title" :payload="title" />
          </div>
          <p v-if="price !== null && price !== undefined" class="ui-pricing-card__price">{{ price }}</p>
          <CardSubtitle v-if="body" :payload="body" />
        </div>

        <template v-if="layout !== 'compact' && items.length">
          <CardDivider v-if="showDivider && layout !== 'horizontal'" aria-hidden="true" />
          <ul class="ui-pricing-card__items">
            <li v-for="(item, index) in items" :key="index">
              <span class="ui-pricing-card__item-title">{{ item.title }}</span>
              <span v-if="item.description" class="ui-pricing-card__item-description">{{
                item.description
              }}</span>
            </li>
          </ul>
        </template>
      </CardBody>

      <CardFooter v-if="actions.length" class="ui-pricing-card__actions">
        <BaseButton v-for="(action, index) in actions" :key="action.id ?? index" v-bind="action">{{
          action.label
        }}</BaseButton>
      </CardFooter>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseBadge from '../../../primitives/badge/BaseBadge.vue'
import BaseButton from '../../../primitives/button/BaseButton.vue'
import BaseCard from '../../../primitives/card/BaseCard.vue'
import CardBody from '../../../primitives/card/CardBody.vue'
import CardDivider from '../../../primitives/card/CardDivider.vue'
import CardFooter from '../../../primitives/card/CardFooter.vue'
import CardSubtitle from '../../../primitives/card/CardSubtitle.vue'
import CardTitle from '../../../primitives/card/CardTitle.vue'
import { collectionItems, textPayload } from '../../../primitives/card/card.types.ts'
import { cn } from '../../../../utils/classNames.ts'
import type { PricingCardProps } from './PricingCard.types.ts'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PricingCardProps>(), {
  as: 'article',
  variant: 'surface',
  padding: 'md',
  interactive: false,
  unstyled: false,
  layout: 'default',
  featured: false,
  divider: true,
  label: null,
  title: null,
  price: null,
  body: null,
  items: null,
  actions: null,
})

const label = computed(() => props.label)
const title = computed(() => textPayload(props.title))
const body = computed(() => textPayload(props.body))
const items = computed(() => collectionItems(props.items))
const actions = computed(() => collectionItems(props.actions))
const showDivider = computed(() => props.divider)
const hasContent = computed(
  () => Boolean(label.value || title.value || props.price != null || body.value) || items.value.length > 0,
)

const classes = computed(() =>
  cn(
    'ui-pricing-card',
    `ui-pricing-card--layout-${props.layout}`,
    props.featured && 'ui-pricing-card--featured',
  ),
)
</script>

<style scoped>
.ui-pricing-card {
  container-type: inline-size;
  min-width: 0;
  width: 100%;
}

.ui-pricing-card__card {
  min-width: 0;
  width: 100%;
  height: 100%;
}

.ui-pricing-card__content {
  min-width: 0;
}

.ui-pricing-card__summary {
  display: grid;
  gap: 0.5rem;
  min-width: 0;
}

.ui-pricing-card__heading {
  display: grid;
  gap: 0.5rem;
  justify-items: start;
}

.ui-pricing-card__price {
  margin: 0;
  color: var(--brand);
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.1;
}

.ui-pricing-card__items {
  display: grid;
  gap: 0.625rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ui-pricing-card__items li {
  display: grid;
  gap: 0.125rem;
}

.ui-pricing-card__item-title {
  color: inherit;
}

.ui-pricing-card__item-description {
  display: block;
  color: var(--ui-current-text-secondary);
  font-size: var(--type-body-small-size);
  line-height: var(--type-body-small-line);
}

.ui-pricing-card__actions {
  margin-top: auto;
  padding-block-start: 1.25rem;
}

/* featured: an accent top border and a soft brand tint call the plan out among siblings */
.ui-pricing-card--featured .ui-pricing-card__card {
  border-top: 3px solid var(--brand);
  background: color-mix(in srgb, var(--brand) 5%, var(--bg_surface));
}

/* horizontal: summary and feature list sit side by side for a wide consumer slot.
   The divider is skipped in the template for this layout — as an unassigned
   grid child it would auto-place into column 2's first row ahead of the items
   list rather than sitting between the two columns. */
.ui-pricing-card--layout-horizontal .ui-pricing-card__content {
  display: grid;
  grid-template-columns: minmax(12rem, 1fr) minmax(0, 1.2fr);
  gap: 1.5rem;
  align-items: start;
}

.ui-pricing-card--layout-horizontal .ui-pricing-card__summary {
  grid-column: 1;
}

.ui-pricing-card--layout-horizontal .ui-pricing-card__items {
  grid-column: 2;
}

@container (max-width: 28rem) {
  .ui-pricing-card--layout-horizontal .ui-pricing-card__content {
    grid-template-columns: 1fr;
  }

  .ui-pricing-card--layout-horizontal .ui-pricing-card__summary,
  .ui-pricing-card--layout-horizontal .ui-pricing-card__items {
    grid-column: 1;
  }
}

/* compact: tighter footprint for a comparison-table row */
.ui-pricing-card--layout-compact .ui-pricing-card__price {
  font-size: 1.5rem;
}
</style>

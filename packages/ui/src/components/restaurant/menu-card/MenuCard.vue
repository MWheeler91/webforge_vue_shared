<template>
  <div v-if="name" :class="classes">
    <BaseCard
      as="article"
      :variant="props.variant"
      padding="none"
      :interactive="props.interactive"
      :unstyled="props.unstyled"
      v-bind="$attrs"
      class="ui-menu-card__card"
    >
      <CardMedia v-if="showImage" class="ui-menu-card__media">
        <img :src="image?.src" :alt="image?.alt ?? ''" />
      </CardMedia>

      <div class="ui-menu-card__content">
        <p v-if="flag" class="ui-menu-card__flag">{{ flag }}</p>

        <div class="ui-menu-card__head">
          <CardTitle :payload="{ text: name }" class="ui-menu-card__name" />
          <span v-if="activePrice" class="ui-menu-card__prices">
            <s v-if="originalPrice" class="ui-menu-card__price-was">{{ originalPrice }}</s>
            <span
              class="ui-menu-card__price"
              :class="{ 'ui-menu-card__price--sale': originalPrice }"
            >{{ activePrice }}</span>
          </span>
        </div>

        <ul v-if="tags.length" class="ui-menu-card__tags">
          <li v-for="tag in tags" :key="tag" class="ui-menu-card__tag">
            <BaseBadge variant="neutral" tone="soft" size="sm">{{ tag }}</BaseBadge>
          </li>
        </ul>

        <CardSubtitle
          v-if="showDescription"
          :payload="{ text: description }"
          class="ui-menu-card__description"
        />
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseBadge from '../../primitives/badge/BaseBadge.vue'
import BaseCard from '../../primitives/card/BaseCard.vue'
import CardMedia from '../../primitives/card/CardMedia.vue'
import CardSubtitle from '../../primitives/card/CardSubtitle.vue'
import CardTitle from '../../primitives/card/CardTitle.vue'
import { cn } from '../../../utils/classNames.ts'
import { formatMenuPrice } from './menuPrice.ts'
import {
  MENU_CARD_MEDIA_LAYOUTS,
  type MenuCardLayout,
  type MenuCardProps,
} from './MenuCard.types.ts'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<MenuCardProps>(), {
  variant: 'ghost',
  padding: 'md',
  interactive: false,
  unstyled: false,
  layout: 'inline',
  currency: 'USD',
})

const name = computed(() => props.item?.name?.trim() ?? '')
const description = computed(() => props.item?.description?.trim() ?? '')
const flag = computed(() => props.item?.flag?.trim() ?? '')
const image = computed(() => props.item?.image ?? null)
const tags = computed(() => (props.item?.tags ?? []).map((tag) => tag.trim()).filter(Boolean))

const priceLabel = computed(() => formatMenuPrice(props.item?.price, props.currency))
const salePriceLabel = computed(() => formatMenuPrice(props.item?.salePrice, props.currency))
// The active price is the sale price when present; the regular price is only
// shown (struck through) when it is being discounted.
const activePrice = computed(() => salePriceLabel.value ?? priceLabel.value)
const originalPrice = computed(() =>
  salePriceLabel.value && priceLabel.value ? priceLabel.value : null,
)

const isMediaLayout = computed(() =>
  (MENU_CARD_MEDIA_LAYOUTS as readonly string[]).includes(props.layout),
)
const showImage = computed(() => isMediaLayout.value && Boolean(image.value))
const showDescription = computed(
  () => props.layout !== 'compact' && Boolean(description.value),
)

// A card with a visible boundary must always inset its content from the edge.
const isBordered = computed(() => props.variant !== 'ghost' && !props.unstyled)

// A media layout with no image degrades to the matching text arrangement.
const effectiveLayout = computed<MenuCardLayout>(() => {
  if (isMediaLayout.value && !image.value) {
    return props.layout === 'media-left' || props.layout === 'media-right'
      ? 'inline'
      : 'stacked'
  }
  return props.layout
})

const classes = computed(() =>
  cn(
    'ui-menu-card',
    `ui-menu-card--layout-${effectiveLayout.value}`,
    `ui-menu-card--pad-${props.padding}`,
    showImage.value && 'ui-menu-card--has-image',
    isBordered.value && 'ui-menu-card--bordered',
    originalPrice.value && 'ui-menu-card--on-sale',
  ),
)
</script>

<style scoped>
.ui-menu-card {
  container-type: inline-size;
  min-width: 0;
  width: 100%;
  /* Fill an equal-height grid cell when a consumer sets one; a no-op otherwise. */
  height: 100%;
}

.ui-menu-card__card {
  min-width: 0;
  width: 100%;
  height: 100%;
}

/* A ghost menu card draws no surface, so the pack's card radius has nothing to
   round — but `.ui-card` still applies it together with `overflow: hidden`, and
   on a flush (padding="none") list card the rounded corners clip the title and
   tags. Opt the borderless card out of both. Bordered cards keep their radius;
   their content inset stays clear of the curve. */
.ui-menu-card:not(.ui-menu-card--bordered) .ui-menu-card__card {
  border-radius: 0;
  overflow: visible;
}

.ui-menu-card--pad-none {
  --ui-menu-card-pad: 0rem;
}
.ui-menu-card--pad-sm {
  --ui-menu-card-pad: 0.75rem;
}
.ui-menu-card--pad-md {
  --ui-menu-card-pad: 1rem;
}
.ui-menu-card--pad-lg {
  --ui-menu-card-pad: 1.5rem;
}

.ui-menu-card__content {
  --ui-menu-card-inset: var(--ui-menu-card-pad, 0rem);
  min-width: 0;
  display: grid;
  gap: 0.35rem;
  align-content: start;
  padding: var(--ui-menu-card-inset);
}

/* A bordered card never lets its text or price touch the edge, even when the
   consumer passed padding="none"; the floor matches the image/text gap. */
.ui-menu-card--bordered .ui-menu-card__content {
  --ui-menu-card-inset: max(var(--ui-menu-card-pad, 0rem), 0.85rem);
}

/* On the side facing the photo, the column gap already provides the separation. */
.ui-menu-card--bordered.ui-menu-card--layout-media-left .ui-menu-card__content {
  padding-left: 0;
}
.ui-menu-card--bordered.ui-menu-card--layout-media-right .ui-menu-card__content {
  padding-right: 0;
}

.ui-menu-card__flag {
  margin: 0;
  color: var(--ui-current-text-secondary);
  font-size: var(--type-body-small-size);
  line-height: 1.3;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.ui-menu-card__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  min-width: 0;
}

.ui-menu-card__name {
  min-width: 0;
}

.ui-menu-card__prices {
  flex: none;
  display: inline-flex;
  align-items: baseline;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-variant-numeric: tabular-nums;
}

.ui-menu-card__price {
  color: var(--ui-current-text-secondary);
}

.ui-menu-card__price--sale {
  color: var(--brand);
  font-weight: 600;
}

.ui-menu-card__price-was {
  color: var(--ui-current-text-secondary);
  opacity: 0.65;
  font-size: 0.9em;
  text-decoration-thickness: from-font;
}

.ui-menu-card__tags {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
}

.ui-menu-card__tag {
  display: inline-flex;
}

/* Cancel the global `li + li` rhythm margin so wrapped tags stay on one baseline. */
.ui-menu-card__tags .ui-menu-card__tag + .ui-menu-card__tag {
  margin-top: 0;
}

.ui-menu-card__description {
  min-width: 0;
}

/* stacked: name above the price, nothing baseline-aligned */
.ui-menu-card--layout-stacked .ui-menu-card__head {
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
}

/* compact: one dense line; the component suppresses the description */
.ui-menu-card--layout-compact .ui-menu-card__content {
  gap: 0.2rem;
}

.ui-menu-card__media {
  min-width: 0;
}

/* media-top: photo flush to the card edge, text below */
.ui-menu-card--layout-media-top .ui-menu-card__media {
  aspect-ratio: 3 / 2;
  min-height: 0;
}

.ui-menu-card--layout-media-top .ui-menu-card__head {
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
}

/* media-left / media-right: square thumbnail flush on one side, text on the
   other. media-right reorders the photo to the second column so a list can
   alternate sides. */
.ui-menu-card--layout-media-left .ui-menu-card__card,
.ui-menu-card--layout-media-right .ui-menu-card__card {
  display: grid;
  align-items: stretch;
  column-gap: 0.85rem;
}

/* The photo scales with the card so it stays substantial in a wide editorial
   row and stays a thumbnail in a narrow list column. */
.ui-menu-card--layout-media-left .ui-menu-card__card {
  grid-template-columns: clamp(4.5rem, 22%, 8.5rem) minmax(0, 1fr);
}

.ui-menu-card--layout-media-right .ui-menu-card__card {
  grid-template-columns: minmax(0, 1fr) clamp(4.5rem, 22%, 8.5rem);
}

.ui-menu-card--layout-media-right .ui-menu-card__media {
  order: 2;
}

/* The photo fills the full height of the text beside it — flush top and bottom —
   so the card carries no dead space, even as the description grows to two lines.
   A floor keeps a short item from collapsing the image to a sliver. */
.ui-menu-card--layout-media-left .ui-menu-card__media,
.ui-menu-card--layout-media-right .ui-menu-card__media {
  align-self: stretch;
  min-height: 5.5rem;
  height: 100%;
}

@container (max-width: 20rem) {
  .ui-menu-card--layout-media-left .ui-menu-card__card,
  .ui-menu-card--layout-media-right .ui-menu-card__card {
    grid-template-columns: 1fr;
  }

  /* Stacked, the photo always sits on top regardless of side. */
  .ui-menu-card--layout-media-right .ui-menu-card__media {
    order: 0;
  }

  .ui-menu-card--layout-media-left .ui-menu-card__media,
  .ui-menu-card--layout-media-right .ui-menu-card__media {
    aspect-ratio: 3 / 2;
    align-self: start;
    min-height: 0;
    height: auto;
  }
}

/* spotlight: a featured item — photo and content side by side, stacking on a
   narrow card. The photo fills the content's height (no dead space) and its
   column is kept fairly narrow so the crop reads closer to square. */
.ui-menu-card--layout-spotlight .ui-menu-card__card {
  display: grid;
  grid-template-columns: minmax(0, clamp(7rem, 22%, 13rem)) minmax(0, 1fr);
  align-items: stretch;
}

.ui-menu-card--layout-spotlight .ui-menu-card__media {
  position: relative;
  min-height: 8rem;
}

.ui-menu-card--layout-spotlight .ui-menu-card__media :deep(img) {
  position: absolute;
  inset: 0;
}

.ui-menu-card--layout-spotlight .ui-menu-card__content {
  padding: clamp(1rem, 4%, 2rem);
  gap: 0.5rem;
}

.ui-menu-card--layout-spotlight .ui-menu-card__name {
  font-size: var(--type-heading-md-size);
  line-height: var(--type-heading-md-line);
  letter-spacing: var(--type-heading-md-letter);
}

.ui-menu-card--layout-spotlight .ui-menu-card__description {
  font-size: var(--type-body-standard-size);
  line-height: var(--type-body-standard-line);
}

@container (max-width: 34rem) {
  .ui-menu-card--layout-spotlight .ui-menu-card__card {
    grid-template-columns: 1fr;
  }

  .ui-menu-card--layout-spotlight .ui-menu-card__media {
    aspect-ratio: 16 / 9;
    min-height: 0;
    height: auto;
  }
}
</style>

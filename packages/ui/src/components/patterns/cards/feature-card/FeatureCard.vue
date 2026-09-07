<template>
  <div :class="classes">
    <BaseCard
      :as="props.as"
      :variant="props.variant"
      :padding="props.padding"
      :interactive="props.interactive"
      :unstyled="props.unstyled"
      v-bind="$attrs"
      class="ui-feature-card__card"
    >
      <CardMedia v-if="props.media" class="ui-feature-card__media">
        <img :src="props.media.src" :alt="props.media.alt ?? ''" />
      </CardMedia>

      <div class="ui-feature-card__main">
        <CardBody v-if="hasContent" class="ui-feature-card__content">
          <Icon
            v-if="props.icon"
            class="ui-feature-card__icon"
            :icon="props.icon"
            aria-hidden="true"
          />
          <div v-if="eyebrow || badges.length" class="ui-feature-card__meta">
            <component
              :is="eyebrow.as ?? 'small'"
              v-if="eyebrow"
              class="ui-feature-card__eyebrow"
              :data-emphasis="eyebrow.emphasis"
              >{{ eyebrow.text }}</component
            >
            <div v-if="badges.length" class="ui-feature-card__badges">
              <BaseBadge v-for="(badge, index) in badges" :key="index" v-bind="badge">
                {{ badge.text }}
              </BaseBadge>
            </div>
          </div>
          <CardTitle v-if="title" :as="title.as ?? 'h3'" :data-emphasis="title.emphasis">{{
            title.text
          }}</CardTitle>
          <CardSubtitle v-if="body" :as="body.as ?? 'p'" :data-emphasis="body.emphasis">{{
            body.text
          }}</CardSubtitle>
        </CardBody>

        <CardFooter v-if="actions.length" class="ui-feature-card__actions">
          <BaseButton v-for="(action, index) in actions" :key="action.id ?? index" v-bind="action">
            {{ action.label }}
          </BaseButton>
        </CardFooter>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import BaseButton from '../../../primitives/button/BaseButton.vue'
import BaseBadge from '../../../primitives/badge/BaseBadge.vue'
import BaseCard from '../../../primitives/card/BaseCard.vue'
import CardBody from '../../../primitives/card/CardBody.vue'
import CardFooter from '../../../primitives/card/CardFooter.vue'
import CardMedia from '../../../primitives/card/CardMedia.vue'
import CardSubtitle from '../../../primitives/card/CardSubtitle.vue'
import CardTitle from '../../../primitives/card/CardTitle.vue'
import { collectionItems, textPayload } from '../../../primitives/card/card.types.ts'
import { cn } from '../../../../utils/classNames.ts'
import type { FeatureCardProps } from './FeatureCard.types.ts'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<FeatureCardProps>(), {
  as: 'article',
  variant: 'surface',
  padding: 'md',
  interactive: false,
  unstyled: false,
  layout: 'stacked',
  mediaAspect: 'auto',
  badges: null,
  actions: null,
  media: null,
})

const badges = computed(() => collectionItems(props.badges))
const actions = computed(() => collectionItems(props.actions))
const eyebrow = computed(() => textPayload(props.eyebrow))
const title = computed(() => textPayload(props.title))
const body = computed(() => textPayload(props.body))
const hasContent = computed(() =>
  Boolean(props.icon || eyebrow.value || title.value || body.value || badges.value.length),
)
const effectiveLayout = computed(() =>
  props.layout === 'split' && props.media ? 'split' : 'stacked',
)
const classes = computed(() =>
  cn(
    'ui-feature-card',
    `ui-feature-card--layout-${effectiveLayout.value}`,
    props.media && 'ui-feature-card--has-media',
    props.mediaAspect === 'square' && 'ui-feature-card--media-square',
  ),
)
</script>

<style scoped>
.ui-feature-card {
  container-type: inline-size;
  min-width: 0;
  width: 100%;
}

.ui-feature-card__card {
  min-width: 0;
  width: 100%;
}

.ui-feature-card__content {
  min-width: 0;
}

.ui-feature-card__main {
  min-width: 0;
}

.ui-feature-card__icon {
  display: block;
  width: fit-content;
  color: var(--brand);
  font-size: 1.75rem;
  line-height: 1;
}

.ui-feature-card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 1rem;
}

.ui-feature-card__eyebrow {
  display: block;
  color: var(--ui-current-text-secondary);
  font-size: var(--type-body-small-size);
  line-height: var(--type-body-small-line);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.ui-feature-card__badges,
.ui-feature-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ui-feature-card__badges {
  justify-content: flex-end;
}

.ui-feature-card__actions {
  margin-top: auto;
  padding-block-start: 1.25rem;
}

.ui-feature-card--layout-split .ui-feature-card__card {
  display: grid;
  grid-template-columns: minmax(8rem, 34%) minmax(0, 1fr);
  column-gap: 1.5rem;
  align-items: stretch;
}

.ui-feature-card--layout-split:not(.ui-feature-card--has-media) .ui-feature-card__card {
  grid-template-columns: 1fr;
}

.ui-feature-card--layout-split .ui-feature-card__card > .ui-feature-card__media {
  grid-column: 1;
  grid-row: 1;
  width: 100%;
  min-width: 0;
  min-height: 100%;
}

.ui-feature-card--media-square .ui-feature-card__media {
  aspect-ratio: 1;
  min-height: 0;
}

.ui-feature-card--layout-split .ui-feature-card__card > .ui-feature-card__main {
  grid-column: 2;
  grid-row: 1;
  display: flex;
  width: 100%;
  min-width: 0;
  flex-direction: column;
}

.ui-feature-card--layout-split:not(.ui-feature-card--has-media) .ui-feature-card__main {
  grid-column: 1;
}

.ui-feature-card__actions {
  padding-top: 1rem;
}

@container (max-width: 24rem) {
  .ui-feature-card--layout-split .ui-feature-card__card {
    grid-template-columns: 1fr;
  }

  .ui-feature-card--layout-split .ui-feature-card__card > .ui-feature-card__media,
  .ui-feature-card--layout-split .ui-feature-card__card > .ui-feature-card__main {
    grid-column: 1;
    grid-row: auto;
  }

  .ui-feature-card--layout-split .ui-feature-card__card > .ui-feature-card__media {
    min-height: 11rem;
  }

  .ui-feature-card--layout-split .ui-feature-card__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .ui-feature-card--layout-split .ui-feature-card__actions :deep(.ui-btn) {
    width: 100%;
  }
}
</style>

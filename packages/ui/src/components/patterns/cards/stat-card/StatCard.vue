<template>
  <div :class="classes">
    <BaseCard
      :as="props.as"
      :variant="props.variant"
      :padding="props.padding"
      :interactive="props.interactive"
      :unstyled="props.unstyled"
      v-bind="$attrs"
      class="ui-stat-card__card"
    >
      <CardBody v-if="hasContent" class="ui-stat-card__content">
        <p v-if="value !== null && value !== undefined" class="ui-stat-card__value">{{ value }}</p>
        <div v-if="label || title || body" class="ui-stat-card__copy">
          <BaseBadge v-if="label" v-bind="label">{{ label.text }}</BaseBadge>
          <CardTitle v-if="title" :as="title.as ?? 'h4'" :data-emphasis="title.emphasis">{{
            title.text
          }}</CardTitle>
          <CardSubtitle v-if="body" :as="body.as ?? 'p'" :data-emphasis="body.emphasis">{{
            body.text
          }}</CardSubtitle>
        </div>
      </CardBody>
      <CardFooter v-if="footer" class="ui-stat-card__footer">{{ footer.text }}</CardFooter>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseBadge from '../../../primitives/badge/BaseBadge.vue'
import BaseCard from '../../../primitives/card/BaseCard.vue'
import CardBody from '../../../primitives/card/CardBody.vue'
import CardFooter from '../../../primitives/card/CardFooter.vue'
import CardSubtitle from '../../../primitives/card/CardSubtitle.vue'
import CardTitle from '../../../primitives/card/CardTitle.vue'
import { textPayload } from '../../../primitives/card/card.types.ts'
import { cn } from '../../../../utils/classNames.ts'
import type { StatCardProps } from './StatCard.types.ts'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<StatCardProps>(), {
  as: 'article',
  variant: 'surface',
  padding: 'md',
  interactive: false,
  unstyled: false,
  layout: 'default',
  label: null,
  value: null,
  title: null,
  body: null,
  footer: null,
})

const label = computed(() => props.label)
const title = computed(() => textPayload(props.title))
const body = computed(() => textPayload(props.body))
const footer = computed(() => textPayload(props.footer))
const hasContent = computed(
  () => props.value !== null && props.value !== undefined || Boolean(label.value || title.value || body.value),
)

const classes = computed(() => cn('ui-stat-card', `ui-stat-card--layout-${props.layout}`))
</script>

<style scoped>
.ui-stat-card {
  container-type: inline-size;
  min-width: 0;
  width: 100%;
}

.ui-stat-card__card {
  min-width: 0;
  width: 100%;
  height: 100%;
}

.ui-stat-card__content {
  min-width: 0;
}

.ui-stat-card__value {
  margin: 0;
  color: var(--brand);
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 900;
  line-height: 1;
}

.ui-stat-card__copy {
  display: grid;
  gap: 0.375rem;
  min-width: 0;
}

.ui-stat-card__footer {
  margin-top: auto;
  padding-block-start: 1.25rem;
  color: var(--ui-current-text-secondary);
  font-size: var(--type-body-small-size);
  line-height: var(--type-body-small-line);
}

/* horizontal: value sits beside the label/title/body block, for a dashboard row.
   The copy column keeps an 8rem floor so a wide value (e.g. "12,400+") can't
   squeeze it down to a sliver — below that combined width the layout falls
   back to stacked instead of clipping text against the card edge. */
.ui-stat-card--layout-horizontal .ui-stat-card__content {
  display: grid;
  grid-template-columns: auto minmax(8rem, 1fr);
  align-items: center;
  gap: 1.25rem;
}

@container (max-width: 22rem) {
  .ui-stat-card--layout-horizontal .ui-stat-card__content {
    grid-template-columns: 1fr;
  }
}
</style>

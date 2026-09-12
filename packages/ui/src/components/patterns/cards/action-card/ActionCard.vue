<!--
  DRAFT — not part of the public contract. Copied in from the app-local
  `DemoActionCard` (playground `src/components/demos/cards/action-card/`)
  so `card-gallery` can stop depending on app-local demo code, without
  promising this shape as a real, finished pattern. See the note in
  `../index.ts` before exporting or building on this component.
-->
<template>
  <BaseCard
    :variant="props.variant"
    :padding="props.padding"
    :interactive="props.interactive"
    :unstyled="props.unstyled"
    :class="['ui-action-card', `ui-action-card--${safeLayout}`]"
  >
    <CardMedia v-if="resolvedMedia && safeLayout === 'with-media'" class="ui-action-card__media">
      <img :src="resolvedMedia.src" :alt="resolvedMedia.alt ?? ''" />
    </CardMedia>
    <CardBody v-if="label || resolvedHeading || resolvedBody || actions.length">
      <div v-if="label || resolvedHeading || resolvedBody" class="ui-action-card__copy">
        <BaseBadge v-if="label" v-bind="label">{{ label.text }}</BaseBadge>
        <CardTitle v-if="resolvedHeading" :payload="resolvedHeading" />
        <CardSubtitle v-if="resolvedBody" :payload="resolvedBody" />
      </div>
    </CardBody>
    <CardFooter v-if="actions.length" class="ui-action-card__actions">
      <BaseButton v-for="(action, index) in actions" :key="action.id ?? index" v-bind="action">
        {{ action.label }}
      </BaseButton>
    </CardFooter>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseBadge from '../../../primitives/badge/BaseBadge.vue'
import BaseButton from '../../../primitives/button/BaseButton.vue'
import BaseCard from '../../../primitives/card/BaseCard.vue'
import CardBody from '../../../primitives/card/CardBody.vue'
import CardFooter from '../../../primitives/card/CardFooter.vue'
import CardMedia from '../../../primitives/card/CardMedia.vue'
import CardSubtitle from '../../../primitives/card/CardSubtitle.vue'
import CardTitle from '../../../primitives/card/CardTitle.vue'
import { collectionItems, mediaPayload, textPayload } from '../../../primitives/card/card.types.ts'
import type { ActionCardProps } from './ActionCard.types.ts'

const props = withDefaults(defineProps<ActionCardProps>(), { layout: 'default' })

const safeLayout = computed(() =>
  ['default', 'centered', 'split', 'with-media', 'banner'].includes(props.layout ?? '')
    ? props.layout
    : 'default',
)
const label = computed(() => props.label)
const resolvedHeading = computed(() => textPayload(props.heading ?? props.title ?? props.name))
const resolvedBody = computed(() => textPayload(props.body))
const resolvedMedia = computed(() => mediaPayload(props))
const actions = computed(() => collectionItems(props.buttons ?? props.actions))
</script>

<style scoped>
.ui-action-card__copy {
  display: grid;
  gap: 0.75rem;
  min-width: 0;
}
.ui-action-card--centered {
  text-align: center;
}
.ui-action-card--banner :deep(.ui-card__body) {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.ui-action-card--banner .ui-action-card__copy {
  flex: 1 1 16rem;
}
.ui-action-card--banner .ui-action-card__actions {
  flex: 0 1 auto;
  max-width: 100%;
  margin-top: 0;
}
</style>

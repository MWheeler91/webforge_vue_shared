<template>
  <div :class="classes">
    <BaseCard
      :as="props.as"
      :variant="props.variant"
      :padding="props.padding"
      :interactive="props.interactive"
      :unstyled="props.unstyled"
      v-bind="$attrs"
      class="ui-media-card__card"
    >
      <figure class="ui-media-card__figure">
        <CardMedia class="ui-media-card__media">
          <img :src="props.media.src" :alt="props.media.alt ?? ''" />
        </CardMedia>
        <figcaption v-if="caption || credit" class="ui-media-card__figcaption">
          <component :is="caption.as ?? 'p'" v-if="caption" class="ui-media-card__caption" :data-emphasis="caption.emphasis">{{ caption.text }}</component>
          <component :is="credit.as ?? 'span'" v-if="credit" class="ui-media-card__credit" :data-emphasis="credit.emphasis">{{ credit.text }}</component>
        </figcaption>
      </figure>
      <div class="ui-media-card__content">
        <CardBody class="ui-media-card__body">
          <CardTitle v-if="title" :as="title.as ?? 'h3'" :data-emphasis="title.emphasis">{{ title.text }}</CardTitle>
          <CardSubtitle v-if="body" :as="body.as ?? 'p'" :data-emphasis="body.emphasis">{{ body.text }}</CardSubtitle>
        </CardBody>
        <CardFooter v-if="actions.length" class="ui-media-card__actions">
          <BaseButton v-for="(action, index) in actions" :key="action.id ?? index" v-bind="action">{{ action.label }}</BaseButton>
        </CardFooter>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '../../../primitives/button/BaseButton.vue'
import BaseCard from '../../../primitives/card/BaseCard.vue'
import CardBody from '../../../primitives/card/CardBody.vue'
import CardFooter from '../../../primitives/card/CardFooter.vue'
import CardMedia from '../../../primitives/card/CardMedia.vue'
import CardSubtitle from '../../../primitives/card/CardSubtitle.vue'
import CardTitle from '../../../primitives/card/CardTitle.vue'
import { collectionItems, textPayload } from '../../../primitives/card/card.types.ts'
import { cn } from '../../../../utils/classNames.ts'
import type { MediaCardProps } from './MediaCard.types.ts'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<MediaCardProps>(), {
  as: 'article', variant: 'surface', padding: 'md', interactive: false, unstyled: false,
  layout: 'framed', actions: null,
})
const title = computed(() => textPayload(props.title))
const body = computed(() => textPayload(props.body))
const caption = computed(() => textPayload(props.caption))
const credit = computed(() => textPayload(props.credit))
const actions = computed(() => collectionItems(props.actions))
const classes = computed(() => cn('ui-media-card', `ui-media-card--layout-${props.layout}`))
</script>

<style scoped>
.ui-media-card { container-type: inline-size; min-width: 0; width: 100%; }
.ui-media-card__card { min-width: 0; width: 100%; }
.ui-media-card__figure, .ui-media-card__content, .ui-media-card__body { min-width: 0; }
.ui-media-card__figure { margin: 0; display: grid; gap: 0.75rem; }
.ui-media-card__body { gap: 0.75rem; }
.ui-media-card__figcaption { display: grid; gap: 0.25rem; }
.ui-media-card__caption, .ui-media-card__credit { margin: 0; color: var(--ui-current-text-secondary); font-size: var(--type-body-small-size); line-height: var(--type-body-small-line); }
.ui-media-card__actions { margin-top: auto; }
.ui-media-card--layout-framed .ui-media-card__media { aspect-ratio: 3 / 2; min-height: 0; }
.ui-media-card--layout-immersive .ui-media-card__media { aspect-ratio: 16 / 9; min-height: 0; }
.ui-media-card--layout-immersive .ui-media-card__content { border-block-start: 0; }
</style>

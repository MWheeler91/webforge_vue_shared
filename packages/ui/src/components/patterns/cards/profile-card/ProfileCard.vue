<template>
  <div :class="classes">
    <BaseCard
      :as="props.as"
      :variant="props.variant"
      :padding="props.padding"
      :interactive="props.interactive"
      :unstyled="props.unstyled"
      v-bind="$attrs"
      class="ui-profile-card__card"
    >
      <CardBody v-if="hasContent" class="ui-profile-card__content">
        <img v-if="avatar" class="ui-profile-card__avatar" :src="avatar.src" :alt="avatar.alt ?? ''" />
        <div v-if="title || subheading || showBody" class="ui-profile-card__copy">
          <CardTitle v-if="title" :as="title.as ?? 'h3'" :data-emphasis="title.emphasis">{{
            title.text
          }}</CardTitle>
          <CardSubtitle v-if="subheading" :as="subheading.as ?? 'p'" :data-emphasis="subheading.emphasis">{{
            subheading.text
          }}</CardSubtitle>
          <CardSubtitle v-if="showBody" :as="body!.as ?? 'p'" :data-emphasis="body!.emphasis">{{
            body!.text
          }}</CardSubtitle>
        </div>
      </CardBody>
      <CardFooter v-if="actions.length" class="ui-profile-card__actions">
        <BaseButton v-for="(action, index) in actions" :key="action.id ?? index" v-bind="action">{{
          action.label
        }}</BaseButton>
      </CardFooter>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '../../../primitives/button/BaseButton.vue'
import BaseCard from '../../../primitives/card/BaseCard.vue'
import CardBody from '../../../primitives/card/CardBody.vue'
import CardFooter from '../../../primitives/card/CardFooter.vue'
import CardSubtitle from '../../../primitives/card/CardSubtitle.vue'
import CardTitle from '../../../primitives/card/CardTitle.vue'
import { collectionItems, textPayload } from '../../../primitives/card/card.types.ts'
import { cn } from '../../../../utils/classNames.ts'
import type { ProfileCardProps } from './ProfileCard.types.ts'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ProfileCardProps>(), {
  as: 'article',
  variant: 'surface',
  padding: 'md',
  interactive: false,
  unstyled: false,
  layout: 'portrait-top',
  avatar: null,
  title: null,
  subheading: null,
  body: null,
  actions: null,
})

const avatar = computed(() => props.avatar)
const title = computed(() => textPayload(props.title))
const subheading = computed(() => textPayload(props.subheading))
const body = computed(() => textPayload(props.body))
const showBody = computed(() => props.layout !== 'compact' && Boolean(body.value))
const actions = computed(() => collectionItems(props.actions))
const hasContent = computed(
  () => Boolean(avatar.value || title.value || subheading.value || showBody.value),
)

const classes = computed(() => cn('ui-profile-card', `ui-profile-card--layout-${props.layout}`))
</script>

<style scoped>
.ui-profile-card {
  container-type: inline-size;
  min-width: 0;
  width: 100%;
}

.ui-profile-card__card {
  min-width: 0;
  width: 100%;
  height: 100%;
}

.ui-profile-card__content {
  min-width: 0;
  align-items: center;
  text-align: center;
}

.ui-profile-card__avatar {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
  justify-self: center;
}

.ui-profile-card__copy {
  display: grid;
  gap: 0.25rem;
  min-width: 0;
  justify-items: center;
}

.ui-profile-card__actions {
  margin-top: auto;
  justify-content: center;
  padding-block-start: 1.25rem;
}

/* portrait-left: avatar beside the text block, vertically centered — for a wide slot / list row */
.ui-profile-card--layout-portrait-left .ui-profile-card__content {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  text-align: start;
  column-gap: 1rem;
}

.ui-profile-card--layout-portrait-left .ui-profile-card__copy {
  justify-items: start;
}

.ui-profile-card--layout-portrait-left .ui-profile-card__actions {
  justify-content: flex-start;
}

/* compact: small inline avatar, name/role only — for an author byline */
.ui-profile-card--layout-compact .ui-profile-card__content {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  text-align: start;
  column-gap: 0.625rem;
}

.ui-profile-card--layout-compact .ui-profile-card__avatar {
  width: 2.5rem;
  height: 2.5rem;
}

.ui-profile-card--layout-compact .ui-profile-card__copy {
  justify-items: start;
  gap: 0.125rem;
}

.ui-profile-card--layout-compact .ui-profile-card__actions {
  justify-content: flex-start;
}

@container (max-width: 18rem) {
  .ui-profile-card--layout-portrait-left .ui-profile-card__content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .ui-profile-card--layout-portrait-left .ui-profile-card__avatar {
    justify-self: center;
  }

  .ui-profile-card--layout-portrait-left .ui-profile-card__copy,
  .ui-profile-card--layout-portrait-left .ui-profile-card__actions {
    justify-items: center;
    justify-content: center;
  }
}
</style>

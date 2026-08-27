<template>
  <header
    v-if="hasContent"
    :id="headingId ?? undefined"
    class="ui-page-heading"
    :class="[`ui-page-heading--${safeLayout}`]"
    :aria-label="ariaLabel ?? undefined"
  >
    <div class="ui-page-heading__content">
      <BreadcrumbTrail v-bind="props" /><BaseBadge v-if="label" v-bind="label">{{
        label.text
      }}</BaseBadge>
      <p v-if="eyebrow">{{ eyebrow.text }}</p>
      <component v-if="heading" :is="heading.as && heading.as !== 'span' ? heading.as : 'h1'">{{
        heading.text
      }}</component>
      <p v-if="body">{{ body.text }}</p>
      <div v-if="meta.length" class="ui-page-heading__meta">
        <span v-for="(item, index) in meta" :key="index">{{ item.text }}</span>
      </div>
    </div>
    <img v-if="media" :src="media.src" :alt="media.alt ?? ''" />
    <div v-if="buttons.length" class="ui-page-heading__actions">
      <BaseButton v-for="(button, index) in buttons" :key="index" v-bind="button">{{
        button.label
      }}</BaseButton>
    </div>
  </header>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import BaseBadge from '../../../primitives/badge/BaseBadge.vue'
import BaseButton from '../../../primitives/button/BaseButton.vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { SharedPageHeadingProps } from '../../../primitives/page-heading/page-heading.types.ts'
import BreadcrumbTrail from '../breadcrumb-trail/BreadcrumbTrail.vue'
const props = withDefaults(defineProps<SharedPageHeadingProps>(), { layout: 'default' })
const buttons = computed(() => collectionItems(props.buttons))
const meta = computed(() => collectionItems(props.meta))
const safeLayout = computed(() =>
  ['default', 'actions', 'media', 'metadata', 'tabs', 'compact'].includes(props.layout ?? '')
    ? props.layout
    : 'default',
)
const hasContent = computed(() =>
  Boolean(
    props.breadcrumbs ||
    props.label ||
    props.eyebrow ||
    props.heading ||
    props.body ||
    props.media ||
    buttons.value.length ||
    meta.value.length,
  ),
)
</script>
<style scoped>
.ui-page-heading {
  display: grid;
  gap: 1.5rem;
  padding: 2rem;
}
.ui-page-heading__content {
  display: grid;
  align-content: start;
  gap: 1rem;
}
.ui-page-heading__content > * {
  margin: 0;
}
.ui-page-heading__actions,
.ui-page-heading__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.ui-page-heading__meta {
  padding-top: 1rem;
  border-top: 1px solid var(--border_default);
}
.ui-page-heading > img {
  width: 100%;
  height: 100%;
  min-height: 16rem;
  object-fit: cover;
}
.ui-page-heading--media {
  grid-template-columns: minmax(0, 1fr) minmax(16rem, 0.9fr);
}
.ui-page-heading--actions {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
}
@media (max-width: 700px) {
  .ui-page-heading--media,
  .ui-page-heading--actions {
    grid-template-columns: 1fr;
  }
}
</style>

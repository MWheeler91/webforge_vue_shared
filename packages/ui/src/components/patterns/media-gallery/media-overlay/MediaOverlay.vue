<template>
  <section
    v-if="media || label || heading || body || buttons.length"
    :id="galleryId ?? undefined"
    class="ui-media-overlay"
    :aria-label="resolvedAriaLabel"
  >
    <img v-if="media" class="ui-media-overlay__media" :src="media.src" alt="" />
    <div v-if="label || heading || body || buttons.length" class="ui-media-overlay__content">
      <BaseBadge v-if="label" v-bind="label">{{ label.text }}</BaseBadge
      ><UiText v-if="heading" :payload="heading" fallback="h2" />
      <UiText v-if="body" :payload="body" fallback="p" />
      <div v-if="buttons.length" class="ui-media-overlay__actions">
        <BaseButton v-for="(button, index) in buttons" :key="index" v-bind="button">{{
          button.label
        }}</BaseButton>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import BaseBadge from '../../../primitives/badge/BaseBadge.vue'
import BaseButton from '../../../primitives/button/BaseButton.vue'
import UiText from '../../../primitives/text/UiText.vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { MediaOverlayProps } from './MediaOverlay.types.ts'
const props = defineProps<MediaOverlayProps>()
const buttons = computed(() => collectionItems(props.buttons))
const resolvedAriaLabel = computed(() => props.ariaLabel ?? props.heading?.text ?? 'Featured media')
</script>
<style scoped>
.ui-media-overlay {
  position: relative;
  display: grid;
  min-height: 26rem;
  align-items: end;
  overflow: hidden;
}
.ui-media-overlay__media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.ui-media-overlay::after {
  position: absolute;
  inset: 0;
  content: '';
  background: linear-gradient(135deg, rgb(0 0 0 / 0.72), rgb(0 0 0 / 0.28));
}
.ui-media-overlay__content {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 1rem;
  width: min(100% - 2rem, 30rem);
  margin: 1rem;
  padding: 1.5rem;
  background: var(--bg_surface);
}
.ui-media-overlay__content > * {
  margin: 0;
}
.ui-media-overlay__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
</style>

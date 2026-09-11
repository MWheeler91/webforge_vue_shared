<template>
  <section
    v-if="before || after || heading || body"
    :id="galleryId ?? undefined"
    class="ui-media-comparison"
    :aria-label="resolvedAriaLabel"
  >
    <UiGalleryHeader :label="label" :eyebrow="eyebrow" :heading="heading" :body="body" />
    <div
      v-if="before || after"
      class="ui-media-comparison__stage"
      :style="{ '--ui-comparison-position': `${position}%` }"
    >
      <img
        v-if="before?.media"
        class="ui-media-comparison__before"
        :src="before.media.src"
        :alt="before.media.alt ?? 'Before'"
      /><img
        v-if="after?.media"
        class="ui-media-comparison__after"
        :src="after.media.src"
        :alt="after.media.alt ?? 'After'"
      /><input
        type="range"
        min="0"
        max="100"
        :value="position"
        aria-label="Before and after comparison position"
        @input="setPosition"
      /><span class="ui-media-comparison__divider" aria-hidden="true" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { MediaComparisonProps } from './MediaComparison.types.ts'
import UiGalleryHeader from '../shared/UiGalleryHeader.vue'
const props = defineProps<MediaComparisonProps>()
const resolvedAriaLabel = computed(
  () => props.ariaLabel ?? props.heading?.text ?? props.eyebrow?.text ?? 'Before and after comparison',
)
const position = ref(50)
function setPosition(event: Event) {
  position.value = Number((event.target as HTMLInputElement).value)
}
</script>
<style scoped>
.ui-media-comparison__stage {
  position: relative;
  min-height: 22rem;
  overflow: hidden;
}
.ui-media-comparison__stage img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.ui-media-comparison__after {
  clip-path: inset(0 0 0 var(--ui-comparison-position));
}
.ui-media-comparison__stage input {
  position: absolute;
  z-index: 2;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: ew-resize;
}
.ui-media-comparison__divider {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: var(--ui-comparison-position);
  width: 3px;
  background: currentColor;
  transform: translateX(-50%);
}
.ui-media-comparison__divider::after {
  content: '↔';
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  border: 2px solid currentColor;
  border-radius: 50%;
  background: var(--bg_surface);
  transform: translate(-50%, -50%);
}
</style>

<template>
  <section
    v-if="items.length || heading || body"
    :id="galleryId ?? undefined"
    class="ui-video-gallery"
    :aria-label="resolvedAriaLabel"
  >
    <UiGalleryHeader :label="label" :eyebrow="eyebrow" :heading="heading" :body="body" />
    <div v-if="items.length" class="ui-video-gallery__items">
      <article v-for="(item, index) in items" :key="item.id ?? index">
        <video v-if="item.videoSrc" controls :src="item.videoSrc" />
        <img v-else-if="item.media" :src="item.media.src" :alt="item.media.alt ?? ''" />
        <div v-if="item.heading || item.body" class="ui-video-gallery__caption">
          <UiText v-if="item.heading" :payload="item.heading" fallback="span" class="ui-video-gallery__caption-heading"
          /><UiText v-if="item.body" :payload="item.body" fallback="span" />
        </div>
      </article>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { VideoGalleryProps } from './VideoGallery.types.ts'
import UiGalleryHeader from '../shared/UiGalleryHeader.vue'
import UiText from '../../../primitives/text/UiText.vue'
const props = defineProps<VideoGalleryProps>()
const items = computed(() => collectionItems(props.items))
const resolvedAriaLabel = computed(
  () => props.ariaLabel ?? props.heading?.text ?? props.eyebrow?.text ?? 'Video gallery',
)
</script>
<style scoped>
.ui-video-gallery__items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1rem;
}
.ui-video-gallery article {
  min-width: 0;
}
.ui-video-gallery video,
.ui-video-gallery img {
  display: block;
  width: 100%;
  min-height: 12rem;
  object-fit: cover;
}
.ui-video-gallery__caption {
  display: grid;
  gap: 0.25rem;
  padding: 0.75rem;
}
.ui-video-gallery__caption-heading {
  display: block;
  font-weight: 700;
}
</style>

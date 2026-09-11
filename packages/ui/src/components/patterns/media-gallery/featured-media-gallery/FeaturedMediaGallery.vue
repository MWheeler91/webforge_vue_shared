<template>
  <section
    v-if="featured || thumbnails.length || heading || body"
    :id="galleryId ?? undefined"
    class="ui-featured-media-gallery"
    :aria-label="resolvedAriaLabel"
  >
    <UiGalleryHeader :label="label" :eyebrow="eyebrow" :heading="heading" :body="body" />
    <div v-if="featured || thumbnails.length" class="ui-featured-media-gallery__layout">
      <figure v-if="featured" class="ui-featured-media-gallery__featured">
        <img v-if="featured.media" :src="featured.media.src" :alt="featured.media.alt ?? ''" />
        <figcaption v-if="featured.heading || featured.body">
          <UiText v-if="featured.heading" :payload="featured.heading" fallback="span" class="ui-featured-media-gallery__caption-heading"
          /><UiText v-if="featured.body" :payload="featured.body" fallback="span" />
        </figcaption>
      </figure>
      <div v-if="thumbnails.length" class="ui-featured-media-gallery__thumbnails">
        <template v-for="(item, index) in thumbnails" :key="item.id ?? index">
          <img v-if="item.media" :src="item.media.src" :alt="item.media.alt ?? ''" />
        </template>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { FeaturedMediaGalleryProps } from './FeaturedMediaGallery.types.ts'
import UiGalleryHeader from '../shared/UiGalleryHeader.vue'
import UiText from '../../../primitives/text/UiText.vue'
const props = defineProps<FeaturedMediaGalleryProps>()
const thumbnails = computed(() => collectionItems(props.thumbnails ?? props.items))
const resolvedAriaLabel = computed(
  () => props.ariaLabel ?? props.heading?.text ?? props.eyebrow?.text ?? 'Featured media',
)
</script>
<style scoped>
.ui-featured-media-gallery__layout {
  display: grid;
  gap: 1rem;
}
.ui-featured-media-gallery figure {
  margin: 0;
}
.ui-featured-media-gallery img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 10rem;
  object-fit: cover;
}
.ui-featured-media-gallery__featured img {
  min-height: 22rem;
}
.ui-featured-media-gallery figcaption {
  padding: 0.75rem;
}
.ui-featured-media-gallery__caption-heading {
  display: block;
  font-weight: 700;
}
.ui-featured-media-gallery__thumbnails {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
@media (min-width: 800px) {
  .ui-featured-media-gallery__layout {
    grid-template-columns: 2.2fr 1fr;
  }
}
</style>

<template>
  <section
    v-if="featured || thumbnails.length || heading || body"
    :id="galleryId ?? undefined"
    class="ui-featured-media-gallery"
    :aria-label="ariaLabel ?? undefined"
  >
    <UiGalleryHeader v-bind="props" />
    <div v-if="featured || thumbnails.length" class="ui-featured-media-gallery__layout">
      <figure v-if="featured" class="ui-featured-media-gallery__featured">
        <img v-if="featured.media" :src="featured.media.src" :alt="featured.media.alt ?? ''" />
        <figcaption v-if="featured.heading || featured.body">
          <strong v-if="featured.heading">{{ featured.heading.text }}</strong
          ><span v-if="featured.body">{{ featured.body.text }}</span>
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
import type { SharedMediaGalleryProps } from '../../../primitives/gallery/gallery.types.ts'
import UiGalleryHeader from '../shared/UiGalleryHeader.vue'
const props = defineProps<SharedMediaGalleryProps>()
const thumbnails = computed(() => collectionItems(props.thumbnails ?? props.items))
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

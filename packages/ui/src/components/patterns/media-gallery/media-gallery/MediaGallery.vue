<template>
  <section
    v-if="items.length || heading || body"
    :id="galleryId ?? undefined"
    class="ui-media-gallery"
    :class="[
      `ui-media-gallery--${safeLayout}`,
      `ui-media-gallery--density-${density ?? 'standard'}`,
    ]"
    :aria-label="ariaLabel ?? undefined"
  >
    <UiGalleryHeader v-bind="props" />
    <div v-if="items.length" class="ui-media-gallery__items">
      <figure v-for="(item, index) in items" :key="item.id ?? index" class="ui-media-gallery__item">
        <img v-if="item.media" :src="item.media.src" :alt="item.media.alt ?? ''" />
        <figcaption v-if="item.heading || item.body">
          <strong v-if="item.heading">{{ item.heading.text }}</strong
          ><span v-if="item.body">{{ item.body.text }}</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { SharedMediaGalleryProps } from '../../../primitives/gallery/gallery.types.ts'
import UiGalleryHeader from '../shared/UiGalleryHeader.vue'
const props = withDefaults(defineProps<SharedMediaGalleryProps>(), { layout: 'grid' })
const items = computed(() => collectionItems(props.items))
const safeLayout = computed(() =>
  ['grid', 'masonry', 'strip', 'collage'].includes(props.layout ?? '') ? props.layout : 'grid',
)
</script>
<style scoped>
.ui-media-gallery__items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1rem;
}
.ui-media-gallery__item {
  min-width: 0;
  margin: 0;
}
.ui-media-gallery__item img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 12rem;
  object-fit: cover;
}
.ui-media-gallery__item figcaption {
  display: grid;
  gap: 0.25rem;
  padding: 0.75rem;
}
.ui-media-gallery--masonry .ui-media-gallery__items {
  display: block;
  columns: 3;
  column-gap: 1rem;
}
.ui-media-gallery--masonry .ui-media-gallery__item {
  break-inside: avoid;
  margin-bottom: 1rem;
}
.ui-media-gallery--strip .ui-media-gallery__items {
  display: flex;
  overflow: auto;
}
.ui-media-gallery--strip .ui-media-gallery__item {
  flex: 0 0 min(18rem, 80%);
}
.ui-media-gallery--collage .ui-media-gallery__items {
  grid-template-columns: 1.4fr 0.8fr 1fr;
  grid-template-rows: 12rem 12rem;
}
.ui-media-gallery--collage .ui-media-gallery__item:first-child {
  grid-row: 1/3;
}
.ui-media-gallery--collage .ui-media-gallery__item:nth-child(4) {
  grid-column: 2/4;
}
@media (max-width: 700px) {
  .ui-media-gallery--masonry .ui-media-gallery__items {
    columns: 2;
  }
  .ui-media-gallery--collage .ui-media-gallery__items {
    grid-template-columns: 1fr 1fr;
  }
  .ui-media-gallery--collage .ui-media-gallery__item:nth-child(4) {
    grid-column: auto;
  }
}
@media (max-width: 480px) {
  .ui-media-gallery--masonry .ui-media-gallery__items {
    columns: 1;
  }
}
</style>

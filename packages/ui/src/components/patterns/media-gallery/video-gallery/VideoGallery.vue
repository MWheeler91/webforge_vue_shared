<template>
  <section
    v-if="items.length || heading || body"
    :id="galleryId ?? undefined"
    class="ui-video-gallery"
    :aria-label="ariaLabel ?? undefined"
  >
    <UiGalleryHeader v-bind="props" />
    <div v-if="items.length" class="ui-video-gallery__items">
      <article v-for="(item, index) in items" :key="item.id ?? index">
        <video v-if="item.videoSrc" controls :src="item.videoSrc" />
        <img v-else-if="item.media" :src="item.media.src" :alt="item.media.alt ?? ''" />
        <div v-if="item.heading || item.body" class="ui-video-gallery__caption">
          <strong v-if="item.heading">{{ item.heading.text }}</strong
          ><span v-if="item.body">{{ item.body.text }}</span>
        </div>
      </article>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { SharedMediaGalleryProps } from '../../../primitives/gallery/gallery.types.ts'
import UiGalleryHeader from '../shared/UiGalleryHeader.vue'
const props = defineProps<SharedMediaGalleryProps>()
const items = computed(() => collectionItems(props.items))
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
</style>

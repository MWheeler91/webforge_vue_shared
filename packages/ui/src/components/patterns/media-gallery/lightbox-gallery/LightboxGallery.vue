<template>
  <section
    v-if="items.length || heading || body"
    :id="galleryId ?? undefined"
    class="ui-lightbox-gallery"
    :aria-label="ariaLabel ?? undefined"
  >
    <UiGalleryHeader v-bind="props" />
    <div v-if="items.length" class="ui-lightbox-gallery__items">
      <button
        v-for="(item, index) in items"
        :key="item.id ?? index"
        type="button"
        :aria-label="item.heading?.text ?? `Open image ${index + 1}`"
        @click="open(index)"
      >
        <img v-if="item.media" :src="item.media.src" :alt="item.media.alt ?? ''" />
      </button>
    </div>
    <div
      v-if="current"
      class="ui-lightbox-gallery__dialog"
      role="dialog"
      aria-modal="true"
      :aria-label="current.heading?.text ?? 'Selected media'"
      @click.self="close"
    >
      <div class="ui-lightbox-gallery__panel">
        <button type="button" aria-label="Close dialog" @click="close">×</button
        ><img v-if="current.media" :src="current.media.src" :alt="current.media.alt ?? ''" />
        <div v-if="current.heading || current.body">
          <strong v-if="current.heading">{{ current.heading.text }}</strong>
          <p v-if="current.body">{{ current.body.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { SharedMediaGalleryProps } from '../../../primitives/gallery/gallery.types.ts'
import UiGalleryHeader from '../shared/UiGalleryHeader.vue'
const props = defineProps<SharedMediaGalleryProps>()
const items = computed(() => collectionItems(props.items))
const active = ref<number | null>(null)
const current = computed(() => (active.value === null ? null : items.value[active.value]))
function open(index: number) {
  active.value = index
}
function close() {
  active.value = null
}
</script>
<style scoped>
.ui-lightbox-gallery__items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1rem;
}
.ui-lightbox-gallery__items button {
  padding: 0;
  border: 0;
  background: none;
}
.ui-lightbox-gallery__items img {
  display: block;
  width: 100%;
  min-height: 12rem;
  object-fit: cover;
}
.ui-lightbox-gallery__dialog {
  position: fixed;
  z-index: 50;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 2rem;
  background: rgb(0 0 0 / 0.65);
}
.ui-lightbox-gallery__panel {
  width: min(100%, 55rem);
  background: var(--bg_surface);
  padding: 1rem;
}
.ui-lightbox-gallery__panel > button {
  float: right;
}
.ui-lightbox-gallery__panel img {
  display: block;
  width: 100%;
  max-height: 70vh;
  object-fit: contain;
}
</style>

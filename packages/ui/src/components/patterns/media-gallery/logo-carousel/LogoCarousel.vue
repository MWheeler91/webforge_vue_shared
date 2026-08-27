<template>
  <section
    v-if="logos.length || heading || body"
    :id="galleryId ?? undefined"
    class="ui-logo-carousel"
    :aria-label="ariaLabel ?? undefined"
  >
    <UiGalleryHeader v-bind="props" />
    <div v-if="logos.length" class="ui-logo-carousel__track">
      <template v-for="(logo, index) in logos" :key="logo.id ?? index">
        <img
          v-if="logo.media"
          :src="logo.media.src"
          :alt="logo.media.alt ?? logo.heading?.text ?? ''"
        />
      </template>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { SharedMediaGalleryProps } from '../../../primitives/gallery/gallery.types.ts'
import UiGalleryHeader from '../shared/UiGalleryHeader.vue'
const props = defineProps<SharedMediaGalleryProps>()
const logos = computed(() => collectionItems(props.logos ?? props.items))
</script>
<style scoped>
.ui-logo-carousel__track {
  display: flex;
  gap: 1rem;
  overflow: auto;
}
.ui-logo-carousel__track img {
  flex: 0 0 10rem;
  width: 10rem;
  height: 5.5rem;
  object-fit: contain;
}
</style>

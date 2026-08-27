<template>
  <section
    v-if="slides.length || heading || body"
    :id="galleryId ?? undefined"
    class="ui-media-carousel"
    :aria-roledescription="'carousel'"
    :aria-label="ariaLabel ?? heading?.text"
  >
    <UiGalleryHeader v-bind="props" />
    <div v-if="current" class="ui-media-carousel__stage">
      <button v-if="slides.length > 1" type="button" aria-label="Previous slide" @click="previous">
        ‹
      </button>
      <figure>
        <img v-if="current.media" :src="current.media.src" :alt="current.media.alt ?? ''" />
        <figcaption v-if="current.heading || current.body">
          <strong v-if="current.heading">{{ current.heading.text }}</strong
          ><span v-if="current.body">{{ current.body.text }}</span>
        </figcaption>
      </figure>
      <button v-if="slides.length > 1" type="button" aria-label="Next slide" @click="next">
        ›
      </button>
    </div>
    <div v-if="slides.length > 1" class="ui-media-carousel__dots">
      <button
        v-for="(_, index) in slides"
        :key="index"
        type="button"
        :aria-label="`Show slide ${index + 1}`"
        :aria-current="index === indexValue ? 'true' : undefined"
        @click="select(index)"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { SharedMediaGalleryProps } from '../../../primitives/gallery/gallery.types.ts'
import UiGalleryHeader from '../shared/UiGalleryHeader.vue'
const props = defineProps<SharedMediaGalleryProps>()
const emit = defineEmits<{ (event: 'update:activeIndex', value: number): void }>()
const slides = computed(() => collectionItems(props.slides ?? props.items))
const selected = ref(Math.max(0, props.activeIndex ?? 0))
watch(
  () => props.activeIndex,
  (value) => {
    if (value !== null && value !== undefined) selected.value = Math.max(0, value)
  },
)
const indexValue = computed(() => Math.min(selected.value, Math.max(0, slides.value.length - 1)))
const current = computed(() => slides.value[indexValue.value])
function select(value: number) {
  selected.value = value
  emit('update:activeIndex', value)
}
function previous() {
  select((indexValue.value - 1 + slides.value.length) % slides.value.length)
}
function next() {
  select((indexValue.value + 1) % slides.value.length)
}
</script>
<style scoped>
.ui-media-carousel__stage {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
}
.ui-media-carousel button {
  min-width: 2.75rem;
  min-height: 2.75rem;
}
.ui-media-carousel figure {
  margin: 0;
}
.ui-media-carousel img {
  display: block;
  width: 100%;
  min-height: 20rem;
  object-fit: cover;
}
.ui-media-carousel figcaption {
  padding: 0.75rem;
}
.ui-media-carousel__dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}
.ui-media-carousel__dots button {
  min-width: 0.75rem;
  min-height: 0.75rem;
  padding: 0;
  border-radius: 50%;
}
.ui-media-carousel__dots button[aria-current='true'] {
  background: currentColor;
}
</style>

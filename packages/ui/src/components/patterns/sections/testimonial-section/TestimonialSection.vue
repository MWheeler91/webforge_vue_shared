<template>
  <BaseSection
    :id="section.key ?? undefined"
    :class="sectionClasses"
    :variant="variant"
    spacing="xl"
    width="full"
  >
    <BaseContainer width="xl" padding="lg">
      <SectionHeader
        v-if="eyebrow || title || body"
        class="ui-testimonial-section__header w-full max-w-none !mb-0"
        :eyebrow="eyebrow?.text ?? undefined"
        :subtitle="body?.text ?? undefined"
      >
        <template #title>{{ title?.text }}</template>
      </SectionHeader>

      <div
        v-if="cards.length"
        class="ui-testimonial-section__viewport"
        :class="{ 'is-paused': paused }"
        :style="viewportStyle"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
        @focusin="paused = true"
        @focusout="paused = false"
      >
        <!-- grid: a balanced rectangle; a ragged final row is dropped -->
        <div
          v-if="renderMode === 'grid'"
          ref="gridEl"
          class="ui-testimonial-section__grid"
          :style="{ '--ui-testimonial-cols': gridLayout.cols }"
        >
          <UiCardRenderer
            v-for="(card, index) in gridCards"
            :key="card.key ?? index"
            :card="card"
          />
        </div>

        <!-- marquee: continuous, looping scroll -->
        <div
          v-else-if="renderMode === 'marquee'"
          class="ui-testimonial-section__marquee"
          :style="{ '--ui-testimonial-marquee-duration': marqueeDuration }"
          role="group"
          :aria-roledescription="'carousel'"
          :aria-label="ariaLabel"
        >
          <div class="ui-testimonial-section__track">
            <ul class="ui-testimonial-section__group">
              <li
                v-for="(card, index) in cards"
                :key="`a-${card.key ?? index}`"
                class="ui-testimonial-section__slide"
              >
                <UiCardRenderer :card="card" />
              </li>
            </ul>
            <ul class="ui-testimonial-section__group" aria-hidden="true">
              <li
                v-for="(card, index) in cards"
                :key="`b-${card.key ?? index}`"
                class="ui-testimonial-section__slide"
              >
                <UiCardRenderer :card="card" />
              </li>
            </ul>
          </div>
        </div>

        <!-- marquee, reduced motion: static scrollable strip -->
        <ul
          v-else-if="renderMode === 'strip'"
          class="ui-testimonial-section__strip"
          tabindex="0"
          role="group"
          :aria-label="ariaLabel"
        >
          <li
            v-for="(card, index) in cards"
            :key="card.key ?? index"
            class="ui-testimonial-section__slide"
          >
            <UiCardRenderer :card="card" />
          </li>
        </ul>

        <!-- fade: timed enter / exit of the current page -->
        <div
          v-else-if="renderMode === 'fade'"
          class="ui-testimonial-section__fade"
          role="group"
          :aria-roledescription="'carousel'"
          :aria-label="ariaLabel"
          aria-live="polite"
        >
          <Transition name="ui-testimonial-section-fade" mode="out-in">
            <div :key="activePage" class="ui-testimonial-section__page">
              <UiCardRenderer
                v-for="(card, index) in visiblePage"
                :key="card.key ?? index"
                :card="card"
              />
            </div>
          </Transition>
        </div>
      </div>
    </BaseContainer>
  </BaseSection>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { BaseContainer, BaseSection, SectionHeader } from '../../../primitives/index.ts'
import UiCardRenderer from '../../cards/UiCardRenderer.vue'
import { sectionCards, sectionElement } from '../sectionData.ts'
import type { TestimonialSectionDensity, TestimonialSectionProps } from './TestimonialSection.types.ts'

const props = withDefaults(defineProps<TestimonialSectionProps>(), {
  layout: 'grid',
  density: 'standard',
  variant: 'default',
})

/** Advance interval for the `fade` layout. */
const FADE_INTERVAL_MS = 4000
/** Seconds the `marquee` track spends travelling one card width (lower = faster). */
const MARQUEE_SECONDS_PER_CARD = 7
/** Most testimonials rendered at once, regardless of how many the API sent. */
const MAX_CARDS = 12
const GRID_GAP_PX = 24
/**
 * Preferred column count per card count at full width, chosen so the grid is a
 * balanced rectangle (roughly two or three rows once past a single row).
 * Index is the card count; index 0 is unused.
 */
const GRID_IDEAL_COLS = [0, 1, 2, 3, 4, 4, 3, 3, 4, 3, 5, 5, 4]

// Target width for a single testimonial card. The number visible per row is the
// available width divided by this, never a fixed count.
const CARD_MIN_WIDTH: Record<TestimonialSectionDensity, string> = {
  compact: '17rem',
  standard: '22rem',
  spacious: '30rem',
}
const FADE_PAGE_SIZE: Record<TestimonialSectionDensity, number> = {
  compact: 3,
  standard: 2,
  spacious: 1,
}

const eyebrow = computed(() => sectionElement(props.section, 'eyebrow'))
const title = computed(() => sectionElement(props.section, 'title'))
const body = computed(() => sectionElement(props.section, 'body'))
const cards = computed(() => sectionCards(props.section))

const ariaLabel = computed(() => title.value?.text ?? 'Testimonials')
const viewportStyle = computed(() => ({ '--ui-testimonial-card-min': CARD_MIN_WIDTH[props.density] }))
const marqueeDuration = computed(
  () => `${Math.max(1, cards.value.length) * MARQUEE_SECONDS_PER_CARD}s`,
)

const prefersReducedMotion = ref(false)
const paused = ref(false)

// --- grid: even-rectangle resolution -----------------------------------------
const gridEl = ref<HTMLElement | null>(null)
// How many card-min-width columns the current container width can hold.
const fitColumns = ref(1)

function remToPx(rem: string): number {
  const value = Number.parseFloat(rem) || 0
  if (typeof window === 'undefined') return value * 16
  const root = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  return value * root
}

function measureGrid() {
  const width = gridEl.value?.clientWidth ?? 0
  if (!width) return
  const unit = remToPx(CARD_MIN_WIDTH[props.density]) + GRID_GAP_PX
  fitColumns.value = Math.max(1, Math.floor((width + GRID_GAP_PX) / unit))
}

const gridLayout = computed<{ cols: number; count: number }>(() => {
  const n = Math.min(cards.value.length, MAX_CARDS)
  if (n === 0) return { cols: 1, count: 0 }
  const cap = Math.max(1, fitColumns.value)
  // 1-4 quotes are always a single row and never drop a card: step the column
  // count down until it divides the count evenly.
  if (n <= 4) {
    let cols = Math.min(n, cap)
    while (cols > 1 && n % cols !== 0) cols -= 1
    return { cols, count: n }
  }
  // 5+ quotes: aim for the balanced column count, then drop a ragged last row.
  const cols = Math.max(1, Math.min(GRID_IDEAL_COLS[n] ?? cap, cap))
  return { cols, count: Math.floor(n / cols) * cols }
})

const gridCards = computed(() => cards.value.slice(0, gridLayout.value.count))

// --- fade: paged rotation ---------------------------------------------------
const pages = computed(() => {
  const size = Math.max(1, FADE_PAGE_SIZE[props.density])
  const usable = cards.value.slice(0, MAX_CARDS)
  const chunks: (typeof cards.value)[] = []
  for (let index = 0; index < usable.length; index += size) {
    chunks.push(usable.slice(index, index + size))
  }
  return chunks
})

const activePage = ref(0)
const visiblePage = computed(() => pages.value[activePage.value] ?? cards.value)

// Which of the four template branches renders. `marquee` and `fade` degrade to a
// static presentation when the collection is too small to animate or the viewer
// asked for reduced motion.
const renderMode = computed<'grid' | 'marquee' | 'strip' | 'fade'>(() => {
  if (props.layout === 'grid') return 'grid'
  if (props.layout === 'marquee') {
    return prefersReducedMotion.value ? 'strip' : 'marquee'
  }
  if (prefersReducedMotion.value || pages.value.length <= 1) return 'grid'
  return 'fade'
})

let fadeTimer: ReturnType<typeof setInterval> | null = null

function stopFadeTimer() {
  if (fadeTimer !== null) {
    clearInterval(fadeTimer)
    fadeTimer = null
  }
}

function startFadeTimer() {
  stopFadeTimer()
  if (renderMode.value !== 'fade') return
  fadeTimer = setInterval(() => {
    if (paused.value) return
    activePage.value = (activePage.value + 1) % pages.value.length
  }, FADE_INTERVAL_MS)
}

function onReducedMotionChange(event: MediaQueryListEvent | MediaQueryList) {
  prefersReducedMotion.value = event.matches
}

let mediaQuery: MediaQueryList | null = null
let gridObserver: ResizeObserver | null = null

function observeGrid() {
  if (!gridObserver || !gridEl.value) return
  gridObserver.disconnect()
  gridObserver.observe(gridEl.value)
}

onMounted(() => {
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = mediaQuery.matches
    mediaQuery.addEventListener?.('change', onReducedMotionChange)
  }
  if (typeof ResizeObserver !== 'undefined') {
    gridObserver = new ResizeObserver(() => measureGrid())
  }
  measureGrid()
  observeGrid()
  startFadeTimer()
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener?.('change', onReducedMotionChange)
  gridObserver?.disconnect()
  stopFadeTimer()
})

// Re-measure and re-observe when the grid element appears or the density changes.
watch([gridEl, renderMode, () => props.density], () => {
  measureGrid()
  observeGrid()
})

// Reset paging and restart the timer whenever the mix of cards or the resolved
// presentation changes.
watch(
  () => [renderMode.value, pages.value.length],
  () => {
    if (activePage.value >= pages.value.length) activePage.value = 0
    startFadeTimer()
  },
)

const sectionClasses = computed(() => [
  'ui-testimonial-section',
  `ui-testimonial-section--layout-${props.layout}`,
  `ui-testimonial-section--density-${props.density}`,
])
</script>

<style scoped>
.ui-testimonial-section__viewport {
  --ui-testimonial-gap: 1.5rem;
  margin-top: 2rem;
  min-width: 0;
}

.ui-testimonial-section__header + .ui-testimonial-section__viewport {
  margin-top: 2.5rem;
}

/* grid ------------------------------------------------------------------ */
.ui-testimonial-section__grid {
  display: grid;
  gap: var(--ui-testimonial-gap);
  grid-template-columns: repeat(var(--ui-testimonial-cols, 1), minmax(0, 1fr));
  justify-content: center;
  align-items: start;
}

/* Spacious quotes read better in a narrower measure than the full section. */
.ui-testimonial-section--density-spacious .ui-testimonial-section__grid {
  max-width: 62rem;
  margin-inline: auto;
}

/* marquee ------------------------------------------------------------------ */
.ui-testimonial-section__marquee {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent,
    #000 2.5rem,
    #000 calc(100% - 2.5rem),
    transparent
  );
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 2.5rem,
    #000 calc(100% - 2.5rem),
    transparent
  );
}

.ui-testimonial-section__track {
  display: flex;
  width: max-content;
  animation: ui-testimonial-section-marquee var(--ui-testimonial-marquee-duration, 24s)
    linear infinite;
}

/*
 * Two identical groups sit side by side. Each carries a trailing gap so the seam
 * between them matches the internal spacing, which makes the -50% wrap land
 * exactly on the second group's leading edge — no visible jump.
 */
.ui-testimonial-section__group {
  display: flex;
  gap: var(--ui-testimonial-gap);
  margin: 0;
  padding: 0;
  padding-inline-end: var(--ui-testimonial-gap);
  list-style: none;
}

.ui-testimonial-section__viewport.is-paused .ui-testimonial-section__track {
  animation-play-state: paused;
}

@keyframes ui-testimonial-section-marquee {
  to {
    transform: translateX(-50%);
  }
}

/* marquee, reduced motion: a plain horizontal strip ---------------------- */
.ui-testimonial-section__strip {
  display: flex;
  gap: var(--ui-testimonial-gap);
  margin: 0;
  padding: 0 0 0.5rem;
  list-style: none;
  overflow-x: auto;
  scroll-snap-type: x proximity;
}

.ui-testimonial-section__strip .ui-testimonial-section__slide {
  scroll-snap-align: start;
}

.ui-testimonial-section__slide {
  /* vw (not %) so the width stays definite inside the intrinsically-sized track */
  flex: 0 0 auto;
  width: min(80vw, var(--ui-testimonial-card-min, 22rem));
  min-width: 0;
}

/* fade ------------------------------------------------------------------ */
.ui-testimonial-section__fade {
  --ui-testimonial-fade-band: 64rem;
  max-width: var(--ui-testimonial-fade-band);
  margin-inline: auto;
}

.ui-testimonial-section--density-spacious .ui-testimonial-section__fade {
  --ui-testimonial-fade-band: 46rem;
}

.ui-testimonial-section--density-compact .ui-testimonial-section__fade {
  --ui-testimonial-fade-band: 82rem;
}

.ui-testimonial-section__page {
  display: grid;
  gap: var(--ui-testimonial-gap);
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, var(--ui-testimonial-card-min, 22rem)), 1fr)
  );
  align-items: start;
}

.ui-testimonial-section-fade-enter-active,
.ui-testimonial-section-fade-leave-active {
  transition: opacity 360ms ease, transform 360ms ease;
}

.ui-testimonial-section-fade-enter-from {
  opacity: 0;
  transform: translateY(0.75rem);
}

.ui-testimonial-section-fade-leave-to {
  opacity: 0;
  transform: translateY(-0.75rem);
}

@media (prefers-reduced-motion: reduce) {
  .ui-testimonial-section__track {
    animation: none;
  }

  .ui-testimonial-section-fade-enter-active,
  .ui-testimonial-section-fade-leave-active {
    transition: none;
  }
}
</style>

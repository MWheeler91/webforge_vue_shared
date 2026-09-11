<template>
  <BaseSection
    :id="section.key ?? undefined"
    :class="sectionClasses"
    :variant="variant"
    :spacing="isSpotlight ? 'none' : 'xl'"
    width="full"
  >
    <div v-if="isSpotlight" class="hero-section__backdrop" aria-hidden="true">
      <video
        v-if="showVideo"
        class="hero-section__media"
        :poster="videoPoster || undefined"
        autoplay
        muted
        loop
        playsinline
      >
        <source :src="video" />
      </video>
      <img
        v-else-if="backdropImage"
        class="hero-section__media"
        :src="backdropImage"
        alt=""
      />
      <span class="hero-section__scrim" />
    </div>

    <BaseContainer width="xl" padding="lg">
      <div class="hero-section__inner">
        <div class="hero-section__copy">
          <SectionHeader
            v-if="eyebrow || title || body"
            class="hero-section__header w-full max-w-none !mb-0"
            :eyebrow="eyebrow?.text ?? undefined"
            :subtitle="body?.text ?? undefined"
            title-as="h1"
            emphasis="prominent"
            title-wrap="pretty"
          >
            <template v-if="title" #title>{{ title.text }}</template>
          </SectionHeader>

          <div v-if="buttons.length" class="hero-section__actions">
            <BaseButton v-for="button in buttons" :key="button.label" v-bind="button">
              {{ button.label }}
            </BaseButton>
          </div>

          <p v-if="footnote" class="hero-section__footnote">{{ footnote.text }}</p>
        </div>

        <figure v-if="showFigure" class="hero-section__figure">
          <img :src="figureImage" :alt="figureAlt" />
        </figure>
      </div>
    </BaseContainer>
  </BaseSection>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { BaseButton, BaseContainer, BaseSection, SectionHeader } from '../../../primitives/index.ts'
import { sectionConfigValue, sectionElement } from '../sectionData.ts'
import type { CardAction } from '../../../primitives/card/card.types.ts'
import type { HeroSectionMinHeight, HeroSectionProps } from './HeroSection.types.ts'

const props = withDefaults(defineProps<HeroSectionProps>(), {
  layout: 'centered',
  placement: 'end',
  align: 'left',
  variant: 'default',
})

interface HeroImage {
  image_url?: string
  alt_text?: string
}

const eyebrow = computed(() => sectionElement(props.section, 'eyebrow'))
const title = computed(() => sectionElement(props.section, 'title'))
const body = computed(() => sectionElement(props.section, 'body'))
const footnote = computed(() => sectionElement(props.section, 'footnote'))

const heroImage = computed<HeroImage | null>(() => {
  const images = props.section.elements?.images as Record<string, HeroImage[]> | undefined
  return images?.hero?.[0] ?? null
})

/**
 * Video is config-driven for now: there is no webforge media model for sections
 * yet, so `config.videoUrl` / `config.videoPoster` carry the source, matching how
 * the restaurant sections carry config only.
 */
const video = computed(() => sectionConfigValue<string>(props.section, 'videoUrl', ''))
const videoPoster = computed(
  () => sectionConfigValue<string>(props.section, 'videoPoster', '') || heroImage.value?.image_url || '',
)

const buttons = computed<CardAction[]>(() => {
  const values = props.section.elements?.buttons as Record<string, Array<Record<string, unknown>>> | undefined
  return Object.values(values ?? {})
    .flat()
    .map((button) => ({
      label: String(button.text ?? button.label ?? ''),
      href: button.href as string | undefined,
      to: button.vue_route as string | undefined,
      variant: button.variant as CardAction['variant'] | undefined,
      size: 'lg' as const,
    }))
    .filter((button) => button.label)
})

const isSpotlight = computed(() => props.layout === 'spotlight')

// `split` with no image is indistinguishable from `centered`.
const showFigure = computed(() => props.layout === 'split' && Boolean(heroImage.value?.image_url))
const figureImage = computed(() => heroImage.value?.image_url ?? '')
const figureAlt = computed(() => heroImage.value?.alt_text ?? '')

const backdropImage = computed(() => (isSpotlight.value ? heroImage.value?.image_url ?? '' : ''))

const prefersReducedMotion = ref(false)
let mediaQuery: MediaQueryList | null = null
function onReducedMotionChange(event: MediaQueryListEvent | MediaQueryList) {
  prefersReducedMotion.value = event.matches
}

onMounted(() => {
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = mediaQuery.matches
    mediaQuery.addEventListener?.('change', onReducedMotionChange)
  }
})
onBeforeUnmount(() => {
  mediaQuery?.removeEventListener?.('change', onReducedMotionChange)
})

// Under reduced motion the video is replaced by its poster / hero still.
const showVideo = computed(
  () => isSpotlight.value && Boolean(video.value) && !prefersReducedMotion.value,
)

const resolvedMinHeight = computed<HeroSectionMinHeight>(
  () => props.minHeight ?? (isSpotlight.value ? 'screen' : 'auto'),
)

const resolvedAlign = computed(() => (props.layout === 'centered' ? 'center' : props.align))

const sectionClasses = computed(() => [
  'hero-section',
  `hero-section--layout-${props.layout}`,
  `hero-section--placement-${props.placement}`,
  `hero-section--align-${resolvedAlign.value}`,
  `hero-section--minh-${resolvedMinHeight.value}`,
])
</script>

<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-section__inner {
  position: relative;
  z-index: 1;
  display: grid;
  gap: clamp(1.5rem, 4vw, 3rem);
  align-content: center;
}

.hero-section__copy {
  display: grid;
  align-content: center;
  gap: 1.25rem;
  max-width: 44rem;
  min-width: 0;
}

.hero-section--align-center .hero-section__copy {
  justify-items: center;
  text-align: center;
  margin-inline: auto;
}

.hero-section__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero-section--align-center .hero-section__actions {
  justify-content: center;
}

.hero-section__footnote {
  margin: 0;
  font-size: var(--type-body-small-size, 0.875rem);
  color: var(--ui-current-text-muted);
}

.hero-section__figure {
  margin: 0;
  overflow: hidden;
  border-radius: 0.75rem;
  min-height: 18rem;
}

.hero-section__figure img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* minimum height ------------------------------------------------------------- */
.hero-section--minh-md .hero-section__inner {
  min-height: 32rem;
}
.hero-section--minh-lg .hero-section__inner {
  min-height: 44rem;
}
.hero-section--minh-screen .hero-section__inner {
  min-height: 100vh;
  min-height: 100dvh;
}

/* split -------------------------------------------------------------------- */
@media (min-width: 801px) {
  .hero-section--layout-split .hero-section__inner {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: center;
  }
  .hero-section--layout-split.hero-section--placement-start .hero-section__figure {
    order: -1;
  }
}

/* spotlight -------------------------------------------------------------------- */
.hero-section--layout-spotlight .hero-section__inner {
  padding-block: clamp(3rem, 10vh, 7rem);
  /* The scrim guarantees a dark ground, so force inverse foregrounds regardless
     of the section variant (which still sets the no-media fallback fill). */
  --ui-current-text-primary: var(--text_inverse);
  --ui-current-text-secondary: color-mix(in srgb, var(--text_inverse) 82%, transparent);
  --ui-current-text-muted: color-mix(in srgb, var(--text_inverse) 68%, transparent);
  color: var(--text_inverse);
}

.hero-section--layout-spotlight :deep(.ui-section-header__eyebrow) {
  color: currentColor;
  opacity: 0.85;
}

.hero-section__backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-section__media {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-section__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.62));
}
</style>

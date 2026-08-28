<template>
  <BaseSection :id="section.key ?? undefined" :class="sectionClasses" :variant="variant" spacing="xl" width="full">
    <BaseContainer class="relative" width="xl" padding="lg">
      <div class="split-media-section__layout">
        <div class="split-media-section__content">
          <SectionHeader v-if="eyebrow || title" class="w-full max-w-none !mb-0" :eyebrow="eyebrow?.text ?? undefined" :title-as="title?.config?.heading as never" :emphasis="title?.config?.emphasis as never">
            <template #title>{{ title?.text }}</template>
          </SectionHeader>
          <p v-if="body?.text" class="ui-text--lead text-secondary">{{ body.text }}</p>
          <div v-if="buttons.length" class="flex flex-wrap gap-3"><BaseButton v-for="button in buttons" :key="button.label" v-bind="button">{{ button.label }}</BaseButton></div>
        </div>
        <figure v-if="media?.src" class="split-media-section__media"><img class="block size-full min-h-[25rem] object-cover" :src="media.src" :alt="media.alt ?? ''" /></figure>
      </div>
    </BaseContainer>
  </BaseSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { BaseButton, BaseContainer, BaseSection, SectionHeader } from '../../../primitives/index.ts'
import { sectionElement } from '../sectionData.ts'
import type { CardAction } from '../../../primitives/card/card.types.ts'
import type { SplitMediaSectionProps } from './SplitMediaSection.types.ts'

const props = withDefaults(defineProps<SplitMediaSectionProps>(), { layout: 'split', placement: 'end', variant: 'default' })
const sectionClasses = computed(() => ['split-media-section', `split-media-section--${props.layout}`, `split-media-section--placement-${props.placement}`])
const eyebrow = computed(() => sectionElement(props.section, 'eyebrow'))
const title = computed(() => sectionElement(props.section, 'title'))
const body = computed(() => sectionElement(props.section, 'body'))
const media = computed(() => {
  const hero = (props.section.elements?.images as Record<string, Array<{ image_url?: string; alt_text?: string }>> | undefined)?.hero?.[0]
  return hero ? { src: hero.image_url ?? '', alt: hero.alt_text } : null
})
const buttons = computed<CardAction[]>(() => {
  const values = props.section.elements?.buttons as Record<string, Array<Record<string, unknown>>> | undefined
  return Object.values(values ?? {}).flat().map((button) => ({ label: String(button.text ?? button.label ?? ''), href: button.href as string | undefined, to: button.vue_route as string | undefined, variant: button.variant as CardAction['variant'] | undefined })).filter((button) => button.label)
})
</script>

<style scoped>
.split-media-section__layout { display: grid; gap: clamp(1.25rem, 3vw, 3rem); }
.split-media-section__content { display: grid; align-content: center; gap: .75rem; }
.split-media-section__media { min-height: 25rem; margin: 0; overflow: hidden; border-radius: .75rem; }
.split-media-section__media img { width: 100%; height: 100%; object-fit: cover; }
.split-media-section--centered .split-media-section__content { justify-items: center; text-align: center; }
.split-media-section--background .split-media-section__layout { min-height: 32rem; }
@media (min-width: 801px) { .split-media-section--split .split-media-section__layout { grid-template-columns: 1fr 1fr; } .split-media-section--split.split-media-section--placement-start .split-media-section__media { grid-column: 1; grid-row: 1; } .split-media-section--split.split-media-section--placement-start .split-media-section__content { grid-column: 2; grid-row: 1; } .split-media-section--split.split-media-section--placement-end .split-media-section__content { grid-column: 1; grid-row: 1; } .split-media-section--split.split-media-section--placement-end .split-media-section__media { grid-column: 2; grid-row: 1; } }
</style>

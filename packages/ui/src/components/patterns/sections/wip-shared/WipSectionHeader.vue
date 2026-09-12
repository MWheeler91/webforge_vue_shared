<template>
  <SectionHeader
    v-if="label || eyebrow || heading || subheading || body"
    :eyebrow="eyebrow?.text ?? label?.text"
    :title="heading?.text"
    :subtitle="subheading?.text ?? body?.text"
    :title-as="titleAs"
    :align="alignment ?? 'inherit'"
    :emphasis="emphasis ?? 'standard'"
  />
</template>
<script setup lang="ts">
/**
 * Shared header for the still-WIP section patterns. Ported from the
 * playground's app-local demos/sections/shared/UiSectionHeader.vue.
 */
import { computed } from 'vue'
import SectionHeader from '../../../primitives/section/SectionHeader.vue'
import type { SectionTitleAs, SharedSectionProps } from '../../../primitives/section/section.types.ts'

const props = defineProps<SharedSectionProps>()
const SECTION_TITLE_AS_VALUES: readonly SectionTitleAs[] = ['h1', 'h2', 'h3', 'h4', 'p']
const titleAs = computed<SectionTitleAs>(() =>
  SECTION_TITLE_AS_VALUES.includes(props.heading?.as as SectionTitleAs)
    ? (props.heading!.as as SectionTitleAs)
    : 'h2',
)
</script>

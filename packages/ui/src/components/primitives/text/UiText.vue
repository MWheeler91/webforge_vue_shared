<template>
  <component
    :is="tag"
    v-if="payload?.text"
    class="ui-text"
    :data-tag="tag"
    :data-emphasis="emphasis"
    :data-align="payload.align ?? undefined"
  >{{ payload.text }}</component>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { UiTextAs, UiTextPayload } from '../card/card.types.ts'

const props = withDefaults(
  defineProps<{
    payload?: UiTextPayload | null
    /** Tag used when `payload.as` is unset. Pick this per call site (e.g. `h1` for a hero, `h2` for a section heading, `h3` for a card title, `p` for everything else). */
    fallback?: UiTextAs
  }>(),
  { fallback: 'p' },
)

const tag = computed(() => props.payload?.as ?? props.fallback)
const emphasis = computed(() => props.payload?.emphasis ?? 'standard')
</script>

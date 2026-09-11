<template>
  <UiText :payload="payload" :fallback="fallback" class="ui-card__title" />
</template>

<script setup lang="ts">
import UiText from '../text/UiText.vue'
import type { UiTextAs, UiTextPayload } from './card.types.ts'

withDefaults(defineProps<{ payload?: UiTextPayload | null; fallback?: UiTextAs }>(), {
  fallback: 'h3',
})
</script>

<style scoped>
.ui-card__title {
  color: inherit;
}
</style>

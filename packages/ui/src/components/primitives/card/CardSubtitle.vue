<template>
  <UiText :payload="payload" :fallback="fallback" class="ui-card__subtitle" />
</template>

<script setup lang="ts">
import UiText from '../text/UiText.vue'
import type { UiTextAs, UiTextPayload } from './card.types.ts'

withDefaults(defineProps<{ payload?: UiTextPayload | null; fallback?: UiTextAs }>(), {
  fallback: 'p',
})
</script>

<style scoped>
.ui-card__subtitle {
  color: var(--ui-current-text-secondary);
}

:global(.ui-card--variant-inverse .ui-card__subtitle) {
  color: color-mix(in srgb, var(--text_inverse) 74%, transparent);
}
</style>

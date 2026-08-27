<template>
  <p class="ui-card__subtitle">
    <slot />
  </p>
</template>

<style scoped>
.ui-card__subtitle {
  margin: 0;
  color: var(--ui-current-text-secondary);
  font-size: 0.9375rem;
  line-height: 1.6;
}

:global(.ui-card--variant-inverse .ui-card__subtitle) {
  color: color-mix(in srgb, var(--text_inverse) 74%, transparent);
}
</style>

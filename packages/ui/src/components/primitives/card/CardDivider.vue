<template>
  <div class="ui-card__divider" role="separator" />
</template>

<style scoped>
.ui-card__divider {
  height: 1px;
  width: 100%;
  background: var(--border_default);
}

:global(.ui-card--variant-inverse) .ui-card__divider {
  background: color-mix(in srgb, var(--text_inverse) 18%, transparent);
}
</style>

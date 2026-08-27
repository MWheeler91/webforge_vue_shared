<template>
  <footer class="ui-card__footer">
    <slot />
  </footer>
</template>

<style scoped>
.ui-card__footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: flex-start;
  padding: 0 1.25rem 1.25rem;
}

:global(.ui-card--padding-sm) .ui-card__footer,
:global(.ui-card--padding-md) .ui-card__footer,
:global(.ui-card--padding-lg) .ui-card__footer {
  padding: 0;
}
</style>

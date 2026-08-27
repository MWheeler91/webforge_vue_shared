<template>
  <header class="ui-card__header">
    <slot />
  </header>
</template>

<style scoped>
.ui-card__header {
  display: grid;
  gap: 0.375rem;
  padding: 1.25rem 1.25rem 0;
}

:global(.ui-card--padding-none .ui-card__header) {
  padding: 1.25rem 1.25rem 0;
}

:global(.ui-card--padding-sm .ui-card__header),
:global(.ui-card--padding-md .ui-card__header),
:global(.ui-card--padding-lg .ui-card__header) {
  padding: 0;
}
</style>

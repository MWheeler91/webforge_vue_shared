<template>
  <div class="ui-card__body">
    <slot />
  </div>
</template>

<style scoped>
.ui-card__body {
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
}

:global(.ui-card--padding-sm .ui-card__body),
:global(.ui-card--padding-md .ui-card__body),
:global(.ui-card--padding-lg .ui-card__body) {
  padding: 0;
}
</style>

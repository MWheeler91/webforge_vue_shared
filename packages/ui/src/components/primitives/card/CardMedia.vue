<template>
  <div class="ui-card__media">
    <slot />
  </div>
</template>

<style scoped>
.ui-card__media {
  display: grid;
  min-height: 11rem;
  place-items: center;
  overflow: hidden;
  background: var(--bg_muted);
  color: var(--ui-current-text-secondary);
}

.ui-card__media :deep(img),
.ui-card__media :deep(picture),
.ui-card__media :deep(video) {
  display: block;
  width: 100%;
  height: 100%;
}

.ui-card__media :deep(img),
.ui-card__media :deep(video) {
  object-fit: cover;
}
</style>

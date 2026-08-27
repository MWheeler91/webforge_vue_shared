<template>
  <component :is="as" class="ui-card__title">
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  as?: 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

withDefaults(defineProps<Props>(), {
  as: 'h3',
})
</script>

<style scoped>
.ui-card__title {
  margin: 0;
  color: inherit;
  font-family: var(--font-display);
  font-size: var(--card-title-standard-size, var(--type-heading-xs-size));
  font-weight: var(--card-title-standard-weight, var(--type-heading-xs-weight));
  line-height: var(--card-title-standard-line, var(--type-heading-xs-line));
  letter-spacing: var(--card-title-standard-letter, var(--type-heading-xs-letter));
}
</style>

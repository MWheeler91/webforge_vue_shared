<template>
  <UiFooterShell v-bind="props"
    ><div v-if="media || brand || address || hours" class="ui-location-footer">
      <div v-if="media" class="ui-location-footer__media">
        <img :src="media.src" :alt="media.alt ?? ''" />
      </div>
      <div>
        <FooterBrand v-if="brand" v-bind="brand" />
        <h2 v-if="heading">{{ heading.text }}</h2>
        <address v-if="address">{{ address.text }}</address>
        <p v-if="hours">{{ hours.text }}</p>
        <UiFooterLinks :links="links" />
      </div></div
  ></UiFooterShell>
</template>
<script setup lang="ts">
import FooterBrand from '../../../primitives/footer/FooterBrand.vue'
import type { SharedFooterProps } from '../../../primitives/footer/footer.types.ts'
import UiFooterLinks from '../shared/UiFooterLinks.vue'
import UiFooterShell from '../shared/UiFooterShell.vue'
const props = defineProps<SharedFooterProps>()
</script>
<style scoped>
.ui-location-footer {
  display: grid;
  gap: 2rem;
}
.ui-location-footer__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@media (min-width: 800px) {
  .ui-location-footer {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

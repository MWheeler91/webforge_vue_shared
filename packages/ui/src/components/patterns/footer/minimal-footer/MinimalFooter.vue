<template>
  <UiFooterShell v-bind="props"
    ><div v-if="brand || hasLinks || hasLegalContent" class="ui-minimal-footer">
      <FooterBrand v-if="brand" v-bind="brand" /><UiFooterLinks
        :links="links"
        orientation="horizontal"
      /><FooterLegalBar v-bind="props" /></div
  ></UiFooterShell>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import FooterBrand from '../../../primitives/footer/FooterBrand.vue'
import FooterLegalBar from '../../../primitives/footer/FooterLegalBar.vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { SharedFooterProps } from '../../../primitives/footer/footer.types.ts'
import UiFooterLinks from '../shared/UiFooterLinks.vue'
import UiFooterShell from '../shared/UiFooterShell.vue'
const props = defineProps<SharedFooterProps>()
const hasLinks = computed(() => collectionItems(props.links).length)
const hasLegalContent = computed(() =>
  Boolean(
    props.legalText ||
    collectionItems(props.legalLinks).length ||
    props.privacy ||
    props.terms ||
    props.created,
  ),
)
</script>
<style scoped>
.ui-minimal-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
</style>

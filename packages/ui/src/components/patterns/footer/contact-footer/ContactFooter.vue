<template>
  <UiFooterShell v-bind="props"
    ><div v-if="brand || columns.length" class="ui-contact-footer">
      <FooterBrand v-if="brand" v-bind="brand" />
      <div v-if="columns.length" class="ui-contact-footer__contacts">
        <FooterSection v-for="(column, index) in columns" :key="index" :title="column.heading?.text"
          ><UiFooterLinks :links="column.links"
        /></FooterSection>
      </div></div
  ></UiFooterShell>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import FooterBrand from '../../../primitives/footer/FooterBrand.vue'
import FooterSection from '../../../primitives/footer/FooterSection.vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { SharedFooterProps } from '../../../primitives/footer/footer.types.ts'
import UiFooterLinks from '../shared/UiFooterLinks.vue'
import UiFooterShell from '../shared/UiFooterShell.vue'
const props = defineProps<SharedFooterProps>()
const columns = computed(() => collectionItems(props.columns))
</script>
<style scoped>
.ui-contact-footer {
  display: grid;
  gap: 2rem;
}
.ui-contact-footer__contacts {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
}
</style>

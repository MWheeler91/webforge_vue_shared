<template>
  <UiFooterShell v-bind="props" :layout="'centered'"
    ><div v-if="brand || heading || social.length" class="ui-social-footer">
      <FooterBrand v-if="brand" v-bind="brand" />
      <h2 v-if="heading">{{ heading.text }}</h2>
      <FooterSocial v-if="social.length" :items="social" /><FooterLegal
        v-if="legalText"
        :text="legalText"
        align="center"
      /></div
  ></UiFooterShell>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import FooterBrand from '../../../primitives/footer/FooterBrand.vue'
import FooterLegal from '../../../primitives/footer/FooterLegal.vue'
import FooterSocial from '../../../primitives/footer/FooterSocial.vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { SharedFooterProps } from '../../../primitives/footer/footer.types.ts'
import UiFooterShell from '../shared/UiFooterShell.vue'
const props = defineProps<SharedFooterProps>()
const social = computed(() => collectionItems(props.socialLinks))
</script>
<style scoped>
.ui-social-footer {
  display: grid;
  justify-items: center;
  gap: 1rem;
  text-align: center;
}
</style>

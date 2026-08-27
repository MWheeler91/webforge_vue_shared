<template>
  <UiFooterShell v-bind="props"
    ><div
      v-if="brand || hasLinks || social.length || legalText || hasLegalLinks"
      class="ui-legal-footer"
    >
      <div v-if="brand || hasLinks || social.length" class="ui-legal-footer__main">
        <FooterBrand v-if="brand" v-bind="brand" /><UiFooterLinks
          :links="links"
          orientation="horizontal"
        /><FooterSocial v-if="social.length" :items="social" />
      </div>
      <div v-if="legalText || hasLegalLinks" class="ui-legal-footer__bar">
        <FooterLegal v-if="legalText" :text="legalText" /><UiFooterLinks
          :links="legalLinks"
          orientation="horizontal"
        />
      </div></div
  ></UiFooterShell>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import FooterBrand from '../../../primitives/footer/FooterBrand.vue'
import FooterLegal from '../../../primitives/footer/FooterLegal.vue'
import FooterSocial from '../../../primitives/footer/FooterSocial.vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { SharedFooterProps } from '../../../primitives/footer/footer.types.ts'
import UiFooterLinks from '../shared/UiFooterLinks.vue'
import UiFooterShell from '../shared/UiFooterShell.vue'
const props = defineProps<SharedFooterProps>()
const social = computed(() => collectionItems(props.socialLinks))
const hasLinks = computed(() => collectionItems(props.links).length)
const hasLegalLinks = computed(() => collectionItems(props.legalLinks).length)
</script>
<style scoped>
.ui-legal-footer {
  display: grid;
  gap: 1rem;
}
.ui-legal-footer__main,
.ui-legal-footer__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.ui-legal-footer__bar {
  padding-top: 1rem;
  border-top: 1px solid currentColor;
}
</style>

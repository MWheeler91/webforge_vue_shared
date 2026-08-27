<template>
  <UiFooterShell v-bind="props" :layout="'marketing'"
    ><div v-if="hasContent" class="ui-promo-footer">
      <section
        v-if="heading || body || media || buttonsItems.length"
        class="ui-promo-footer__feature"
      >
        <div>
          <h2 v-if="heading">{{ heading.text }}</h2>
          <p v-if="body">{{ body.text }}</p>
          <div v-if="buttonsItems.length" class="ui-promo-footer__actions">
            <BaseButton v-for="(button, index) in buttonsItems" :key="index" v-bind="button">{{
              button.label
            }}</BaseButton>
          </div>
        </div>
        <img v-if="media" :src="media.src" :alt="media.alt ?? ''" />
      </section>
      <div v-if="brand || columns.length" class="ui-promo-footer__navigation">
        <FooterBrand v-if="brand" v-bind="brand" />
        <div v-if="columns.length" class="ui-promo-footer__columns">
          <FooterSection
            v-for="(column, index) in columns"
            :key="index"
            :title="column.heading?.text"
            ><UiFooterLinks :links="column.links"
          /></FooterSection>
        </div>
      </div>
      <div v-if="legalText || hasLegalLinks" class="ui-promo-footer__legal">
        <FooterLegal v-if="legalText" :text="legalText" /><UiFooterLinks
          :links="legalLinks"
          orientation="horizontal"
        />
      </div></div
  ></UiFooterShell>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '../../../primitives/button/BaseButton.vue'
import FooterBrand from '../../../primitives/footer/FooterBrand.vue'
import FooterLegal from '../../../primitives/footer/FooterLegal.vue'
import FooterSection from '../../../primitives/footer/FooterSection.vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { SharedFooterProps } from '../../../primitives/footer/footer.types.ts'
import UiFooterLinks from '../shared/UiFooterLinks.vue'
import UiFooterShell from '../shared/UiFooterShell.vue'
const props = defineProps<SharedFooterProps>()
const buttonsItems = computed(() => collectionItems(props.buttons))
const columns = computed(() => collectionItems(props.columns))
const hasLegalLinks = computed(() => collectionItems(props.legalLinks).length)
const hasContent = computed(() =>
  Boolean(
    props.heading ||
    props.body ||
    props.media ||
    props.brand ||
    buttonsItems.value.length ||
    columns.value.length ||
    props.legalText ||
    hasLegalLinks.value,
  ),
)
</script>
<style scoped>
.ui-promo-footer {
  display: grid;
  gap: 2rem;
}
.ui-promo-footer__feature,
.ui-promo-footer__navigation {
  display: grid;
  gap: 1rem;
}
.ui-promo-footer__feature img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.ui-promo-footer__actions,
.ui-promo-footer__legal {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.ui-promo-footer__columns {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}
@media (min-width: 800px) {
  .ui-promo-footer__feature,
  .ui-promo-footer__navigation {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

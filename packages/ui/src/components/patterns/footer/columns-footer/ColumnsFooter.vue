<template>
  <UiFooterShell v-bind="props" :layout="'columns'"
    ><div
      v-if="brand || columns.length || hasInfo || hasLegalContent"
      :class="[
        'ui-columns-footer',
        compact && 'ui-columns-footer--compact',
        hasInfo && 'ui-columns-footer--has-info',
      ]"
      :style="{ '--footer-grid-columns': gridTemplateColumns }"
    >
      <div v-if="brand || hasInfo" class="ui-columns-footer__intro">
        <FooterBrand v-if="brand" v-bind="brand" />
        <FooterSection v-if="address || hours" title="Contact">
          <p v-if="address">{{ address.text }}</p>
          <p v-if="hours">{{ hours.text }}</p>
        </FooterSection>
        <FooterSocial v-if="social.length" class="ui-columns-footer__social" :items="social" />
      </div>
      <div v-if="columns.length" class="ui-columns-footer__columns">
        <FooterSection v-for="(column, index) in columns" :key="index" :title="column.heading?.text"
          ><UiFooterLinks :links="column.links"
        /></FooterSection>
      </div>
      <FooterLegalBar v-bind="props" /></div
  ></UiFooterShell>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import FooterBrand from '../../../primitives/footer/FooterBrand.vue'
import FooterLegalBar from '../../../primitives/footer/FooterLegalBar.vue'
import FooterSection from '../../../primitives/footer/FooterSection.vue'
import FooterSocial from '../../../primitives/footer/FooterSocial.vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { ColumnsFooterProps } from './ColumnsFooter.types.ts'
import UiFooterLinks from '../shared/UiFooterLinks.vue'
import UiFooterShell from '../shared/UiFooterShell.vue'
const props = defineProps<ColumnsFooterProps>()
const columns = computed(() => collectionItems(props.columns))
const compact = computed(() => props.layout === 'compact')
const social = computed(() => collectionItems(props.socialLinks))
const hasInfo = computed(() => Boolean(props.address || props.hours || social.value.length))
const gridTemplateColumns = computed(() => {
  const introWidth = hasInfo.value ? '1.3fr' : '1.4fr'

  return `minmax(0, ${introWidth}) repeat(${columns.value.length}, minmax(0, 1fr))`
})
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
.ui-columns-footer {
  display: grid;
  grid-template-columns: var(--footer-grid-columns);
  gap: 2rem;
}

.ui-columns-footer__intro {
  display: grid;
  align-content: start;
  gap: 1.5rem;
}

.ui-columns-footer__columns {
  display: contents;
  gap: 1.5rem;
}

.ui-columns-footer__intro p {
  margin: 0;
}

.ui-columns-footer__intro :deep(.ui-columns-footer__social) {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: max-content;
}

.ui-columns-footer__social :deep(.ui-footer-social__link) {
  min-width: 2.5rem;
  min-height: 2.5rem;
  font-size: 1.25rem;
}

.ui-columns-footer--compact {
  gap: 2rem 3rem;
}

.ui-columns-footer--compact :deep(.ui-footer-legal) {
  grid-column: 1 / -1;
}

@media (max-width: 50rem) {
  .ui-columns-footer {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ui-columns-footer__intro {
    grid-column: 1 / -1;
  }
}

@media (max-width: 35rem) {
  .ui-columns-footer {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>

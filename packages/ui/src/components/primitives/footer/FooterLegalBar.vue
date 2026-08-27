<template>
  <div
    v-if="divider && hasContent"
    :class="[
      'ui-footer-legal-bar',
      created && 'ui-footer-legal-bar--has-created',
      legalLinks.length && 'ui-footer-legal-bar--has-links',
    ]"
  >
    <FooterLegal v-if="legalText" :text="legalText" />
    <span v-if="created" class="ui-footer-legal-bar__created">{{ created }}</span>
    <div v-if="legalLinks.length" class="ui-footer-legal-bar__links">
      <UiFooterLinks :links="legalLinks" orientation="horizontal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { collectionItems } from '../card/card.types.ts'
import FooterLegal from './FooterLegal.vue'
import type { FooterLinkItem, SharedFooterProps } from './footer.types.ts'
import UiFooterLinks from '../../patterns/footer/shared/UiFooterLinks.vue'

const props =
  defineProps<
    Pick<
      SharedFooterProps,
      'legalText' | 'legalLinks' | 'privacy' | 'terms' | 'created' | 'divider'
    >
  >()

const legalLinks = computed<FooterLinkItem[]>(() => {
  const links = [props.privacy, props.terms].filter((link): link is FooterLinkItem => Boolean(link))

  return [...collectionItems(props.legalLinks), ...links]
})

const hasContent = computed(() =>
  Boolean(props.legalText || props.created || legalLinks.value.length),
)
</script>

<style scoped>
.ui-footer-legal-bar {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 0.75rem 1rem;
  width: 100%;
  flex-basis: 100%;
  padding-top: 1rem;
  border-top: 1px solid currentColor;
}

.ui-footer-legal-bar :deep(.ui-footer-legal) {
  justify-self: start;
}

.ui-footer-legal-bar__created {
  grid-column: 2;
  justify-self: center;
  color: var(--text_secondary);
  font-size: 0.875rem;
}

.ui-footer-legal-bar__links {
  grid-column: 3;
  justify-self: end;
}

.ui-footer-legal-bar--has-created:not(.ui-footer-legal-bar--has-links)
  .ui-footer-legal-bar__created {
  grid-column: 3;
  justify-self: end;
}

@media (max-width: 35rem) {
  .ui-footer-legal-bar {
    grid-template-columns: minmax(0, 1fr);
  }

  .ui-footer-legal-bar :deep(.ui-footer-legal),
  .ui-footer-legal-bar__created,
  .ui-footer-legal-bar__links {
    grid-column: 1;
    justify-self: start;
  }
}
</style>

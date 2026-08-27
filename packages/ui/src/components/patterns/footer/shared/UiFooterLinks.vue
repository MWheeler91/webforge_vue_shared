<template>
  <FooterNav v-if="items.length" :orientation="orientation"
    ><FooterLink v-for="(link, index) in items" :key="link.href ?? index" v-bind="link"
  /></FooterNav>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import FooterLink from '../../../primitives/footer/FooterLink.vue'
import FooterNav from '../../../primitives/footer/FooterNav.vue'
import { collectionItems, type UiCollectionInput } from '../../../primitives/card/card.types.ts'
import type { FooterLinkItem } from '../../../primitives/footer/footer.types.ts'
const props = withDefaults(
  defineProps<{
    links?: UiCollectionInput<FooterLinkItem> | null
    orientation?: 'horizontal' | 'vertical'
  }>(),
  { orientation: 'vertical' },
)
const items = computed(() => collectionItems(props.links))
</script>

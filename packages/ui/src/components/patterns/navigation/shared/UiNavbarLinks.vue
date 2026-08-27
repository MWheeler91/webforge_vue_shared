<template>
  <NavbarNav v-if="items.length" :orientation="orientation"
    ><NavbarLink
      v-for="(link, index) in items"
      :key="link.href ?? link.label ?? index"
      :href="link.href"
      :to="link.to"
      :active="link.active"
      :external="link.external"
      :disabled="link.disabled"
      >{{ link.label }}</NavbarLink
    ></NavbarNav
  >
</template>
<script setup lang="ts">
import { computed } from 'vue'
import NavbarLink from '../../../primitives/navigation/NavbarLink.vue'
import NavbarNav from '../../../primitives/navigation/NavbarNav.vue'
import { collectionItems, type UiCollectionInput } from '../../../primitives/card/card.types.ts'
import type { NavbarLinkItem } from '../../../primitives/navigation/navigation.types.ts'
const props = withDefaults(
  defineProps<{
    links?: UiCollectionInput<NavbarLinkItem> | null
    orientation?: 'horizontal' | 'vertical'
  }>(),
  { orientation: 'horizontal' },
)
const items = computed(() => collectionItems(props.links))
</script>

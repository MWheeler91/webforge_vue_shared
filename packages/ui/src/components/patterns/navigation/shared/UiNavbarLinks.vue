<template>
  <NavbarNav v-if="items.length" :orientation="orientation"
    ><template v-for="(link, index) in items" :key="link.href ?? link.label ?? index"
      ><NavbarLinkGroup
        v-if="link.children?.length"
        :label="link.label"
        :href="link.href"
        :to="link.to"
        :active="link.active"
        :external="link.external"
        :disabled="link.disabled"
        :children="link.children"
      /><NavbarLink
        v-else
        :href="link.href"
        :to="link.to"
        :active="link.active"
        :external="link.external"
        :disabled="link.disabled"
        >{{ link.label }}</NavbarLink
      ></template
    ></NavbarNav
  >
</template>
<script setup lang="ts">
import { computed } from 'vue'
import NavbarLink from '../../../primitives/navigation/NavbarLink.vue'
import NavbarLinkGroup from '../../../primitives/navigation/NavbarLinkGroup.vue'
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

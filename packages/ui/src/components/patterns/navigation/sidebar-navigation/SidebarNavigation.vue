<template>
  <aside class="ui-sidebar-navigation" :aria-label="ariaLabel ?? 'Application navigation'">
    <NavbarBrand v-if="brand" v-bind="brand" />
    <nav v-if="primary.length" class="ui-sidebar-navigation__primary">
      <NavbarLink v-for="(link, index) in primary" :key="link.href ?? index" v-bind="link">{{
        link.label
      }}</NavbarLink>
    </nav>
    <nav
      v-for="(group, name) in groups"
      :key="name"
      class="ui-sidebar-navigation__group"
      :aria-label="name"
    >
      <strong>{{ name }}</strong
      ><NavbarLink v-for="(link, index) in group" :key="link.href ?? index" v-bind="link">{{
        link.label
      }}</NavbarLink>
    </nav>
    <UiNavbarActions :actions="actions" />
  </aside>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import NavbarBrand from '../../../primitives/navigation/NavbarBrand.vue'
import NavbarLink from '../../../primitives/navigation/NavbarLink.vue'
import { collectionItems, type UiElementCollection } from '../../../primitives/card/card.types.ts'
import type {
  NavbarLinkItem,
  SharedNavbarProps,
} from '../../../primitives/navigation/navigation.types.ts'
import UiNavbarActions from '../shared/UiNavbarActions.vue'
const props = defineProps<SharedNavbarProps>()
const primary = computed(() => collectionItems(props.links))
const groups = computed(() => {
  if (!props.links || Array.isArray(props.links)) return {}
  return (props.links as UiElementCollection<NavbarLinkItem>).grouped ?? {}
})
</script>
<style scoped>
.ui-sidebar-navigation {
  display: grid;
  align-content: start;
  gap: 1rem;
  min-width: 14rem;
  padding: 1rem;
  background: var(--bg_surface);
  border-inline-end: 1px solid var(--border_default);
}
.ui-sidebar-navigation nav {
  display: grid;
  gap: 0.4rem;
}
.ui-sidebar-navigation__group {
  border-block-start: 1px solid var(--border_default);
  padding-block-start: 1rem;
}
</style>

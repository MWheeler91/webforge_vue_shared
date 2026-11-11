<template>
  <aside class="ui-sidebar-navigation" :aria-label="ariaLabel ?? 'Application navigation'">
    <NavbarBrand v-if="brand" v-bind="brand" />
    <nav v-if="primary.length" class="ui-sidebar-navigation__primary">
      <template v-for="(link, index) in primary" :key="link.href ?? index">
        <NavbarLink
          :label="link.label"
          :href="link.href"
          :to="link.to"
          :active="link.active"
          :external="link.external"
          :disabled="link.disabled"
          >{{ link.label }}</NavbarLink
        >
        <div v-if="link.children?.length" class="ui-sidebar-navigation__children">
          <NavbarLink
            v-for="(child, childIndex) in link.children"
            :key="child.href ?? childIndex"
            v-bind="child"
            >{{ child.label }}</NavbarLink
          >
        </div>
      </template>
    </nav>
    <nav
      v-for="(group, name) in groups"
      :key="name"
      class="ui-sidebar-navigation__group"
      :aria-label="name"
    >
      <strong>{{ name }}</strong>
      <template v-for="(link, index) in group" :key="link.href ?? index">
        <NavbarLink
          :label="link.label"
          :href="link.href"
          :to="link.to"
          :active="link.active"
          :external="link.external"
          :disabled="link.disabled"
          >{{ link.label }}</NavbarLink
        >
        <div v-if="link.children?.length" class="ui-sidebar-navigation__children">
          <NavbarLink
            v-for="(child, childIndex) in link.children"
            :key="child.href ?? childIndex"
            v-bind="child"
            >{{ child.label }}</NavbarLink
          >
        </div>
      </template>
    </nav>
    <UiNavbarActions :actions="actions" />
  </aside>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import NavbarBrand from '../../../primitives/navigation/NavbarBrand.vue'
import NavbarLink from '../../../primitives/navigation/NavbarLink.vue'
import { collectionItems, type UiElementCollection } from '../../../primitives/card/card.types.ts'
import type { NavbarLinkItem } from '../../../primitives/navigation/navigation.types.ts'
import type { SidebarNavigationProps } from './SidebarNavigation.types.ts'
import UiNavbarActions from '../shared/UiNavbarActions.vue'
const props = defineProps<SidebarNavigationProps>()
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
.ui-sidebar-navigation__children {
  display: grid;
  gap: 0.25rem;
  margin-inline-start: 1rem;
  padding-inline-start: 0.75rem;
  border-inline-start: 1px solid var(--border_default);
}
</style>

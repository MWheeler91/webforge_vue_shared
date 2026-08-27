<template>
  <BaseNavbar
    :id="navId"
    :aria-label="ariaLabel ?? 'Primary navigation'"
    :variant="variant ?? 'surface'"
    :size="size ?? 'md'"
    :position="position ?? 'static'"
    :container-width="containerWidth"
    layout="simple"
    :collapsible="collapsible ?? true"
    ><template #brand><NavbarBrand v-bind="brand ?? {}" /></template
    ><template #nav
      ><NavbarNav
        ><details
          v-for="(menu, index) in menuItems"
          :key="menu.label ?? index"
          class="ui-disclosure-navbar__menu"
        >
          <summary>{{ menu.label }}</summary>
          <UiNavbarLinks :links="menu.links" orientation="vertical" />
        </details>
        <UiNavbarLinks :links="links" /></NavbarNav></template
    ><template #actions><UiNavbarActions :actions="actions" /></template
  ></BaseNavbar>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import BaseNavbar from '../../../primitives/navigation/BaseNavbar.vue'
import NavbarBrand from '../../../primitives/navigation/NavbarBrand.vue'
import NavbarNav from '../../../primitives/navigation/NavbarNav.vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { SharedNavbarProps } from '../../../primitives/navigation/navigation.types.ts'
import UiNavbarActions from '../shared/UiNavbarActions.vue'
import UiNavbarLinks from '../shared/UiNavbarLinks.vue'
const props = defineProps<SharedNavbarProps>()
const menuItems = computed(() => collectionItems(props.menus))
</script>
<style scoped>
.ui-disclosure-navbar__menu {
  position: relative;
}
.ui-disclosure-navbar__menu summary {
  cursor: pointer;
}
.ui-disclosure-navbar__menu[open] :deep(.ui-navbar-nav) {
  position: absolute;
  z-index: 2;
  min-width: 12rem;
  padding: 1rem;
  background: var(--bg_surface);
  border: 1px solid var(--border_default);
}
</style>

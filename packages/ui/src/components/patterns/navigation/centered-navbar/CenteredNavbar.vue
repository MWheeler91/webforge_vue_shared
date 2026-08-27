<template>
  <BaseNavbar
    :id="navId"
    :aria-label="ariaLabel ?? 'Primary navigation'"
    :variant="variant ?? 'surface'"
    :size="size ?? 'md'"
    :position="position ?? 'static'"
    :container-width="containerWidth"
    layout="centered"
    :collapsible="collapsible ?? true"
    class="ui-centered-navbar"
    ><template #brand><NavbarBrand v-bind="brand ?? {}" /></template
    ><template #nav
      ><div class="ui-centered-navbar__groups">
        <UiNavbarLinks :links="leadingLinks ?? links" /><UiNavbarLinks
          :links="trailingLinks"
        /></div></template
    ><template #actions><UiNavbarActions :actions="actions" /></template
  ></BaseNavbar>
</template>
<script setup lang="ts">
import BaseNavbar from '../../../primitives/navigation/BaseNavbar.vue'
import NavbarBrand from '../../../primitives/navigation/NavbarBrand.vue'
import type { SharedNavbarProps } from '../../../primitives/navigation/navigation.types.ts'
import UiNavbarActions from '../shared/UiNavbarActions.vue'
import UiNavbarLinks from '../shared/UiNavbarLinks.vue'
defineProps<SharedNavbarProps>()
</script>
<style scoped>
.ui-centered-navbar__groups {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
}
</style>

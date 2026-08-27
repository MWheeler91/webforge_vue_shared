<template>
  <div class="ui-standard-navbar">
    <div v-if="announcement" class="ui-standard-navbar__announcement" role="status">
      {{ announcement.text
      }}<BaseButton v-if="announcement.action" v-bind="announcement.action">{{
        announcement.action.label
      }}</BaseButton>
    </div>
    <BaseNavbar
      :id="navId"
      :aria-label="ariaLabel ?? 'Primary navigation'"
      :variant="variant ?? 'surface'"
      :size="size ?? 'md'"
      :position="position ?? 'static'"
      :container-width="containerWidth"
      layout="simple"
      :collapsible="collapsible ?? true"
      ><template #brand>
        <slot name="brand">
          <NavbarBrand v-bind="brand ?? {}" />
        </slot>
      </template>
      ><template #nav><UiNavbarLinks :links="links" /></template
      ><template #actions><UiNavbarActions :actions="actions" /></template
    ></BaseNavbar>
  </div>
</template>
<script setup lang="ts">
import BaseButton from '../../../primitives/button/BaseButton.vue'
import BaseNavbar from '../../../primitives/navigation/BaseNavbar.vue'
import NavbarBrand from '../../../primitives/navigation/NavbarBrand.vue'
import type { SharedNavbarProps } from '../../../primitives/navigation/navigation.types.ts'
import UiNavbarActions from '../shared/UiNavbarActions.vue'
import UiNavbarLinks from '../shared/UiNavbarLinks.vue'
defineProps<SharedNavbarProps>()
</script>
<style scoped>
.ui-standard-navbar__announcement {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  padding: 0.5rem;
  background: var(--brand_soft);
}
</style>

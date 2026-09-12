<template>
  <BaseSection
    :id="sectionId"
    :aria-label="ariaLabel"
    :variant="variant"
    :width="containerWidth ?? width"
    :spacing="spacing"
    :align="alignment ?? align"
    :unstyled="unstyled"
    :class="classes"
    ><slot
  /></BaseSection>
</template>
<script setup lang="ts">
/**
 * Shared shell for the still-WIP section patterns (logo-strip, services,
 * stats, process, showcase, pricing). Ported from the playground's
 * app-local demos/sections/shared/UiSectionShell.vue so the WIP patterns
 * keep working the same way once they're finished.
 */
import { computed } from 'vue'
import BaseSection from '../../../primitives/section/BaseSection.vue'
import type { SharedSectionProps } from '../../../primitives/section/section.types.ts'

const props = withDefaults(defineProps<SharedSectionProps>(), {
  variant: 'default',
  width: 'xl',
  spacing: 'lg',
  align: 'left',
  unstyled: false,
  alignment: null,
  density: 'standard',
  shadow: 'none',
  border: 'none',
  radius: 'inherit',
})
const classes = computed(() => [
  'ui-pattern-section',
  `ui-pattern-section--density-${props.density}`,
  `ui-pattern-section--shadow-${props.shadow}`,
  `ui-pattern-section--border-${props.border}`,
  `ui-pattern-section--radius-${props.radius}`,
  props.featured && 'ui-pattern-section--featured',
])
</script>
<style scoped>
.ui-pattern-section--shadow-sm {
  box-shadow: 0 0.25rem 0.75rem var(--shadow_rgba);
}
.ui-pattern-section--shadow-md {
  box-shadow: 0 0.625rem 1.5rem var(--shadow_rgba);
}
.ui-pattern-section--shadow-lg {
  box-shadow: 0 1rem 2.5rem var(--shadow_rgba);
}
.ui-pattern-section--border-subtle {
  border-block: 1px solid var(--border_default);
}
</style>

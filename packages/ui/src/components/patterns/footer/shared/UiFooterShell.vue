<template>
  <BaseFooter
    :id="footerId"
    :aria-label="ariaLabel"
    :variant="variant ?? 'surface'"
    :size="size ?? 'md'"
    :layout="safeLayout"
    :full-width="fullWidth"
    :class="classes"
    ><slot
  /></BaseFooter>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import BaseFooter from '../../../primitives/footer/BaseFooter.vue'
import type { SharedFooterProps } from '../../../primitives/footer/footer.types.ts'
const props = withDefaults(defineProps<SharedFooterProps>(), {
  layout: 'simple',
  fullWidth: false,
  density: 'standard',
  shadow: 'none',
  border: 'none',
})
const safeLayout = computed(() =>
  ['simple', 'centered', 'columns', 'marketing'].includes(props.layout ?? '')
    ? (props.layout as 'simple' | 'centered' | 'columns' | 'marketing')
    : 'simple',
)
const classes = computed(() => [
  'ui-pattern-footer',
  `ui-pattern-footer--density-${props.density}`,
  `ui-pattern-footer--shadow-${props.shadow}`,
  `ui-pattern-footer--border-${props.border}`,
])
</script>

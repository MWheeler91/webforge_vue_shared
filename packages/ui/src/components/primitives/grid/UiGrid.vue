<template>
  <component :is="as" v-bind="gridAttrs" :class="classes" :style="[gridStyle, externalStyle]">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs, type CSSProperties, type StyleValue } from 'vue'
import type { UiGridProps } from './grid.types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<UiGridProps>(), {
  as: 'div',
  minItemWidth: 280,
  maxColumns: 4,
  gap: 'md',
  rowGap: null,
  align: 'stretch',
  justify: 'stretch',
  equalHeight: false,
  dense: false,
})

const attrs = useAttrs()

const gridAttrs = computed(() => {
  const rest = { ...attrs }
  delete rest.class
  delete rest.style
  return rest
})

const externalStyle = computed(() => attrs.style as StyleValue | undefined)

const normalizedMinItemWidth = computed(() => {
  if (typeof props.minItemWidth === 'number') {
    return `${Math.max(1, props.minItemWidth)}px`
  }

  const value = props.minItemWidth.trim()
  if (/^\d+(?:\.\d+)?$/.test(value)) return `${Math.max(1, Number(value))}px`
  if (/^\d+(?:\.\d+)?(?:px|rem|em|ch|vw|vh|%)$/.test(value)) return value
  return '280px'
})

const normalizedMaxColumns = computed(() => {
  if (!Number.isFinite(props.maxColumns)) return 4
  return Math.min(12, Math.max(1, Math.trunc(props.maxColumns)))
})

const gridStyle = computed(
  () =>
    ({
      '--ui-grid-min-item-width': normalizedMinItemWidth.value,
      '--ui-grid-max-columns': normalizedMaxColumns.value,
    }) as CSSProperties,
)

const classes = computed(() => [
  'ui-grid',
  `ui-grid--gap-${props.gap}`,
  props.rowGap && `ui-grid--row-gap-${props.rowGap}`,
  `ui-grid--align-${props.align}`,
  `ui-grid--justify-${props.justify}`,
  props.equalHeight && 'ui-grid--equal-height',
  props.dense && 'ui-grid--dense',
  attrs.class,
])
</script>

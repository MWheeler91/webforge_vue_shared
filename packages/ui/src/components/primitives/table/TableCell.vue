<template>
  <component
    :is="header ? 'th' : 'td'"
    class="ui-table__cell"
    :class="`ui-table__cell--${align}`"
    :scope="header ? scope : undefined"
    ><slot
  /></component>
</template>
<script setup lang="ts">
import type { TableAlign } from './table.types'
withDefaults(defineProps<{ header?: boolean; scope?: 'col' | 'row'; align?: TableAlign }>(), {
  header: false,
  scope: 'col',
  align: 'left',
})
</script>

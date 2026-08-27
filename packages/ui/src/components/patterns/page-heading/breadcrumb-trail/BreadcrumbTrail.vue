<template>
  <BaseBreadcrumb v-if="items.length" :aria-label="ariaLabel ?? 'Breadcrumb'"
    ><BreadcrumbItem
      v-for="(item, index) in items"
      :key="index"
      :href="item.href"
      :to="item.to"
      :current="item.current ?? index === items.length - 1"
      ><span v-if="item.home" aria-hidden="true">⌂</span
      ><span v-else>{{ item.label }}</span></BreadcrumbItem
    ></BaseBreadcrumb
  >
</template>
<script setup lang="ts">
import { computed } from 'vue'
import BaseBreadcrumb from '../../../primitives/breadcrumb/BaseBreadcrumb.vue'
import BreadcrumbItem from '../../../primitives/breadcrumb/BreadcrumbItem.vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { SharedPageHeadingProps } from '../../../primitives/page-heading/page-heading.types.ts'
const props = defineProps<SharedPageHeadingProps>()
const items = computed(() => collectionItems(props.breadcrumbs))
</script>

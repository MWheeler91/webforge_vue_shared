<template><DisclosureNavbar v-bind="props" class="ui-mega-menu-navbar" /></template>
<script setup lang="ts">
import type { SharedNavbarProps } from '../../../primitives/navigation/navigation.types.ts'
import DisclosureNavbar from '../disclosure-navbar/DisclosureNavbar.vue'
const props = defineProps<SharedNavbarProps>()
</script>

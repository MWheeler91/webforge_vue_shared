<template><DisclosureNavbar v-bind="props" class="ui-mega-menu-navbar" /></template>
<script setup lang="ts">
import type { MegaMenuNavbarProps } from './MegaMenuNavbar.types.ts'
import DisclosureNavbar from '../disclosure-navbar/DisclosureNavbar.vue'
const props = defineProps<MegaMenuNavbarProps>()
</script>

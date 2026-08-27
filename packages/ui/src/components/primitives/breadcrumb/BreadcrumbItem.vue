<template>
  <li class="ui-breadcrumb__item">
    <span v-if="current" aria-current="page"><slot /></span
    ><component v-else :is="to ? RouterLink : 'a'" :to="to" :href="href" class="ui-breadcrumb__link"
      ><slot
    /></component>
  </li>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
withDefaults(
  defineProps<{ current?: boolean; href?: string; to?: string | Record<string, unknown> }>(),
  { current: false, href: undefined, to: undefined },
)
</script>

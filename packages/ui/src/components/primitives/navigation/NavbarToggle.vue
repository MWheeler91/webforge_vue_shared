<template>
  <span class="ui-navbar-toggle" :class="open && 'ui-navbar-toggle--open'" aria-hidden="true">
    <span class="ui-navbar-toggle__line" />
    <span class="ui-navbar-toggle__line" />
    <span class="ui-navbar-toggle__line" />
  </span>
</template>

<script setup lang="ts">
interface Props {
  open?: boolean
}

withDefaults(defineProps<Props>(), {
  open: false,
})
</script>

<template>
  <UiFooterShell v-bind="props"
    ><div v-if="heading || body || hasForm || hasLinks" class="ui-newsletter-footer">
      <div v-if="heading || body">
        <h2 v-if="heading">{{ heading.text }}</h2>
        <p v-if="body">{{ body.text }}</p>
      </div>
      <form v-if="hasForm">
        <label
          ><span class="sr-only">Email address</span
          ><input type="email" aria-label="Email address" /></label
        ><BaseButton v-for="(button, index) in buttonsItems" :key="index" v-bind="button">{{
          button.label
        }}</BaseButton>
      </form>
      <UiFooterLinks :links="links" orientation="horizontal" /></div
  ></UiFooterShell>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '../../../primitives/button/BaseButton.vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { SharedFooterProps } from '../../../primitives/footer/footer.types.ts'
import UiFooterLinks from '../shared/UiFooterLinks.vue'
import UiFooterShell from '../shared/UiFooterShell.vue'
const props = defineProps<SharedFooterProps>()
const buttonsItems = computed(() => collectionItems(props.buttons))
const hasForm = computed(() => buttonsItems.value.length > 0)
const hasLinks = computed(() => collectionItems(props.links).length)
</script>
<style scoped>
.ui-newsletter-footer {
  display: grid;
  gap: 1rem;
}
.ui-newsletter-footer form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>

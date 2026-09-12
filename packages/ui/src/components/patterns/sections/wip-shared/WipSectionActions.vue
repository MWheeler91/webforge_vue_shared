<template>
  <div v-if="actions.length" class="wip-section-actions">
    <BaseButton v-for="(action, index) in actions" :key="action.id ?? index" v-bind="action">{{
      action.label
    }}</BaseButton>
  </div>
</template>
<script setup lang="ts">
/**
 * Shared action row for the still-WIP section patterns. Ported from the
 * playground's app-local demos/sections/shared/UiSectionActions.vue.
 */
import { computed } from 'vue'
import BaseButton from '../../../primitives/button/BaseButton.vue'
import { collectionItems } from '../../../primitives/card/card.types.ts'
import type { CardAction, UiElementCollection } from '../../../primitives/card/card.types.ts'

const props = defineProps<{ buttons?: UiElementCollection<CardAction> | null }>()
const actions = computed(() => collectionItems(props.buttons))
</script>
<style scoped>
.wip-section-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
</style>

<template>
  <NavbarActions v-if="items.length"
    ><BaseButton
      v-for="(action, index) in items"
      :key="action.id ?? action.href ?? index"
      v-bind="action"
      >{{ action.label }}</BaseButton
    ></NavbarActions
  >
</template>
<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '../../../primitives/button/BaseButton.vue'
import NavbarActions from '../../../primitives/navigation/NavbarActions.vue'
import {
  collectionItems,
  type CardAction,
  type UiCollectionInput,
} from '../../../primitives/card/card.types.ts'
const props = defineProps<{ actions?: UiCollectionInput<CardAction> | null }>()
const items = computed(() => collectionItems(props.actions))
</script>

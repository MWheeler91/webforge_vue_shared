<template>
  <CardLink
    v-if="isLink"
    :href="props.href ?? undefined"
    :to="props.to ?? undefined"
    :variant="props.variant"
    :padding="props.padding"
    :unstyled="props.unstyled"
    v-bind="$attrs"
  >
    <slot />
  </CardLink>
  <BaseCard
    v-else
    :as="props.as"
    :variant="props.variant"
    :padding="props.padding"
    :interactive="props.interactive"
    :unstyled="props.unstyled"
    v-bind="$attrs"
  >
    <slot />
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from './BaseCard.vue'
import CardLink from './CardLink.vue'
import type { BaseCardProps } from './card.types.ts'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BaseCardProps>(), {
  as: 'article',
  variant: 'surface',
  padding: 'md',
  interactive: false,
  unstyled: false,
  href: null,
  to: null,
})

// A card only becomes a real link when it's marked interactive and has
// somewhere to go. Otherwise `interactive` stays a visual-only affordance on
// BaseCard, matching existing behavior for cards with no navigation target yet.
const isLink = computed(() => props.interactive && Boolean(props.href || props.to))
</script>

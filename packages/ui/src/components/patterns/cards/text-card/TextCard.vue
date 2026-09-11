<template>
  <div class="ui-text-card">
    <BaseCard
      :as="props.as"
      :variant="props.variant"
      :padding="props.padding"
      :interactive="props.interactive"
      :unstyled="props.unstyled"
      v-bind="$attrs"
      class="ui-text-card__card"
    >
      <component
        :is="eyebrow?.as ?? 'small'"
        v-if="eyebrow"
        class="ui-text-card__eyebrow text-brand"
        :data-emphasis="eyebrow.emphasis"
        >{{ eyebrow.text }}</component
      >
      <CardTitle v-if="title" :as="title.as ?? 'h3'" :data-emphasis="title.emphasis">{{
        title.text
      }}</CardTitle>
      <component
        :is="body.as ?? 'p'"
        v-if="body"
        class="text-secondary"
        :data-emphasis="body.emphasis"
        >{{ body.text }}</component
      >
      <CardDivider v-if="divider" />
      <CardFooter v-if="footer" :data-emphasis="footer.emphasis">{{ footer.text }}</CardFooter>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '../../../primitives/card/BaseCard.vue'
import CardDivider from '../../../primitives/card/CardDivider.vue'
import CardFooter from '../../../primitives/card/CardFooter.vue'
import CardTitle from '../../../primitives/card/CardTitle.vue'
import { textPayload } from '../../../primitives/card/card.types.ts'
import type { TextCardProps } from './TextCard.types.ts'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TextCardProps>(), {
  as: 'article',
  variant: 'surface',
  padding: 'md',
  interactive: false,
  unstyled: false,
  eyebrow: null,
  title: null,
  body: null,
  divider: false,
  footer: null,
})

const eyebrow = computed(() => textPayload(props.eyebrow))
const title = computed(() => textPayload(props.title))
const body = computed(() => textPayload(props.body))
const footer = computed(() => textPayload(props.footer))
</script>

<style scoped>
.ui-text-card {
  container-type: inline-size;
  min-width: 0;
  width: 100%;
}

.ui-text-card__card {
  min-width: 0;
  width: 100%;
  height: 100%;
}

.ui-text-card__eyebrow {
  display: block;
  margin-bottom: 0.5rem;
  font-size: var(--type-body-small-size);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
</style>

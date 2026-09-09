<template>
  <div :class="classes">
    <BaseCard
      as="article"
      :variant="props.variant"
      :padding="props.padding"
      :interactive="props.interactive"
      :unstyled="props.unstyled"
      v-bind="$attrs"
      class="ui-quote-card__card"
    >
      <figure v-if="quote || author || avatar" class="ui-quote-card__figure">
        <blockquote
          v-if="quote"
          :id="quoteId"
          ref="quoteEl"
          class="ui-quote-card__quote"
          :class="{ 'ui-quote-card__quote--clamped': isClamped }"
          :style="clampStyle"
          :data-emphasis="quote.emphasis"
        >{{ quote.text }}</blockquote>

        <button
          v-if="showToggle"
          type="button"
          class="ui-quote-card__toggle"
          :aria-expanded="expanded"
          :aria-controls="quoteId"
          @click="expanded = !expanded"
        >{{ expanded ? 'Show less' : 'Show more' }}</button>

        <figcaption v-if="author || avatar" class="ui-quote-card__attribution">
          <img
            v-if="avatar"
            class="ui-quote-card__avatar"
            :src="avatar.src"
            :alt="avatar.alt ?? ''"
          />
          <component
            :is="author.as ?? 'span'"
            v-if="author"
            class="ui-quote-card__author"
            :data-emphasis="author.emphasis"
          >{{ author.text }}</component>
        </figcaption>
      </figure>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import BaseCard from '../../../primitives/card/BaseCard.vue'
import { textPayload } from '../../../primitives/card/card.types.ts'
import { cn } from '../../../../utils/classNames.ts'
import type { QuoteCardProps } from './QuoteCard.types.ts'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<QuoteCardProps>(), {
  variant: 'surface',
  padding: 'md',
  interactive: false,
  unstyled: false,
  layout: 'default',
  quote: null,
  author: null,
  avatar: null,
  clamp: null,
})

const quote = computed(() => textPayload(props.quote))
const author = computed(() => textPayload(props.author))
const avatar = computed(() => props.avatar ?? null)
const classes = computed(() => cn('ui-quote-card', `ui-quote-card--layout-${props.layout}`))

const quoteId = useId()
const quoteEl = ref<HTMLElement | null>(null)
const expanded = ref(false)
const overflowing = ref(false)

const isClamped = computed(() => Boolean(props.clamp) && !expanded.value)
const clampStyle = computed(() =>
  props.clamp ? { '--ui-quote-card-lines': String(props.clamp) } : undefined,
)
// The toggle stays visible while expanded so the reader can collapse again.
const showToggle = computed(() => Boolean(props.clamp) && (overflowing.value || expanded.value))

function measureOverflow() {
  const el = quoteEl.value
  if (!el || !props.clamp || expanded.value) return
  overflowing.value = el.scrollHeight - el.clientHeight > 1
}

let observer: ResizeObserver | null = null

onMounted(() => {
  measureOverflow()
  if (typeof ResizeObserver !== 'undefined' && quoteEl.value) {
    observer = new ResizeObserver(() => measureOverflow())
    observer.observe(quoteEl.value)
  }
})

onBeforeUnmount(() => observer?.disconnect())

watch(
  () => [props.clamp, quote.value?.text],
  () => {
    expanded.value = false
    nextTick(measureOverflow)
  },
)
</script>

<style scoped>
.ui-quote-card {
  container-type: inline-size;
  min-width: 0;
  width: 100%;
}

.ui-quote-card__card {
  min-width: 0;
  width: 100%;
}

.ui-quote-card__figure {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
}

.ui-quote-card__quote {
  margin: 0;
  color: inherit;
  font-family: var(--font-display);
  font-size: var(--type-body-lead-size);
  line-height: var(--type-body-lead-line);
  quotes: '\201C' '\201D' '\2018' '\2019';
}

.ui-quote-card__quote::before {
  content: open-quote;
}

.ui-quote-card__quote::after {
  content: close-quote;
}

.ui-quote-card__quote--clamped {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--ui-quote-card-lines, 3);
  overflow: hidden;
}

.ui-quote-card__toggle {
  align-self: flex-start;
  margin-top: -0.25rem;
  padding: 0;
  border: 0;
  background: none;
  color: var(--ui-current-link, var(--brand));
  font: inherit;
  font-size: var(--type-body-small-size);
  line-height: var(--type-body-small-line);
  cursor: pointer;
}

.ui-quote-card__toggle:hover {
  text-decoration: underline;
}

.ui-quote-card__toggle:focus-visible {
  outline: 2px solid var(--border_focus);
  outline-offset: 2px;
}

.ui-quote-card__attribution {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}

.ui-quote-card__avatar {
  flex: none;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  object-fit: cover;
}

.ui-quote-card__author {
  min-width: 0;
  color: var(--ui-current-text-secondary);
  font-size: var(--type-body-small-size);
  line-height: var(--type-body-small-line);
}

/* lead: attribution above the quote */
.ui-quote-card--layout-lead .ui-quote-card__attribution {
  order: -1;
}

/* stacked: attribution above the quote, avatar over author, all centered */
.ui-quote-card--layout-stacked .ui-quote-card__figure {
  align-items: center;
  text-align: center;
}

.ui-quote-card--layout-stacked .ui-quote-card__attribution {
  order: -1;
  flex-direction: column;
  gap: 0.5rem;
}

.ui-quote-card--layout-stacked .ui-quote-card__toggle {
  align-self: center;
}

/* compact: smaller footprint */
.ui-quote-card--layout-compact .ui-quote-card__figure {
  gap: 0.625rem;
}

.ui-quote-card--layout-compact .ui-quote-card__quote {
  font-size: var(--type-body-standard-size);
  line-height: var(--type-body-standard-line);
}

.ui-quote-card--layout-compact .ui-quote-card__avatar {
  width: 2rem;
  height: 2rem;
}
</style>

<template>
  <BaseSection :id="section.key ?? undefined" :class="classes" :variant="variant" spacing="none" width="full">
    <BaseContainer v-if="eyebrow || title || body" width="full" padding="lg">
      <SectionHeader
        class="trust-strip-section__header"
        :eyebrow="eyebrow?.text ?? undefined"
        :subtitle="body?.text ?? undefined"
      >
        <template #title>{{ title?.text }}</template>
      </SectionHeader>
    </BaseContainer>

    <div v-if="items.length" class="trust-strip-section__grid">
      <div v-for="(item, index) in items" :key="item.key ?? index" class="trust-strip-section__item">
        <StatCard
          variant="ghost"
          :padding="cardPadding"
          :value="item.value"
          :title="item.title ?? undefined"
          :body="item.body ?? undefined"
          :footer="item.footer ?? undefined"
        />
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { BaseContainer, BaseSection, SectionHeader } from '../../../primitives/index.ts'
import StatCard from '../../cards/stat-card/StatCard.vue'
import type { UiTextAs, UiTextEmphasis, UiTextPayload } from '../../../primitives/card/card.types.ts'
import { cardElement, sectionCards, sectionElement, type UiSectionElement } from '../sectionData.ts'
import { TRUST_STRIP_MAX_CARDS, type TrustStripSectionProps } from './TrustStripSection.types.ts'

const props = withDefaults(defineProps<TrustStripSectionProps>(), {
  layout: 'compact',
  divider: true,
  variant: 'default',
})

const layout = computed(() => props.layout)
const cardPadding = computed(() => (layout.value === 'grid' ? 'lg' : 'sm'))

const eyebrow = computed(() => sectionElement(props.section, 'eyebrow'))
const title = computed(() => sectionElement(props.section, 'title'))
const body = computed(() => sectionElement(props.section, 'body'))

/**
 * Every text field the database returns can carry its own `as` (h1-h6/p/span)
 * and `emphasis` (prominent/standard/compact) - a card author can return
 * a title as a plain `p` tag and still get the exact same visual rung by
 * setting `emphasis`, instead of the semantic tag driving the look. These
 * live directly on the element (it's really a `UiTextPayload` on the wire);
 * `UiSectionElement`'s declared shape just doesn't name them.
 */
function toTextPayload(element: UiSectionElement | null): UiTextPayload | undefined {
  if (!element?.text) return undefined
  const raw = element as unknown as { as?: UiTextAs; emphasis?: UiTextEmphasis }
  return {
    text: element.text,
    as: raw.as,
    emphasis: raw.emphasis,
  }
}

/** Only stat-card-shaped text fields are read - never dispatched through the card registry. */
const items = computed(() =>
  sectionCards(props.section)
    .slice(0, TRUST_STRIP_MAX_CARDS)
    .map((card) => ({
      key: card.key,
      value: cardElement(card, 'value')?.text ?? undefined,
      title: toTextPayload(cardElement(card, 'title')),
      body: toTextPayload(cardElement(card, 'body')),
      footer: toTextPayload(cardElement(card, 'footer')),
    })),
)

const classes = computed(() => [
  'trust-strip-section',
  `trust-strip-section--layout-${layout.value}`,
  { 'trust-strip-section--divider': props.divider, 'trust-strip-section--many': items.value.length > 4 },
])
</script>

<style scoped>
/*
 * Container queries, not viewport media queries: the column count responds
 * to this section's own rendered width (which the consumer controls by how
 * they compose the page - it always renders full-bleed edge to edge, with no
 * `width` prop of its own), not the browser window.
 */
.trust-strip-section {
  container-type: inline-size;
}

.trust-strip-section__header {
  /* The grid needs no top padding of its own (cards sit flush against the
     section's top edge, per the reference designs), but a header has
     nothing else to keep it off that same edge (spacing is `none`). */
  padding-block-start: 1.5rem;
  margin-bottom: 2rem;
}

.trust-strip-section__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  /* Never stretch a card to match a taller sibling's row height - each card
     sizes to its own content, so mismatched title/body lengths don't leave
     large blank space under the shorter cards. */
  align-items: start;
}

/* Tablet threshold and up: 2 across. */
@container (min-width: 40rem) {
  .trust-strip-section__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop threshold and up: 4 across - this is the common laptop/desktop
   width, well short of a genuinely wide/full-width monitor, so 8 cards here
   settle into two rows of 4. */
@container (min-width: 64rem) {
  .trust-strip-section__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Only once the container is wide enough to be a real full-width layout, and
   only once there are more than 4 cards to fill a second row: 8 across, one
   row. Fewer cards stay at the 4-across tier rather than spreading thin
   across 8 mostly-empty columns. */
@container (min-width: 120rem) {
  .trust-strip-section--many .trust-strip-section__grid {
    grid-template-columns: repeat(8, 1fr);
  }
}

/*
 * Dividers sit strictly BETWEEN cards - never on the strip's outer left/right
 * edge, and never a full box around each card. Each tier below states, for
 * its own column count, which cards are first-in-row (no left divider) and
 * which are in the first row (no top divider); everything else gets one.
 * Re-declared per tier because "first in row" depends on the active column
 * count, which changes at each breakpoint.
 */
.trust-strip-section--divider .trust-strip-section__item:not(:first-child) {
  border-block-start: 1px solid var(--border_default);
}

@container (min-width: 40rem) {
  .trust-strip-section--divider .trust-strip-section__item:not(:first-child) {
    border-block-start: none;
  }

  .trust-strip-section--divider .trust-strip-section__item:nth-child(n + 3) {
    border-block-start: 1px solid var(--border_default);
  }

  .trust-strip-section--divider .trust-strip-section__item:nth-child(2n) {
    border-inline-start: 1px solid var(--border_default);
  }
}

@container (min-width: 64rem) {
  .trust-strip-section--divider .trust-strip-section__item:nth-child(n + 3) {
    border-block-start: none;
  }

  .trust-strip-section--divider .trust-strip-section__item:nth-child(n + 5) {
    border-block-start: 1px solid var(--border_default);
  }

  .trust-strip-section--divider .trust-strip-section__item:nth-child(2n) {
    border-inline-start: none;
  }

  .trust-strip-section--divider .trust-strip-section__item:not(:nth-child(4n + 1)) {
    border-inline-start: 1px solid var(--border_default);
  }
}

@container (min-width: 120rem) {
  .trust-strip-section--many.trust-strip-section--divider .trust-strip-section__item:nth-child(n + 5) {
    border-block-start: none;
  }

  .trust-strip-section--many.trust-strip-section--divider .trust-strip-section__item:not(:nth-child(4n + 1)) {
    border-inline-start: none;
  }

  .trust-strip-section--many.trust-strip-section--divider .trust-strip-section__item:not(:nth-child(8n + 1)) {
    border-inline-start: 1px solid var(--border_default);
  }
}
</style>

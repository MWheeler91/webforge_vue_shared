import type { SectionVariant, UiSectionData } from '../../../primitives/section/section.types.ts'

/** Hard cap for the whole component, independent of layout or rendered width. A 9th card is discarded, not wrapped. */
export const TRUST_STRIP_MAX_CARDS = 8

/**
 * `compact` - Cascade Fiber's look: tight card padding, reads as attached to
 *             whatever section sits above it. The default. Expected content
 *             is a value plus a short title - a sentence of body text will
 *             feel cramped here.
 * `grid`    - Tiepoint Fiber's look: taller card padding, room for a
 *             supporting sentence or two under the title.
 *
 * Neither layout owns a container width - like every other shared section
 * pattern this section has no `width` prop, but unlike most it always
 * renders through `BaseContainer width="full"` (edge-to-edge), matching both
 * reference designs. Its column count (1 / 2 / 4 / 8) responds to how wide
 * it actually ends up rendering via container queries, which is entirely up
 * to the consumer's page composition: a typical laptop/desktop width lands
 * on 4-across (8 cards become two rows of 4), and only a genuinely wide
 * monitor reaches a single row of 8 - "full width" in the literal sense, not
 * just an unconstrained container.
 */
export type TrustStripSectionLayout = 'compact' | 'grid'

export interface TrustStripSectionProps {
  /**
   * The complete section, including its nested "card" placements. Only
   * `stat-card`-shaped fields (`value`, `label`, `title`, `body`, `footer`)
   * are read per card - this pattern never dispatches through the card
   * registry, so a card's own `componentKey` is ignored.
   */
  section: UiSectionData
  /** Default `compact`. */
  layout?: TrustStripSectionLayout
  /** Hairline dividers between every card, in both directions. Default `true`. */
  divider?: boolean
  variant?: SectionVariant
}

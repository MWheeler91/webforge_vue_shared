import type { SectionVariant, UiSectionData } from '../../../primitives/section/section.types.ts'

/**
 * `grid`    - static wrapping row of cards; collapses to one column at its breakpoint.
 * `marquee` - continuous, endless horizontal scroll that loops seamlessly; fully
 *             automatic and pauses on hover/focus. Reduced motion falls back to a
 *             static, manually scrollable row.
 * `fade`    - the visible cards animate out and the next set animates in on a timer;
 *             fully automatic and pauses on hover/focus. Reduced motion falls back to
 *             a static list showing every card.
 */
export type TestimonialSectionLayout = 'grid' | 'marquee' | 'fade'

/**
 * Target testimonial-card width. The number of cards visible at once is derived
 * from the available width, never set directly, so the same section adapts from a
 * narrow split column to an ultrawide viewport.
 *
 * `compact`  - narrow cards, more visible per row (good for many short quotes).
 * `standard` - the default balance.
 * `spacious` - wide cards, roughly one prominent quote at typical widths.
 */
export type TestimonialSectionDensity = 'compact' | 'standard' | 'spacious'

export interface TestimonialSectionProps {
  /** The page layer passes the complete section, including its nested cards. */
  section: UiSectionData
  layout?: TestimonialSectionLayout
  density?: TestimonialSectionDensity
  variant?: SectionVariant
}

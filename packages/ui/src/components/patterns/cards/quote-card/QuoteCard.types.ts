import type {
  BaseCardProps,
  UiMediaPayload,
  UiTextInput,
} from '../../../primitives/card/card.types.ts'

export type QuoteCardLayout = 'default' | 'lead' | 'stacked' | 'compact'

/** Maximum rendered lines before the quotation is truncated behind a toggle. */
export type QuoteCardClamp = 3 | 4 | 5

/**
 * A single attributed quotation (testimonial / pull quote).
 *
 * `as` is intentionally not exposed: the root is always an `<article>` with a
 * `<figure>`/`<blockquote>`/`<figcaption>` inside for real quote semantics.
 * Every content field is optional and the card degrades gracefully when one is
 * missing; with no `quote` it renders nothing.
 */
export interface QuoteCardProps extends Omit<BaseCardProps, 'as'> {
  quote?: UiTextInput | null
  /** Full attribution line — name, optionally with role. */
  author?: UiTextInput | null
  avatar?: UiMediaPayload | null
  layout?: QuoteCardLayout
  /**
   * Truncate the quotation to N lines. A "Show more" toggle is shown only when
   * the text actually overflows that many lines at its rendered width.
   */
  clamp?: QuoteCardClamp | null
}

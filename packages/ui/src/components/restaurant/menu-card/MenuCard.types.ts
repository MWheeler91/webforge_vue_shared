import type { BaseCardProps, UiMediaPayload } from '../../primitives/card/card.types.ts'

/** A price is a number (currency-formatted by the card) or a string (rendered verbatim). */
export type MenuPrice = number | string

/**
 * One row of a menu, modelled on the shape of a menu-table record rather than
 * on the content-key / ElementCollection system. Only `name` is required; every
 * other field is optional and the card degrades gracefully when one is absent.
 *
 * This is the `data` input described in `docs/ui/cards.md`: a normalized domain
 * record the consuming application resolves from its own table. Fields such as
 * modifiers, calories, availability, and category are intentionally left out
 * until the restaurant module exists — they are additive to this one object and
 * will not break the contract.
 */
export interface MenuItem {
  /** The dish or drink name. The card renders nothing without it. */
  name: string
  /** A short supporting line, usually an ingredient list. */
  description?: string | null
  /** Numeric prices are currency-formatted; string prices ("MP", "18 / 32") pass through. */
  price?: MenuPrice | null
  /**
   * The current price when the item is discounted. When set alongside `price`,
   * `price` renders struck through and `salePrice` becomes the active price.
   */
  salePrice?: MenuPrice | null
  /** Free-form labels — dietary ("Vegetarian", "GF"), heat ("Spicy"), or other menu tags. */
  tags?: readonly string[] | null
  /** A single short callout shown above the name ("Chef's cut", "Seasonal"). */
  flag?: string | null
  /** Item photo; consumed only by the `media-*` and `spotlight` layouts. */
  image?: UiMediaPayload | null
}

export type MenuCardLayout =
  | 'inline'
  | 'stacked'
  | 'compact'
  | 'media-left'
  | 'media-right'
  | 'media-top'
  | 'spotlight'

/** Layouts that place an item photo; without `item.image` they fall back to a text arrangement. */
export const MENU_CARD_MEDIA_LAYOUTS = [
  'media-left',
  'media-right',
  'media-top',
  'spotlight',
] as const

/**
 * `as` is intentionally not exposed: the root is always an `<article>` for a
 * self-contained menu item. A future menu-section owns the surrounding list.
 *
 * `padding` is consumed by MenuCard itself (it insets the text block while the
 * photo stays flush to the card edge), not forwarded verbatim to `BaseCard`.
 */
export interface MenuCardProps extends Omit<BaseCardProps, 'as'> {
  item: MenuItem
  /** Physical arrangement of the item. Defaults to `inline`. */
  layout?: MenuCardLayout
  /** ISO 4217 code used to format numeric prices. Defaults to `USD`. */
  currency?: string
}

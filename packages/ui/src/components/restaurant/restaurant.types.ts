import type { CardVariant } from '../primitives/card/card.types.ts'
import type { SectionVariant } from '../primitives/section/section.types.ts'
import type { MenuCardLayout, MenuItem } from './menu-card/MenuCard.types.ts'

export type { CardVariant } from '../primitives/card/card.types.ts'
export type { MenuCardLayout, MenuItem, MenuPrice } from './menu-card/MenuCard.types.ts'

/**
 * A named group of menu items — a category. Its `label` is both the tab text
 * (in `TabbedMenuSection`) and the block heading (in `FullMenuSection`).
 */
export interface MenuCategoryGroup {
  /** Stable id used for tab state and list keys. */
  key: string
  /** Display text — the tab label / menu-page block heading. */
  label: string
  /** Optional line under the heading, e.g. "From 5 pm, Tuesday–Sunday". */
  subline?: string | null
  /**
   * How this category renders in `MenuBoardSection`: a card `grid` or a text
   * `list`. Adjacent `list` categories are laid out side by side. Falls back to
   * the section's `defaultPresentation`.
   */
  presentation?: 'grid' | 'list'
  items: readonly MenuItem[]
}

/**
 * The full-menu payload: ordered categories plus optional section-level copy.
 * The consuming app maps its own API to this shape; the endpoint contract is
 * not settled yet, so this is deliberately small and additive.
 */
export interface MenuData {
  categories: readonly MenuCategoryGroup[]
  /** Small print under the whole menu — allergens, "prices in USD". */
  footnote?: string | null
}

/** Optional section-level heading copy shared by the menu sections. */
export interface MenuSectionHeading {
  eyebrow?: string | null
  title?: string | null
  body?: string | null
}

interface MenuSectionBase {
  heading?: MenuSectionHeading
  /** Section surface. In production this comes from the page API alongside `cardVariant`. */
  variant?: SectionVariant
  /**
   * MenuCard surface for the items in this section, chosen to complement
   * `variant`. Also API-driven in production. When unset, each section falls
   * back to a sensible default for its layout.
   */
  cardVariant?: CardVariant
  /** ISO 4217 code passed through to every MenuCard. */
  currency?: string
}

export interface TabbedMenuSectionProps extends MenuSectionBase {
  menu: MenuData
  /** MenuCard layout for the items under each tab. Defaults to `inline`. */
  itemLayout?: MenuCardLayout
}

export type FeaturedMenuSectionLayout = 'grid' | 'alternating'

export interface FeaturedMenuSectionProps extends MenuSectionBase {
  /** A curated, flat list — the "featured items" API, not a full menu. */
  items: readonly MenuItem[]
  /** `grid` (photo cards in a row) or `alternating` (left/right photo rows). Default `grid`. */
  layout?: FeaturedMenuSectionLayout
}

export interface FullMenuSectionProps extends MenuSectionBase {
  menu: MenuData
  /** MenuCard layout for every item. Defaults to `inline`. */
  itemLayout?: MenuCardLayout
  /** Columns for each category's item list. Defaults to `2`. */
  columns?: 1 | 2
}

export interface MenuBoardSectionProps extends MenuSectionBase {
  menu: MenuData
  /** Presentation for a category that sets no `presentation` of its own. Default `grid`. */
  defaultPresentation?: 'grid' | 'list'
  /** MenuCard layout for `grid` categories. Default `inline`. */
  gridItemLayout?: MenuCardLayout
  /** MenuCard layout for `list` categories. Default `inline`. */
  listItemLayout?: MenuCardLayout
}

import type {
  BaseCardProps,
  CardAction,
  UiBadgePayload,
  UiCardMenuItemPayload,
  UiCollectionInput,
  UiTextInput,
} from '../../../primitives/card/card.types.ts'

export type PricingCardLayout = 'default' | 'horizontal' | 'compact'

/**
 * A single pricing plan/tier (a hosting plan, a subscription tier). One card is
 * one plan; a page renders a collection of these side by side to compare plans.
 */
export interface PricingCardProps extends BaseCardProps {
  /** Small badge above the title, e.g. "Most popular". */
  label?: UiBadgePayload | null
  /** Plan name. */
  title?: UiTextInput | null
  /**
   * The price, already formatted by the caller (e.g. "$12/mo", "$120/yr",
   * "Custom"). The card does not parse or format currency.
   */
  price?: string | number | null
  /** Short description of who the plan is for. */
  body?: UiTextInput | null
  /** Feature list. Hidden entirely in the `compact` layout. */
  items?: UiCollectionInput<UiCardMenuItemPayload> | null
  actions?: UiCollectionInput<CardAction> | null
  layout?: PricingCardLayout
  /**
   * Visually emphasizes this plan among siblings in a comparison row (e.g. the
   * recommended tier). Styling only — does not change layout or content.
   */
  featured?: boolean
  /** Show a divider between the price/description block and the feature list. Default true. */
  divider?: boolean
}

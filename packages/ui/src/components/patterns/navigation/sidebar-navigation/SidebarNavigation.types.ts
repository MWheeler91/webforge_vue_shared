import type { CardAction, UiCollectionInput } from '../../../primitives/card/card.types.ts'
import type { NavbarBrandData, NavbarLinkItem } from '../../../primitives/navigation/navigation.types.ts'

/**
 * A vertical sidebar nav. `links` as a plain array/`keyed` collection renders one ungrouped list;
 * passed as a `grouped` collection, each group renders under its own labeled section.
 */
export interface SidebarNavigationProps {
  ariaLabel?: string | null
  brand?: NavbarBrandData | null
  links?: UiCollectionInput<NavbarLinkItem> | null
  actions?: UiCollectionInput<CardAction> | null
}

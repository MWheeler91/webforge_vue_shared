import type { CardAction, UiCollectionInput } from '../../../primitives/card/card.types.ts'
import type {
  NavbarBrandData,
  NavbarLinkItem,
  NavbarPosition,
  NavbarSize,
  NavbarVariant,
} from '../../../primitives/navigation/navigation.types.ts'
import type { SectionWidth } from '../../../primitives/section/section.types.ts'

/** A navbar with brand on one side and a leading/trailing link group split across the row. */
export interface SplitNavbarProps {
  navId?: string | null
  ariaLabel?: string | null
  /** Default `surface`. */
  variant?: NavbarVariant | null
  /** Default `md`. */
  size?: NavbarSize | null
  /** Default `static`. */
  position?: NavbarPosition | null
  /** Default `full`. */
  containerWidth?: SectionWidth | null
  /** Default `true`. */
  collapsible?: boolean
  brand?: NavbarBrandData | null
  leadingLinks?: UiCollectionInput<NavbarLinkItem> | null
  /** Falls back to `links` when unset. */
  trailingLinks?: UiCollectionInput<NavbarLinkItem> | null
  links?: UiCollectionInput<NavbarLinkItem> | null
  actions?: UiCollectionInput<CardAction> | null
}

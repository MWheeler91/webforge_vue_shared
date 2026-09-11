import type { CardAction, UiCollectionInput } from '../../../primitives/card/card.types.ts'
import type {
  NavbarBrandData,
  NavbarLinkItem,
  NavbarPosition,
  NavbarSize,
  NavbarVariant,
} from '../../../primitives/navigation/navigation.types.ts'
import type { SectionWidth } from '../../../primitives/section/section.types.ts'

/** A centered-brand navbar with a leading and trailing link group flanking it. */
export interface CenteredNavbarProps {
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
  /** Falls back to `links` when unset. */
  leadingLinks?: UiCollectionInput<NavbarLinkItem> | null
  trailingLinks?: UiCollectionInput<NavbarLinkItem> | null
  links?: UiCollectionInput<NavbarLinkItem> | null
  actions?: UiCollectionInput<CardAction> | null
}

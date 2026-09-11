import type { CardAction, UiCollectionInput } from '../../../primitives/card/card.types.ts'
import type {
  NavbarBrandData,
  NavbarLinkItem,
  NavbarPosition,
  NavbarSize,
  NavbarVariant,
} from '../../../primitives/navigation/navigation.types.ts'
import type { SectionWidth } from '../../../primitives/section/section.types.ts'

/** A single-row navbar: brand, one link group, actions, and an optional top announcement bar. */
export interface StandardNavbarProps {
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
  links?: UiCollectionInput<NavbarLinkItem> | null
  actions?: UiCollectionInput<CardAction> | null
  announcement?: { text: string; action?: CardAction; dismissible?: boolean } | null
}

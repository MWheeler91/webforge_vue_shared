import type { CardAction, UiCollectionInput } from '../../../primitives/card/card.types.ts'
import type {
  NavbarBrandData,
  NavbarLinkItem,
  NavbarMenuPayload,
  NavbarPosition,
  NavbarSize,
  NavbarVariant,
} from '../../../primitives/navigation/navigation.types.ts'
import type { SectionWidth } from '../../../primitives/section/section.types.ts'

/** A navbar with expandable `<details>` disclosure menus alongside a plain link group. */
export interface DisclosureNavbarProps {
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
  /** Each menu is a disclosure group (label + its own link list). */
  menus?: UiCollectionInput<NavbarMenuPayload> | null
  links?: UiCollectionInput<NavbarLinkItem> | null
  actions?: UiCollectionInput<CardAction> | null
}

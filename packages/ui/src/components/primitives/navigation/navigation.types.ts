import type { UiPack } from '../../../config/ui.types'
import type {
  CardAction,
  UiCollectionInput,
  UiElementCollection,
  UiMediaPayload,
  UiTextPayload,
} from '../card/card.types'
import type { SectionWidth } from '../section/section.types'

/** UI-pack selection. This alias preserves the navbar public name while using the shared union. */
export type NavbarPack = UiPack

/** Semantic navbar surface; visual treatment remains owned by the active UI pack. */
export type NavbarSurfaceVariant = 'surface' | 'transparent' | 'inverse'

/**
 * @deprecated Visual treatments retained for compatibility. Prefer `surface` plus the active UI
 * pack. `floating` does not create overlay layout; templates own page overlap.
 */
export type NavbarLegacyVisualVariant = 'bordered' | 'floating'

export type NavbarVariant = NavbarSurfaceVariant | NavbarLegacyVisualVariant

export type NavbarSize = 'sm' | 'md' | 'lg'

export type NavbarPosition = 'static' | 'sticky' | 'fixed'

export type NavbarLayout = 'simple' | 'centered' | 'split' | 'stacked'

export type NavbarBrandImagePosition = 'left' | 'top'

export type NavbarActionVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'warning'

export interface NavbarAction {
  label: string
  href?: string
  variant?: NavbarActionVariant
  external?: boolean
  disabled?: boolean
}

export interface NavbarTemplateProps {
  brand?: NavbarBrandData
  links?: NavbarLinkItem[]
  actions?: NavbarAction[]
  pack?: NavbarPack | null
  variant?: NavbarVariant
  size?: NavbarSize
  position?: NavbarPosition
  collapsible?: boolean
}

export interface NavbarLinkItem {
  label: string
  href?: string
  to?: string | Record<string, unknown>
  external?: boolean
  active?: boolean
  disabled?: boolean
}

export interface NavbarBrandData {
  label?: string
  href?: string
  image?: string
  imageAlt?: string
  showLabel?: boolean
  imagePosition?: NavbarBrandImagePosition
}

export interface NavbarMenuPayload {
  label: string
  links?: UiElementCollection<NavbarLinkItem>
  featured?: { media?: UiMediaPayload; heading?: UiTextPayload; body?: UiTextPayload; action?: CardAction } | null
}

/** Shared normalized payload accepted by every public Ui navbar pattern. */
export interface SharedNavbarProps {
  variant?: NavbarVariant | null
  layout?: string | null
  position?: NavbarPosition | null
  size?: NavbarSize | null
  collapsible?: boolean
  brand?: NavbarBrandData | null
  links?: UiCollectionInput<NavbarLinkItem> | null
  leadingLinks?: UiCollectionInput<NavbarLinkItem> | null
  trailingLinks?: UiCollectionInput<NavbarLinkItem> | null
  utilityLinks?: UiCollectionInput<NavbarLinkItem> | null
  actions?: UiCollectionInput<CardAction> | null
  menus?: UiCollectionInput<NavbarMenuPayload> | null
  announcement?: { text: string; action?: CardAction; dismissible?: boolean } | null
  alignment?: 'start' | 'center' | 'end' | null
  density?: 'compact' | 'standard' | 'spacious' | null
  shadow?: 'none' | 'sm' | 'md' | 'lg' | null
  border?: 'none' | 'subtle' | 'strong' | null
  containerWidth?: SectionWidth | null
  ariaLabel?: string | null
  navId?: string | null
  metaData?: Record<string, unknown> | null
}

import type { UiPack } from '../../../config/ui.types'
import type {
  CardAction,
  UiCollectionInput,
  UiElementCollection,
  UiMediaPayload,
  UiTextPayload,
} from '../card/card.types'

export type FooterPack = UiPack

export type FooterVariant = 'surface' | 'muted' | 'inverse' | 'bordered' | 'transparent'

export type FooterSize = 'sm' | 'md' | 'lg'

export type FooterLayout = 'simple' | 'centered' | 'columns' | 'marketing'

export interface FooterBrandData {
  label?: string
  href?: string
  image?: string
  imageAlt?: string
  description?: string
  showLabel?: boolean
}

export interface FooterLinkItem {
  label: string
  href: string
  external?: boolean
  disabled?: boolean
}

export interface FooterSectionItem {
  title?: string
  links: FooterLinkItem[]
}

export interface FooterSocialItem {
  label: string
  href: string
  icon?: string
  external?: boolean
}

export interface FooterTemplateProps {
  brand?: FooterBrandData
  sections?: FooterSectionItem[]
  links?: FooterLinkItem[]
  socialLinks?: FooterSocialItem[]
  legalText?: string
  pack?: FooterPack | null
  variant?: FooterVariant
  size?: FooterSize
}

export interface FooterColumnPayload { heading?: UiTextPayload; links?: UiElementCollection<FooterLinkItem> }

/** Shared normalized payload accepted by every public Ui footer pattern. */
export interface SharedFooterProps {
  variant?: FooterVariant | null
  layout?: string | null
  size?: FooterSize | null
  brand?: FooterBrandData | null
  label?: UiTextPayload | null
  eyebrow?: UiTextPayload | null
  heading?: UiTextPayload | null
  subheading?: UiTextPayload | null
  body?: UiTextPayload | null
  description?: UiTextPayload | null
  media?: UiMediaPayload | null
  links?: UiCollectionInput<FooterLinkItem> | null
  legalLinks?: UiCollectionInput<FooterLinkItem> | null
  columns?: UiCollectionInput<FooterColumnPayload> | null
  socialLinks?: UiCollectionInput<FooterSocialItem> | null
  buttons?: UiCollectionInput<CardAction> | null
  announcement?: UiTextPayload | null
  status?: UiTextPayload | null
  meta?: UiTextPayload | null
  address?: UiTextPayload | null
  hours?: UiTextPayload | null
  legalText?: string | null
  privacy?: FooterLinkItem | null
  terms?: FooterLinkItem | null
  created?: string | null
  divider?: boolean
  alignment?: 'start' | 'center' | 'end' | null
  density?: 'compact' | 'standard' | 'spacious' | null
  shadow?: 'none' | 'sm' | 'md' | 'lg' | null
  border?: 'none' | 'subtle' | 'strong' | null
  radius?: 'inherit' | 'square' | 'soft' | 'rounded' | null
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | null
  background?: string | null
  fullWidth?: boolean
  href?: string | null
  interactive?: boolean
  ariaLabel?: string | null
  footerId?: string | null
  metaData?: Record<string, unknown> | null
}

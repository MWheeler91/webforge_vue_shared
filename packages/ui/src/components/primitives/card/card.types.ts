import type {
  ButtonAs,
  ButtonHtmlType,
  ButtonSize,
  ButtonVariant,
  ButtonWidth,
} from '../button/button.types'
import type { BadgeLeading, BadgeSize, BadgeTone, BadgeVariant } from '../badge/badge.types'

export type CardVariant = 'surface' | 'muted' | 'outline' | 'elevated' | 'ghost' | 'inverse'

export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

export type CardAs = 'article' | 'section' | 'div' | 'form'

export type CardLinkAs = 'a' | 'router-link'

export interface BaseCardProps {
  as?: CardAs
  variant?: CardVariant
  padding?: CardPadding
  interactive?: boolean
  unstyled?: boolean
}

export interface BaseCardLinkProps {
  as?: CardLinkAs
  href?: string
  to?: string | Record<string, unknown>
  target?: string
  rel?: string
  variant?: CardVariant
  padding?: CardPadding
  disabled?: boolean
  unstyled?: boolean
}

/** Button-compatible actions shared by card patterns. */
export interface CardAction {
  id?: string | number
  label: string
  as?: ButtonAs
  type?: ButtonHtmlType
  href?: string
  to?: string | Record<string, unknown>
  target?: string
  rel?: string
  width?: ButtonWidth
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  iconOnly?: boolean
  unstyled?: boolean
}

/** API-normalized collection used by all new Ui card patterns. */
export interface UiElementCollection<T> {
  keyed?: Record<string, T>
  grouped?: Record<string, T[]>
  items?: T[]
}

export type UiCollectionInput<T> = UiElementCollection<T> | readonly T[]
export type UiTextInput = UiTextPayload | string

export interface UiTextPayload { text: string; as?: 'h2' | 'h3' | 'h4' | 'p' | 'span' }
export interface UiBadgePayload { text: string; variant?: BadgeVariant; tone?: BadgeTone; size?: BadgeSize; leading?: BadgeLeading; unstyled?: boolean }
export interface UiMediaPayload { src: string; alt?: string }
export interface UiCardFooterPayload { text?: string; meta?: readonly UiTextPayload[] }
export interface UiCardAuthorPayload { name?: string; role?: string; avatar?: UiMediaPayload }
export interface UiCardChartPayload { label?: string }
export interface UiCardMenuItemPayload { title: string; description?: string; price?: string }

export type UiCardMediaPlacement = 'top' | 'bottom' | 'left' | 'right' | 'background'
export type UiCardAlignment = 'start' | 'center'
export type UiCardVerticalAlignment = 'start' | 'center' | 'end'
export type UiCardDensity = 'compact' | 'standard' | 'spacious'
export type UiCardShadow = 'none' | 'sm' | 'md' | 'lg'
export type UiCardBorder = 'none' | 'subtle' | 'strong'
export type UiCardRadius = 'inherit' | 'square' | 'soft' | 'rounded'

/**
 * Stable, broad card payload. Every `Ui*Card` accepts every top-level field;
 * each pattern renders only the fields meaningful to its semantic role.
 */
export interface SharedCardProps extends BaseCardProps {
  /** Allowlisted renderer hint consumed by the section payload adapter. */
  componentKey?: string | null
  label?: UiBadgePayload | null
  eyebrow?: UiTextInput | null
  heading?: UiTextInput | null
  title?: UiTextInput | null
  name?: UiTextInput | null
  subheading?: UiTextInput | null
  body?: UiTextInput | null
  description?: UiTextInput | null
  media?: UiMediaPayload | null
  imageSrc?: string | null
  imageAlt?: string | null
  showPlaceholder?: boolean
  mediaAspect?: string | null
  icon?: string | null
  avatar?: UiMediaPayload | null
  value?: string | number | null
  statistic?: UiTextInput | null
  chart?: UiCardChartPayload | null
  quote?: UiTextInput | null
  author?: UiCardAuthorPayload | null
  footer?: UiCardFooterPayload | null
  badges?: UiCollectionInput<UiBadgePayload> | null
  buttons?: UiCollectionInput<CardAction> | null
  actions?: UiCollectionInput<CardAction> | null
  links?: UiCollectionInput<CardAction> | null
  menuItems?: UiCollectionInput<UiCardMenuItemPayload> | null
  items?: readonly (string | UiCardMenuItemPayload)[] | null
  price?: string | null
  dietary?: readonly string[] | null
  divider?: boolean
  layout?: string | null
  alignment?: UiCardAlignment | null
  verticalAlignment?: UiCardVerticalAlignment | null
  mediaPlacement?: UiCardMediaPlacement | null
  contentPlacement?: UiCardMediaPlacement | null
  density?: UiCardDensity | null
  emphasis?: 'standard' | 'featured' | null
  featured?: boolean
  shadow?: UiCardShadow | null
  border?: UiCardBorder | null
  radius?: UiCardRadius | null
  href?: string | null
  to?: string | Record<string, unknown> | null
  metaData?: Record<string, unknown> | null
}

export function collectionItems<T>(collection?: UiCollectionInput<T> | null): T[] {
  if (!collection) return []
  if (Array.isArray(collection)) return Array.from(collection as readonly T[])
  const normalized = collection as UiElementCollection<T>
  return [
    ...Object.values(normalized.keyed ?? {}),
    ...Object.values(normalized.grouped ?? {}).flat(),
    ...(normalized.items ?? []),
  ]
}

export function textPayload(value?: UiTextInput | null): UiTextPayload | null {
  if (!value) return null
  return typeof value === 'string' ? { text: value } : value
}

export function mediaPayload(props: {
  media?: UiMediaPayload | null
  imageSrc?: string | null
  imageAlt?: string | null
}): UiMediaPayload | null {
  if (props.media) return props.media
  if (!props.imageSrc) return null
  return { src: props.imageSrc, alt: props.imageAlt ?? undefined }
}

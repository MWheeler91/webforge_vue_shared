import type {
  CardAction,
  UiBadgePayload,
  UiElementCollection,
  UiMediaPayload,
  UiTextPayload,
} from '../card/card.types'

export interface UiGalleryItemPayload {
  id?: string | number
  media?: UiMediaPayload | null
  heading?: UiTextPayload | null
  body?: UiTextPayload | null
  videoSrc?: string | null
  href?: string | null
}

/** Stable API payload accepted by every public Ui media/gallery pattern. */
export interface SharedMediaGalleryProps {
  variant?: 'surface' | 'muted' | 'inverse' | 'transparent' | null
  layout?: string | null
  label?: UiBadgePayload | null
  eyebrow?: UiTextPayload | null
  heading?: UiTextPayload | null
  subheading?: UiTextPayload | null
  body?: UiTextPayload | null
  description?: UiTextPayload | null
  media?: UiMediaPayload | null
  featured?: UiGalleryItemPayload | null
  before?: UiGalleryItemPayload | null
  after?: UiGalleryItemPayload | null
  items?: UiElementCollection<UiGalleryItemPayload> | null
  thumbnails?: UiElementCollection<UiGalleryItemPayload> | null
  logos?: UiElementCollection<UiGalleryItemPayload> | null
  slides?: UiElementCollection<UiGalleryItemPayload> | null
  buttons?: UiElementCollection<CardAction> | null
  links?: UiElementCollection<CardAction> | null
  activeIndex?: number | null
  divider?: boolean
  alignment?: 'start' | 'center' | 'end' | null
  density?: 'compact' | 'standard' | 'spacious' | null
  emphasis?: 'standard' | 'featured' | null
  shadow?: 'none' | 'sm' | 'md' | 'lg' | null
  border?: 'none' | 'subtle' | 'strong' | null
  radius?: 'inherit' | 'square' | 'soft' | 'rounded' | null
  aspectRatio?: 'auto' | 'square' | 'landscape' | 'portrait' | 'wide' | null
  fullWidth?: boolean
  interactive?: boolean
  href?: string | null
  ariaLabel?: string | null
  galleryId?: string | null
  metaData?: Record<string, unknown> | null
}

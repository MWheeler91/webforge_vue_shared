import type { UiBadgePayload, UiCollectionInput, UiTextPayload } from '../../../primitives/card/card.types.ts'
import type { UiGalleryItemPayload } from '../../../primitives/gallery/gallery.types.ts'

export type MediaGalleryLayout = 'grid' | 'masonry' | 'strip' | 'collage'
export type MediaGalleryDensity = 'compact' | 'standard' | 'spacious'

/** A plain media grid; `layout` changes the arrangement, `density` the spacing. */
export interface MediaGalleryProps {
  label?: UiBadgePayload | null
  eyebrow?: UiTextPayload | null
  heading?: UiTextPayload | null
  body?: UiTextPayload | null
  items?: UiCollectionInput<UiGalleryItemPayload> | null
  /** Default `grid`. */
  layout?: MediaGalleryLayout
  /** Default `standard`. */
  density?: MediaGalleryDensity | null
  galleryId?: string | null
  ariaLabel?: string | null
}

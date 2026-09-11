import type { UiBadgePayload, UiCollectionInput, UiTextPayload } from '../../../primitives/card/card.types.ts'
import type { UiGalleryItemPayload } from '../../../primitives/gallery/gallery.types.ts'

/** One large featured item plus a thumbnail grid. */
export interface FeaturedMediaGalleryProps {
  label?: UiBadgePayload | null
  eyebrow?: UiTextPayload | null
  heading?: UiTextPayload | null
  body?: UiTextPayload | null
  featured?: UiGalleryItemPayload | null
  /** Falls back to `items` when unset. */
  thumbnails?: UiCollectionInput<UiGalleryItemPayload> | null
  items?: UiCollectionInput<UiGalleryItemPayload> | null
  galleryId?: string | null
  ariaLabel?: string | null
}

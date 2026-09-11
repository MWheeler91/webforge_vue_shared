import type { UiBadgePayload, UiCollectionInput, UiTextPayload } from '../../../primitives/card/card.types.ts'
import type { UiGalleryItemPayload } from '../../../primitives/gallery/gallery.types.ts'

/** A horizontal scrolling strip of logo images. */
export interface LogoCarouselProps {
  label?: UiBadgePayload | null
  eyebrow?: UiTextPayload | null
  heading?: UiTextPayload | null
  body?: UiTextPayload | null
  /** Falls back to `items` when unset. */
  logos?: UiCollectionInput<UiGalleryItemPayload> | null
  items?: UiCollectionInput<UiGalleryItemPayload> | null
  galleryId?: string | null
  ariaLabel?: string | null
}

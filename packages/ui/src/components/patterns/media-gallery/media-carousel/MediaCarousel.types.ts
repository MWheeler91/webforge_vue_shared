import type { UiBadgePayload, UiCollectionInput, UiTextPayload } from '../../../primitives/card/card.types.ts'
import type { UiGalleryItemPayload } from '../../../primitives/gallery/gallery.types.ts'

/** A single-slide carousel with prev/next controls and dot navigation. */
export interface MediaCarouselProps {
  label?: UiBadgePayload | null
  eyebrow?: UiTextPayload | null
  heading?: UiTextPayload | null
  body?: UiTextPayload | null
  /** Falls back to `items` when unset. */
  slides?: UiCollectionInput<UiGalleryItemPayload> | null
  items?: UiCollectionInput<UiGalleryItemPayload> | null
  /** Controlled active slide index. */
  activeIndex?: number | null
  galleryId?: string | null
  ariaLabel?: string | null
}

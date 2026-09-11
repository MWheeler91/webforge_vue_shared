import type { UiBadgePayload, UiCollectionInput, UiTextPayload } from '../../../primitives/card/card.types.ts'
import type { UiGalleryItemPayload } from '../../../primitives/gallery/gallery.types.ts'

/** A grid of video items (or a poster image when `item.videoSrc` is unset). */
export interface VideoGalleryProps {
  label?: UiBadgePayload | null
  eyebrow?: UiTextPayload | null
  heading?: UiTextPayload | null
  body?: UiTextPayload | null
  items?: UiCollectionInput<UiGalleryItemPayload> | null
  galleryId?: string | null
  ariaLabel?: string | null
}

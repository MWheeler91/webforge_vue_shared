import type { UiBadgePayload, UiTextPayload } from '../../../primitives/card/card.types.ts'
import type { UiGalleryItemPayload } from '../../../primitives/gallery/gallery.types.ts'

/** A before/after image slider. */
export interface MediaComparisonProps {
  label?: UiBadgePayload | null
  eyebrow?: UiTextPayload | null
  heading?: UiTextPayload | null
  body?: UiTextPayload | null
  before?: UiGalleryItemPayload | null
  after?: UiGalleryItemPayload | null
  galleryId?: string | null
  ariaLabel?: string | null
}

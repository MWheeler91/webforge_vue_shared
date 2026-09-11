import type { CardAction, UiBadgePayload, UiCollectionInput, UiMediaPayload, UiTextPayload } from '../../../primitives/card/card.types.ts'

/** A single full-bleed background image with overlaid text and actions (a hero-style banner). */
export interface MediaOverlayProps {
  media?: UiMediaPayload | null
  label?: UiBadgePayload | null
  heading?: UiTextPayload | null
  body?: UiTextPayload | null
  buttons?: UiCollectionInput<CardAction> | null
  galleryId?: string | null
  ariaLabel?: string | null
}

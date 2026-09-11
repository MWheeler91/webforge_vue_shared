import type {
  CardAction,
  UiBadgePayload,
  UiCollectionInput,
  UiMediaPayload,
  UiTextPayload,
} from '../../../primitives/card/card.types.ts'
import type { UiBreadcrumbPayload } from '../../../primitives/page-heading/page-heading.types.ts'

export type PageHeadingLayout = 'default' | 'actions' | 'media' | 'metadata' | 'tabs' | 'compact'

/** A page-top header: optional breadcrumbs, eyebrow/heading/body, a media panel, actions, and meta tags. */
export interface PageHeadingProps {
  breadcrumbs?: UiCollectionInput<UiBreadcrumbPayload> | null
  label?: UiBadgePayload | null
  eyebrow?: UiTextPayload | null
  heading?: UiTextPayload | null
  body?: UiTextPayload | null
  media?: UiMediaPayload | null
  meta?: UiCollectionInput<UiTextPayload> | null
  buttons?: UiCollectionInput<CardAction> | null
  /** Default `default`. */
  layout?: PageHeadingLayout
  ariaLabel?: string | null
  headingId?: string | null
}

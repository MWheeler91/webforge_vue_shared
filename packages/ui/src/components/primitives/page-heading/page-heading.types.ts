import type {
  CardAction,
  UiBadgePayload,
  UiElementCollection,
  UiMediaPayload,
  UiTextPayload,
} from '../card/card.types'
export interface UiBreadcrumbPayload {
  label: string
  href?: string
  to?: string | Record<string, unknown>
  current?: boolean
  home?: boolean
}
export interface SharedPageHeadingProps {
  variant?: string | null
  layout?: string | null
  label?: UiBadgePayload | null
  eyebrow?: UiTextPayload | null
  heading?: UiTextPayload | null
  subheading?: UiTextPayload | null
  body?: UiTextPayload | null
  media?: UiMediaPayload | null
  breadcrumbs?: UiElementCollection<UiBreadcrumbPayload> | null
  tabs?: UiElementCollection<UiTextPayload> | null
  meta?: UiElementCollection<UiTextPayload> | null
  buttons?: UiElementCollection<CardAction> | null
  activeTab?: string | null
  density?: 'compact' | 'standard' | 'spacious' | null
  alignment?: 'start' | 'center' | 'end' | null
  ariaLabel?: string | null
  headingId?: string | null
  metaData?: Record<string, unknown> | null
}

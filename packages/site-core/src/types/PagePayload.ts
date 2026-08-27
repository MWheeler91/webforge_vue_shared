import type { ApiEnvelope } from './ApiEnvelope'
import type {
  ButtonAs,
  ButtonHtmlType,
  ButtonSize,
  ButtonVariant,
  ButtonWidth,
  BadgeVariant,
  BadgeSize,
  BadgeTone,
  BadgeLeading,
  SectionVariant,
  SectionTitleAs,
  SectionTitleEmphasis,
} from '@mwheeler91/ui'

export type PageJsonObject = Record<string, unknown>
export type PageComponentConfig = Record<string, string | number | boolean | null>

/** Page and card elements are grouped by semantic key; every key always maps to an array. */
export type PageElementMap<T> = Record<string, T[]>

export function firstPageElement<T>(elements: PageElementMap<T>, key: string): T | null {
  return elements[key]?.[0] ?? null
}

export function flattenPageElements<T>(elements: PageElementMap<T>): T[] {
  const collection = elements as Record<string, unknown>

  // Older responses used an `items` bucket. Prefer it so mixed payloads do not
  // render the same elements once from `items` and again from keyed collections.
  if (Array.isArray(collection.items)) {
    return collection.items as T[]
  }

  return Object.values(collection)
    .filter((value): value is T[] => Array.isArray(value))
    .flat()
}

export type PageContent = {
  title: string
  description: string
  meta_data: PageJsonObject | null
}

export type PageSeo = {
  title: string
  description: string
  canonical_url: string | null
  robots: string
  schema_type: string
}

export type PageSocial = {
  title: string
  description: string
  image: string | null
  type: string
  twitter_card: string
}

export type PageTextElement = {
  text: string
  config: PageComponentConfig & {
    heading: SectionTitleAs
    emphasis: SectionTitleEmphasis
  }
  has_html: boolean
  meta_data: PageJsonObject | null
}

export type PageBadgeElement = {
  text: string | null
  config: PageComponentConfig & {
    variant: BadgeVariant | null
    size: BadgeSize | null
    tone: BadgeTone | null
    leading: BadgeLeading | null
  }
  meta_data: PageJsonObject | null
}

export type PageButtonElement = {
  text: string
  vue_route: string | null
  href: string | null
  config: PageComponentConfig & {
    as: ButtonAs
    html_type: ButtonHtmlType
    size: ButtonSize
    variant: ButtonVariant
    width: ButtonWidth
  }
  meta_data: PageJsonObject
}

export type PageImageElement = {
  image_url: string | null
  alt_text: string
  caption: string | null
  animation: number
}

export type PageElements = {
  text: PageElementMap<PageTextElement>
  badges: PageElementMap<PageBadgeElement>
  buttons: PageElementMap<PageButtonElement>
  images: PageElementMap<PageImageElement>
}

export type PageCard = {
  key: string | null
  /** Reserved for future dynamic card resolution. */
  component_key?: string | null
  config: PageComponentConfig
  divider?: boolean
  interactive?: boolean
  meta_data: PageJsonObject | null
  elements: PageElements
}

export type PageCardMap = PageElementMap<PageCard>

export type PageSection = {
  key: string
  name: string
  component_key: string | null
  variant: SectionVariant
  config: PageComponentConfig
  meta_data: PageJsonObject | null
  elements: PageElements
  cards: PageCardMap
}

export type PageData = {
  content: PageContent
  seo: PageSeo
  social: PageSocial
  sections: PageSection[]
}

export type PagePayload = ApiEnvelope<PageData>

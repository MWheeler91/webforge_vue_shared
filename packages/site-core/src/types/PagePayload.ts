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
import type { UiSectionData, UiSectionComponentData } from '@mwheeler91/ui'
import type { UiTextAlign, UiTextAs, UiTextEmphasis, UiTextPayload } from '@mwheeler91/ui'
import { mediaUrl } from '../utils/media'

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
    alignment?: UiTextAlign
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

/**
 * A component node nested in a section. Every nested component - a card, an
 * accordion leaf, a future form field - has this same raw shape; there is no
 * per-family variant of it. `key` is the placement/content_key (matches the
 * slot it's grouped under in `PageSection.components`); `component_key` maps
 * 1:1 to a Vue component; `component_type` is the component's family (e.g.
 * "card", "accordion") and is what decides whether card-specific config
 * (`divider`/`interactive`/`link_as`) means anything for this node - the slot
 * key it's grouped under is not a reliable family signal on its own, since a
 * `generic-section` can put non-card items under a `"card"`-named slot.
 */
export type PageComponentNode = {
  key: string | null
  name?: string | null
  component_key?: string | null
  component_type?: string | null
  /**
   * `divider`, `interactive`, and `link_as` live here as config_props for
   * card-family nodes (the dedicated card table and its columns are
   * retired). Config prop values are always strings on the wire - see
   * `toConfigBool`.
   */
  config: PageComponentConfig
  meta_data: PageJsonObject | null
  elements: PageElements
}

/** Config props arrive as strings (e.g. `"true"`/`"false"`) - never coerce with `Boolean()`, which treats the string `"false"` as truthy. */
function toConfigBool(value: PageComponentConfig[string] | undefined): boolean {
  return value === 'true' || value === true
}

/**
 * Every section's nested components, grouped by slot key (e.g. "card",
 * "accordion", "item"). Django owns which slot keys a given section
 * `component_key` expects; a shared pattern component reads its own known
 * slot(s) back out (e.g. `sectionCards()` reads the "card" slot).
 */
export type PageComponentCollection = Record<string, PageComponentNode[]>

export type PageSection = {
  key: string
  name: string
  component_key: string | null
  variant: SectionVariant
  config: PageComponentConfig
  meta_data: PageJsonObject | null
  elements: PageElements
  components: PageComponentCollection
}

export type PageData = {
  content: PageContent
  seo: PageSeo
  social: PageSocial
  sections: PageSection[]
}

export type PagePayload = ApiEnvelope<PageData>

/**
 * Convert the API's snake_case shape into `UiSectionData` at the app/package
 * boundary. This normalization is generic across every component family -
 * cards, accordion leaves, and anything added later - and does not know
 * which slot a given section pattern expects; each shared pattern component
 * reads its own known slot(s) back out of the normalized `components` map.
 */
export function toUiSectionData(section: PageSection): UiSectionData {
  // The API stores media paths; shared UI components receive browser-ready URLs.
  const mapElements = (elements: PageElements): PageElements => ({
    ...elements,
    images: Object.fromEntries(
      Object.entries(elements.images ?? {}).map(([key, values]) => [
        key,
        values.map((image) => ({ ...image, image_url: mediaUrl(image.image_url) || null })),
      ]),
    ),
  })

  const textAsValues: readonly UiTextAs[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']
  const textEmphasisValues: readonly UiTextEmphasis[] = ['prominent', 'standard', 'compact']
  const textAlignValues: readonly UiTextAlign[] = ['left', 'right', 'center', 'justify']
  const normalizeNodeText = (element: PageTextElement): UiTextPayload => ({
    text: element.text,
    ...(textAsValues.includes(element.config.heading as UiTextAs)
      ? { as: element.config.heading as UiTextAs }
      : {}),
    ...(textEmphasisValues.includes(element.config.emphasis as UiTextEmphasis)
      ? { emphasis: element.config.emphasis as UiTextEmphasis }
      : {}),
    ...(textAlignValues.includes(element.config.alignment as UiTextAlign)
      ? { align: element.config.alignment as UiTextAlign }
      : {}),
  })
  const mapNodeElements = (elements: PageElements) => ({
    ...mapElements(elements),
    text: Object.fromEntries(
      Object.entries(elements.text ?? {}).map(([key, values]) => [
        key,
        values.map(normalizeNodeText),
      ]),
    ),
  })

  // Applied to every nested component uniformly, regardless of family. Only
  // when a node's own `component_type` is "card" do card-specific config
  // props (`divider`/`interactive`/`link_as`) get resolved into real fields -
  // the slot key it happens to be grouped under is irrelevant.
  const mapComponentNode = (node: PageComponentNode): UiSectionComponentData => {
    const isCard = node.component_type === 'card'
    const interactive = isCard ? toConfigBool(node.config.interactive) : false
    const destination = isCard
      ? firstPageElement(node.elements.text ?? {}, 'destination')?.text || null
      : null

    return {
      key: node.key,
      name: node.name ?? null,
      componentKey: node.component_key ?? 'text-card',
      componentType: node.component_type ?? null,
      config: node.config,
      elements: mapNodeElements(node.elements),
      metaData: node.meta_data,
      ...(isCard
        ? {
            interactive,
            divider: toConfigBool(node.config.divider),
            // `destination` only means something once `interactive` is true
            // and `link_as` says which navigation mode to use.
            href: interactive && node.config.link_as === 'a' ? destination : null,
            to: interactive && node.config.link_as === 'router-link' ? destination : null,
          }
        : {}),
    }
  }

  return {
    key: section.key,
    componentKey: section.component_key,
    variant: section.variant,
    config: section.config,
    elements: mapElements(section.elements),
    components: Object.fromEntries(
      Object.entries(section.components ?? {}).map(([slotKey, nodes]) => [
        slotKey,
        nodes.map(mapComponentNode),
      ]),
    ),
    metaData: section.meta_data,
  }
}

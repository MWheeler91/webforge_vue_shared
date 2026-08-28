import type {
  UiSectionCardCollection,
  UiSectionCardData,
  UiSectionData,
} from '../../primitives/section/section.types.ts'

export interface UiSectionElement {
  text?: string | null
  config?: Record<string, unknown>
  has_html?: boolean
}

export function sectionElement(section: UiSectionData, key: string): UiSectionElement | null {
  const text = section.elements?.text as Record<string, UiSectionElement[]> | undefined
  return text?.[key]?.[0] ?? null
}

export function sectionCards(section: UiSectionData): UiSectionCardData[] {
  const cards = section.cards as UiSectionCardCollection | undefined
  return [
    ...Object.values(cards?.keyed ?? {}),
    ...Object.values(cards?.grouped ?? {}).flat(),
    ...(cards?.items ?? []),
  ]
}

export function sectionConfigValue<T>(section: UiSectionData, key: string, fallback: T): T {
  return (section.config?.[key] as T | undefined) ?? fallback
}

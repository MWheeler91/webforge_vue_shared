import type {
  UiSectionCardData,
  UiSectionCardElements,
  UiSectionComponentData,
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

/** Reads the section's "card" slot. For patterns where that slot always means real cards. */
export function sectionCards(section: UiSectionData): UiSectionCardData[] {
  return section.components?.card ?? []
}

/** Read one scalar text element off a card or standalone component node. */
export function cardElement(
  node: { elements?: UiSectionCardElements },
  key: string,
): UiSectionElement | null {
  const text = node.elements?.text as Record<string, UiSectionElement[]> | undefined
  return text?.[key]?.[0] ?? null
}

export function sectionConfigValue<T>(section: UiSectionData, key: string, fallback: T): T {
  return (section.config?.[key] as T | undefined) ?? fallback
}

/** Standalone (non-card) component placements nested in a section under one key. */
export function sectionComponents(section: UiSectionData, key: string): UiSectionComponentData[] {
  return section.components?.[key] ?? []
}

/** The first standalone component placement under a key - for a key with a single, unrepeated placement. */
export function sectionComponent(section: UiSectionData, key: string): UiSectionComponentData | null {
  return sectionComponents(section, key)[0] ?? null
}

export function componentConfigValue<T>(
  component: { config?: Record<string, unknown> } | null,
  key: string,
  fallback: T,
): T {
  return (component?.config?.[key] as T | undefined) ?? fallback
}

export type SectionVariant = 'default' | 'surface' | 'muted' | 'inverse' | 'brand' | 'ghost'

export type SectionWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export type SectionAlign = 'left' | 'center' | 'right'

export type SectionTitleEmphasis = 'prominent' | 'standard' | 'compact'

export type SectionTitleAs = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'

export type SectionTitleWrap = 'inherit' | 'normal' | 'pretty' | 'balance'

export type SectionLayout = 'default' | 'stack' | 'grid' | 'split' | 'centered'

export type SectionGrid = '1' | '2' | '3' | '4' | 'auto'

export type SectionGap = 'sm' | 'md' | 'lg'

export interface BaseSectionProps {
  variant?: SectionVariant
  width?: SectionWidth
  spacing?: SectionSpacing
  align?: SectionAlign
  unstyled?: boolean
}

export interface SectionHeaderProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  align?: 'inherit' | SectionAlign
  titleAs?: SectionTitleAs
  emphasis?: SectionTitleEmphasis
  titleWrap?: SectionTitleWrap
}

export interface SectionBodyProps {
  layout?: SectionLayout
  grid?: SectionGrid
  gap?: SectionGap
}

export interface SectionFooterProps {
  align?: 'inherit' | SectionAlign
}

import type { Component } from 'vue'
import type { CardAction, SharedCardProps, UiBadgePayload, UiElementCollection, UiMediaPayload, UiTextPayload } from '../card/card.types'

export interface SectionCardCollection {
  keyed?: Record<string, SharedCardProps>
  grouped?: Record<string, SharedCardProps[]>
  items?: SharedCardProps[]
}

export interface SectionCardInputCollection {
  keyed?: Record<string, SectionCardInput>
  grouped?: Record<string, SectionCardInput[]>
  items?: SectionCardInput[]
}

export interface SectionCardInput extends SharedCardProps {
  key?: string | null
  componentKey?: string | null
}

export interface ResolvedSectionCard {
  key?: string | null
  componentKey: string
  component: Component
  props: SharedCardProps
}

export interface ResolvedSectionCardCollection {
  keyed: Record<string, ResolvedSectionCard>
  grouped: Record<string, ResolvedSectionCard[]>
  items: ResolvedSectionCard[]
}

export interface ResolvedSectionProps extends Omit<SharedSectionProps, 'cards'> {
  cards?: ResolvedSectionCardCollection | null
}

export interface SharedSectionProps extends BaseSectionProps {
  layout?: string | null
  label?: UiBadgePayload | null
  eyebrow?: UiTextPayload | null
  heading?: UiTextPayload | null
  subheading?: UiTextPayload | null
  body?: UiTextPayload | null
  description?: UiTextPayload | null
  media?: UiMediaPayload | null
  icon?: string | null
  badges?: UiElementCollection<UiBadgePayload> | null
  buttons?: UiElementCollection<CardAction> | null
  links?: UiElementCollection<CardAction> | null
  cards?: SectionCardCollection | null
  items?: UiElementCollection<UiTextPayload> | null
  divider?: boolean
  alignment?: SectionAlign | null
  verticalAlignment?: 'start' | 'center' | 'end' | null
  contentPlacement?: 'start' | 'end' | 'center' | null
  mediaPlacement?: 'start' | 'end' | 'background' | null
  density?: 'compact' | 'standard' | 'spacious' | null
  emphasis?: SectionTitleEmphasis | null
  featured?: boolean
  shadow?: 'none' | 'sm' | 'md' | 'lg' | null
  border?: 'none' | 'subtle' | 'strong' | null
  radius?: 'inherit' | 'square' | 'soft' | 'rounded' | null
  background?: string | null
  containerWidth?: SectionWidth | null
  fullWidth?: boolean
  reverse?: boolean
  href?: string | null
  ariaLabel?: string | null
  sectionId?: string | null
  metaData?: Record<string, unknown> | null
}

export const emptySectionCardCollection = (): SectionCardCollection => ({ keyed: {}, grouped: {}, items: [] })

export function sectionCollectionItems<T>(collection?: UiElementCollection<T> | null): T[] {
  if (!collection) return []
  return [...Object.values(collection.keyed ?? {}), ...Object.values(collection.grouped ?? {}).flat(), ...(collection.items ?? [])]
}

export function hasSectionCards(cards?: SectionCardCollection | null): boolean {
  return Boolean(Object.keys(cards?.keyed ?? {}).length || Object.values(cards?.grouped ?? {}).some((group) => group.length) || cards?.items?.length)
}

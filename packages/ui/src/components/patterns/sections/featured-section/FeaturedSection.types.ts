import type { SectionVariant, UiSectionData } from '../../../primitives/section/section.types.ts'

export type FeaturedSectionLayout = 'split' | 'stacked' | 'grid'

export interface FeaturedSectionProps {
  /** The page layer passes the complete section, including nested cards. */
  section: UiSectionData
  layout?: FeaturedSectionLayout
  variant?: SectionVariant
}

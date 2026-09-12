import type { SectionVariant, UiSectionData } from '../../../primitives/section/section.types.ts'

export interface FaqSectionProps {
  /** The page layer passes the complete section, including its nested cards and components. */
  section: UiSectionData
  variant?: SectionVariant
}

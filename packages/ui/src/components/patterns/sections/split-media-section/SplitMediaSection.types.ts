import type { SectionVariant, UiSectionData } from '../../../primitives/section/section.types.ts'

export type SplitMediaSectionLayout = 'split' | 'stacked' | 'centered' | 'background'
export type SplitMediaSectionPlacement = 'start' | 'end'

export interface SplitMediaSectionProps {
  section: UiSectionData
  layout?: SplitMediaSectionLayout
  placement?: SplitMediaSectionPlacement
  variant?: SectionVariant
}

import type { SectionVariant, UiSectionData } from '../../../primitives/section/section.types.ts'
export type SplitCardSectionLayout = 'split' | 'stacked' | 'centered'
export type SplitCardSectionPlacement = 'start' | 'end'
export interface SplitCardSectionProps { section: UiSectionData; layout?: SplitCardSectionLayout; placement?: SplitCardSectionPlacement; variant?: SectionVariant }

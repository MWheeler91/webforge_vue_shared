import type { SectionVariant, UiSectionData } from '../../../primitives/section/section.types.ts'
export type SplitTextSectionLayout = 'split' | 'stacked'
export type SplitTextSectionPlacement = 'start' | 'end'
export interface SplitTextSectionProps { section: UiSectionData; layout?: SplitTextSectionLayout; placement?: SplitTextSectionPlacement; variant?: SectionVariant }

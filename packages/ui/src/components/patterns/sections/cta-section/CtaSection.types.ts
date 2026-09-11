import type { SectionVariant, UiSectionData } from '../../../primitives/section/section.types.ts'

/**
 * `banner`   - title / body in a column with the actions trailing on the same row
 *              at wide widths; stacks on narrow screens. The default.
 * `centered` - title, body and actions stacked and centred.
 * `panel`    - the contents sit inside a contained, bordered box inset from the
 *              section edges, for dropping a call to action into the middle of a
 *              page that shares the surrounding background.
 */
export type CtaSectionLayout = 'banner' | 'centered' | 'panel'

export interface CtaSectionProps {
  /** The page layer passes the complete section, including its nested elements. */
  section: UiSectionData
  layout?: CtaSectionLayout
  variant?: SectionVariant
}

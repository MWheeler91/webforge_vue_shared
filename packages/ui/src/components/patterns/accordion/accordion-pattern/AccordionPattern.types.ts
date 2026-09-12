import type { AccordionAnimation } from '../../../primitives/accordion/accordion.types.ts'
import type { CardVariant } from '../../../primitives/card/card.types.ts'
import type { AccordionPatternIndicator, AccordionPatternOpenMode } from '../accordion.types.ts'

export interface AccordionPatternProps {
  /** Every pattern has one - reuses CardVariant, the closest existing meaning for a self-contained, section-embeddable surface. */
  variant?: CardVariant
  openMode?: AccordionPatternOpenMode
  indicator?: AccordionPatternIndicator
  /** Whether panels expand instantly or slide open. Forwarded to BaseAccordion. */
  animation?: AccordionAnimation
}

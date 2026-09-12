import type { UiTextInput } from '../../../primitives/card/card.types.ts'
import type { AccordionPatternIndicator } from '../accordion.types.ts'

export interface AccordionLeafProps {
  /** The AccordionItem value; must be unique among siblings inside the same AccordionPattern. */
  value: string
  title?: UiTextInput | null
  body?: UiTextInput | null
  /** Overrides the indicator injected from the enclosing AccordionPattern, if set. */
  indicator?: AccordionPatternIndicator | null
  /** Whether this leaf starts open. Only takes effect on mount - toggling it later has no effect. */
  defaultOpen?: boolean
}

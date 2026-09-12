import type { ComputedRef, InjectionKey } from 'vue'

/** `single` — opening one item closes the rest. `multiple` — any number can stay open. */
export type AccordionPatternOpenMode = 'single' | 'multiple'

/**
 * `none`       - no open/closed marker.
 * `plusMinus`  - a "+" that becomes a "−" when open.
 * `chevron`    - a caret that rotates 180° when open.
 */
export type AccordionPatternIndicator = 'none' | 'plusMinus' | 'chevron'

/** Provided by AccordionPattern, read by any AccordionLeaf nested inside it. */
export const accordionPatternIndicatorKey: InjectionKey<ComputedRef<AccordionPatternIndicator>> =
  Symbol('ui-accordion-pattern-indicator')

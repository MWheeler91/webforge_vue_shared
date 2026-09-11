import type { UiBadgePayload, UiCollectionInput, UiTextPayload } from '../../../primitives/card/card.types.ts'
import type { UiSwitcherItemPayload } from '../../../primitives/content-switcher/content-switcher.types.ts'

/** An accordion of disclosure panels; each item's trigger expands its own panel. */
export interface AccordionSwitcherProps {
  /** Small badge above the heading. */
  label?: UiBadgePayload | null
  eyebrow?: UiTextPayload | null
  heading?: UiTextPayload | null
  body?: UiTextPayload | null
  items?: UiCollectionInput<UiSwitcherItemPayload> | null
  /** Item id open by default. */
  defaultActiveId?: string | null
  /** Allow more than one item open at once. Default false. */
  multiple?: boolean
  ariaLabel?: string | null
  switcherId?: string | null
}

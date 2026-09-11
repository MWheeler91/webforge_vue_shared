import type { UiBadgePayload, UiCollectionInput, UiTextPayload } from '../../../primitives/card/card.types.ts'
import type { UiSwitcherItemPayload } from '../../../primitives/content-switcher/content-switcher.types.ts'

/** A category picker: one row of options, each swapping the content panel below it. */
export interface CategorySwitcherProps {
  /** Small badge above the heading. */
  label?: UiBadgePayload | null
  eyebrow?: UiTextPayload | null
  heading?: UiTextPayload | null
  body?: UiTextPayload | null
  items?: UiCollectionInput<UiSwitcherItemPayload> | null
  /** Controlled active item id. */
  activeId?: string | null
  /** Initial active item id when uncontrolled. */
  defaultActiveId?: string | null
  ariaLabel?: string | null
  switcherId?: string | null
}

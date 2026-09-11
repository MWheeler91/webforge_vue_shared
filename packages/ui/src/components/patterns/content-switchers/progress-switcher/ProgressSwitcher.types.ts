import type { UiBadgePayload, UiCollectionInput, UiTextPayload } from '../../../primitives/card/card.types.ts'
import type { UiSwitcherItemPayload } from '../../../primitives/content-switcher/content-switcher.types.ts'

export type ProgressSwitcherLayout = 'stepper' | 'progress'

/** A stepper/progress indicator; the active item is whichever item has `status: 'active'`. */
export interface ProgressSwitcherProps {
  /** Small badge above the heading. */
  label?: UiBadgePayload | null
  eyebrow?: UiTextPayload | null
  heading?: UiTextPayload | null
  body?: UiTextPayload | null
  items?: UiCollectionInput<UiSwitcherItemPayload> | null
  /** `stepper` is a compact numbered row; `progress` adds a bordered card per step. Default `stepper`. */
  layout?: ProgressSwitcherLayout
  ariaLabel?: string | null
  switcherId?: string | null
}

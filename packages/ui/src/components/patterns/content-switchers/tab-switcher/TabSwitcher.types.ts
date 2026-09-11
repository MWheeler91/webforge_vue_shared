import type { UiBadgePayload, UiCollectionInput, UiTextPayload } from '../../../primitives/card/card.types.ts'
import type { UiSwitcherItemPayload } from '../../../primitives/content-switcher/content-switcher.types.ts'

export type TabSwitcherLayout = 'tabs' | 'pill' | 'vertical'

/** A tab strip; selecting a tab swaps the content panel below/beside it. */
export interface TabSwitcherProps {
  /** Small badge above the heading. */
  label?: UiBadgePayload | null
  eyebrow?: UiTextPayload | null
  heading?: UiTextPayload | null
  body?: UiTextPayload | null
  items?: UiCollectionInput<UiSwitcherItemPayload> | null
  /** Default `tabs`. */
  layout?: TabSwitcherLayout
  /** Controlled active item id. */
  activeId?: string | null
  /** Initial active item id when uncontrolled. */
  defaultActiveId?: string | null
  ariaLabel?: string | null
  switcherId?: string | null
}

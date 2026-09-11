import type { UiCollectionInput } from '../../../primitives/card/card.types.ts'
import type { UiListItemPayload } from '../../../primitives/list/list.types.ts'

export type FeatureListLayout = 'icon' | 'check'

/** A grid of feature rows, each with an icon (or a checkmark in `check` layout) plus heading/body. */
export interface FeatureListProps {
  items?: UiCollectionInput<UiListItemPayload> | null
  /** Default `icon`. */
  layout?: FeatureListLayout
  listId?: string | null
  ariaLabel?: string | null
}

import type { UiCollectionInput } from '../../../primitives/card/card.types.ts'
import type { UiListItemPayload } from '../../../primitives/list/list.types.ts'

export type ActivityListLayout = 'activity' | 'ranked'

/** A feed of activity/event rows; `ranked` layout adds a position number and trailing value. */
export interface ActivityListProps {
  items?: UiCollectionInput<UiListItemPayload> | null
  /** Default `activity`. */
  layout?: ActivityListLayout
  listId?: string | null
  ariaLabel?: string | null
}

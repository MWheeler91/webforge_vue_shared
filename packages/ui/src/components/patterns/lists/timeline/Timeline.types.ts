import type { UiCollectionInput } from '../../../primitives/card/card.types.ts'
import type { UiListItemPayload } from '../../../primitives/list/list.types.ts'

/** A vertical dated timeline of events. */
export interface TimelineProps {
  items?: UiCollectionInput<UiListItemPayload> | null
  listId?: string | null
  ariaLabel?: string | null
}

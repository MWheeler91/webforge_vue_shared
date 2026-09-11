import type { UiCollectionInput } from '../../../primitives/card/card.types.ts'
import type { UiListItemPayload } from '../../../primitives/list/list.types.ts'

export type ResourceListLayout = 'resource' | 'article' | 'event' | 'job'

/** A list of resource rows (media/icon, badge, heading, body, meta, action); `event` layout adds a date. */
export interface ResourceListProps {
  items?: UiCollectionInput<UiListItemPayload> | null
  /** Default `resource`. */
  layout?: ResourceListLayout
  listId?: string | null
  ariaLabel?: string | null
}

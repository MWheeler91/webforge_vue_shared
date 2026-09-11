import type { UiCollectionInput } from '../../../primitives/card/card.types.ts'
import type { UiListItemPayload } from '../../../primitives/list/list.types.ts'

/** A vertical list of navigational links. */
export interface LinkListProps {
  items?: UiCollectionInput<UiListItemPayload> | null
  listId?: string | null
  /** Default `'Related links'`. */
  ariaLabel?: string | null
}

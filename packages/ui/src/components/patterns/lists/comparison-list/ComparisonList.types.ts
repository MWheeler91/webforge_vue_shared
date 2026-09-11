import type { UiCollectionInput } from '../../../primitives/card/card.types.ts'
import type { UiListItemPayload } from '../../../primitives/list/list.types.ts'

/** Side-by-side comparison columns; `status: 'featured'` highlights one column. */
export interface ComparisonListProps {
  items?: UiCollectionInput<UiListItemPayload> | null
  listId?: string | null
  ariaLabel?: string | null
}

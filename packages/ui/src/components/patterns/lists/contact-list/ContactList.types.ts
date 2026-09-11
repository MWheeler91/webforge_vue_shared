import type { UiCollectionInput } from '../../../primitives/card/card.types.ts'
import type { UiListItemPayload } from '../../../primitives/list/list.types.ts'

/** A grid of contact cards, each with an avatar, role, and links (`item.contact`). */
export interface ContactListProps {
  items?: UiCollectionInput<UiListItemPayload> | null
  listId?: string | null
  ariaLabel?: string | null
}

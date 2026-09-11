import type { UiCollectionInput } from '../../../primitives/card/card.types.ts'
import type { UiListItemPayload } from '../../../primitives/list/list.types.ts'

/** A `<dl>` of term/definition pairs (`item.label`/`item.heading` and `item.body`/`item.value`). */
export interface DefinitionListProps {
  items?: UiCollectionInput<UiListItemPayload> | null
  listId?: string | null
  ariaLabel?: string | null
}

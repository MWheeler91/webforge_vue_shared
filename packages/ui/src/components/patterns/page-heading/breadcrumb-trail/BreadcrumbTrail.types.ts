import type { UiCollectionInput } from '../../../primitives/card/card.types.ts'
import type { UiBreadcrumbPayload } from '../../../primitives/page-heading/page-heading.types.ts'

/** A breadcrumb trail; the last item (or `item.current`) renders as the non-link current page. */
export interface BreadcrumbTrailProps {
  breadcrumbs?: UiCollectionInput<UiBreadcrumbPayload> | null
  /** Default `'Breadcrumb'`. */
  ariaLabel?: string | null
}

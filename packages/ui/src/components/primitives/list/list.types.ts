import type {
  CardAction,
  UiBadgePayload,
  UiElementCollection,
  UiMediaPayload,
  UiTextPayload,
} from '../card/card.types'
export interface UiListItemPayload {
  id?: string | number
  label?: string
  heading?: UiTextPayload | null
  body?: UiTextPayload | null
  media?: UiMediaPayload | null
  avatar?: UiMediaPayload | null
  icon?: string | null
  value?: string | number | null
  date?: string | null
  meta?: UiTextPayload[] | null
  action?: CardAction | null
  href?: string | null
  status?: 'included' | 'excluded' | 'featured' | null
  role?: UiTextPayload | null
  contact?: UiElementCollection<CardAction> | null
}
export interface SharedListProps {
  variant?: string | null
  layout?: string | null
  label?: UiBadgePayload | null
  eyebrow?: UiTextPayload | null
  heading?: UiTextPayload | null
  body?: UiTextPayload | null
  description?: UiTextPayload | null
  items?: UiElementCollection<UiListItemPayload> | null
  buttons?: UiElementCollection<CardAction> | null
  divider?: boolean
  alignment?: 'start' | 'center' | 'end' | null
  density?: 'compact' | 'standard' | 'spacious' | null
  emphasis?: 'standard' | 'featured' | null
  shadow?: 'none' | 'sm' | 'md' | 'lg' | null
  border?: 'none' | 'subtle' | 'strong' | null
  radius?: 'inherit' | 'square' | 'soft' | 'rounded' | null
  ariaLabel?: string | null
  listId?: string | null
  metaData?: Record<string, unknown> | null
}

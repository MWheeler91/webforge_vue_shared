import type {
  CardAction,
  SharedCardProps,
  UiBadgePayload,
  UiElementCollection,
  UiMediaPayload,
  UiTextPayload,
} from '../card/card.types'

export type UiSwitcherStatus = 'complete' | 'active' | 'upcoming'

export interface UiSwitcherItemPayload {
  id?: string
  label: string
  heading?: UiTextPayload | null
  body?: UiTextPayload | null
  media?: UiMediaPayload | null
  icon?: string | null
  status?: UiSwitcherStatus | null
  cards?: UiElementCollection<SharedCardProps> | null
  buttons?: UiElementCollection<CardAction> | null
  children?: UiElementCollection<UiSwitcherItemPayload> | null
  disabled?: boolean
}

/** Stable API payload accepted by every public Ui content-switcher pattern. */
export interface SharedContentSwitcherProps {
  variant?: 'surface' | 'muted' | 'outline' | 'inverse' | null
  layout?: string | null
  label?: UiBadgePayload | null
  eyebrow?: UiTextPayload | null
  heading?: UiTextPayload | null
  subheading?: UiTextPayload | null
  body?: UiTextPayload | null
  description?: UiTextPayload | null
  media?: UiMediaPayload | null
  items?: UiElementCollection<UiSwitcherItemPayload> | null
  cards?: UiElementCollection<SharedCardProps> | null
  buttons?: UiElementCollection<CardAction> | null
  activeId?: string | null
  defaultActiveId?: string | null
  multiple?: boolean
  divider?: boolean
  alignment?: 'start' | 'center' | 'end' | null
  density?: 'compact' | 'standard' | 'spacious' | null
  emphasis?: 'standard' | 'featured' | null
  shadow?: 'none' | 'sm' | 'md' | 'lg' | null
  border?: 'none' | 'subtle' | 'strong' | null
  radius?: 'inherit' | 'square' | 'soft' | 'rounded' | null
  interactive?: boolean
  ariaLabel?: string | null
  switcherId?: string | null
  metaData?: Record<string, unknown> | null
}

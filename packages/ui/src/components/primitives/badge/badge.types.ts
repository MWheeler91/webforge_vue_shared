export type BadgeVariant =
  | 'brand'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'

export type BadgeTone =
  | 'solid'
  | 'soft'
  | 'outline'
  | 'ghost'

export type BadgeSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'

export type BadgeLeading =
  | 'none'
  | 'dot'

export type BadgePack = UiPack

export interface BaseBadgeProps {
  variant?: BadgeVariant
  tone?: BadgeTone
  size?: BadgeSize
  leading?: BadgeLeading
  unstyled?: boolean
}
import type { UiPack } from '../../../config/ui.types'

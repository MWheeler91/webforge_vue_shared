import type { BaseCardProps, UiTextInput } from '../../../primitives/card/card.types'

export interface TextListCardItem {
  title: string
  description?: string
}

/** `list` is a plain vertical list; `divided` adds a bottom border between rows. */
export type TextListCardLayout = 'list' | 'divided'

/**
 * Bullet marker shown before each item. `'default'` is a plain bullet dot in
 * `list` layout and no marker at all in `divided` layout (matching the
 * historical bordered-row look, which relies on the divider rather than a
 * bullet). `'numbered'` renders a sequential 1, 2, 3… and `'roman'` a
 * sequential i, ii, iii…, in either layout. `'none'` always hides the marker,
 * including in `list` layout, where `'default'` would otherwise show a
 * bullet. Any other string is read as an Iconify icon id (e.g. `'mdi:check'`,
 * `'mdi:plus'`) and rendered as the marker instead — the DB always returns
 * one of these shapes, there is no `null`/unset state.
 */
export type TextListCardMarker = 'default' | 'numbered' | 'roman' | 'none' | (string & {})

export interface TextListCardProps extends BaseCardProps {
  eyebrow?: UiTextInput | null
  title?: UiTextInput | null
  body?: UiTextInput | null
  items?: readonly (UiTextInput | TextListCardItem)[]
  footer?: UiTextInput | null
  layout?: TextListCardLayout | null
  marker?: TextListCardMarker
  /** Explicit column count for the item list. Defaults to `1`. */
  columns?: 1 | 2
}

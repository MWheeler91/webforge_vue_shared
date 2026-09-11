import type { BaseCardProps, UiTextInput } from '../../../primitives/card/card.types'

/**
 * A plain scalar text card: eyebrow, title, body, footer. There is no
 * secondary element (media, a value, an avatar) to arrange, so unlike its
 * sibling patterns this one has no `layout` prop — every field stacks in one
 * order and nothing here genuinely varies by layout.
 */
export interface TextCardProps extends BaseCardProps {
  eyebrow?: UiTextInput | null
  title?: UiTextInput | null
  body?: UiTextInput | null
  divider?: boolean
  footer?: UiTextInput | null
}

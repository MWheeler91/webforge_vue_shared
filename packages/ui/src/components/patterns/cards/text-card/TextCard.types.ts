import type { BaseCardProps, UiTextInput } from '../../../primitives/card/card.types'

export interface TextCardProps extends BaseCardProps {
  eyebrow?: UiTextInput | null
  title?: UiTextInput
  body?: UiTextInput
  divider?: boolean
  footer?: UiTextInput | null
}

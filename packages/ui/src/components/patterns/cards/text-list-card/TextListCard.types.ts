import type { BaseCardProps, UiTextInput } from '../../../primitives/card/card.types'

export interface TextListCardItem {
  title: string
  description?: string
}

export type TextListCardLayout = 'bulleted' | 'divided'

export interface TextListCardProps extends BaseCardProps {
  eyebrow?: UiTextInput | null
  title?: UiTextInput
  body?: UiTextInput | null
  items?: readonly (UiTextInput | TextListCardItem)[]
  footer?: UiTextInput | null
  layout?: TextListCardLayout | null
}

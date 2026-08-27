import type { BaseCardProps } from '../../../primitives/card/card.types'

export interface TextListCardItem {
  title: string
  description?: string
}

export interface TextListCardProps extends BaseCardProps {
  eyebrow?: string | null
  title?: string
  body?: string | null
  items?: readonly (string | TextListCardItem)[]
  footer?: string | null
  layout?: string | null
}

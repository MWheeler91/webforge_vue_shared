import type { BaseCardProps } from '../../../primitives/card/card.types'

export interface TextCardProps extends BaseCardProps {
  eyebrow?: string | null
  title?: string
  body?: string
  divider?: boolean
  footer?: string | null
}

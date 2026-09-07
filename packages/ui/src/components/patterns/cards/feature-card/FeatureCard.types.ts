import type {
  BaseCardProps,
  CardAction,
  UiBadgePayload,
  UiCollectionInput,
  UiMediaPayload,
  UiTextInput,
} from '../../../primitives/card/card.types.ts'

export type FeatureCardLayout = 'stacked' | 'split'
export type FeatureCardMediaAspect = 'auto' | 'square'

export interface FeatureCardProps extends BaseCardProps {
  eyebrow?: UiTextInput | null
  title?: UiTextInput | null
  body?: UiTextInput | null
  icon?: string | null
  media?: UiMediaPayload | null
  mediaAspect?: FeatureCardMediaAspect
  badges?: UiCollectionInput<UiBadgePayload> | null
  actions?: UiCollectionInput<CardAction> | null
  layout?: FeatureCardLayout
}

import type {
  BaseCardProps,
  CardAction,
  UiCollectionInput,
  UiMediaPayload,
  UiTextInput,
} from '../../../primitives/card/card.types.ts'

export type MediaCardLayout = 'framed' | 'immersive'

export interface MediaCardProps extends BaseCardProps {
  title: UiTextInput
  body?: UiTextInput | null
  caption?: UiTextInput | null
  credit?: UiTextInput | null
  media: UiMediaPayload
  actions?: UiCollectionInput<CardAction> | null
  layout?: MediaCardLayout
}

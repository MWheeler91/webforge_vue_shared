import type {
  BaseCardProps,
  CardAction,
  UiCollectionInput,
  UiMediaPayload,
  UiTextInput,
} from '../../../primitives/card/card.types.ts'

export type ProfileCardLayout = 'portrait-top' | 'portrait-left' | 'compact'

/**
 * A single person card (a team page, an author byline, a staff directory
 * entry). One card is one person.
 *
 * The reference demo also had an `overlay` layout (photo with text overlaid)
 * and a full-width `media` field separate from `avatar`. Neither is carried
 * into this version — there was no stated use case for either, so they are
 * cut rather than guessed at. Flagged as an open question for the owner.
 */
export interface ProfileCardProps extends BaseCardProps {
  avatar?: UiMediaPayload | null
  /** Person's name. */
  title?: UiTextInput | null
  /** Role/title, shown under the name. */
  subheading?: UiTextInput | null
  /** Short bio. Hidden entirely in the `compact` layout. */
  body?: UiTextInput | null
  /** e.g. social/contact links. */
  actions?: UiCollectionInput<CardAction> | null
  layout?: ProfileCardLayout
}

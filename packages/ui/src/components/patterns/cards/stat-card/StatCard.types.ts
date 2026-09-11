import type { BaseCardProps, UiBadgePayload, UiTextInput } from '../../../primitives/card/card.types.ts'

export type StatCardLayout = 'default' | 'horizontal'

/**
 * A single metric card (a dashboard tile, a "why us" number). One card is one
 * statistic. There is no chart in this version — the reference demo had only
 * an empty placeholder box with no real rendering, so a chart API is left as
 * an open question for the owner rather than guessed at here.
 */
export interface StatCardProps extends BaseCardProps {
  /** Small badge above the value, e.g. a context tag. */
  label?: UiBadgePayload | null
  /** The headline number, already formatted by the caller (e.g. "128%", "$4.2M"). */
  value?: string | number | null
  /** Short heading under the value describing what it measures. */
  title?: UiTextInput | null
  /** Optional supporting sentence. */
  body?: UiTextInput | null
  /** Optional trailing note, e.g. "vs. last quarter". */
  footer?: UiTextInput | null
  layout?: StatCardLayout
}

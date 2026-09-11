import type { SectionVariant, UiSectionData } from '../../../primitives/section/section.types.ts'

/**
 * `centered`  - text-only column, centred, actions beneath. No media. The default,
 *               and the classic landing / service-site opener.
 * `split`     - copy on one side, an image on the other; `placement` picks the
 *               media side. Renders as `centered` when no image is supplied.
 * `spotlight` - full-bleed background image or video with the copy overlaid on a
 *               scrim. Fills the browser viewport unless `minHeight` overrides it.
 */
export type HeroSectionLayout = 'centered' | 'split' | 'spotlight'

/** Which side the image sits on in the `split` layout. Matches SplitMediaSection. */
export type HeroSectionPlacement = 'start' | 'end'

/** Horizontal alignment of the copy column. The `centered` layout is always centred. */
export type HeroSectionAlign = 'left' | 'center'

/**
 * Minimum height of the hero.
 *
 * `auto`   - as tall as its content.
 * `md`     - a ~32rem floor.
 * `lg`     - a ~44rem floor.
 * `screen` - fills the browser viewport (`100dvh`). Resolved automatically for
 *            `spotlight` unless an explicit value is given.
 */
export type HeroSectionMinHeight = 'auto' | 'md' | 'lg' | 'screen'

export interface HeroSectionProps {
  /** The page layer passes the complete section, including its nested elements. */
  section: UiSectionData
  layout?: HeroSectionLayout
  placement?: HeroSectionPlacement
  align?: HeroSectionAlign
  minHeight?: HeroSectionMinHeight
  variant?: SectionVariant
}

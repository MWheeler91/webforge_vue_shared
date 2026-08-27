import type { PartialThemeColors } from '@mwheeler91/ui'

export interface ColorTheme {
  name: string
  colors: PartialThemeColors
}

export type SavedColorThemePayload = ColorTheme[]

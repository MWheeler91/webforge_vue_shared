import type { PartialThemeColors } from '@mwheeler/ui'

export interface ColorTheme {
  name: string
  colors: PartialThemeColors
}

export type SavedColorThemePayload = ColorTheme[]

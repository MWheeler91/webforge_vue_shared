import { defaultThemeColors } from './color.defaults'
import type { PartialThemeColors, ThemeColors } from './color.types'

export const THEME_COLOR_KEYS = [
  // Brand
  'brand',
  'brand_hover',
  'brand_active',
  'brand_soft',
  'brand_contrast',
  'brand_ring',
  'text_on_brand',

  // Accent
  'secondary',

  // Semantic
  'success',
  'warning',
  'error',
  'info',

  // Backgrounds
  'bg_canvas',
  'bg_surface',
  'bg_elevated',
  'bg_field',
  'bg_muted',
  'bg_inverse',
  'bg_disabled',

  // Text
  'text_primary',
  'text_secondary',
  'text_muted',
  'text_inverse',
  'text_disabled',

  // Borders
  'border_default',
  'border_muted',
  'border_focus',

  // Effects
  'overlay',
  'shadow_rgba',
] as const satisfies readonly (keyof ThemeColors)[]

export function resolveThemeColors(colors?: PartialThemeColors | null): ThemeColors {
  return {
    ...defaultThemeColors,
    ...colors,
  }
}

export function applyThemeColors(colors?: PartialThemeColors | null) {
  if (typeof document === 'undefined') return

  const resolvedColors = resolveThemeColors(colors)
  const root = document.documentElement

  for (const key of THEME_COLOR_KEYS) {
    const value = resolvedColors[key]

    if (value != null && value !== '') {
      root.style.setProperty(`--${String(key)}`, String(value))
    }
  }

  root.style.setProperty('color-scheme', 'dark light')
}

export interface ThemeColors {
  // Brand
  brand: string
  brand_hover: string
  brand_active: string
  brand_soft: string
  brand_contrast: string
  brand_ring: string
  text_on_brand: string

  // Accent
  secondary: string

  // Semantic
  success: string
  warning: string
  error: string
  info: string

  // Backgrounds
  bg_canvas: string
  bg_surface: string
  bg_elevated: string
  bg_field: string
  bg_muted: string
  bg_inverse: string
  bg_disabled: string

  // Text
  text_primary: string
  text_secondary: string
  text_muted: string
  text_inverse: string
  text_disabled: string

  // Borders
  border_default: string
  border_muted: string
  border_focus: string

  // Effects
  overlay: string
  shadow_rgba: string
}

export type PartialThemeColors = Partial<ThemeColors>

export type ColorThemeSource = 'library' | 'project' | 'api' | 'saved'

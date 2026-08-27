// ---------------------------------------------------------
// Shared / Global
// ---------------------------------------------------------

export type UiPack =
  | 'default'
  | 'lux'
  | 'classic'
  | 'minimal'
  | 'block'
  | 'soft'
  | 'glass'
  | 'editorial'
  | 'neon'
  | 'corporate'
  | 'paper'
  | 'chaos'

export type UiRadius = 'square' | 'soft' | 'rounded' | 'pill'

export type UiDensity = 'compact' | 'comfortable' | 'spacious'

export type UiMotion = 'none' | 'reduced' | 'normal' | 'expressive' | null

export type UiFont =
  | 'classic_sans'
  | 'classic_serif'
  | 'condensed_sans'
  | 'display_serif'
  | 'editorial_serif'
  | 'industrial_mono'
  | 'luxury_display'
  | 'modern_sans'
  | 'playful_display'
  | 'rounded_sans'
  | 'system'
  | 'technical_mono'

export type UiTypography =
  | 'classic'
  | 'compact'
  | 'default'
  | 'display'
  | 'editorial'
  | 'luxury'
  | 'modern'
  | 'playful'
  | 'technical'

// ---------------------------------------------------------
// Shared Config Shapes
// ---------------------------------------------------------

export interface GlobalUiConfig {
  pack: UiPack
  radius: UiRadius
  density: UiDensity
  font: UiFont
  typography: UiTypography
}

export interface ComponentUiConfig {
  pack?: UiPack | null
  radius?: UiRadius | null
  density?: UiDensity | null
}

export interface PackOnlyUiConfig {
  pack?: UiPack | null
}

// ---------------------------------------------------------
// Button
// ---------------------------------------------------------

export interface ButtonUiConfig {
  pack?: UiPack | null
  radius?: UiRadius | null
  density?: UiDensity | null
  motion?: UiMotion
}

// ---------------------------------------------------------
// Badge
// ---------------------------------------------------------

export type BadgeUiConfig = ComponentUiConfig

// ---------------------------------------------------------
// Input
// ---------------------------------------------------------

export type InputUiConfig = ComponentUiConfig

// ---------------------------------------------------------
// Card
// ---------------------------------------------------------

export interface CardUiConfig {
  pack?: UiPack | null
  radius?: UiRadius | null
  density?: UiDensity | null
  motion?: UiMotion
}

export interface AccordionUiConfig {
  pack?: UiPack | null
  radius?: UiRadius | null
  density?: UiDensity | null
  motion?: UiMotion
}

// ---------------------------------------------------------
// Section
// ---------------------------------------------------------

export interface SectionUiConfig {
  pack?: UiPack | null
  density?: UiDensity | null
}

// ---------------------------------------------------------
// Navbar
// ---------------------------------------------------------

export type UiNavbarConfig = PackOnlyUiConfig

// ---------------------------------------------------------
// Footer
// ---------------------------------------------------------

export type UiFooterConfig = PackOnlyUiConfig

// ---------------------------------------------------------
// Toast
// ---------------------------------------------------------

export type UiToastConfig = PackOnlyUiConfig

// ---------------------------------------------------------
// Main Config
// ---------------------------------------------------------

export interface UiConfig {
  global: GlobalUiConfig
  button: ButtonUiConfig
  badge: BadgeUiConfig
  input: InputUiConfig
  card: CardUiConfig
  accordion: AccordionUiConfig
  section: SectionUiConfig
  navbar: UiNavbarConfig
  footer: UiFooterConfig
  toast: UiToastConfig
}

export type PartialUiConfig = {
  global?: Partial<GlobalUiConfig>
  button?: Partial<ButtonUiConfig>
  badge?: Partial<BadgeUiConfig>
  input?: Partial<InputUiConfig>
  card?: Partial<CardUiConfig>
  accordion?: Partial<AccordionUiConfig>
  section?: Partial<SectionUiConfig>
  navbar?: Partial<UiNavbarConfig>
  footer?: Partial<UiFooterConfig>
  toast?: Partial<UiToastConfig>
}

export type UiConfigSource = 'library' | 'project' | 'api' | 'playground'

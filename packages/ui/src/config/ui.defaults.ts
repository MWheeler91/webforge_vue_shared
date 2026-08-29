import type { UiConfig } from './ui.types'

export const defaultUiConfig: UiConfig = {
  global: {
    pack: 'default',
    radius: 'rounded', // square | soft | rounded | pill
    density: 'comfortable', // compact | comfortable | spacious
    font: 'system',
    typography: 'default',
  },

  button: {
    pack: null, // default | lux | classic | minimal | block | soft | glass | editorial | neon | corporate | paper | chaos | doodle | fantasy
    // Optional button-specific overrides.
    // If omitted or null, the button should inherit from global.
    radius: null, // square | soft | rounded | pill | null
    density: null, // compact | comfortable | spacious | null
    motion: null, // none | reduced | normal | expressive | null
  },

  badge: {
    pack: null, // default | lux | classic | minimal | block | soft | glass | editorial | neon | corporate | paper | chaos | doodle | fantasy
    radius: null, // square | soft | rounded | pill | null
    density: null, // compact | comfortable | spacious | null
  },

  input: {
    pack: null, // default | lux | classic | minimal | block | soft | glass | editorial | neon | corporate | paper | chaos | doodle | fantasy
    radius: null, // square | soft | rounded | pill | null
    density: null, // compact | comfortable | spacious | null
  },

  card: {
    pack: null, // default | lux | classic | minimal | block | soft | glass | editorial | neon | corporate | paper | chaos | doodle | fantasy
    radius: null, // square | soft | rounded | pill | null
    density: null, // compact | comfortable | spacious | null
    motion: null, // none | reduced | normal | expressive | null
  },

  accordion: {
    pack: null,
    radius: null,
    density: null,
    motion: null,
  },

  section: {
    pack: null, // default | lux | classic | minimal | block | soft | glass | editorial | neon | corporate | paper | chaos | doodle | fantasy
    density: null, // compact | comfortable | spacious | null
  },

  navbar: {
    pack: null, // default | lux | classic | minimal | block | soft | glass | editorial | neon | corporate | paper | chaos | doodle | fantasy
  },

  footer: {
    pack: null, // default | lux | classic | minimal | block | soft | glass | editorial | neon | corporate | paper | chaos | doodle | fantasy
  },

  toast: {
    pack: null, // default | lux | classic | minimal | block | soft | glass | editorial | neon | corporate | paper | chaos | doodle | fantasy
  },
}

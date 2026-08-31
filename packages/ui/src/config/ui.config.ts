// =========================================================
// Project UI Config Example
// =========================================================
//
// This file is an example override file.
// Values set to undefined do not override package defaults.
// Replace undefined with a valid option to override behavior.
//
// Package fallbacks live in ui.defaults.ts.
// API/DB settings can also override this config at runtime.

import type { PartialUiConfig } from './ui.types'

export const projectUiConfig: PartialUiConfig = {
  global: {
    pack: 'default', // See UiPack for the complete allowlist.
    radius: 'square', // square | soft | rounded | pill
    density: 'comfortable', // compact | comfortable | spacious
    font: 'system', // classic-sans | classic-serif | condensed-sans | delius-swash-caps | display-serif | editorial-serif | industrial-mono
    // jetbrains-mono | luxury-display | modern-sans | new-rocker | playful-display | rounded-sans | system | technical-mono
    typography: 'default', // classic | compact | default | display | editorial | luxury | modern | playful | technical
  },

  button: {
    pack: null, // UiPack | null
    // Optional button-specific overrides.
    // If omitted or null, the button should inherit from global.
    radius: 'square', // square | soft | rounded | pill | null
    density: null, // compact | comfortable | spacious | null
    motion: null, // none | reduced | normal | expressive | null
  },

  badge: {
    pack: null, // UiPack | null
    radius: null, // square | soft | rounded | pill | null
    density: null, // compact | comfortable | spacious | null
  },

  input: {
    pack: null, // UiPack | null
    radius: null, // square | soft | rounded | pill | null
    density: null, // compact | comfortable | spacious | null
  },

  card: {
    pack: null, // UiPack | null
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
    pack: null, // UiPack | null
    density: null, // compact | comfortable | spacious | null
  },

  navbar: {
    pack: null, // UiPack | null
  },

  footer: {
    pack: null, // UiPack | null
  },

  toast: {
    pack: null, // UiPack | null
  },
}

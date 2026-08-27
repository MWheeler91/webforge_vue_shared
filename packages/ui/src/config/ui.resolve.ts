import { defaultUiConfig } from './ui.defaults'
import type { PartialUiConfig, UiConfig } from './ui.types'

function mergeUiConfig(base: UiConfig, override?: PartialUiConfig | null): UiConfig {
  if (!override) return base

  return {
    global: {
      ...base.global,
      ...override.global,
    },

    button: {
      ...base.button,
      ...override.button,
    },

    badge: {
      ...base.badge,
      ...override.badge,
    },

    input: {
      ...base.input,
      ...override.input,
    },

    card: {
      ...base.card,
      ...override.card,
    },

    accordion: {
      ...base.accordion,
      ...override.accordion,
    },

    section: {
      ...base.section,
      ...override.section,
    },

    navbar: {
      ...base.navbar,
      ...override.navbar,
    },

    footer: {
      ...base.footer,
      ...override.footer,
    },

    toast: {
      ...base.toast,
      ...override.toast,
    },
  }
}

function resolveButtonGlobals(config: UiConfig): UiConfig {
  return {
    ...config,

    button: {
      ...config.button,
      pack: config.button.pack ?? config.global.pack,
      radius: config.button.radius ?? config.global.radius,
      density: config.button.density ?? config.global.density,
      motion: config.button.motion ?? defaultUiConfig.button.motion,
    },
  }
}

function resolveBadgeGlobals(config: UiConfig): UiConfig {
  return {
    ...config,

    badge: {
      ...config.badge,
      pack: config.badge.pack ?? config.global.pack,
      radius: config.badge.radius ?? config.global.radius,
      density: config.badge.density ?? config.global.density,
    },
  }
}

function resolveInputGlobals(config: UiConfig): UiConfig {
  return {
    ...config,

    input: {
      ...config.input,
      pack: config.input.pack ?? config.global.pack,
      radius: config.input.radius ?? config.global.radius,
      density: config.input.density ?? config.global.density,
    },
  }
}

function resolveCardGlobals(config: UiConfig): UiConfig {
  return {
    ...config,

    card: {
      ...config.card,
      pack: config.card.pack ?? config.global.pack,
      radius: config.card.radius ?? config.global.radius,
      density: config.card.density ?? config.global.density,
      motion: config.card.motion ?? defaultUiConfig.card.motion,
    },
  }
}

function resolveAccordionGlobals(config: UiConfig): UiConfig {
  return {
    ...config,

    accordion: {
      ...config.accordion,
      pack: config.accordion.pack ?? config.global.pack,
      radius: config.accordion.radius ?? config.global.radius,
      density: config.accordion.density ?? config.global.density,
      motion: config.accordion.motion ?? defaultUiConfig.accordion.motion,
    },
  }
}

function resolveSectionGlobals(config: UiConfig): UiConfig {
  return {
    ...config,

    section: {
      ...config.section,
      pack: config.section.pack ?? config.global.pack,
      density: config.section.density ?? config.global.density,
    },
  }
}

function resolveNavbarGlobals(config: UiConfig): UiConfig {
  return {
    ...config,

    navbar: {
      ...config.navbar,
      pack: config.navbar.pack ?? config.global.pack,
    },
  }
}

function resolveFooterGlobals(config: UiConfig): UiConfig {
  return {
    ...config,

    footer: {
      ...config.footer,
      pack: config.footer.pack ?? config.global.pack,
    },
  }
}

function resolveToastGlobals(config: UiConfig): UiConfig {
  return {
    ...config,

    toast: {
      ...config.toast,
      pack: config.toast.pack ?? config.global.pack,
    },
  }
}

export function resolveUiConfig(config?: PartialUiConfig | null): UiConfig {
  const merged = mergeUiConfig(defaultUiConfig, config)

  const withResolvedButtons = resolveButtonGlobals(merged)
  const withResolvedBadges = resolveBadgeGlobals(withResolvedButtons)
  const withResolvedInputs = resolveInputGlobals(withResolvedBadges)
  const withResolvedCards = resolveCardGlobals(withResolvedInputs)
  const withResolvedAccordions = resolveAccordionGlobals(withResolvedCards)
  const withResolvedSections = resolveSectionGlobals(withResolvedAccordions)
  const withResolvedNavbar = resolveNavbarGlobals(withResolvedSections)
  const withResolvedFooter = resolveFooterGlobals(withResolvedNavbar)
  const withResolvedToast = resolveToastGlobals(withResolvedFooter)

  return withResolvedToast
}

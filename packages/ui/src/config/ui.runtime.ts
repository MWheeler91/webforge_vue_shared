import { reactive } from 'vue'
import { resolveUiConfig } from './ui.resolve'
import type { PartialUiConfig, UiConfig } from './ui.types'

const activeUiConfig = reactive<UiConfig>(resolveUiConfig())

function applyResolvedConfig(resolved: UiConfig) {
  activeUiConfig.global = { ...resolved.global }

  activeUiConfig.button = { ...resolved.button }
  activeUiConfig.badge = { ...resolved.badge }
  activeUiConfig.input = { ...resolved.input }
  activeUiConfig.card = { ...resolved.card }
  activeUiConfig.accordion = { ...resolved.accordion }
  activeUiConfig.section = { ...resolved.section }

  activeUiConfig.navbar = { ...resolved.navbar }
  activeUiConfig.footer = { ...resolved.footer }
  activeUiConfig.toast = { ...resolved.toast }
}

export function setUiConfig(config?: PartialUiConfig | UiConfig | null) {
  applyResolvedConfig(resolveUiConfig(config))
}

export function patchUiConfig(config: PartialUiConfig) {
  const patched: PartialUiConfig = {
    ...activeUiConfig,
    ...config,

    global: {
      ...activeUiConfig.global,
      ...config.global,
    },

    button: {
      ...activeUiConfig.button,
      ...config.button,
    },

    badge: {
      ...activeUiConfig.badge,
      ...config.badge,
    },

    input: {
      ...activeUiConfig.input,
      ...config.input,
    },

    card: {
      ...activeUiConfig.card,
      ...config.card,
    },

    accordion: {
      ...activeUiConfig.accordion,
      ...config.accordion,
    },

    section: {
      ...activeUiConfig.section,
      ...config.section,
    },

    navbar: {
      ...activeUiConfig.navbar,
      ...config.navbar,
    },

    footer: {
      ...activeUiConfig.footer,
      ...config.footer,
    },

    toast: {
      ...activeUiConfig.toast,
      ...config.toast,
    },
  }

  setUiConfig(patched)
}

export function resetUiConfig() {
  setUiConfig(null)
}

export function useUiConfig(): UiConfig {
  return activeUiConfig
}

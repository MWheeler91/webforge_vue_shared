import type { UiConfig } from './ui.types'

type ThemeAttrValue = string | number | boolean | null | undefined
type ThemeAttrs = Record<string, string>

function cleanAttrs(attrs: Record<string, ThemeAttrValue>): ThemeAttrs {
  return Object.fromEntries(
    Object.entries(attrs)
      .filter(([, value]) => value !== null && value !== undefined)
      .map(([key, value]) => [key, String(value)]),
  )
}

export function buildUiThemeAttrs(config: UiConfig): ThemeAttrs {
  return cleanAttrs({
    'data-ui-font': config.global.font,
    'data-ui-typography': config.global.typography,
  })
}

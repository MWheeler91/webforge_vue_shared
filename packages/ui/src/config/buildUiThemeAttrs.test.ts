import { describe, expect, it } from 'vitest'
import { buildUiThemeAttrs } from './buildUiThemeAttrs'
import { resolveUiConfig } from './ui.resolve'

describe('buildUiThemeAttrs', () => {
  it('exposes font and typography as independent site-wide settings', () => {
    const config = resolveUiConfig({
      global: {
        pack: 'editorial',
        font: 'classic-sans',
        typography: 'modern',
      },
    })

    expect(buildUiThemeAttrs(config)).toMatchObject({
      'data-ui-font': 'classic-sans',
      'data-ui-typography': 'modern',
    })
    expect(buildUiThemeAttrs(config)).not.toHaveProperty('data-typography-pack')
  })

  it('does not change typography attributes when only the UI pack changes', () => {
    const editorial = buildUiThemeAttrs(
      resolveUiConfig({ global: { pack: 'editorial', typography: 'classic' } }),
    )
    const neon = buildUiThemeAttrs(
      resolveUiConfig({ global: { pack: 'neon', typography: 'classic' } }),
    )

    expect(editorial).toEqual(neon)
  })

})

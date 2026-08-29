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

  it('exposes Doodle typography independently from the selected pack and font', () => {
    const attrs = buildUiThemeAttrs(
      resolveUiConfig({
        global: {
          pack: 'editorial',
          font: 'jetbrains-mono',
          typography: 'doodle',
        },
      }),
    )

    expect(attrs).toEqual({
      'data-ui-font': 'jetbrains-mono',
      'data-ui-typography': 'doodle',
    })
  })
})

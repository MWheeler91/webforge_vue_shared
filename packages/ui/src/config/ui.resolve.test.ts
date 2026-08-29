import { describe, expect, it } from 'vitest'
import { resolveUiConfig } from './ui.resolve'

describe('UI configuration ownership', () => {
  it('keeps site-wide settings independent and applies component overrides selectively', () => {
    const config = resolveUiConfig({
      global: {
        pack: 'lux',
        radius: 'pill',
        density: 'comfortable',
        font: 'classic-sans',
        typography: 'classic',
      },
      card: {
        radius: 'square',
      },
    })

    expect(config.global).toMatchObject({
      pack: 'lux',
      radius: 'pill',
      density: 'comfortable',
      font: 'classic-sans',
      typography: 'classic',
    })
    expect(config.card).toMatchObject({
      pack: 'lux',
      radius: 'square',
      density: 'comfortable',
    })
    expect(config.button).toMatchObject({
      pack: 'lux',
      radius: 'pill',
      density: 'comfortable',
    })
    expect(config.accordion).toMatchObject({
      pack: 'lux',
      radius: 'pill',
      density: 'comfortable',
    })
  })

  it('allows a button override without changing the global or card radius', () => {
    const config = resolveUiConfig({
      global: { radius: 'rounded' },
      button: { radius: 'square' },
    })

    expect(config.global.radius).toBe('rounded')
    expect(config.button.radius).toBe('square')
    expect(config.card.radius).toBe('rounded')
  })

  it('resolves Doodle typography independently from pack and font selection', () => {
    const config = resolveUiConfig({
      global: {
        pack: 'doodle',
        font: 'delius-swash-caps',
        typography: 'doodle',
      },
    })

    expect(config.global).toMatchObject({
      pack: 'doodle',
      font: 'delius-swash-caps',
      typography: 'doodle',
    })
  })

  it('resolves Fantasy independently from typography and font selection', () => {
    const config = resolveUiConfig({
      global: {
        pack: 'fantasy',
        font: 'new-rocker',
        typography: 'display',
      },
    })

    expect(config.global).toMatchObject({
      pack: 'fantasy',
      font: 'new-rocker',
      typography: 'display',
    })
  })
})

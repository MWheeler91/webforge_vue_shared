/// <reference types="node" />

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const fontCss = readFileSync(resolve(process.cwd(), 'src/styles/systems/font.css'), 'utf8')

describe('font family mappings', () => {
  it('provides independent Delius display and JetBrains mono options', () => {
    expect(fontCss).toContain("[data-ui-font='delius-swash-caps']")
    expect(fontCss).toContain("--font-display: 'Delius Swash Caps', cursive;")
    expect(fontCss).toContain("[data-ui-font='jetbrains-mono']")
    expect(fontCss).toContain("--font-mono:\n    'JetBrains Mono'")
  })

  it('provides New Rocker as an independent display option', () => {
    expect(fontCss).toContain("[data-ui-font='new-rocker']")
    expect(fontCss).toContain("--font-display: 'New Rocker'")
    expect(fontCss).toContain('--font-body:')
    expect(fontCss).toContain('--font-mono:')
  })

  it('does not couple either font option to a UI pack or typography preset', () => {
    expect(fontCss).not.toMatch(/doodle/)
    expect(fontCss).not.toMatch(/data-ui-typography/)
  })
})

/// <reference types="node" />

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const fantasyCss = readFileSync(
  resolve(process.cwd(), 'src/styles/systems/ui-packs/fantasy.css'),
  'utf8',
)

describe('Fantasy UI pack boundaries', () => {
  it('uses the existing semantic and decorative contracts', () => {
    expect(fantasyCss).toContain('.ui-btn--pack-fantasy')
    expect(fantasyCss).toContain('.ui-card--pack-fantasy')
    expect(fantasyCss).toContain('.ui-tabs--pack-fantasy')
    expect(fantasyCss).toContain('--ui-composite-border-width')
    expect(fantasyCss).toContain('--ui-composite-shadow')
  })

  it('does not establish typography or composite radius behavior', () => {
    expect(fantasyCss).not.toMatch(/\bwhite\b/)
    expect(fantasyCss).not.toMatch(/--type-[a-z0-9-]+\s*:/)
    expect(fantasyCss).not.toMatch(/--font-[a-z0-9-]+\s*:/)
    expect(fantasyCss).not.toContain('--ui-composite-radius')
    expect(fantasyCss).not.toContain('--ui-composite-letter-spacing')
    expect(fantasyCss).not.toContain('padding-inline-start:')
    expect(fantasyCss).not.toContain('padding-block-start:')
  })
})

/// <reference types="node" />

import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const styleDirectory = resolve(process.cwd(), 'src/styles')
const typographyCss = readFileSync(resolve(styleDirectory, 'systems/typography/index.css'), 'utf8')
const packDirectory = resolve(styleDirectory, 'systems/ui-packs')

describe('typography role boundaries', () => {
  it('keeps typography presets limited to global type roles', () => {
    const typographyPackBodies = Array.from(
      typographyCss.matchAll(/\[data-ui-typography='[^']+'\]\s*{([^}]*)}/g),
      (match) => match[1] ?? '',
    )

    expect(typographyPackBodies).toHaveLength(10)

    for (const body of typographyPackBodies) {
      const customProperties = Array.from(body.matchAll(/(--[a-z0-9-]+)\s*:/g), (match) => match[1])

      expect(customProperties.length).toBeGreaterThan(0)
      expect(customProperties.every((property) => property?.startsWith('--type-'))).toBe(true)
    }
  })

  it('keeps UI packs from redefining global type roles', () => {
    const uiPackCss = readdirSync(packDirectory)
      .filter((file) => file.endsWith('.css'))
      .map((file) => readFileSync(resolve(packDirectory, file), 'utf8'))
      .join('\n')

    expect(uiPackCss).not.toMatch(/--type-[a-z0-9-]+\s*:/)
  })

  it('gives typography presets distinct values for shared roles', () => {
    const roleSize = (pack: string) =>
      typographyCss.match(
        new RegExp(
          `\\[data-ui-typography='${pack}'\\][\\s\\S]*?--type-heading-lg-size:\\s*([^;]+);`,
        ),
      )?.[1]

    expect(roleSize('compact')).toBe('2rem')
    expect(roleSize('display')).toBe('3rem')
    expect(roleSize('doodle')).toBe('2.5rem')
  })
})

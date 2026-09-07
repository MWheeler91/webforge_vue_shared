/// <reference types="node" />

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const styles = resolve(process.cwd(), 'src/styles')
const motionCss = readFileSync(resolve(styles, 'systems/motion.css'), 'utf8')
const accordionCss = readFileSync(resolve(styles, 'components/accordion.css'), 'utf8')

describe('accordion motion overrides', () => {
  it('keeps accordion motion modifiers in the motion system', () => {
    expect(motionCss).toMatch(/\.ui-accordion--motion-none/)
    expect(motionCss).toMatch(/\.ui-accordion--motion-reduced/)
    expect(motionCss).toMatch(/\.ui-accordion--motion-normal/)
    expect(motionCss).toMatch(/\.ui-accordion--motion-expressive/)
    expect(motionCss).toMatch(/--ui-accordion-motion-duration: 0ms/)
    expect(motionCss).toMatch(/--ui-accordion-motion-duration: 280ms/)
    expect(motionCss).toMatch(/--ui-accordion-motion-duration: 420ms/)
    expect(accordionCss).not.toMatch(/\.ui-accordion--motion-/)
  })
})

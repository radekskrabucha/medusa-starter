import { describe, it, expect } from 'vitest'
import { getTailwindGap } from '../src/styles'

describe('getTailwindGap', () => {
  it('should extract gap value from valid Tailwind class', () => {
    expect(getTailwindGap('gap-4')).toBe(4)
    expect(getTailwindGap('gap-12')).toBe(12)
    expect(getTailwindGap('gap-0')).toBe(0)
  })

  it('should handle classes with multiple values', () => {
    expect(getTailwindGap('flex gap-6 items-center')).toBe(6)
    expect(getTailwindGap('p-4 gap-8 text-center')).toBe(8)
  })

  it('should return null when no gap class is present', () => {
    expect(getTailwindGap('flex items-center')).toBeNull()
    expect(getTailwindGap('')).toBeNull()
    expect(getTailwindGap('p-4')).toBeNull()
  })

  it('should only match exact gap- pattern', () => {
    expect(getTailwindGap('gap-y-4')).toBeNull()
    expect(getTailwindGap('gap-x-6')).toBeNull()
    expect(getTailwindGap('no-gap-4')).toBeNull()
  })
})

import { describe, it, expect } from 'vitest'
import { isBrowser } from '../src/common'

describe('common utils', () => {
  it('should correctly identify browser environment', () => {
    expect(typeof isBrowser).toBe('boolean')
    expect(isBrowser).toBe(true)
  })
})

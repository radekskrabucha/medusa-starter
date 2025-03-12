import { describe, it, expect } from 'vitest'
import { isPhoneNumber } from '../src/regex'

describe('regex utils', () => {
  describe('isPhoneNumber', () => {
    it('should validate international phone numbers', () => {
      expect(isPhoneNumber('+1234567890')).toBe(true)
      expect(isPhoneNumber('+44 1234567890')).toBe(true)
      expect(isPhoneNumber('+48 123-456-789')).toBe(true)
      expect(isPhoneNumber('+1 (123) 456-7890')).toBe(true)
    })

    it('should validate local phone numbers', () => {
      expect(isPhoneNumber('1234567890')).toBe(true)
      expect(isPhoneNumber('123-456-7890')).toBe(true)
      expect(isPhoneNumber('(123) 456-7890')).toBe(true)
      expect(isPhoneNumber('123.456.7890')).toBe(true)
    })

    it('should reject invalid phone numbers', () => {
      expect(isPhoneNumber('123')).toBe(false)
      expect(isPhoneNumber('abcdefghijk')).toBe(false)
      expect(isPhoneNumber('12345678901234567890')).toBe(false)
      expect(isPhoneNumber('')).toBe(false)
      expect(isPhoneNumber('++1234567890')).toBe(false)
      expect(isPhoneNumber('123-abc-7890')).toBe(false)
      expect(isPhoneNumber('(123 456-7890')).toBe(false)
    })

    it('should handle edge cases', () => {
      expect(isPhoneNumber(' ')).toBe(false)
      expect(isPhoneNumber('+')).toBe(false)
      expect(isPhoneNumber('()-.')).toBe(false)
      expect(isPhoneNumber('+48 ')).toBe(false)
    })
  })
})

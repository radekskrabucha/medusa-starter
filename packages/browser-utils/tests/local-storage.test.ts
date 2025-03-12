import { describe, it, expect, beforeEach } from 'vitest'
import { getItem, setItem, removeItem } from '../src/local-storage'

describe('localStorage utils', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('getItem', () => {
    it('should return null when item does not exist', () => {
      expect(getItem('test-key')).toBeNull()
    })

    it('should return item when it exists', () => {
      localStorage.setItem('test-key', 'test-value')
      expect(getItem('test-key')).toBe('test-value')
    })
  })

  describe('setItem', () => {
    it('should set item in localStorage', () => {
      setItem('test-key', 'test-value')
      expect(localStorage.getItem('test-key')).toBe('test-value')
    })
  })

  describe('removeItem', () => {
    it('should remove item from localStorage', () => {
      localStorage.setItem('test-key', 'test-value')
      removeItem('test-key')
      expect(localStorage.getItem('test-key')).toBeNull()
    })
  })
})

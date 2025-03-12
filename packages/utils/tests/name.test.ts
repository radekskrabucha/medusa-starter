import { describe, it, expect } from 'vitest'
import { getName } from '../src/name'

describe('name utils', () => {
  describe('getName', () => {
    it('should return full name when both firstName and lastName are provided', () => {
      expect(getName({ firstName: 'John', lastName: 'Doe' })).toBe('John Doe')
      expect(getName({ firstName: 'Jane', lastName: 'Smith' })).toBe('Jane Smith')
    })

    it('should return firstName when only firstName is provided', () => {
      expect(getName({ firstName: 'John', lastName: null })).toBe('John')
      expect(getName({ firstName: 'John', lastName: undefined })).toBe('John')
      expect(getName({ firstName: 'John' })).toBe('John')
    })

    it('should return lastName when only lastName is provided', () => {
      expect(getName({ firstName: null, lastName: 'Doe' })).toBe('Doe')
      expect(getName({ firstName: undefined, lastName: 'Doe' })).toBe('Doe')
      expect(getName({ lastName: 'Doe' })).toBe('Doe')
    })

    it('should return undefined when neither firstName nor lastName is provided', () => {
      expect(getName({})).toBeUndefined()
      expect(getName({ firstName: null, lastName: null })).toBeUndefined()
      expect(getName({ firstName: undefined, lastName: undefined })).toBeUndefined()
    })
  })
}) 
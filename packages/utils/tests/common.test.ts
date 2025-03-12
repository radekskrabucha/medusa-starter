import { describe, it, expect } from 'vitest'
import { nonNullable, waitFor, isObject, isArray, isEmpty } from '../src/common'

describe('nonNullable', () => {
  it('should return true for non-null values', () => {
    expect(nonNullable(0)).toBe(true)
    expect(nonNullable('')).toBe(true)
    expect(nonNullable(false)).toBe(true)
    expect(nonNullable({})).toBe(true)
    expect(nonNullable([])).toBe(true)
    expect(nonNullable(-1)).toBe(true)
    expect(nonNullable(NaN)).toBe(true)
    expect(nonNullable(Infinity)).toBe(true)
    expect(nonNullable(() => {})).toBe(true)
    expect(nonNullable(new Date())).toBe(true)
  })

  it('should return false for null or undefined values', () => {
    expect(nonNullable(null)).toBe(false)
    expect(nonNullable(undefined)).toBe(false)
    expect(nonNullable(void 0)).toBe(false)
  })
})

describe('waitFor', () => {
  it('should wait for the specified time', async () => {
    const start = Date.now()
    await waitFor(100)
    const end = Date.now()
    expect(end - start).toBeGreaterThanOrEqual(100)
  })

  it('should handle zero milliseconds', async () => {
    const start = Date.now()
    await waitFor(0)
    const end = Date.now()
    expect(end - start).toBeGreaterThanOrEqual(0)
  })

  it('should handle negative milliseconds as zero', async () => {
    const start = Date.now()
    await waitFor(-100)
    const end = Date.now()
    expect(end - start).toBeGreaterThanOrEqual(0)
  })
})

describe('isObject', () => {
  it('should return true for objects', () => {
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(true)
    expect(isObject(new Date())).toBe(true)
    expect(isObject(new Map())).toBe(true)
    expect(isObject(new Set())).toBe(true)
    expect(isObject(new RegExp(''))).toBe(true)
    expect(isObject(() => {})).toBe(true)
  })

  it('should return false for non-objects', () => {
    expect(isObject(null)).toBe(false)
    expect(isObject(undefined)).toBe(false)
    expect(isObject(42)).toBe(false)
    expect(isObject('string')).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject(Symbol())).toBe(false)
    expect(isObject(NaN)).toBe(false)
    expect(isObject(Infinity)).toBe(false)
    expect(isObject(-Infinity)).toBe(false)
  })
})

describe('isArray', () => {
  it('should return true for arrays', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
    expect(isArray([])).toBe(true)
    expect(isArray(new Array(5))).toBe(true)
    expect(isArray(['1', 2, { a: 1 }, []])).toBe(true)
    expect(isArray(Array.from('hello'))).toBe(true)
    expect(isArray(Array.of(1, 2, 3))).toBe(true)
  })

  it('should return false for non-arrays', () => {
    expect(isArray({})).toBe(false)
    expect(isArray(null)).toBe(false)
    expect(isArray(undefined)).toBe(false)
    expect(isArray('string')).toBe(false)
    expect(isArray(42)).toBe(false)
    expect(isArray({ length: 0 })).toBe(false)
    expect(isArray(new Set([1, 2, 3]))).toBe(false)
    expect(isArray(new Map())).toBe(false)
    expect(isArray({ 0: 'a', 1: 'b', length: 2 })).toBe(false)
  })
})

describe('isEmpty', () => {
  it('should return true for empty values', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty('   ')).toBe(true)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty('\n\t\r')).toBe(true)
    expect(isEmpty(new Map())).toBe(true)
    expect(isEmpty(new Set())).toBe(true)
  })

  it('should return false for non-empty values', () => {
    expect(isEmpty('text')).toBe(false)
    expect(isEmpty({ key: 'value' })).toBe(false)
    expect(isEmpty([1])).toBe(false)
    expect(isEmpty(0)).toBe(false)
    expect(isEmpty(false)).toBe(false)
    expect(isEmpty(' a ')).toBe(false)
    expect(isEmpty(new Map([['key', 'value']]))).toBe(false)
    expect(isEmpty(new Set([1]))).toBe(false)
    expect(isEmpty({ toString: () => '' })).toBe(false)
  })

  it('should handle objects with inherited properties', () => {
    class TestClass {
      inherited?: string = 'value'
    }
    const instance = new TestClass()
    expect(isEmpty(instance)).toBe(false)

    const empty = new TestClass()
    delete empty.inherited
    expect(isEmpty(empty)).toBe(true)
  })
})

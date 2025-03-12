import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getNow, getFullYear, getNowUnix } from '../src/date'

describe('date utils', () => {
  const mockDate = new Date('2024-03-21T12:00:00Z')

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(mockDate)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('getNow', () => {
    it('should return current date', () => {
      const result = getNow()
      expect(result).toEqual(mockDate)
      expect(result.toISOString()).toBe('2024-03-21T12:00:00.000Z')
    })
  })

  describe('getFullYear', () => {
    it('should return current year', () => {
      const result = getFullYear()
      expect(result).toBe(2024)
    })
  })

  describe('getNowUnix', () => {
    it('should return current unix timestamp', () => {
      const result = getNowUnix()
      expect(result).toBe(1711022400)
    })

    it('should match getUnixTime from date-fns', () => {
      const directUnix = Math.floor(mockDate.getTime() / 1000)
      expect(getNowUnix()).toBe(directUnix)
    })
  })
})

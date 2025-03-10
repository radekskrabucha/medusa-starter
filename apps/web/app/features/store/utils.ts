import { getRouteApi } from '@tanstack/react-router'
import type { StoreSortOrder } from './validationSchemas'

export const storePageRouteApi = getRouteApi('/(app)/_layout/store/')

export const LIMIT_PER_PAGE = 20

export const SORT_BY_DEFAULT: StoreSortOrder = '-created_at'

export const calculateAppliedFilters = (
  options: Record<string, unknown>
): number => {
  return Object.entries(options).reduce((total, [, value]) => {
    if (Array.isArray(value)) {
      return total + value.length
    }
    if (typeof value === 'string' || typeof value === 'number') {
      return total + 1
    }
    if (typeof value === 'object' && value !== null) {
      return total + Object.keys(value).length
    }
    return total
  }, 0)
}

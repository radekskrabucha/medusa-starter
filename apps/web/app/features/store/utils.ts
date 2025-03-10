import { getRouteApi } from '@tanstack/react-router'
import type { CheckboxValue } from './components/FilterCheckboxItem'
import type { RadioValue } from './components/FilterRadioItem'
import type {
  StoreSearch,
  StoreSortOptions,
  StoreSortOrder
} from './validationSchemas'

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

export const createArrayFilterMatcher =
  (options: StoreSearch) =>
  <T extends StoreSortOptions>(option: T, value: RadioValue<T>) => {
    if (!value) {
      return false
    }

    const selectedOption = options[option]

    if (!selectedOption) {
      return false
    }

    return selectedOption?.includes(value)
  }

export const createPrimitiveFilterMatcher =
  (options: StoreSearch) =>
  <T extends StoreSortOptions>(option: T, value: CheckboxValue<T>) =>
    options[option] === value

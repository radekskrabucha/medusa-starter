import { getRouteApi } from '@tanstack/react-router'
import type { StoreSortOrder } from './validationSchemas'

export const storePageRouteApi = getRouteApi('/(app)/_layout/store/')

export const LIMIT_PER_PAGE = 20

export const SORT_BY_DEFAULT: StoreSortOrder = '-created_at'

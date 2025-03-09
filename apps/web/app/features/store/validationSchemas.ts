import { z } from 'zod'

export const sortOrderSchema = z.enum([
  'created_at',
  '-created_at',
  'price_asc',
  'price_desc'
])

export const storeSearchSchema = z.object({
  order: sortOrderSchema.optional()
})

export type StoreSortOrder = z.infer<typeof sortOrderSchema>
export type StoreSearch = z.infer<typeof storeSearchSchema>
export type StoreSortOptions = keyof StoreSearch

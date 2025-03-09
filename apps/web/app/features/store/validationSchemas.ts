import { z } from 'zod'

export const sortSchema = z.enum(['asc', 'desc'])

export const storeSearchSchema = z.object({
  date: sortSchema.optional(),
  price: sortSchema.optional()
})

export type StoreSort = z.infer<typeof sortSchema>
export type StoreSearch = z.infer<typeof storeSearchSchema>
export type StoreSortOptions = keyof StoreSearch

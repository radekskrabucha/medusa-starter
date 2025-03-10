import { z } from 'zod'

export const sortOrderSchema = z.enum([
  'created_at',
  '-created_at',
  'price_asc',
  'price_desc'
])

export const collectionsSchema = z.array(z.string())

export const storeSearchSchema = z.object({
  order: sortOrderSchema.optional(),
  collections: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
})

export type StoreSortOrder = z.infer<typeof sortOrderSchema>
export type StoreSearch = z.infer<typeof storeSearchSchema>
export type StoreCollections = StoreSearch['collections']
export type StoreCategories = StoreSearch['categories']
export type StoreSortOptions = keyof StoreSearch

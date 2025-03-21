import { z } from 'zod'

export const sortOrderSchema = z.enum(['created_at', '-created_at'])

export const collectionsSchema = z.array(z.string())

export const storeSearchSchema = z.object({
  order: sortOrderSchema.optional(),
  collections: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  page: z.number().optional()
})

export type StoreSortOrder = z.infer<typeof sortOrderSchema>
export type StoreSearchWithPage = z.infer<typeof storeSearchSchema>
export type StoreSearch = Omit<StoreSearchWithPage, 'page'>
export type StoreCollections = StoreSearch['collections']
export type StoreCategories = StoreSearch['categories']
export type StoreSortOptions = keyof StoreSearch

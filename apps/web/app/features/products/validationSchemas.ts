import { z } from 'zod'

export const queryProductOptionSchema = z.object({
  name: z.string(),
  value: z.string()
})

export type QueryProductOption = z.infer<typeof queryProductOptionSchema>

export const productSearchSchema = z.object({
  image: z.string().optional(),
  options: z.array(queryProductOptionSchema).optional()
})

export type ProductSearch = z.infer<typeof productSearchSchema>

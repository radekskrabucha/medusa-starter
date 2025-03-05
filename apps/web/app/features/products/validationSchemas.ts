import { z } from 'zod'

export const productOptionSchema = z.object({
  name: z.string(),
  value: z.string()
})

export type ProductOption = z.infer<typeof productOptionSchema>

export const productSearchSchema = z.object({
  image: z.string().optional(),
  options: z.array(productOptionSchema).optional()
})

export type ProductSearch = z.infer<typeof productSearchSchema>

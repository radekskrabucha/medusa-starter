import { z } from 'zod'

export const signInSearchParamsSchema = z.object({
  redirect: z.string().optional()
})

export type SignInSearchParams = z.infer<typeof signInSearchParamsSchema>

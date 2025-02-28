import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const envServer = createEnv({
  server: {
    MEDUSA_BACKEND_URL: z.string().url(),
    MEDUSA_PUBLISHABLE_KEY: z.string().min(1)
  },
  runtimeEnv: process.env
})

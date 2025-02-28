import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const envClient = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_TEST: z.string().min(1)
  },
  runtimeEnv: import.meta.env
})

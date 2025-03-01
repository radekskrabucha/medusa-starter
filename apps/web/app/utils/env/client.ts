import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const envClient = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_TEST: z.string().min(1),
    VITE_MEDUSA_BACKEND_URL: z.string().url(),
    VITE_MEDUSA_PUBLISHABLE_KEY: z.string().min(1),
    VITE_IS_DEV: z.enum(['true', 'false']).default('false').transform(v => v === 'true')
  },
  runtimeEnv: import.meta.env
})

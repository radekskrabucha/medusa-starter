import Medusa from '@medusajs/js-sdk'
import { envServer } from '~web/utils/env/server'

export const sdk = new Medusa({
  baseUrl: envServer.MEDUSA_BACKEND_URL,
  debug: envServer.NODE_ENV === 'development',
  publishableKey: envServer.MEDUSA_PUBLISHABLE_KEY,
  auth: {
    type: 'jwt'
  }
})

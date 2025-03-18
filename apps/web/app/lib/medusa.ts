import {
  getItem,
  removeItem,
  setItem
} from '@medusa-starter/browser-utils/cookie'
import { getMedusaClientStoreActions } from '@medusa-starter/medusa-utils/actions'
import Medusa from '@medusajs/js-sdk'
import { envClient } from '~web/utils/env/client'
import { getAppNameKebabCase } from '~web/utils/string'

export const AUTH_TOKEN_KEY = `${getAppNameKebabCase()}.medusa_auth_token`

export const sdk = new Medusa({
  baseUrl: envClient.VITE_MEDUSA_BACKEND_URL,
  debug: envClient.VITE_IS_DEV,
  publishableKey: envClient.VITE_MEDUSA_PUBLISHABLE_KEY,
  auth: {
    type: 'jwt',
    fetchCredentials: 'include',
    jwtTokenStorageKey: AUTH_TOKEN_KEY,
    jwtTokenStorageMethod: 'custom',
    storage: {
      getItem: key => getItem(key),
      setItem: (key, value) => setItem(key, value),
      removeItem: key => removeItem(key)
    }
  }
})

export const { actions } = getMedusaClientStoreActions(sdk)

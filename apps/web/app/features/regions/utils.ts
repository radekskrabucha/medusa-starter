import {
  getItem,
  removeItem,
  setItem
} from '@medusa-starter/browser-utils/cookie'
import { getAppNameKebabCase } from '~web/utils/string'

export const COUNTRY_KEY = `${getAppNameKebabCase()}.medusa_country`
export const COUNTRY_EVENT_NAME = 'country_id_update'

const COUNTRY_EXPIRATION_DAYS = 365

export const countryIdStore = {
  get: () => getItem(COUNTRY_KEY),
  set: (countryId: string) => {
    setItem(COUNTRY_KEY, countryId, COUNTRY_EXPIRATION_DAYS)
    dispatchCountryEvent()
  },
  remove: () => {
    removeItem(COUNTRY_KEY)
    dispatchCountryEvent()
  }
}

export const dispatchCountryEvent = () =>
  window.dispatchEvent(
    new CustomEvent(COUNTRY_EVENT_NAME, { detail: countryIdStore.get() })
  )

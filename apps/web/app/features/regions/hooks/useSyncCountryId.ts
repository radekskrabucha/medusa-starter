import { useSyncExternalStore } from 'react'
import { COUNTRY_EVENT_NAME, countryIdStore } from '../utils'

const subscribe = (callback: VoidFunction) => {
  window.addEventListener(COUNTRY_EVENT_NAME, callback)

  return () => window.removeEventListener(COUNTRY_EVENT_NAME, callback)
}

const getSnapshot = () => {
  return countryIdStore.get()
}

const getServerSnapshot = () => {
  return null
}

export const useSyncCountryId = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

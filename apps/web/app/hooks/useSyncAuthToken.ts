import { useSyncExternalStore } from 'react'
import { AUTH_TOKEN_KEY, LOG_IN_EVENT_NAME } from '~web/lib/medusa'

const subscribe = (callback: VoidFunction) => {
  window.addEventListener(LOG_IN_EVENT_NAME, callback)

  return () => window.removeEventListener(LOG_IN_EVENT_NAME, callback)
}

const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY)

export const useSyncAuthToken = () => {
  return useSyncExternalStore(subscribe, getAuthToken)
}

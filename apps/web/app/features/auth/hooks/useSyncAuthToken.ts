import { useSyncExternalStore } from 'react'
import { getAuthToken, LOG_IN_EVENT_NAME } from '../utils'

const subscribe = (callback: VoidFunction) => {
  window.addEventListener(LOG_IN_EVENT_NAME, callback)

  return () => window.removeEventListener(LOG_IN_EVENT_NAME, callback)
}

export const useSyncAuthToken = () => {
  return useSyncExternalStore(subscribe, getAuthToken)
}

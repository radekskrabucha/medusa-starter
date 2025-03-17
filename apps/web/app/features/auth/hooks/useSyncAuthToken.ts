import { useSyncExternalStore } from 'react'
import { localAuthToken, LOG_IN_EVENT_NAME } from '../utils'

const subscribe = (callback: VoidFunction) => {
  window.addEventListener(LOG_IN_EVENT_NAME, callback)

  return () => window.removeEventListener(LOG_IN_EVENT_NAME, callback)
}

const getSnapshot = () => {
  return localAuthToken.get()
}

const getServerSnapshot = () => {
  return null
}

export const useSyncAuthToken = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

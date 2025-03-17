import { useSyncExternalStore } from 'react'
import { CART_EVENT_NAME, cartIdStore } from '../utils'

const subscribe = (callback: VoidFunction) => {
  window.addEventListener(CART_EVENT_NAME, callback)

  return () => window.removeEventListener(CART_EVENT_NAME, callback)
}

const getSnapshot = () => {
  return cartIdStore.get()
}

const getServerSnapshot = () => {
  return null
}

export const useSyncLocalCart = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

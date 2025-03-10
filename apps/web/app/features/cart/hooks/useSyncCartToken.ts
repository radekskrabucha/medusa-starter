import { useSyncExternalStore } from 'react'
import { CART_EVENT_NAME, localCart } from '../utils'

const subscribe = (callback: VoidFunction) => {
  window.addEventListener(CART_EVENT_NAME, callback)

  return () => window.removeEventListener(CART_EVENT_NAME, callback)
}

export const useSyncLocalCart = () => {
  return useSyncExternalStore(subscribe, localCart.get)
}

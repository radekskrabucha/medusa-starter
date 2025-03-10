import { getItem, removeItem, setItem } from '~web/utils/localStorage'

export const CART_KEY = 'medusa_cart'
export const CART_EVENT_NAME = 'cart'

export const localCart = {
  get: () => getItem(CART_KEY),
  set: (cart: string) => {
    setItem(CART_KEY, cart)
    dispatchCartEvent()
  },
  remove: () => {
    removeItem(CART_KEY)
    dispatchCartEvent()
  }
}

export const dispatchCartEvent = () =>
  window.dispatchEvent(new Event(CART_EVENT_NAME))

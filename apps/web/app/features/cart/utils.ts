import {
  getItem,
  removeItem,
  setItem
} from '@medusa-starter/browser-utils/cookie'
import type { Cart } from '@medusa-starter/medusa-utils/models'
import { appName } from '~web/config/app'

export const CART_KEY = `${appName}.medusa_cart`
export const CART_EVENT_NAME = 'cart'

const CART_EXPIRATION_DAYS = 365

export const localCart = {
  get: () => getItem(CART_KEY),
  set: (cartId: string) => {
    setItem(CART_KEY, cartId, CART_EXPIRATION_DAYS)
    dispatchCartEvent()
  },
  remove: () => {
    removeItem(CART_KEY)
    dispatchCartEvent()
  }
}

export const dispatchCartEvent = () =>
  window.dispatchEvent(new Event(CART_EVENT_NAME))

export const calculateNumOfItems = (cart: Cart) => {
  if (!cart.items) {
    return 0
  }

  return cart.items.reduce((total, item) => total + item.quantity, 0)
}

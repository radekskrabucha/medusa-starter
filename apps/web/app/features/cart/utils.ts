import {
  getItem,
  removeItem,
  setItem
} from '@medusa-starter/browser-utils/cookie'
import type { Cart } from '@medusa-starter/medusa-utils/models'
import { createIsomorphicFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import { getAppNameKebabCase } from '~web/utils/string'

export const CART_KEY = `${getAppNameKebabCase()}.medusa_cart`
export const CART_EVENT_NAME = 'cart_id_update'

const CART_EXPIRATION_DAYS = 365

export const cartIdStore = {
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
  window.dispatchEvent(
    new CustomEvent(CART_EVENT_NAME, { detail: cartIdStore.get() })
  )

export const calculateNumOfItems = (cart: Cart) => {
  if (!cart.items) {
    return 0
  }

  return cart.items.reduce((total, item) => total + item.quantity, 0)
}

export const getIsomorphicCartCookie = createIsomorphicFn()
  .server(() => getCookie(CART_KEY) ?? null)
  .client(() => cartIdStore.get())

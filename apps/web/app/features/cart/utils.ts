import { getItem, removeItem, setItem } from '~web/utils/localStorage'

export const CART_KEY = 'medusa_cart'

export const localCart = {
  get: () => getItem(CART_KEY),
  set: (cart: string) => setItem(CART_KEY, cart),
  remove: () => removeItem(CART_KEY)
}

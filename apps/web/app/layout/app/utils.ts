import type { Cart } from '@medusa-starter/medusa-utils/models'
import { getRouteApi } from '@tanstack/react-router'

export const appLayoutRouteApi = getRouteApi('/(app)/_layout')

export const calculateNumOfItems = (cart: Cart) => {
  if (!cart.items) {
    return 0
  }

  return cart.items.reduce((total, item) => total + item.quantity, 0)
}

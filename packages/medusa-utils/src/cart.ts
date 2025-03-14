import type { Cart } from './models'

export const getIsCartReadyToPay = (cart: Cart): boolean => {
  if (
    !cart.items?.length ||
    !cart.email ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.shipping_methods?.length ||
    !cart.payment_collection?.payment_sessions?.length
  ) {
    return false
  }

  return true
}

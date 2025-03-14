import type { Cart } from '@medusa-starter/medusa-utils/models'
import type { CheckoutStep } from './types'

export const getActiveStep = (cart: Cart | undefined): CheckoutStep => {
  if (!cart) {
    return 'address'
  }
  if (!cart.email || !cart.shipping_address || !cart.billing_address) {
    return 'address'
  }
  if (!cart.shipping_methods?.length) {
    return 'shipping'
  }

  if (!cart.payment_collection?.payment_sessions?.length) {
    return 'payment'
  }

  return 'review'
}

import type { AddProductToCartParams } from '@medusa-starter/medusa-utils/types'
import { actions } from '~web/lib/medusa'
import { localCart } from './utils'

export type AddProductToCartReq = AddProductToCartParams['body']

export const addProductToCart = async (
  cartId: string | null,
  req: AddProductToCartReq
) => {
  let id = cartId

  if (!id) {
    const { cart } = await actions.cart.create({
      // TODO - create cart with default values - when user logged in
      body: {}
    })

    id = cart.id
  }

  localCart.set(id)

  return await actions.cart.addProduct({
    cartId: id,
    body: req
  })
}

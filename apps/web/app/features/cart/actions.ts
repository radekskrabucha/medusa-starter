import type {
  AddProductToCartParams,
  GetCartParams
} from '@medusa-starter/medusa-utils/types'
import { queryOptions } from '@tanstack/react-query'
import { actions } from '~web/lib/medusa'
import { cartIdStore } from './utils'

export type AddProductToCartReq = AddProductToCartParams['body']

export const addProductToCart = async (
  cartId: string | null,
  req: AddProductToCartReq
) => {
  let id = cartId

  if (!id) {
    const { cart } = await actions.cart.create({
      body: {}
    })

    id = cart.id
  }

  cartIdStore.set(id)

  return await actions.cart.addProduct({
    cartId: id,
    body: req
  })
}

export const getCartQueryOptions = (params: GetCartParams) =>
  queryOptions({
    queryFn: () => actions.cart.get(params),
    queryKey: ['actions.cart.get', params],
    enabled: Boolean(params.id)
  })

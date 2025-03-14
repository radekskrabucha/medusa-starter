import type { Cart } from '@medusa-starter/medusa-utils/models'
import type { InitiatePaymentSessionParams } from '@medusa-starter/medusa-utils/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getCartQueryOptions } from '~web/features/cart/actions'
import { actions } from '~web/lib/medusa'

type InitiatePaymentSessionReq = Omit<InitiatePaymentSessionParams, 'cart'>

type CreatePaymentCollectionReq = {
  providerId: string
}

export const useInitiatePaymentSessionMutation = (cart: Cart) => {
  const queryClient = useQueryClient()
  const invalidateCartQuery = () =>
    queryClient.invalidateQueries({
      queryKey: getCartQueryOptions({ id: cart.id }).queryKey
    })

  const initiatePaymentSessionMutation = useMutation({
    mutationFn: (req: InitiatePaymentSessionReq) =>
      actions.payment.initiatePaymentSession({
        cart,
        ...req
      }),
    mutationKey: ['actions.payment.initiatePaymentSession'],
    onSuccess: async () => {
      await invalidateCartQuery()
    }
  })
  const createPaymentCollectionMutation = useMutation({
    mutationFn: (_: CreatePaymentCollectionReq) =>
      actions.payment.createPaymentCollection({ cart_id: cart.id }),
    mutationKey: ['actions.payment.createPaymentCollection'],
    onSuccess: async (_, variables) => {
      await invalidateCartQuery()

      initiatePaymentSessionMutation.mutate({
        body: {
          provider_id: variables.providerId
        }
      })
    }
  })

  return createPaymentCollectionMutation
}

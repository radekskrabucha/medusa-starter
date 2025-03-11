import type { UpdateCartParams } from '@medusa-starter/medusa-utils/types'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { actions } from '~web/lib/medusa'

export const useUpdateCart = (cartId: string) => {
  return useMutation({
    mutationFn: (req: Omit<UpdateCartParams, 'id'>) =>
      actions.cart.update({ id: cartId, ...req }),
    mutationKey: ['actions.cart.update', cartId],
    onError: error => {
      toast.error('Failed to update cart', {
        description: error.message
      })
    }
  })
}

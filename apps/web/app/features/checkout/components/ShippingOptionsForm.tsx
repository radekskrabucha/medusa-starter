import type { CartShippingOption } from '@medusa-starter/medusa-utils/models'
import type { AddCartShippingMethodParams } from '@medusa-starter/medusa-utils/types'
import { SubmitButton } from '@medusa-starter/ui/components/form/submit-button'
import { StatusMessage } from '@medusa-starter/ui/status-message'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { getCartQueryOptions } from '~web/features/cart/actions'
import { actions } from '~web/lib/medusa'
import { ShippingOption } from './ShippingOption'

const shippingOptionSchema = z.object({
  id: z.string().min(1, 'Shipping option is required')
})

type ShippingOptionsFormProps = {
  cartId: string
  shippingOptions: Array<CartShippingOption>
  onNext: VoidFunction
  selectedOptionId: string | undefined
}

export const ShippingOptionsForm: React.FC<ShippingOptionsFormProps> = ({
  cartId,
  shippingOptions,
  onNext,
  selectedOptionId
}) => {
  const queryClient = useQueryClient()
  const updateCartMutation = useMutation({
    mutationFn: (req: Omit<AddCartShippingMethodParams, 'cartId'>) =>
      actions.cart.addShippingMethod({ cartId, ...req }),
    mutationKey: ['actions.cart.addShippingMethod', cartId],
    onSuccess: data => {
      queryClient.setQueryData(
        getCartQueryOptions({ id: cartId }).queryKey,
        data
      )

      onNext()
    }
  })
  const form = useForm({
    onSubmit: ({ value: { id } }) => {
      updateCartMutation.mutate({
        body: {
          option_id: id
        }
      })
    },
    defaultValues: {
      id: selectedOptionId ?? ''
    },
    validators: {
      onSubmit: shippingOptionSchema
    }
  })

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()

        form.handleSubmit()
      }}
      noValidate
    >
      <form.Field name="id">
        {field => (
          <>
            {shippingOptions.map(option => (
              <ShippingOption
                key={option.id}
                option={option}
                isSelected={field.state.value === option.id}
                onSelect={field.handleChange}
              />
            ))}
            {field.state.meta.errors?.[0]?.message && (
              <StatusMessage variant="error">
                {field.state.meta.errors?.[0]?.message}
              </StatusMessage>
            )}
          </>
        )}
      </form.Field>
      <SubmitButton
        text="Continue to Review"
        isPending={updateCartMutation.isPending}
      />
    </form>
  )
}

import type { CartShippingOption } from '@medusa-starter/medusa-utils/models'
import type { AddCartShippingMethodParams } from '@medusa-starter/medusa-utils/types'
import { SubmitButton } from '@medusa-starter/ui/components/form/submit-button'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { actions } from '~web/lib/medusa'
import { ShippingOption } from './ShippingOptions'

const shippingOptionSchema = z.object({
  id: z.string().min(1, 'Shipping option is required')
})

type ShippingOptionsFormProps = {
  cartId: string
  shippingOptions: Array<CartShippingOption>
}

export const ShippingOptionsForm: React.FC<ShippingOptionsFormProps> = ({
  cartId,
  shippingOptions
}) => {
  const updateCartMutation = useMutation({
    mutationFn: (req: Omit<AddCartShippingMethodParams, 'cartId'>) =>
      actions.cart.addShippingMethod({ cartId, ...req }),
    mutationKey: ['actions.cart.addShippingMethod', cartId]
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
      id: ''
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
      {shippingOptions.map(option => (
        <form.Field
          name="id"
          key={option.id}
        >
          {field => (
            <ShippingOption
              option={option}
              isSelected={field.state.value === option.id}
              onSelect={field.handleChange}
            />
          )}
        </form.Field>
      ))}
      <SubmitButton
        text="Save"
        isPending={updateCartMutation.isPending}
      />
    </form>
  )
}

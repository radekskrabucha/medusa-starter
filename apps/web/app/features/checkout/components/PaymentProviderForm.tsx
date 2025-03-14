import { SubmitButton } from '@medusa-starter/ui/components/form/submit-button'
import { StatusMessage } from '@medusa-starter/ui/status-message'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { z } from 'zod'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { getCartQueryOptions } from '~web/features/cart/actions'
import { actions } from '~web/lib/medusa'
import { getPaymentProvidersQueryOptions } from '../actions'
import { paymentProviderIdAtom } from '../store/payment'
import { PaymentProvider } from './PaymentProvider'

const paymentProviderSchema = z.object({
  id: z.string().min(1, 'Payment provider is required')
})

type PaymentProviderFormProps = {
  regionId: string
  cartId: string
  onNext: VoidFunction
  hasPaymentCollection: boolean
}

export const PaymentProviderForm: React.FC<PaymentProviderFormProps> = ({
  regionId,
  cartId,
  onNext,
  hasPaymentCollection
}) => {
  const queryClient = useQueryClient()
  const [atom, setAtom] = useAtom(paymentProviderIdAtom)
  const mutation = useMutation({
    mutationFn: actions.payment.createPaymentCollection,
    mutationKey: ['actions.payment.createPaymentCollection'],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getCartQueryOptions({ id: cartId }).queryKey
      })
    }
  })
  const getPaymentProvidersQuery = useQuery(
    getPaymentProvidersQueryOptions({
      region_id: regionId
    })
  )
  const form = useForm({
    onSubmit: ({ value }) => {
      setAtom(value.id)
      onNext()

      if (!hasPaymentCollection) {
        mutation.mutate({
          cart_id: cartId
        })
      }
    },
    defaultValues: {
      id: atom ?? ''
    },
    validators: {
      onSubmit: paymentProviderSchema
    }
  })

  return (
    <QueryBoundary query={getPaymentProvidersQuery}>
      {data => (
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
                {data.payment_providers.map(provider => (
                  <PaymentProvider
                    key={provider.id}
                    providerId={provider.id}
                    isSelected={field.state.value === provider.id}
                    onSelect={() => field.handleChange(provider.id)}
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
            isPending={false}
            text="Continue to Review"
          />
        </form>
      )}
    </QueryBoundary>
  )
}

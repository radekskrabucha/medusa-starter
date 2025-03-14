import type { Cart } from '@medusa-starter/medusa-utils/models'
import { SubmitButton } from '@medusa-starter/ui/components/form/submit-button'
import { StatusMessage } from '@medusa-starter/ui/status-message'
import { useForm } from '@tanstack/react-form'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { getPaymentProvidersQueryOptions } from '../actions'
import { useInitiatePaymentSessionMutation } from '../hooks/useInitiatePaymentSessionMutation'
import { PaymentProvider } from './PaymentProvider'

const paymentProviderSchema = z.object({
  id: z.string().min(1, 'Payment provider is required')
})

type PaymentProviderFormProps = {
  regionId: string
  cart: Cart
  onNext: VoidFunction
  providerId: string | undefined
}

export const PaymentProviderForm: React.FC<PaymentProviderFormProps> = ({
  regionId,
  cart,
  onNext,
  providerId
}) => {
  const mutation = useInitiatePaymentSessionMutation(cart)
  const getPaymentProvidersQuery = useQuery(
    getPaymentProvidersQueryOptions({
      region_id: regionId
    })
  )
  const form = useForm({
    onSubmit: ({ value }) => {
      mutation.mutate({
        providerId: value.id
      })

      onNext()
    },
    defaultValues: {
      id: providerId ?? ''
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

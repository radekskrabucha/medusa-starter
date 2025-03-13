import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { getPaymentProvidersQueryOptions } from '../actions'
import { paymentProviderIdAtom } from '../store/payment'
import { PaymentProvider } from './PaymentProvider'

type PaymentProviderFormProps = {
  regionId: string
}

export const PaymentProviderForm: React.FC<PaymentProviderFormProps> = ({
  regionId
}) => {
  const [atom, setAtom] = useAtom(paymentProviderIdAtom)
  const getPaymentProvidersQuery = useQuery(
    getPaymentProvidersQueryOptions({
      region_id: regionId
    })
  )

  return (
    <QueryBoundary query={getPaymentProvidersQuery}>
      {data => (
        <div className="flex flex-col gap-4">
          {data.payment_providers.map(provider => (
            <PaymentProvider
              key={provider.id}
              providerId={provider.id}
              isSelected={atom === provider.id}
              onSelect={() => setAtom(provider.id)}
            />
          ))}
        </div>
      )}
    </QueryBoundary>
  )
}

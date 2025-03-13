import { buttonVariants } from '@medusa-starter/ui/button'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { ShoppingCart } from 'lucide-react'
import { EmptyState } from '~web/components/EmptyState'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { getShippingMethodsQueryOptions } from '../actions'
import { ShippingOptionsForm } from './ShippingOptionsForm'
import { ShippingOptionsInfo } from './ShippingOptionsInfo'

type ShippingOptionsWrapperProps = {
  cartId: string
  onNext: VoidFunction
  selectedOptionId: string | undefined
  active: boolean
  isFilled: boolean
}

export const ShippingOptionsWrapper: React.FC<ShippingOptionsWrapperProps> = ({
  cartId,
  onNext,
  selectedOptionId,
  active,
  isFilled
}) => {
  const getShippingMethodsQuery = useQuery(
    getShippingMethodsQueryOptions({
      cart_id: cartId
    })
  )

  return (
    <QueryBoundary
      query={getShippingMethodsQuery}
      isDataEmpty={data => data?.shipping_options?.length === 0}
      noDataFallback={
        <EmptyState
          title="No shipping options found"
          description="There are no shipping options available for this order. Please contact us for assistance or try again later."
          action={
            <Link
              to="/"
              replace
              className={buttonVariants({})}
            >
              Go to Home
            </Link>
          }
          icon={ShoppingCart}
        />
      }
    >
      {data => {
        const selectedOption = data.shipping_options.find(
          option => option.id === selectedOptionId
        )

        return active ? (
          <ShippingOptionsForm
            cartId={cartId}
            shippingOptions={data.shipping_options}
            onNext={onNext}
            selectedOptionId={selectedOptionId}
          />
        ) : isFilled && selectedOption ? (
          <ShippingOptionsInfo shippingOption={selectedOption} />
        ) : null
      }}
    </QueryBoundary>
  )
}

import { useQuery } from '@tanstack/react-query'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { getShippingMethodsQueryOptions } from '../actions'
import { ShippingOptionsForm } from './ShippingOptionsForm'

type ShippingOptionsWrapperProps = {
  cartId: string
}

export const ShippingOptionsWrapper: React.FC<ShippingOptionsWrapperProps> = ({
  cartId
}) => {
  const getShippingMethodsQuery = useQuery(
    getShippingMethodsQueryOptions({
      cart_id: cartId
    })
  )

  return (
    <QueryBoundary query={getShippingMethodsQuery}>
      {data => (
        <ShippingOptionsForm
          cartId={cartId}
          shippingOptions={data.shipping_options}
        />
      )}
    </QueryBoundary>
  )
}

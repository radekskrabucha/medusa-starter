import { QueryBoundary } from '~web/components/QueryBoundary'
import { useGetCartQuery } from '~web/features/cart/hooks/useGetCartQuery'
import { StoreCartCard, StoreEmptyCartCard } from './StoreCartCard'

export const CartButton = () => {
  const { getCartQuery } = useGetCartQuery()

  return (
    <QueryBoundary
      query={getCartQuery}
      errorFallback={() => <StoreEmptyCartCard />}
      noDataFallback={<StoreEmptyCartCard />}
      loadingFallback={<StoreEmptyCartCard />}
      isDataEmpty={data => data?.cart?.items?.length === 0}
    >
      {data => <StoreCartCard cart={data.cart} />}
    </QueryBoundary>
  )
}
